import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f4f6f9",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        {children}
      </main>
    </div>
  );
}