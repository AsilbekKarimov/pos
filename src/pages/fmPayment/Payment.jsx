import React, { useState, useEffect } from "react";
import Pagination from "../../components/pagination/Pagination";
import useFetch from "../../components/useFetch/useFetch";
import FilterRow from "../../components/filterRow/FilterRow";
import Toast from "../../others/toastNotification/Toast";
import AddPartnerModal from "../../components/AddPartnerModal/AddPartnerModal";

const Payment = () => {
  const [filters, setFilters] = useState({
    inn: "",
    username: "",
    is_active: "",
  });

  const { data, loading, error } = useFetch("users");

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
          row.inn.toLowerCase().includes(filters.inn.toLowerCase()) &&
          row.username.toLowerCase().includes(filters.username.toLowerCase()) &&
          row.is_active
            .toString()
            .toLowerCase()
            .includes(filters.is_active.toLowerCase())
        );
      });
      setFilteredData(filtered);
      setCurrentPage(1);
    }
  }, [filters, data]);

  const handleToggleStatus = (id) => {
    setFilteredData((prevData) =>
      prevData.map((row) =>
        row.id === id
          ? {
              ...row,
              status: row.status === "Активный" ? "Не Активный" : "Активный",
            }
          : row
      )
    );
  };

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
      {error && <Toast error={error.message} />}
      {!loading && !error && (
        <div className="flex-grow overflow-y-auto">
          <table className="table table-md table-zebra border w-full h-full">
            <thead>
              <tr className="border font-normal text-[15px] text-blue-700">
                <th className="border" rowSpan={2}>
                  #
                </th>
                <th className="border">ИНН</th>
                <th className="border">Название компании</th>
                <th className="border">Cтатус</th>
                <th className="border" rowSpan={2} colSpan={2}>
                  <AddPartnerModal />
                </th>
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
                  <td className="border">{row.inn}</td>
                  <td className="border">{row.username}</td>
                  <td className="border w-7">
                    <button
                      onClick={() => handleToggleStatus(row.id)}
                      className={`mx-auto flex justify-center my-auto py-2 active:scale-90 transition duration-300 w-32 ${
                        row.status === "Активный"
                          ? "bg-red-500 hover:bg-red-700"
                          : "bg-green-500 hover:bg-green-700"
                      } flex rounded-md text-white px-3`}
                    >
                      {row.status === "Активный"
                        ? "Деактивировать"
                        : "Активировать"}
                    </button>
                  </td>
                  <td className="border w-7">
                    <button className="mx-auto my-auto py-2 active:scale-90 transition duration-300 hover:bg-blue-700 flex bg-primary rounded-md text-white px-3">
                      Профиль
                    </button>
                  </td>
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

export default Payment;
