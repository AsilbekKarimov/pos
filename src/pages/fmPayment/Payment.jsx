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
import { BsPinAngle, BsPinAngleFill } from 'react-icons/bs';

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
  const [pinnedItems, setPinnedItems] = useState(new Set());

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

      const sortedFilteredData = filtered
        .map((item) => ({
          ...item,
          isPinned: pinnedItems.has(item.id),
        }))
        .sort((a, b) => b.isPinned - a.isPinned);

      setFilteredData(sortedFilteredData);
      setCurrentPage(1);
    }
  }, [filters, data, pinnedItems]);

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

  const handlePinItem = (id) => {
    setPinnedItems((prevPinnedItems) => {
      const newPinnedItems = new Set(prevPinnedItems);
      if (newPinnedItems.has(id)) {
        newPinnedItems.delete(id);
      } else {
        newPinnedItems.add(id);
      }
      return newPinnedItems;
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
                  <td className="border w-5">
                    <ProfileButton id={row.id} className="h-8" />
                  </td>
                  <td className="border w-5 text-center">
                    <button
                      className="btn btn-primary text-white h-8 flex items-center justify-center"
                      onClick={() => handlePinItem(row.id)}
                    >
                      {pinnedItems.has(row.id) ? (
                        <BsPinAngleFill size={20} />
                      ) : (
                        <BsPinAngle size={20} />
                      )}
                    </button>
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
