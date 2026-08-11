export default function PageTitle({ title, subtitle }) {
  return (
    <div style={{ marginBottom: "25px" }}>
      <h1
        style={{
          margin: 0,
          fontSize: "32px",
          color: "#14532d",
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            marginTop: "8px",
            color: "#666",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}