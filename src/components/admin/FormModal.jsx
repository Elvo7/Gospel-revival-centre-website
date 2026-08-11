export default function FormModal({
  open,
  title,
  children,
  onClose,
}) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "500px",
          borderRadius: "12px",
          padding: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h2>{title}</h2>

          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "22px",
              cursor: "pointer",
            }}
          >
            ✖
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}