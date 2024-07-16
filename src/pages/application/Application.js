import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Application = () => {
  const [filters, setFilters] = useState({
    serialNumber: "",
    appletVersion: "",
    cto: "",
    inn: "",
    statusOnCash: "",
    status: "",
    returnedFmoFm: "",
  });

  const initialData = Array.from({ length: 700 }, (_, i) => ({
    id: i + 1,
    serialNumber: `Serial ${i + 1}`,
    appletVersion: `Version ${Math.floor(Math.random() * 10 + 1)}`,
    cto: `Company ${i + 1}`,
    inn: `Country ${Math.floor(Math.random() * 20 + 1)}`,
    statusOnCash: `${Math.floor(Math.random() * 12 + 1)}/${Math.floor(
      Math.random() * 31 + 1
    )}/2020`,
    status: ["Активный", "Не Активный"][Math.floor(Math.random() * 2)],
    returnedFmoFm: ["FMO", ""][Math.floor(Math.random() * 2)],
  }));

  const [filteredData, setFilteredData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = initialData.filter((row) => {
      return (
        row.serialNumber
          .toLowerCase()
          .includes(filters.serialNumber.toLowerCase()) &&
        row.appletVersion
          .toLowerCase()
          .includes(filters.appletVersion.toLowerCase()) &&
        row.cto.toLowerCase().includes(filters.cto.toLowerCase()) &&
        row.inn.toLowerCase().includes(filters.inn.toLowerCase()) &&
        row.statusOnCash
          .toLowerCase()
          .includes(filters.statusOnCash.toLowerCase()) &&
        row.status.toLowerCase().includes(filters.status.toLowerCase()) &&
        row.returnedFmoFm
          .toLowerCase()
          .includes(filters.returnedFmoFm.toLowerCase())
      );
    });
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleToggleStatus = (id) => {
    setFilteredData((prevData) =>
      prevData.map((row) =>
        row.id === id
          ? { ...row, status: row.status === "Активный" ? "Не Активный" : "Активный" }
          : row
      )
    );
  };

  const handleProfileClick = (row) => {
    navigate('/profile', { state: { row } });
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

  // Display 10 pages at a time
  const maxPages = 10;
  const indexOfLastPage = Math.ceil(currentPage / maxPages) * maxPages;
  const indexOfFirstPage = indexOfLastPage - maxPages + 1;
  const displayPages = pageNumbers.slice(indexOfFirstPage - 1, indexOfLastPage);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-grow overflow-y-auto">
        <table className="table-fixed w-full border h-full table-zebra">
          <thead>
            <tr className="border font-normal text-[15px] text-blue-700">
              <th className="border">#</th>
              <th className="border">Серийный номер</th>
              <th className="border">Версия апплета</th>
              <th className="border">FMO/FM</th>
              <th className="border">Статус</th>
              <th className="border"></th>
              <th className="border"></th>
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
              <th className="border"></th>
              <th className="border"></th>
              <th className="border"></th>
            </tr>
          </thead>
          <tbody className="text-[12px]">
            {currentRows.map((row) => (
              <tr className="border h-12" key={row.id}>
                <th className="border">{row.id}</th>
                <td className="border">{row.serialNumber}</td>
                <td className="border">{row.appletVersion}</td>
                <td className="border">{row.returnedFmoFm}</td>
                <td className="border">{row.status}</td>
                <td className="border w-7">
                  <button
                    onClick={() => handleToggleStatus(row.id)}
                    className="mx-auto my-auto py-2 active:scale-90 transition duration-300 hover:bg-blue-700 flex bg-primary rounded-md text-white px-3"
                  >
                    Актив/Деактив
                  </button>
                </td>
                <td className="border w-7">
                  <button
                    onClick={() => handleProfileClick(row)}
                    className="mx-auto my-auto py-2 active:scale-90 transition duration-300 hover:bg-blue-700 flex bg-primary rounded-md text-white px-3"
                  >
                    Профиль
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination flex justify-center items-center py-4">
        <button
          onClick={() =>
            setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)
          }
          className={`mx-1 px-3 py-1 rounded-md ${
            currentPage === 1 ? "bg-gray-400" : "bg-blue-500"
          } text-white`}
          disabled={currentPage === 1}
        >
          Предыдущая
        </button>
        {displayPages.map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={`mx-1 px-3 py-1 rounded-md ${
              currentPage === page ? "bg-blue-700 text-white" : "bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage(
              currentPage < totalPages ? currentPage + 1 : currentPage
            )
          }
          className={`mx-1 px-3 py-1 rounded-md ${
            currentPage === totalPages ? "bg-gray-400" : "bg-blue-500"
          } text-white`}
          disabled={currentPage === totalPages}
        >
          Следующая
        </button>
      </div>
    </div>
  );
};

export default Application;
