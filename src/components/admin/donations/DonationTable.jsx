export default function DonationTable({
  donations,
  search,
  setSearch,
  onEdit,
  onDelete,
}) {
  const filtered = donations.filter((donation) => {
    const donor = (donation.donor_name || "").toLowerCase();
    const transaction = (donation.transaction_code || "").toLowerCase();
    const phone = (donation.phone || "").toLowerCase();
    const keyword = search.toLowerCase();

    return (
      donor.includes(keyword) ||
      transaction.includes(keyword) ||
      phone.includes(keyword)
    );
  });

  return (
    <>
      <input
        type="text"
        placeholder="Search donor, phone or transaction..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />

      <div
        style={{
          overflowX: "auto",
          background: "#fff",
          borderRadius: "10px",
          padding: "15px",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ background: "#14532d", color: "#fff" }}>
              <th style={th}>Donor</th>
              <th style={th}>Amount</th>
              <th style={th}>Purpose</th>
              <th style={th}>Payment</th>
              <th style={th}>Transaction</th>
              <th style={th}>Phone</th>
              <th style={th}>Status</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
                  No donations found.
                </td>
              </tr>
            ) : (
              filtered.map((donation) => (
                <tr key={donation.id}>
                  <td style={td}>{donation.donor_name}</td>

                  <td style={td}>
                    <strong>
                      KSh {Number(donation.amount).toLocaleString()}
                    </strong>
                  </td>

                  <td style={td}>{donation.purpose}</td>

                  <td style={td}>{donation.payment_method}</td>

                  <td style={td}>
                    {donation.transaction_code || "-"}
                  </td>

                  <td style={td}>{donation.phone || "-"}</td>

                  <td style={td}>
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "20px",
                        color: "#fff",
                        background:
                          donation.status === "Completed"
                            ? "#16a34a"
                            : donation.status === "Pending"
                            ? "#f59e0b"
                            : "#dc2626",
                      }}
                    >
                      {donation.status}
                    </span>
                  </td>

                  <td style={td}>
                    <button
                      onClick={() => onEdit(donation)}
                      style={editBtn}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(donation.id)}
                      style={deleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

const th = {
  padding: "12px",
  textAlign: "left",
};

const td = {
  padding: "12px",
  borderBottom: "1px solid #eee",
};

const editBtn = {
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  marginRight: "8px",
  borderRadius: "5px",
  cursor: "pointer",
};

const deleteBtn = {
  background: "#dc2626",
  color: "#fff",
  border: "none",
  padding: "8px 12px",
  borderRadius: "5px",
  cursor: "pointer",
};