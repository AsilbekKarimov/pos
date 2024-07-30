import React, { useState, useEffect } from "react";
import useFetch from "../../components/useFetch/useFetch";
import Pagination from "../../components/pagination/Pagination";
import FilterRow from "../../components/filterRow/FilterRow";
import { useSelector } from "react-redux";
import axios from "axios";
import Toast from "../../others/toastNotification/Toast";

const FiscalModule = () => {
  const [filters, setFilters] = useState({
    factory_number: "",
    fiscal_number: "",
  });

  const { data, loading, error } = useFetch("fiscal", "");
  const token = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.user.user.id);
  const isAdmin = useSelector((state) => state.user.user.is_admin);

  const [fiscal, setFiscal] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [isFetching, setIsFetching] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `https://newterminal.onrender.com/api/fiscal`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        let data = response.data;
        if (!isAdmin) {
          data = data.filter((obj) => obj.user_id === userId);
        }
        setFiscal(data);
        setFilteredData(data);
      } else {
        console.log("Error fetching user data");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (data) {
      fetchUser();
    }
  }, [data]);

  useEffect(() => {
    if (fiscal.length) {
      const filtered = fiscal.filter((row) => {
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
  }, [filters, fiscal]);

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
      {loading || isFetching ? (
        <div className="min-h-screen flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="flex-grow overflow-y-auto">
          {fiscal.length || isAdmin ? (
            <table className="table table-md table-zebra border w-full h-full">
              <thead>
                <tr className="border font-normal text-[14px] text-blue-700">
                  <th className="border w-16" rowSpan={2}>#</th>
                  <th className="border">Заводской номер кассы</th>
                  <th className="border">Серийный номер фискального модуля</th>
                </tr>
                <FilterRow
                  filters={filters}
                  handleFilterChange={handleFilterChange}
                />
              </thead>
              <tbody className="text-[6px]">
                {currentRows.map((row, index) => (
                  <tr className="border h-12" key={row.id}>
                    <th className="border">{index + 1 + indexOfFirstRow}</th>
                    <td className="border">{row.factory_number}</td>
                    <td className="border">{row.fiscal_number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              <Toast message="У вас не имеется фискальных модулей!" error={true} />
              <p className="flex justify-center items-center h-screen text-xl font-semibold text-red-600">Нет данных</p>
            </div>
          )}
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

export default FiscalModule;
