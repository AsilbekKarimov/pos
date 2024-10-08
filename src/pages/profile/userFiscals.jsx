import React, { useState, useEffect } from "react";
import Pagination from "../../components/pagination/Pagination";
import FilterRow from "../../components/filterRow/FilterRow";
import Loading from "../../Loading";
import { useSelector } from "react-redux";
import axios from "axios";
import Toast from "../../others/toastNotification/Toast";
import DeleteConfimModal from "../../components/DeleteConfirmModal/DeleteConfimModal";
import AddFiscalModuleButton from "../../components/AddFiscalModuleButton/AddFiscal";

const UserFiscals = () => {
  const [filters, setFilters] = useState({
    factory_number: "",
    fiscal_number: "",
  });

  const token = useSelector((state) => state.auth.accessToken);
  const profileId = useSelector((state) => state.user.profileId);

  const [fiscal, setFiscal] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [isFetching, setIsFetching] = useState(true);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
          const data = response.data.filter(
            (obj) => obj.user_id === Number(profileId)
          );

          setFiscal(data);
          setFilteredData(data);
        } else {
          setMessage("Ошибка при получении данных!");
          setError(true);
        }
      } catch (error) {
        setMessage("Ошибка при получении данных!");
        setError(true);
      } finally {
        setIsFetching(false);
        setLoading(false);
      }
    };

    fetchFiscal();
  }, [token, profileId]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    if (fiscal.length) {
      const filtered = fiscal.filter((row) => {
        const factoryNumber = row.factory_number || "";
        const fiscalNumber = row.fiscal_number || "";

        return (
          factoryNumber
            .toLowerCase()
            .includes(filters.factory_number.toLowerCase()) &&
          fiscalNumber
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

  const onDeleteFiscal = (id) => {
    setFiscal((prevFiscal) => {
      const updatedFiscal = prevFiscal.filter((item) => item.id !== id);
      setFilteredData((prevFilteredData) =>
        prevFilteredData.filter((item) => item.id !== id)
      );
      const isCurrentPageEmpty =
        updatedFiscal.slice(indexOfFirstRow, indexOfLastRow).length === 0;
      if (isCurrentPageEmpty && currentPage > 1) {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
      }
      return updatedFiscal;
    });
  };

  const handleAddFiscal = (newFiscal) => {
    setFilteredData((prevFilteredData) => {
      const updatedFilteredData = [...prevFilteredData, newFiscal];
      return updatedFilteredData;
    });
  };

  if (loading || isFetching) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto flex flex-col px-4">
      {message && <Toast message={message} error={error} />}
      {!loading && (
        <div className="flex-grow overflow-y-auto">
          <div className="w-full flex items-end justify-between my-3">
            <AddFiscalModuleButton onAdd={handleAddFiscal} />
          </div>
          {fiscal.length || filteredData.length ? (
            <table className="table table-md table-zebra border w-full h-full">
              <thead>
                <tr className="border font-normal text-[14px] text-blue-700">
                  <th className="border w-2" rowSpan={2}>
                    #
                  </th>
                  <th className="border">Заводской номер кассы</th>
                  <th className="border">Серийный номер фискального модуля</th>
                  <th className="border" rowSpan={2}>
                    Удаление
                  </th>
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
                    <td className="border w-5 text-center">
                      <DeleteConfimModal
                        id={row.id}
                        onDeletePartner={onDeleteFiscal}
                        confirmText={
                          "Вы точно хотите удалить этот фискальный модуль?"
                        }
                        url={"fiscal-modules"}
                        setMessage={setMessage}
                        setError={setError}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default UserFiscals;
