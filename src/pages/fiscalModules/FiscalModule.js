import React, { useState, useEffect } from "react";
import useFetch from "../../components/useFetch/useFetch";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Pagination from "./Pagination";

const FiscalModule = () => {
  const [filters, setFilters] = useState({
    serialNumber: "",
    appletVersion: "",
    cto: "",
    inn: "",
    statusOnCash: "",
    status: "",
    returnedFmoFm: "",
  });

  const { data, loading, error } = useFetch(
    "https://6687c8f30bc7155dc019177c.mockapi.io/fiscal"
  );

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
          row.serialNumber
            .toLowerCase()
            .includes(filters.serialNumber.toLowerCase()) &&
          row.versionNumber
            .toLowerCase()
            .includes(filters.appletVersion.toLowerCase()) &&
          row.company.toLowerCase().includes(filters.cto.toLowerCase())
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
    <div className="overflow-x-auto flex flex-col pt-4 px-4">
      {loading && (
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <>
          <div className="flex-grow overflow-y-auto">
            <table className="table table-md table-zebra border w-full h-full">
              <TableHeader filters={filters} handleFilterChange={handleFilterChange} />
              <TableBody currentRows={currentRows} />
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
