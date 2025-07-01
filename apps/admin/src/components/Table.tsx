export const Table = ({ columns, data }: { columns: string[]; data: any[][] }) => (
  <table className="w-full border text-left">
    <thead className="bg-gray-200 text-left">
      <tr>{columns.map(col => <th key={col} className="p-2">{col}</th>)}</tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={i} className="border-t">{row.map((cell, j) => <td key={j} className="p-2">{cell}</td>)}</tr>
      ))}
    </tbody>
  </table>
);
