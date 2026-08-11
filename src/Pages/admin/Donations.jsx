import { useEffect, useState } from "react";
import Layout from "../../components/admin/Layout";

import DonationStats from "../../components/admin/donations/DonationStats";
import DonationForm from "../../components/admin/donations/DonationForm";
import DonationTable from "../../components/admin/donations/DonationTable";

import {
  getDonations,
  addDonation,
  updateDonation,
  deleteDonation,
} from "../../services/api";

export default function Donations() {
  const [donations, setDonations] = useState([]);
  const [search, setSearch] = useState("");
  const [editingDonation, setEditingDonation] = useState(null);

  useEffect(() => {
    loadDonations();
  }, []);

  async function loadDonations() {
    try {
      const data = await getDonations();
      setDonations(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setDonations([]);
    }
  }

  async function handleSave(form) {
    try {
      if (editingDonation) {
        await updateDonation(editingDonation.id, form);
      } else {
        await addDonation(form);
      }

      setEditingDonation(null);
      loadDonations();
    } catch (err) {
      alert(err.message);
    }
  }

  function handleEdit(donation) {
    setEditingDonation(donation);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this donation?")) return;

    try {
      await deleteDonation(id);
      loadDonations();
    } catch (err) {
      alert(err.message);
    }
  }

  function handleCancel() {
    setEditingDonation(null);
  }

  return (
    <Layout>
      <h1 style={{ marginBottom: 25 }}>Donations</h1>

      <DonationStats donations={donations} />

      <DonationForm
        editingDonation={editingDonation}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      <DonationTable
        donations={donations}
        search={search}
        setSearch={setSearch}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </Layout>
  );
}