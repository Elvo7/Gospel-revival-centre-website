import { useEffect, useState } from "react";

export default function DonationForm({
  editingDonation,
  onSave,
  onCancel,
}) {
  const [form, setForm] = useState({
    donor_name: "",
    amount: "",
    purpose: "Tithe",
    payment_method: "M-Pesa",
    transaction_code: "",
    phone: "",
    notes: "",
    status: "Completed",
  });

  useEffect(() => {
    if (editingDonation) {
      setForm({
        donor_name: editingDonation.donor_name || "",
        amount: editingDonation.amount || "",
        purpose: editingDonation.purpose || "Tithe",
        payment_method:
          editingDonation.payment_method || "M-Pesa",
        transaction_code:
          editingDonation.transaction_code || "",
        phone: editingDonation.phone || "",
        notes: editingDonation.notes || "",
        status: editingDonation.status || "Completed",
      });
    } else {
      setForm({
        donor_name: "",
        amount: "",
        purpose: "Tithe",
        payment_method: "M-Pesa",
        transaction_code: "",
        phone: "",
        notes: "",
        status: "Completed",
      });
    }
  }, [editingDonation]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.donor_name.trim() ||
      !form.amount ||
      !form.purpose.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    onSave(form);
  }

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "15px",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "10px",
        marginBottom: "30px",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>
        {editingDonation ? "Edit Donation" : "Add Donation"}
      </h2>

      <input
        style={inputStyle}
        name="donor_name"
        placeholder="Donor Name"
        value={form.donor_name}
        onChange={handleChange}
      />

      <input
        style={inputStyle}
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
      />

      <select
        style={inputStyle}
        name="purpose"
        value={form.purpose}
        onChange={handleChange}
      >
        <option>Tithe</option>
        <option>Offering</option>
        <option>Thanksgiving</option>
        <option>Building Fund</option>
        <option>Missions</option>
        <option>Youth Ministry</option>
        <option>Children Ministry</option>
        <option>Special Seed</option>
        <option>Other</option>
      </select>

      <select
        style={inputStyle}
        name="payment_method"
        value={form.payment_method}
        onChange={handleChange}
      >
        <option>M-Pesa</option>
        <option>Cash</option>
        <option>Bank</option>
        <option>Card</option>
        <option>PayPal</option>
        <option>Other</option>
      </select>

      <input
        style={inputStyle}
        name="transaction_code"
        placeholder="Transaction Code"
        value={form.transaction_code}
        onChange={handleChange}
      />

      <input
        style={inputStyle}
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
      />

      <textarea
        style={{
          ...inputStyle,
          minHeight: "120px",
          resize: "vertical",
        }}
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
      />

      <select
        style={inputStyle}
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option>Completed</option>
        <option>Pending</option>
        <option>Failed</option>
      </select>

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <button className="primary-btn">
          {editingDonation ? "Update Donation" : "Save Donation"}
        </button>

        {editingDonation && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              background: "#6b7280",
              color: "#fff",
              border: "none",
              padding: "12px 20px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}