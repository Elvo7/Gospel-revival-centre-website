export default function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 3px 10px rgba(0,0,0,.08)",
      }}
    >
      <div
        style={{
          fontSize: "35px",
        }}
      >
        {icon}
      </div>

      <h3>{title}</h3>

      <h1
        style={{
          color: "#14532d",
        }}
      >
        {value}
      </h1>
    </div>
  );
}