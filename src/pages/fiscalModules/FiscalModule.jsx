import React, { useState, useEffect } from "react";
import Pagination from "../../components/pagination/Pagination";
import FilterRow from "../../components/filterRow/FilterRow";
import Loading from "../../Loading";
import { useSelector } from "react-redux";
import axios from "axios";
import Toast from "../../others/toastNotification/Toast";
import useFetchPartners from "../../components/useFetchPartners/useFetchPartners";
import PostExcel from "../../others/PostExcel/PostExcel";

const FiscalModule = () => {
  const [filters, setFilters] = useState({
    factory_number: "",
    fiscal_number: "",
    partner: "",
  });

  const token = useSelector((state) => state.auth.accessToken);
  const userId = useSelector((state) => state.user.user.id);
  const isAdmin = useSelector((state) => state.user.user.is_admin);

  const [fiscal, setFiscal] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [isFetching, setIsFetching] = useState(true);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFiscal = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/fiscal-modules`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(true);

        if (response.status === 200 || response.status === 201) {
          let data = response.data;
          if (!isAdmin) {
            data = data.filter((obj) => obj.user_id === userId);
          }
          setFiscal(data);
          setFilteredData(data);
        } else {
          setMessage("Ошибка при получении данных!");
        }
      } catch (error) {
        setMessage("Ошибка при получении данных!");
      } finally {
        setIsFetching(false);
        setLoading(false);
      }
    };

    fetchFiscal();
  }, [token, isAdmin, userId]);

  const partners = useFetchPartners(fiscal);

  if (message) {
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  }

  useEffect(() => {
    if (fiscal.length) {
      const filtered = fiscal.filter((row) => {
        return (
          row.factory_number
            .toLowerCase()
            .includes(filters.factory_number.toLowerCase()) &&
          row.fiscal_number
            .toLowerCase()
            .includes(filters.fiscal_number.toLowerCase()) &&
          (partners[row.user_id]?.toLowerCase() || "").includes(
            filters.partner.toLowerCase()
          )
        );
      });

      const sortedFiltered = filtered.sort((a, b) => {
        return a.is_active === b.is_active ? 0 : a.is_active ? 1 : -1;
      });

      setFilteredData(sortedFiltered);
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

  if (loading || isFetching) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto flex flex-col px-4">
      {message && <Toast message={message} error={true} />}
      {!loading && !message && (
        <div className="flex-grow overflow-y-auto">
          {fiscal.length || isAdmin ? (
            <>
              <div className="my-3">
                <PostExcel filename={"Фискальные модули"} tableData={fiscal} />
              </div>
              <table className="table table-md table-zebra border w-full h-full">
                <thead>
                  <tr className="border font-normal text-[14px] text-blue-700">
                    <th className="border w-2" rowSpan={2}>
                      #
                    </th>
                    <th className="border">Заводской номер кассы</th>
                    <th className="border">
                      Серийный номер фискального модуля
                    </th>
                    <th className="border text-center">Партнер</th>
                    <th className="border text-center text-[17px]" rowSpan={2}>Статус</th>
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
                      <td className="border">
                        {partners[row.user_id] || (
                          <div className="h-full flex items-center justify-center">
                            <span className="loading loading-spinner loading-sm"></span>
                          </div>
                        )}
                      </td>
                      <td className="border text-center font-semibold">
                        {row.is_active ? (
                          <span className="text-green">
                            Активный
                          </span>
                        ) : (
                          <span className="text-error">
                            Не активный
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <div>
              <p className="flex justify-center items-center h-screen text-xl font-semibold text-red-600">
                Нет данных
              </p>
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
