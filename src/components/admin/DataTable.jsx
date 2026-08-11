export default function DataTable({
  columns,
  data,
  renderActions,
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 2px 10px rgba(0,0,0,.08)",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#14532d", color: "#fff" }}>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{
                  padding: "15px",
                  textAlign: "left",
                }}
              >
                {column.label}
              </th>
            ))}

            {renderActions && (
              <th
                style={{
                  padding: "15px",
                  width: "180px",
                }}
              >
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              style={{
                borderBottom: "1px solid #eee",
              }}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  style={{
                    padding: "14px",
                  }}
                >
                  {row[column.key]}
                </td>
              ))}

              {renderActions && (
                <td style={{ padding: "14px" }}>
                  {renderActions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}