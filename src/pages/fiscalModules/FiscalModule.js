import React, { useState, useEffect, Suspense } from "react";
import useFetch from "../../components/useFetch/useFetch";

const Home = () => {
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
          row.company.toLowerCase().includes(filters.cto.toLowerCase()) //&&
          // row.inn.toLowerCase().includes(filters.inn.toLowerCase()) &&
          // row.statusOnCash
          //   .toLowerCase()
          //   .includes(filters.statusOnCash.toLowerCase()) &&
          // row.status.toLowerCase().includes(filters.status.toLowerCase()) &&
          // row.returnedFmoFm
          //   .toLowerCase()
          //   .includes(filters.returnedFmoFm.toLowerCase())
        );
      });
      setFilteredData(filtered);
      setCurrentPage(1); // Reset to first page when filters change
    }
  }, [filters, data]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate pagination buttons
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const maxPages = 10;
  const indexOfLastPage = Math.ceil(currentPage / maxPages) * maxPages;
  const indexOfFirstPage = indexOfLastPage - maxPages + 1;
  const displayPages = pageNumbers.slice(indexOfFirstPage - 1, indexOfLastPage);

  return (
    <div className="overflow-x-auto flex flex-col px-4 ">
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
                  <th className="border">ИНН</th>
                  <th className="border">Статус на кассе</th>
                  <th className="border">Статус</th>
                  <th className="border">Возвращенные ФМО ФМ</th>
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
              </thead>
              <tbody className="text-[6px]">
                {currentRows.map((row) => (
                  <tr className="border h-12" key={row.id}>
                    <th className="border">{row.id}</th>
                    <td className="border">Serial {row.serialNumber}</td>
                    <td className="border">Version {row.versionNumber}</td>
                    <td className="border">MCHJ "{row.company}" </td>
                    <td className="border">448948949</td>
                    <td className="border">Активный</td>
                    <td className="border">
                      <div className="flex justify-center items-center h-full">
                        <span className="badge badge-info text-white">
                          Актуальный
                        </span>
                      </div>
                    </td>
                    <td className="border">FMO</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination flex justify-center items-center py-3">
            <button
              onClick={() =>
                setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
              }
              className={`mx-2 px-3 py-1 border ${
                currentPage === 1 ? "bg-gray-300" : "bg-white text-black"
              }`}
            >
              {"<"}
            </button>
            {displayPages.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`mx-2 px-3 py-1 border ${
                  currentPage === number
                    ? "bg-blue-500 text-white"
                    : "bg-white text-black"
                }`}
              >
                {number}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage(
                  currentPage < totalPages ? currentPage + 1 : currentPage
                )
              }
              className={`mx-2 px-3 py-1 border ${
                currentPage === totalPages
                  ? "bg-gray-300"
                  : "bg-white text-black"
              }`}
            >
              {">"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
