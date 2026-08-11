export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  function logout() {
    localStorage.clear();
    window.location.href = "/";
  }

  return (
    <header
      style={{
        background: "#fff",
        padding: "20px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,.08)",
      }}
    >
      <div>
        <h2>Church Management System</h2>
        <small>Welcome back, {user?.full_name}</small>
      </div>

      <button
        onClick={logout}
        style={{
          background: "#dc2626",
          color: "#fff",
          border: "none",
          padding: "10px 18px",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </header>
  );
}