import React from "react";

const TableBody = ({ currentRows }) => {
  return (
    <tbody className="text-[6px]">
      {currentRows.map((row) => (
        <tr className="border" key={row.id}>
          <th className="border">{row.id}</th>
          <td className="border">Serial {row.serialNumber}</td>
          <td className="border">Version {row.versionNumber}</td>
          <td className="border">MCHJ "{row.company}" </td>
          <td className="border">448948949</td>
          <td className="border">Активный</td>
          <td className="border">
            <div className="flex justify-center items-center h-full">
              <span className="badge badge-info text-white">Актуальный</span>
            </div>
          </td>
          <td className="border">FMO</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
