import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ProfileModal = ({ id }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.accessToken);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        `https://newterminal.onrender.com/api/users/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
        setUserInfo(response.data);
      } else {
        setError("Failed to get user info");
      }
    } catch (error) {
      setError("Error fetching user info");
    }
  };

  const fetchUserDelete = async () => {
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
        console.log(response.data);
        setUserInfo(response.data);
        closeModal()
      } else {
        setError("Failed to get user info");
      }
    } catch (error) {
      setError("Error fetching user info");
    }
  };

  const openModal = () => {
    fetchUserInfo();
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
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          {userInfo ? (
            <div className="overflow-x-auto">
              <table className="table w-full">
               
                <tbody>
                  <tr>
                    <td>Логин</td>
                    <td>{userInfo.username}</td>
                  </tr>
                  <tr>
                    <td>INN</td>
                    <td>{userInfo.inn}</td>
                  </tr>
                  <tr>
                    <td>Статус</td>
                    <td>{userInfo.is_active ? "Активный" : "Не активный"}</td>
                  </tr>
                  <tr>
                    <td>Роль</td>
                    <td>{userInfo.is_admin ? "Админ" : "Не админ"}</td>
                  </tr>
                  <tr>
                    <td>Пароль</td>
                    <td>{userInfo.password}</td>
                  </tr>
                </tbody>
              </table>
              <div className="flex justify-between w-full mt-7">
                <button onClick={fetchUserDelete} className="btn btn-error text-red-800">Удалить</button>
                <button className="btn btn-neutral" onClick={closeModal}>Закрыть</button>
              </div>
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <p className="font-semibold text-center">Loading...</p>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ProfileModal;
