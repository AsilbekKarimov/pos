import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Toast from "../../others/toastNotification/Toast";
import useFetch from "../useFetch/useFetch";

const ProfileModal = ({ id }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [fiscalInfo, setFiscalInfo] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [toastError, setToastError] = useState(null);
  const token = useSelector((state) => state.auth.accessToken);

  const {
    data: userData,
    loading: userLoading,
    errors: userErrors,
  } = useFetch("users", id);
  const {
    data: fiscalData,
    loading: fiscalLoading,
    errors: fiscalErrors,
  } = useFetch("fiscal", id);

  useEffect(() => {
    if (userData) {
      setUserInfo(userData);
    }
    if (fiscalData) {
      setFiscalInfo(fiscalData);
    }
  }, [userData, fiscalData]);

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
        closeModal();
        setToastMessage("Партнер успешно удален!");
        setToastError(false);
      } else {
        setToastMessage(
          "Произошла ошибка при удалении данных. Повторите попытку!"
        );
        setToastError(true);
      }
    } catch (error) {
      setToastMessage(
        "Произошла ошибка при удалении данных. Повторите попытку!"
      );
      setToastError(true);
    }
  };

  const openModal = () => {
    document.getElementById(`profile_modal_${id}`).showModal();
  };

  const closeModal = () => {
    document.getElementById(`profile_modal_${id}`).close();
  };

  return (
    <div>
      <button
        className="mx-auto my-auto py-2 active:scale-90 transition duration-300 hover:bg-blue-700 flex bg-primary rounded-md text-white px-3"
        onClick={openModal}
      >
        Профиль
      </button>
      <dialog id={`profile_modal_${id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
          </form>
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
                      <td>Фискальная информация</td>
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
                <button
                  onClick={fetchDelete}
                  className="btn btn-error text-red-800"
                >
                  Удалить
                </button>
                <button className="btn btn-neutral" onClick={closeModal}>
                  Закрыть
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              Нет данных пользователя
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ProfileModal;
