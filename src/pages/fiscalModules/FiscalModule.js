import React, { useState, useEffect, Suspense } from "react";
import useFetch from "../../components/useFetch/useFetch";
import Pagination from "./Pagination";

const FiscalModule = () => {
  const [filters, setFilters] = useState({
    factory_number: "",
    fiscal_number: "",
  });

  const { data, loading, error } = useFetch("fiscal");

  console.log("Response fiscal data: ", data);

  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((row) => {
        return (
          row.factory_number
            .toLowerCase()
            .includes(filters.factory_number.toLowerCase()) &&
          row.fiscal_number
            .toLowerCase()
            .includes(filters.fiscal_number.toLowerCase())
        );
      });
      setFilteredData(filtered);
      setCurrentPage(1);
    }
  }, [filters, data]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="overflow-x-auto flex flex-col pr-4">
      {loading ? <Suspense /> : null}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <>
          <div className="flex-grow overflow-y-auto">
            <table className="table table-md table-zebra border w-full h-full">
              <thead>
                <tr className="border font-normal text-[14px] text-blue-700">
                  <th className="border">#</th>
                  <th className="border">Заводской номер кассы</th>
                  <th className="border">Серийный номер фискального модуля</th>
                </tr>
                <tr className="border">
                  <th></th>
                  <th className="border">
                    <input
                      name="factory_number"
                      value={filters.factory_number}
                      onChange={handleFilterChange}
                      className="w-full border-2 border-slate-500 p-1 outline-none rounded-md"
                    />
                  </th>
                  <th className="border">
                    <input
                      name="fiscal_number"
                      value={filters.fiscal_number}
                      onChange={handleFilterChange}
                      className="w-full border-2 border-slate-500 p-1 outline-none rounded-md"
                    />
                  </th>
                </tr>
              </thead>
              <tbody className="text-[6px]">
                {currentRows.map((row) => (
                  <tr className="border h-12" key={row.id}>
                    <th className="border">{row.id}</th>
                    <td className="border">{row.factory_number}</td>
                    <td className="border">{row.fiscal_number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default FiscalModule;
