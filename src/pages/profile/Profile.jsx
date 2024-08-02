import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Toast from "../../others/toastNotification/Toast";
import useFetch from "../../components/useFetch/useFetch";

const Profile = () => {
  const { id } = useParams(); 
  const [userInfo, setUserInfo] = useState(null);
  const [fiscalInfo, setFiscalInfo] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastError, setToastError] = useState(null);
  const token = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();

  const {
    data: userData,
    loading: userLoading,
    error: userErrors,
  } = useFetch("users", id);
  const {
    data: fiscalData,
    loading: fiscalLoading,
    error: fiscalErrors,
  } = useFetch("fiscal", id);

  useEffect(() => {
    if (userErrors || fiscalErrors) {
      console.error("Error fetching data:", userErrors, fiscalErrors);
    }

    if (userData) {
      setUserInfo(userData);
      console.log("User Info:", userData);
    }
    if (fiscalData) {
      setFiscalInfo(fiscalData);
      console.log("Fiscal Info:", fiscalData);
    }
  }, [userData, fiscalData, userErrors, fiscalErrors]);

  const fetchDelete = async () => {
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
        setUserInfo(null);
        setFiscalInfo(null);
        navigate("/payment"); 
        setToastMessage("Партнер успешно удален!");
        setToastError(false);
      } else {
        setToastMessage("Произошла ошибка при удалении данных. Повторите попытку!");
        setToastError(true);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setToastMessage("Произошла ошибка при удалении данных. Повторите попытку!");
      setToastError(true);
    }
  };

  return (
    <div className="profile-page">
      {toastMessage && <Toast message={toastMessage} error={toastError} />}
      {userErrors || fiscalErrors ? (
        <div className="h-full flex items-center justify-center text-red-500">
          Произошла ошибка при получении данных. Повторите попытку!
        </div>
      ) : userLoading || fiscalLoading ? (
        <div className="h-full flex items-center justify-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : userInfo ? (
        <div>
          <table className="table w-full">
            <tbody>
              {fiscalInfo && (
                <tr>
                  <td>Фискальный номер</td>
                  <td>{fiscalInfo.fiscal_number}</td>
                </tr>
              )}
              <tr>
                <td>INN</td>
                <td>{userInfo.inn}</td>
              </tr>
              <tr>
                <td>Логин</td>
                <td>{userInfo.username}</td>
              </tr>
              <tr>
                <td>Пароль</td>
                <td>*********</td>
              </tr>
              <tr>
                <td>Статус</td>
                <td>{userInfo.is_active ? "Активный" : "Не активный"}</td>
              </tr>
              <tr>
                <td>Роль</td>
                <td>{userInfo.is_admin ? "Админ" : "Партнер"}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between w-full mt-7">
            <button onClick={fetchDelete} className="btn btn-error text-red-800">
              Удалить
            </button>
            <button className="btn btn-neutral" onClick={() => navigate(-1)}>
              Назад
            </button>
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center text-gray-500">
          Нет данных пользователя
        </div>
      )}
    </div>
  );
};

export default Profile;
