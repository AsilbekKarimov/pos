import React from 'react';

const StatsTable = () => {
  const data = [
    { name: 'RUSTAM YAKUBOV', value: 259 },
    { name: 'AZIMOV QUDRATJON', value: 2135 },
    { name: 'EVILINA FAZLUTDINOVA', value: 0 }
  ];

  return (
    <div className="font-sans p-4">
      <h2 className="font-bold mb-4">STATISTIKA №2</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-center">Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2 text-center">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StatsTable;
