import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Toast from "../../others/toastNotification/Toast";
import AddPartnerModal from "../../components/AddPartnerModal/AddPartnerModal";
import ProfileModal from "../../components/ProfileModal/ProfileModal";
import Pagination from "../../components/pagination/Pagination";
import FilterRow from "../../components/filterRow/FilterRow";
import Button from "../../others/Button/Button";

const Payment = () => {
  const [filters, setFilters] = useState({
    inn: "",
    username: "",
    is_active: "",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const token = useSelector((state) => state.auth.accessToken);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://newterminal.onrender.com/api/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      setFilteredData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

      filtered.sort((a, b) => a.id - b.id);

      setFilteredData(filtered);
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
    console.log("Adding new partner:", newPartner);
    setData((prevData) => {
      const updatedData = [...prevData, newPartner];
      updatedData.sort((a, b) => a.id - b.id); // сортировка данных
      console.log("Updated data:", updatedData);
      return updatedData;
    });
    setFilteredData((prevFilteredData) => {
      const updatedFilteredData = [...prevFilteredData, newPartner];
      updatedFilteredData.sort((a, b) => a.id - b.id); // сортировка фильтрованных данных
      console.log("Updated filtered data:", updatedFilteredData);
      return updatedFilteredData;
    });
  };

  const handleDeletePartner = async (id) => {
    try {
      const response = await axios.delete(
        `https://newterminal.onrender.com/api/users/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setData((prevData) => {
          const updatedData = prevData.filter((item) => item.id !== id);
          console.log("Updated data after delete:", updatedData);
          return updatedData;
        });
        setFilteredData((prevFilteredData) => {
          const updatedFilteredData = prevFilteredData.filter((item) => item.id !== id);
          console.log("Updated filtered data after delete:", updatedFilteredData);
          return updatedFilteredData;
        });
      } else {
        console.error("Failed to delete partner:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="overflow-x-auto flex flex-col px-4">
      {loading && (
        <div className="min-h-screen flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
      {error && <Toast error={error.message} />}
      {!loading && !error && (
        <div className="flex-grow overflow-y-auto">
          <table className="table table-md table-zebra border w-full h-full">
            <thead>
              <tr className="border font-normal text-[15px] text-blue-700">
                <th className="border" rowSpan={2}>
                  #
                </th>
                <th className="border">ИНН</th>
                <th className="border">Название компании</th>
                <th className="border">Cтатус</th>
                <th className="border" rowSpan={2} colSpan={2}>
                  <AddPartnerModal onAddPartner={handleAddPartner} />
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
                  <th className="border">{row.id}</th>
                  <td className="border">{row.inn}</td>
                  <td className="border">{row.username}</td>
                  <td className="border w-7">
                    <Button row={row} setFilteredData={setFilteredData} rolls='users' />
                  </td>
                  <td className="border w-7">
                    <ProfileModal id={row.id} onDeletePartner={handleDeletePartner} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {filteredData.length > rowsPerPage ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          setCurrentPage={setCurrentPage}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Payment;
