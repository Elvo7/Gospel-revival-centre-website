export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%",
        maxWidth: "350px",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        fontSize: "15px",
      }}
    />
  );
}