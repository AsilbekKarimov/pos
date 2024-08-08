import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import Toast from "../../others/toastNotification/Toast";

const EditProfileModal = ({ user, onUpdateUser }) => {
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
    document.getElementById(`edit_modal_${user.id}`).close();
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
        "https://newterminal.onrender.com/api/users",
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setMessage("Профиль успешно обновлен!");
        setError(false);
        onUpdateUser(response.data);
        handleModalClose();
        console.log(formData);
      } else {
        setMessage(
          "Произошла ошибка при обновлении профиля. Повторите попытку!"
        );
        console.log(formData);
        setError(true);
      }
    } catch (error) {
      setMessage("Произошла ошибка при обновлении профиля. Повторите попытку!");
      console.log(formData);
      setError(true);
    }
  };

  return (
    <div>
      {message && <Toast message={message} error={error} />}
      <button
        className="px-2 border-2 bg-primary border-primary text-white rounded-md"
        onClick={() =>
          document.getElementById(`edit_modal_${user.id}`).showModal()
        }
      >
        <MdEdit />
      </button>
      <dialog id={`edit_modal_${user.id}`} className="modal">
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
