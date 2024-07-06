import React, { useState, useEffect } from "react";
import { IoLogOut } from "react-icons/io5";
import { RiArrowGoBackLine } from "react-icons/ri";
import { FaBoxArchive, FaPen, FaLocationDot } from "react-icons/fa6";

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
              <th className="border">ИНН</th>
              <th className="border">ПИНФЛ</th>
              <th className="border">Название кассы</th>
              <th className="border">Онлайн КХМ</th>
              <th className="border">Фискальный модуль</th>
              <th className="border">2D сканер</th>
              <th className="border">МХК коди хато чеклар сони</th>
              <th className="border">Сумма</th>
              <th className="border">Дата последнего чека</th>
              <th className="border">Cтатус</th>
              <th className="border">Просмотр</th>
              <th className="border w-10"></th>
              <th className="border w-10"></th>
              <th className="border w-10"></th>
              <th className="border w-10"></th>
              <th className="border w-10"></th>
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
          <tbody className="text-[12px]">
            {currentRows.map((row) => (
              <tr className="border h-12" key={row.id}>
                <th className="border">{row.id}</th>
                <td className="border">{row.serialNumber}</td>
                <td className="border">{row.appletVersion}</td>
                <td className="border">{row.cto}</td>
                <td className="border">{row.inn}</td>
                <td className="border">{row.statusOnCash}</td>
                <td className="border">{row.status}</td>
                <td className="border">{row.returnedFmoFm}</td>
                <td className="border">{row.returnedFmoFm}</td>
                <td className="border">{row.returnedFmoFm}</td>
                <td className="border">{row.returnedFmoFm}</td>
                <td className="border"><button className=" mx-auto my-auto py-2 active:scale-90 transition duration-300 hover:bg-blue-700 flex bg-primary rounded-md text-white px-3">Просмотр</button></td>
                <td className="border w-10">
                  <div className="bg-red-500 rounded-md p-3 flex items-center justify-center">
                    <IoLogOut className="text-white" />
                  </div>
                </td>
                <td className="border w-10">
                  <div className="bg-blue-500 rounded-md py-3 flex items-center justify-center">
                    <RiArrowGoBackLine className="text-white" />
                  </div>
                </td>
                <td className="border w-10">
                  <div className="bg-blue-500 rounded-md py-3 flex items-center justify-center">
                    <FaBoxArchive className="text-white " />
                  </div>
                </td>
                <td className="border">
                  <FaPen className="text-blue-500 size-4 mx-auto" />
                </td>
                <td className="border">
                  <FaLocationDot className="text-blue-500 size-4 mx-auto" />
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
            currentPage === totalPages ? "bg-gray-300" : "bg-white text-black"
          }`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Application;
