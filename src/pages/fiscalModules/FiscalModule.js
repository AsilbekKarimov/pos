import React, { useState, useEffect, Suspense } from "react";
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

  const { data, loading, error } = useFetch("fiscal");

  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    if (data) {
      setFilteredData(data);

      console.log(data);
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
    <div className="overflow-x-auto flex flex-col px-4 ">
      {loading ? <Suspense /> : null}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <>
          <div className="flex-grow overflow-y-auto">
            <table className="table table-md table-zebra border w-full">
              <TableHeader
                filters={filters}
                handleFilterChange={handleFilterChange}
              />
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
