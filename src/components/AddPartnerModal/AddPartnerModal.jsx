import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Toast from "../../others/toastNotification/Toast";

const AddPartnerModal = ({ onAddPartner }) => {
  const [inn, setInn] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  const token = useSelector((state) => state.auth.accessToken);

  if (message) {
    setTimeout(() => {
      setError(false);
      setMessage(null);
    }, 2000);
  }

  const inputHandler = (e) => {
    setInn(e.target.value);
  };

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleIsActiveChange = (e) => {
    setIsActive(e.target.checked);
  };

  const handleIsAdminChange = (e) => {
    setIsAdmin(e.target.checked);
  };

  const handleModalClose = () => {
    document.getElementById("my_modal_3").close();
    setPassword("");
    setLogin("");
    setInn("");
    setIsActive(false);
    setIsAdmin(false);
  };

  const handleSubmit = async () => {
    if (!(inn && login && password)) {
      setMessage("Заполните все поля ввода!");
      setError(true);
    } else {
      const newPartner = {
        inn: inn,
        is_active: isActive,
        is_admin: isAdmin,
        password: password,
        username: login,
      };
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/register`,
          newPartner,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage("Успешно создан!");
        setError(false);
        onAddPartner(response.data);

        setInn("");
        setLogin("");
        setPassword("");
        setIsActive(false);
        setIsAdmin(false);
        handleModalClose();
      } catch (error) {
        setMessage("Произошла ошибка при добавлении. Возможно такой пользователь уже существует!");
        setError(true);
      }
    }
  };

  return (
    <div>
      {message && <Toast message={message} error={error} />}
      <button
        className="px-4 active:scale-90 transition duration-300 hover:bg-blue-700 bg-primary border-primary text-white rounded-md w-full h-[50px]"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Добавить партнера
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog" className="p-3">
            <div className="flex flex-col">
              <label className="font-bold text-lg">Введите ИНН партнера</label>
              <input
                type="text"
                value={inn}
                onChange={inputHandler}
                required
                className="input input-bordered"
              />
            </div>
            <div className=" mt-3">
              <div className="flex gap-[10%] justify-center mt-4 mb-4">
                <label className="cursor-pointer flex gap-2 items-center">
                  <span className="label-text">Активен</span>
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={handleIsActiveChange}
                    className="checkbox checkbox-primary"
                  />
                </label>

                <label className="cursor-pointer flex gap-2 items-center">
                  <span className="label-text">Админ</span>
                  <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={handleIsAdminChange}
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>

              <div className="flex flex-col mb-3">
                <label className="font-bold text-lg">Логин партнера</label>
                <input
                  type="text"
                  value={login}
                  onChange={handleLoginChange}
                  required
                  className="input input-bordered"
                />
              </div>

              <div className="flex flex-col mb-3">
                <label className="font-bold text-lg">Пароль партнера</label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="input input-bordered"
                />
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={handleModalClose}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Добавить
                </button>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddPartnerModal;
