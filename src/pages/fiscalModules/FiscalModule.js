<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://verified-gorilla-yearly.ngrok-free.app/swagger/index.html#/auth/post_auth_login");

        // Проверяем, если ответ является HTML-страницей
        if (typeof response.data === 'string' && response.data.includes('<!DOCTYPE html>')) {
          throw new Error('Received HTML response instead of JSON');
        }

        // Проверка на структуру данных
        if (!Array.isArray(response.data)) {
          throw new Error('Expected an array of data');
        }
=======
import React, { useState, useEffect } from "react";
import useFetch from "../../components/useFetch/useFetch";
import Pagination from "./Pagination";

const FiscalModule = () => {
  const [filters, setFilters] = useState({
    factory_number: "",
    fiscal_number: "",
  });

  const { data, loading, error } = useFetch("fiscal");

  console.log("Response fiscal data: ", data);

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
>>>>>>> 153a31eca5a96bbd7d2c997791ca13c7ac579136

        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
<<<<<<< HEAD
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
=======
    <div className="overflow-x-auto flex flex-col px-4">
      {loading && (
        <div className="flex justify-center items-center h-full w-full">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
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
                </tr>
                <tr className="border">
                  <th></th>
                  <th className="border">
                    <input
                      name="factory_number"
                      value={filters.factory_number}
                      onChange={handleFilterChange}
                      className="w-full border-2 border-slate-500 p-1 outline-none rounded-md"
                    />
                  </th>
                  <th className="border">
                    <input
                      name="fiscal_number"
                      value={filters.fiscal_number}
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
                    <td className="border">{row.factory_number}</td>
                    <td className="border">{row.fiscal_number}</td>
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
>>>>>>> 153a31eca5a96bbd7d2c997791ca13c7ac579136
  );
};

export default DataTable;
