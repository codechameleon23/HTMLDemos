const Tabel = ({ headers, rows }) => {
  return (
    <table className="simple-table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={`header-${index}`}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={`row-${index}`}>
            {row.map((col, index) => (
              <td key={`col-${index}`}>{col}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
