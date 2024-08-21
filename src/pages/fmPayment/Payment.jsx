import React, { useState, useEffect } from "react";
import Toast from "../../others/toastNotification/Toast";
import ProfileButton from "../../components/ProfileButton/ProfileButton";
import Pagination from "../../components/pagination/Pagination";
import FilterRow from "../../components/filterRow/FilterRow";
import Button from "../../others/Button/Button";
import Loading from "../../Loading";
import useFetch from "../../components/useFetch/useFetch";
import AddPartnerModal from "../../components/AddPartnerModal/AddPartnerModal";
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal";
import PostExcel from "../../others/PostExcel/PostExcel";
import DeleteConfimModal from "../../components/DeleteConfirmModal/DeleteConfimModal";
import { useSelector } from "react-redux";
import { MdDeleteForever, MdEdit } from "react-icons/md";

const Payment = () => {
  const [filters, setFilters] = useState({
    inn: "",
    username: "",
    is_active: "",
  });
  const { data, loading, errors } = useFetch("users", "");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const userId = useSelector((state) => state.user.user.id);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((row) => {
        const statusText = row.is_active ? "Активный" : "Не активный";
        return (
          row.inn.toLowerCase().includes(filters.inn.toLowerCase()) &&
          row.username.toLowerCase().includes(filters.username.toLowerCase()) &&
          statusText
            .toLocaleLowerCase()
            .includes(filters.is_active.toLocaleLowerCase())
        );
      });

      const sortedFiltered = filtered.sort((a, b) => {
        return a.is_active === b.is_active ? 0 : a.is_active ? 1 : -1;
      });

      setFilteredData(sortedFiltered);
      setCurrentPage(1);
    }
  }, [filters, data]);

  useEffect(() => {
    if (errors) {
      setMessage("Произошла ошибка при получении данных. Повторите попытку!");
      setError(true);
    }
  }, [errors]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

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

  const handleAddPartner = (newPartner) => {
    setFilteredData((prevFilteredData) => [...prevFilteredData, newPartner]);
  };

  const onDeletePartner = (id) => {
    setFilteredData((prevFilteredData) => {
      const updatedData = prevFilteredData.filter((item) => item.id !== id);
      const isCurrentPageEmpty =
        updatedData.slice(indexOfFirstRow, indexOfLastRow).length === 0;
      if (isCurrentPageEmpty && currentPage > 1) {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
      }
      return updatedData;
    });
  };

  const handleUpdateUser = (updatedUser) => {
    setFilteredData((prevFilteredData) => {
      const updatedFilteredData = prevFilteredData.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      return updatedFilteredData;
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col px-4">
      {message && <Toast message={message} error={error} />}
      {!loading && !error && (
        <div className="flex-grow overflow-y-auto">
          <div className="w-full flex items-end justify-between my-3 gap-5">
            <PostExcel filename={"Список Партнеров"} tableData={data} />
            <AddPartnerModal onAddPartner={handleAddPartner} />
          </div>
          <table className="table table-md table-zebra border w-full h-full overflow-x-auto">
            <thead>
              <tr className="border font-normal text-[15px] text-blue-700">
                <th className="border w-2" rowSpan={2}>
                  #
                </th>
                <th className="border">ИНН</th>
                <th className="border">Название компании</th>
                <th className="border">Cтатус</th>
                <th className="border text-center" colSpan={4} rowSpan={2}>
                  Действия
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
                  <td className="border">{row.inn}</td>
                  <td className="border">{row.username}</td>
                  {row.id === userId ? (
                    <>
                      <td className="border">
                        <button className="mx-auto rounded-md flex justify-center my-auto py-2 active:scale-90 transition duration-300 w-32 bg-gray-500 hover:bg-gray-700">
                          {row.is_active ? "Активный" : "Не активный"}
                        </button>
                      </td>
                      <td className="border w-5">
                        <button className="px-2 py-2 active:scale-90 transition duration-300 bg-gray-500 text-[30px] text-white rounded-md hover:bg-gray-700">
                          <MdEdit />
                        </button>
                      </td>
                      <td className="border w-2">
                        <button className="btn bg-gray-500 text-white text-[30px] active:scale-90 transition duration-300 hover:bg-gray-700 px-2 py-2 rounded-md">
                          <MdDeleteForever />
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border">
                        <Button
                          row={row}
                          setFilteredData={setFilteredData}
                          rolls="users"
                          className="h-8"
                        />
                      </td>
                      <td className="border w-5">
                        <EditProfileModal
                          user={row}
                          onUpdateUser={handleUpdateUser}
                          className="h-8"
                        />
                      </td>
                      <td className="border w-2">
                        <DeleteConfimModal
                          id={row.id}
                          confirmText={
                            "Вы точно хотите удалить этого аккаунт этого партнера?"
                          }
                          onDeletePartner={onDeletePartner}
                          url={"users"}
                          setMessage={setMessage}
                          setError={setError}
                          className="h-8"
                        />
                      </td>
                    </>
                  )}
                  <td className="border w-5">
                    <ProfileButton id={row.id} className="h-8" />
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

export default Payment;
