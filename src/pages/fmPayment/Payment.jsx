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

  useEffect(() => {
    if (data) {
      const filtered = data.filter((row) => {
        const statusText = row.is_active ? "Активный" : "Не активный";
        return (
          row.inn.toLowerCase().includes(filters.inn.toLowerCase()) &&
          row.username.toLowerCase().includes(filters.username.toLowerCase()) &&
          statusText.toLocaleLowerCase().includes(filters.is_active.toLocaleLowerCase())
        );
      });

      const numberedFiltered = filtered.map((row, index) => ({
        ...row,
        ordinalNumber: index + 1,
      }));

      setFilteredData(numberedFiltered);
      setCurrentPage(1);
    }
  }, [filters, data]);

  if (errors) {
    setMessage("Произошла ошибка при получении данных. Повторите попытку!")
    setError(true)
  }

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
    setFilteredData((prevFilteredData) =>
      prevFilteredData.filter((item) => item.id !== id)
    );
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
          <div className="w-full flex items-end justify-between my-3">
            <PostExcel filename={"Список Партнеров"} tableData={data}/>
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
                <th className="border text-center" colSpan={3} rowSpan={2}>
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
                <tr className="border h-12" key={index}>
                  <th className="border">{index + 1 + indexOfFirstRow}</th>
                  <td className="border">{row.inn}</td>
                  <td className="border">{row.username}</td>
                  <td className="border">
                    <Button
                      row={row}
                      setFilteredData={setFilteredData}
                      rolls="users"
                    />
                  </td>
                  <td className="border w-5">
                    <EditProfileModal
                      user={row}
                      onUpdateUser={handleUpdateUser}
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
                    />
                  </td>
                  <td className="border w-5">
                    <ProfileButton id={row.id} />
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
