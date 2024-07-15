import React from "react";

const FilterRow = ({ filters, handleFilterChange }) => {
  return (
    <tr className="border">
      <th></th>
      <th className="border">
        <input
          name="serialNumber"
          value={filters.serialNumber}
          onChange={handleFilterChange}
          className="w-full border-2 border-slate-500 p-1 outline-none rounded-md"
        />
      </th>
      <th className="border">
        <input
          name="appletVersion"
          value={filters.appletVersion}
          onChange={handleFilterChange}
          className="w-full border-2 border-slate-500 p-1 outline-none rounded-md"
        />
      </th>
      <th className="border">
        <input
          name="cto"
          value={filters.cto}
          onChange={handleFilterChange}
          className="w-full border-2 border-slate-500 p-1 outline-none rounded-md"
        />
      </th>
      <th className="border">
        <input
          name="inn"
          value={filters.inn}
          onChange={handleFilterChange}
          className="w-full border-2 border-slate-500 p-1 outline-none rounded-md"
        />
      </th>
      <th className="border">
        <input
          name="statusOnCash"
          value={filters.statusOnCash}
          onChange={handleFilterChange}
          className="w-full border-2 border-slate-500 p-1 outline-none rounded-md"
        />
      </th>
      <th className="border">
        <input
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="w-full border-2 border-slate-500 p-1 outline-none rounded-md"
        />
      </th>
      <th className="border">
        <input
          name="returnedFmoFm"
          value={filters.returnedFmoFm}
          onChange={handleFilterChange}
          className="w-full border-2 border-slate-500 p-1 outline-none rounded-md"
        />
      </th>
    </tr>
  );
};

export default FilterRow;
