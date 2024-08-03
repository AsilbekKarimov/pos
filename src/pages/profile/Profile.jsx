import React, { useState, useEffect } from "react";
import Pagination from "../../components/pagination/Pagination";
import useFetch from "../../components/useFetch/useFetch";
import FilterRow from "../../components/filterRow/FilterRow";
import Toast from "../../others/toastNotification/Toast";
import AddPartnerModal from "../../components/AddPartnerModal/AddPartnerModal";
import Loading from "../../Loading";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal/DeleteConfirmationModal";

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
  };

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  const handleDelete = () => {
    setFilteredData((prevFilteredData) => prevFilteredData.filter((user) => user.id !== userToDelete.id));
    closeDeleteModal();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto flex flex-col px-4">
      {error && <Toast error={error.message} />}
      {!loading && !error && (
        <div className="flex-grow overflow-y-auto">
          <div className="w-full flex items-end justify-end my-3">
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
                <th className="border">Actions</th>
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
                    <button onClick={() => openDeleteModal(row)} className="btn btn-danger">
                      Delete
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
