import React, { useState, useEffect } from "react";
import useFetch from "../../components/useFetch/useFetch";
import Pagination from "../../components/pagination/Pagination";
import FilterRow from "../../components/filterRow/FilterRow";
import Toast from "../../others/toastNotification/Toast";
import Button from "../../others/Button/Button";
import Loading from "../../Loading";
import useFetchPartners from "../../components/useFetchPartners/useFetchPartners";
import PostExcel from "../../others/PostExcel/PostExcel";

const Application = () => {
  const [filters, setFilters] = useState({
    inn: "",
    company_name: "",
    address: "",
    assembly_number: "",
    module_number: "",
    cash_register_number: "",
    free_record_balance: "",
    last_request_date: "",
    database_update_date: "",
    partner: "",
  });

  const { data, loading, errors } = useFetch("terminals", "");

  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [error, setError] = useState(null);

  const partners = useFetchPartners(data);

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  if (error) {
    setError(errors.message);
    setTimeout(() => {
      setError(null);
    }, 3000);
  }

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
          row.free_record_balance
            .toString()
            .toLowerCase()
            .includes(filters.free_record_balance.toLowerCase()) &&
          row.last_request_date
            .toLowerCase()
            .includes(filters.last_request_date.toLowerCase()) &&
          row.database_update_date
            .toLowerCase()
            .includes(filters.database_update_date.toLowerCase()) &&
          (partners[row.user_id]?.toLowerCase() || "").includes(
            filters.partner.toLowerCase()
          )
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col px-2">
      <div className="my-3">
      <PostExcel filename={"Терминалы"} tableData={data} />
      </div>
      {error && <Toast message={error.message} error={true} />}
      {!loading && !error && (
        <div className="flex-grow w-full overflow-x-auto">
          <table className="table table-sm table-zebra">
            <thead>
              <tr className="border font-normal text-[14px] text-blue-700">
                <th className="border w-2" rowSpan={2}>
                  #
                </th>
                <th className="border text-center">ИНН</th>
                <th className="border text-center">Название компании</th>
                <th className="border text-center">Адрес</th>
                <th className="border text-center">Номер сборки</th>
                <th className="border text-center">Номер модуля</th>
                <th className="border text-center">Номер кассы</th>
                <th className="border text-center">Остаток записей</th>
                <th className="border text-center">Дата последнего запроса</th>
                <th className="border text-center">Дата обновления базы</th>
                <th className="border text-center">Партнер</th>
                <th className="border text-center" rowSpan={2}>
                  Статус
                </th>
              </tr>
              <FilterRow
                filters={filters}
                handleFilterChange={handleFilterChange}
              />
            </thead>
            <tbody className="text-[5px]">
              {currentRows.map((row, index) => (
                <tr className="border h-12" key={row.id}>
                  <th className="border">{index + 1 + indexOfFirstRow}</th>
                  <td className="border">{row.inn}</td>
                  <td className="border">{row.company_name}</td>
                  <td className="border">{row.address}</td>
                  <td className="border">{row.assembly_number}</td>
                  <td className="border">{row.module_number}</td>
                  <td className="border">{row.cash_register_number}</td>
                  <td className="border">{row.free_record_balance}</td>
                  <td className="border">{row.last_request_date}</td>
                  <td className="border">{row.database_update_date}</td>
                  <td className="border">
                    {partners[row.user_id] || (
                      <div className="h-full flex items-center justify-center">
                        <span className="loading loading-spinner loading-sm"></span>
                      </div>
                    )}
                  </td>
                  <td className="border">
                    <Button
                      row={row}
                      setFilteredData={setFilteredData}
                      rolls="terminals"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {filteredData.length > rowsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Application;
