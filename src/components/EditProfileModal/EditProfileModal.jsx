import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import Toast from "../../others/toastNotification/Toast";

const EditProfileModal = ({ user, onUpdateUser, onDeleteUser }) => {
  const [formData, setFormData] = useState({
    inn: user.inn || "",
    username: user.username || "",
    password: "",
    is_active: user.is_active || false,
    is_admin: user.is_admin || false,
  });
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  const token = useSelector((state) => state.auth.accessToken);
  const id = user.id; // Extracting the user ID

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setError(false);
        setMessage(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleModalClose = () => {
    document.getElementById(`edit_modal_${id}`).close();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      ...formData,
      password: formData.password || undefined, // Only send password if it's not empty
    };

    try {
      const response = await axios.put(
        `https://newnewterminal.onrender.com/api/users/${id}`, // Using id here
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      setMessage("Профиль успешно обновлен!");
      setError(false);
      onUpdateUser(response.data);
      handleModalClose();
    } catch (error) {
      setMessage("Произошла ошибка при обновлении профиля. Повторите попытку!");
      setError(true);
      console.error("Error details:", error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://newnewterminal.onrender.com/api/users/${id}`, // Using id here
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      setMessage("Пользователь успешно удален!");
      setError(false);
      onDeleteUser(id);
      handleModalClose();
    } catch (error) {
      setMessage("Произошла ошибка при удалении пользователя. Повторите попытку!");
      setError(true);
      console.error("Error details:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      {message && <Toast message={message} error={error} />}
      <div className="flex justify-between gap-2">
        <button
          className="px-2 py-2 border-2 bg-primary border-primary text-white rounded-md"
          onClick={() =>
            document.getElementById(`edit_modal_${id}`).showModal()
          }
        >
          <MdEdit />
        </button>
        <button
          className="px-2 py-2 border-2 bg-error border-error text-white rounded-md"
          onClick={handleDelete}
        >
          <MdDelete />
        </button>
      </div>
      <dialog id={`edit_modal_${id}`} className="modal">
        <div className="modal-box bg-white">
          <form onSubmit={handleSubmit} className="p-3">
            <button
              type="button"
              className="btn btn-sm btn-circle text-black btn-ghost absolute right-2 top-2"
              onClick={handleModalClose}
            >
              ✕
            </button>
            <div className="flex flex-col">
              <label className="font-semibold mb-3 text-black">ИНН</label>
              <input
                type="text"
                name="inn"
                value={formData.inn}
                onChange={handleChange}
                required
                className="py-2 pl-2 bg-white border border-gray-700 text-black rounded-s-sm max-w-[100%] w-full"
              />
            </div>
            <div className="text-black mt-3">
              <div className="flex gap-[10%] justify-center mt-4 mb-4">
                <label className="cursor-pointer flex gap-2 items-center">
                  <span className="label-text">Активен</span>
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="checkbox checkbox-primary"
                  />
                </label>

                <label className="cursor-pointer flex gap-2 items-center">
                  <span className="label-text">Админ</span>
                  <input
                    type="checkbox"
                    name="is_admin"
                    checked={formData.is_admin}
                    onChange={handleChange}
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>

              <div className="flex flex-col mb-3">
                <label className="font-semibold">Логин</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="py-2 pl-2 mt-1 bg-white border border-gray-700 text-black rounded-sm max-w-[100%] w-full"
                />
              </div>

              <div className="flex flex-col mb-3">
                <label className="font-semibold">Пароль</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="py-2 pl-2 mt-1 bg-white border border-gray-700 text-black rounded-sm max-w-[100%] w-full"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-7 py-2 bg-emerald-400 text-white mt-8 rounded-lg"
                >
                  Обновить
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default EditProfileModal;
