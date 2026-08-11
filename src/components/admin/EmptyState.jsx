export default function EmptyState({ message }) {
  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        background: "#fff",
        borderRadius: "10px",
      }}
    >
      <h3>No Records Found</h3>
      <p>{message}</p>
    </div>
  );
}