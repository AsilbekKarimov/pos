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

const Payment = () => {
  const [filters, setFilters] = useState({
    inn: "",
    username: "",
    is_active: "",
  });
  const { data, loading, error } = useFetch("users", "");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

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
    setFilteredData((prevFilteredData) => [...prevFilteredData, newPartner]);
  };

  const handleUpdateUser = (updatedUser) => {
    setFilteredData((prevFilteredData) => {
      const updatedFilteredData = prevFilteredData.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      return updatedFilteredData;
    });
  };

  const handleDeleteUser = (userId) => {
    setFilteredData((prevFilteredData) =>
      prevFilteredData.filter((user) => user.id !== userId)
    );
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto flex flex-col px-4">
      {error && <Toast message={error.message} error={true} />}
      {!loading && !error && (
        <div className="flex-grow overflow-y-auto">
          <div className="w-full flex items-end justify-between my-3">
            <PostExcel/>
            <AddPartnerModal onAddPartner={handleAddPartner} />
          </div>
          <table className="table table-md table-zebra border w-full h-full">
            <thead>
              <tr className="border font-normal text-[15px] text-blue-700">
                <th className="border w-2" rowSpan={2}>
                  #
                </th>
                <th className="border">ИНН</th>
                <th className="border">Название компании</th>
                <th className="border">Cтатус</th>
                <th className="border text-center" colSpan={3}>
                  Действия
                </th>
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
                      onDeleteUser={handleDeleteUser}
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
