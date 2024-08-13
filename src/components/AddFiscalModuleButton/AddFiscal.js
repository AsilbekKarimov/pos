import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Toast from "../../others/toastNotification/Toast";

const AddFiscalModuleButton = ({ onAdd }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [factoryNumber, setFactoryNumber] = useState("");
  const [fiscalNumber, setFiscalNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);

  const profileId = useSelector((state) => state.user.profileId);
  const token = useSelector((state) => state.auth.accessToken);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  if (message) {
    setTimeout(() => {
      setError(false);
      setMessage(null);
    }, 2000);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFactoryNumber("");
    setFiscalNumber("");
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://newnewterminal.onrender.com/api/fiscal-modules",
        {
          factory_number: factoryNumber,
          fiscal_number: fiscalNumber,
          user_id: profileId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onAdd(response.data);
      handleCloseModal();
      setMessage("Фискальный модуль успешно добавлен!");
      setError(false);
    } catch (error) {
      setMessage("Ошибка при добавлении данных. Возможно фискальный модуль уже существует!");
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {message && <Toast message={message} error={error} />}
      <button
        onClick={handleOpenModal}
        className="px-4 border-2 bg-primary border-primary text-white rounded-md h-[50px]"
      >
        Добавить Фискальный Модуль
      </button>

      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Добавить Фискальный Модуль</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Заводской номер кассы</span>
                </label>
                <input
                  type="text"
                  placeholder="Заводской номер кассы"
                  value={factoryNumber}
                  onChange={(e) => setFactoryNumber(e.target.value)}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">
                    Серийный номер фискального модуля
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Серийный номер фискального модуля"
                  value={fiscalNumber}
                  onChange={(e) => setFiscalNumber(e.target.value)}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Добавление..." : "Добавить"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFiscalModuleButton;
