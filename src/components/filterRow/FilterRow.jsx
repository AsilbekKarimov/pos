import React from "react";

const FilterRow = ({ filters, handleFilterChange }) => {
  return (
    <tr className="border">
      {Object.keys(filters).map((key) => (
        <th className="border" key={key}>
          <input
            name={key}
            value={filters[key]}
            onChange={handleFilterChange}
            className="w-full border-2 border-slate-500 p-1 outline-none rounded-md"
          />
        </th>
      ))}
    </tr>
  );
};

export default FilterRow;
