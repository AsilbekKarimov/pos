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
                  <th className="border">Закреплено цто/партнером</th>
                </tr>
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
                      value={filters.versionNumber}
                      onChange={handleFilterChange}
                      className="w-full border-2 border-slate-500 p-1 outline-none rounded-md"
                    />
                  </th>
                  <th className="border">
                    <input
                      name="cto"
                      value={filters.company}
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
                    <td className="border">Serial {row.serialNumber}</td>
                    <td className="border">Version {row.versionNumber}</td>

                    <td className="border">
                      <div className="flex justify-center items-center h-full">
                        <span className="badge badge-info text-white">
                          Актуальный
                        </span>
                      </div>
                    </td>
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
