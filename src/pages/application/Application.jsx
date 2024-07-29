import React, { useState, useEffect } from "react";
import useFetch from "../../components/useFetch/useFetch";
import Pagination from "../../components/pagination/Pagination";
import FilterRow from "../../components/filterRow/FilterRow";
import Toast from "../../others/toastNotification/Toast";

const Application = () => {
  const [filters, setFilters] = useState({
    inn: "",
    company_name: "",
    address: "",
    assembly_number: "",
    module_number: "",
    cash_register_number: "",
    last_request_date: "",
    database_update_date: "",
  });

  const { data, loading, error } = useFetch("terminal");

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
          row.company_name
            .toLowerCase()
            .includes(filters.company_name.toLowerCase()) &&
          row.address.toLowerCase().includes(filters.address.toLowerCase()) &&
          row.assembly_number
            .toLowerCase()
            .includes(filters.assembly_number.toLowerCase()) &&
          row.module_number
            .toLowerCase()
            .includes(filters.module_number.toLowerCase()) &&
          row.cash_register_number
            .toLowerCase()
            .includes(filters.cash_register_number.toLowerCase()) &&
          row.last_request_date
            .toLowerCase()
            .includes(filters.last_request_date.toLowerCase()) &&
          row.database_update_date
            .toLowerCase()
            .includes(filters.database_update_date.toLowerCase())
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
      {error && <Toast error={error.message} />}
      {!loading && !error && (
        <div className="flex-grow overflow-y-auto">
          <table className="table table-md table-zebra border w-full h-full text-xs">
            <thead>
              <tr className="border font-normal text-[15px] text-blue-700">
                <th className="border" rowSpan={2}>
                  #
                </th>
                <th className="border">ИНН</th>
                <th className="border">Название компании</th>
                <th className="border">Адрес</th>
                <th className="border">Номер сборки</th>
                <th className="border">Номер модуля</th>
                <th className="border">Номер кассы</th>
                <th className="border">Дата последнего запроса</th>
                <th className="border">Дата обновления базы</th>
                <th className="border text-center" rowSpan={2}>Статус</th>
              </tr>
                  <FilterRow
                    filters={filters}
                    handleFilterChange={handleFilterChange}
                  />  
            </thead>
            <tbody className="text-[6px]">
              {currentRows.map((row) => (
                <tr className="border h-12 text-center" key={row.id}>
                  <th className="border">{row.id}</th>
                  <td className="border">{row.inn}</td>
                  <td className="border">{row.company_name}</td>
                  <td className="border">{row.address}</td>
                  <td className="border">{row.assembly_number}</td>
                  <td className="border">{row.module_number}</td>
                  <td className="border">{row.cash_register_number}</td>
                  <td className="border">{row.last_request_date}</td>
                  <td className="border">{row.database_update_date}</td>
                  <td className="border w-7">
                    <button className=" mx-auto my-auto py-2 active:scale-90 transition duration-300 hover:bg-blue-700 flex bg-primary rounded-md text-white px-3">
                      {row.status === "true" ? "Активный" : "Не активный"}
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

export default Application;
