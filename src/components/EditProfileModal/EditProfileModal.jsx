import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import Toast from "../../others/toastNotification/Toast";
import axios from "axios";

const EditProfileModal = ({ user, onUpdateUser }) => {
  const [formData, setFormData] = useState({
    inn: user.inn || "",
    username: user.username || "",
    company_name: user.company_name || "",
    password: "",
    is_active: user.is_active || false,
    is_admin: user.is_admin || false,
  });
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  const token = useSelector((state) => state.auth.accessToken);
  const id = user.id;

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
      password: formData.password || undefined,
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/users/${id}`,
        updatedUser,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
    }
  };

  return (
    <div>
      {message && <Toast message={message} error={error} />}
      <div className="flex justify-between gap-2">
        <button
          className="px-2 py-2 active:scale-90 transition duration-300 bg-primary text-[30px] border-primary text-white rounded-md hover:bg-blue-700"
          onClick={() =>
            document.getElementById(`edit_modal_${id}`).showModal()
          }
        >
          <MdEdit />
        </button>
      </div>
      <dialog id={`edit_modal_${user.id}`} className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit} className="p-3">
            <div className="flex flex-col">
              <label className="font-semibold mb-1">ИНН / ПИНФЛ</label>
              <input
                type="text"
                name="inn"
                value={formData.inn}
                onChange={handleChange}
                required
                className="input input-bordered"
              />
            </div>
            <div className="mt-3">
              <div className="flex gap-[10%] justify-center mt-4 mb-4">
                <label className="cursor-pointer flex gap-2 items-center">
                  <span className="font-semibold">Активен</span>
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                    className="checkbox checkbox-primary"
                  />
                </label>

                <label className="cursor-pointer flex gap-2 items-center">
                  <span className="font-semibold">Админ</span>
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
                <label className="font-semibold mb-1">Название компании</label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  required
                  className="input input-bordered"
                />
              </div>

              <div className="flex flex-col mb-3">
                <label className="font-semibold mb-1">Логин</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="input input-bordered"
                />
              </div>

              <div className="flex flex-col mb-3">
                <label className="font-semibold mb-1">Пароль</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Если не хотите менять пароль, оставьте поле пустым"
                  className="input input-bordered placeholder:font-light"
                />
              </div>

              <div className="flex justify-end gap-5 items-center">
                <form method="dialog">
                  <button className="btn btn-ghost">Закрыть</button>
                </form>
                <button
                  type="submit"
                  className="btn btn-primary"
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
