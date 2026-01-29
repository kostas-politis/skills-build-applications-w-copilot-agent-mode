export function buildEndpoint(path) {
  return process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/${path}/`
    : `/api/${path}/`
}

export function TableView({ items }) {
  if (!items || items.length === 0) return <div className="text-muted">No items</div>
  const cols = Object.keys(items[0])
  return (
    <div className="table-responsive table-json">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            {cols.map((c) => (
              <th key={c}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((row, i) => (
            <tr key={i}>
              {cols.map((c) => (
                <td key={c + i}>{typeof row[c] === 'object' ? JSON.stringify(row[c]) : String(row[c])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
