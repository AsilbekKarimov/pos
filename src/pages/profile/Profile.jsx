import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/pagination/Pagination";
import useFetch from "../../components/useFetch/useFetch";
import FilterRow from "../../components/filterRow/FilterRow";
import Toast from "../../others/toastNotification/Toast";
import AddPartnerModal from "../../components/AddPartnerModal/AddPartnerModal";
import Loading from "../../Loading";
import DeleteConfirmationModal from "../../others/DeleteModal/DeleteConfirmationModal";
import ConditionalLinkButton from "../../others/ProfileLinkButton/ConditionalLinkButton";
import { useSelector } from "react-redux";

const Profile = () => {
  const [filters, setFilters] = useState({
    inn: "",
    username: "",
    is_active: "",
  });
  const { data, loading, error } = useFetch("users", "");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const token = useSelector((state) => state.auth.accessToken);

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

      const numberedFiltered = filtered.map((row, index) => ({
        ...row,
        ordinalNumber: index + 1,
      }));

      setFilteredData(numberedFiltered);
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

  const handleAddPartner = (newPartner) => {
    setFilteredData((prevFilteredData) => {
      const updatedFilteredData = [...prevFilteredData, newPartner];
      return updatedFilteredData;
    });
    setToastMessage("Партнер успешно добавлен");
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  
  const handleDelete = async () => {
    if (!userToDelete) {
      console.error("No user selected for deletion");
      return;
    }

    const deleteUrl = `https://newnewterminal.onrender.com/api/users/${userToDelete.id}`;
    console.log("Deleting user:", userToDelete);
    console.log("Delete URL:", deleteUrl);

    try {

      
      const response = await axios.delete(deleteUrl,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ); 
      

      if (response.status === 200) {
        setFilteredData((prevFilteredData) =>
          prevFilteredData.filter((user) => user.id !== userToDelete.id)
        );
        setToastMessage("Пользователь успешно удален");
      } else {
        throw new Error("Ошибка при удалении пользователя");
      }
    } catch (error) {
      console.error("Ошибка:", error);

      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Request data:", error.request);
      } else {
        // Something happened in setting up the request
        console.error("Error message:", error.message);
      }

      setToastMessage("Ошибка при удалении пользователя");
    } finally {
      closeDeleteModal();
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto flex flex-col px-4">
      {error && <Toast error={error.message} />}
      {toastMessage && <Toast message={toastMessage} />}
      {!loading && !error && (
        <div className="flex-grow overflow-y-auto">
          <div className="w-full flex items-end justify-between my-3">
            <ConditionalLinkButton />
            <AddPartnerModal onAddPartner={handleAddPartner} />
          </div>
          <table className="table table-md table-zebra border w-full h-full">
            <thead>
              <tr className="border font-normal text-[15px] text-blue-700">
                <th className="border w-2" rowSpan={2}>
                  #
                </th>
                <th className="border">ИНН</th>
                <th className="border">Логин</th>
                <th className="border">Пароль</th>
                <th className="border">Действия</th>
              </tr>
              <FilterRow
                filters={filters}
                handleFilterChange={handleFilterChange}
              />
            </thead>
            <tbody className="text-[6px]">
              {currentRows.map((row) => (
                <tr className="border h-12" key={row.id}>
                  <th className="border">{row.ordinalNumber}</th>
                  <td className="border">{row.inn}</td>
                  <td className="border">{row.username}</td>
                  <td className="border w-7">*********</td>
                  <td className="border">
                    <button
                      onClick={() => openDeleteModal(row)}
                      className="btn btn-danger"
                    >
                      Удалить
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
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDelete}
        user={userToDelete}
      />
    </div>
  );
};

export default Profile;
