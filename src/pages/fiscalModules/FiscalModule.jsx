import React, { useState, useEffect } from "react";
import useFetch from "../../components/useFetch/useFetch";
import Pagination from "../../components/pagination/Pagination";
import FilterRow from "../../components/filterRow/FilterRow";

const FiscalModule = () => {
  const [filters, setFilters] = useState({
    factory_number: "",
    fiscal_number: "",
  });

  const { data, loading, error } = useFetch("fiscal");

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
    <div className="overflow-x-auto flex flex-col px-4">
      {loading && (
        <div className="min-h-full flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <div className="flex-grow overflow-y-auto">
          <table className="table table-md table-zebra border w-full h-full">
            <thead>
              <tr className="border font-normal text-[14px] text-blue-700">
                <th className="border">#</th>
                <th className="border">Заводской номер кассы</th>
                <th className="border">Серийный номер фискального модуля</th>
              </tr>
              <FilterRow
                filters={filters}
                handleFilterChange={handleFilterChange}
              />
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
      )}
      {filteredData.length > rowsPerPage ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default FiscalModule;
