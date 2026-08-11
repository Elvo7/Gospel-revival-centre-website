export default function DonationStats({ donations }) {
  const totalDonations = donations.length;

  const totalAmount = donations.reduce(
    (sum, donation) => sum + Number(donation.amount || 0),
    0
  );

  const completed = donations.filter(
    (d) => d.status === "Completed"
  ).length;

  const pending = donations.filter(
    (d) => d.status === "Pending"
  ).length;

  const cardStyle = {
    background: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,.08)",
    textAlign: "center",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      <div style={cardStyle}>
        <h3>Total Donations</h3>
        <h1>{totalDonations}</h1>
      </div>

      <div style={cardStyle}>
        <h3>Total Amount</h3>
        <h1>KSh {totalAmount.toLocaleString()}</h1>
      </div>

      <div style={cardStyle}>
        <h3>Completed</h3>
        <h1 style={{ color: "green" }}>{completed}</h1>
      </div>

      <div style={cardStyle}>
        <h3>Pending</h3>
        <h1 style={{ color: "#f59e0b" }}>{pending}</h1>
      </div>
    </div>
  );
}