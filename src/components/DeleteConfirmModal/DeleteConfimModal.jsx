import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";

const DeleteConfimModal = ({ id, onDeletePartner, url, confirmText, setMessage, setError }) => {
  const token = useSelector((state) => state.auth.accessToken);

  const closeModal = () => {
    document.getElementById(`my_modal_${id}`).close();
  };

  const fetchDelete = async () => {
    try {
      await axios.delete(
        `https://newnewterminal.onrender.com/api/${url}/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onDeletePartner(id);
      setMessage("Успешно удален!");
      setError(false);
      closeModal();
    } catch (error) {
      setMessage(
        "Произошла ошибка при удалении. Пожалуйста, попробуйте еще раз."
      );
      setError(true);
      closeModal();
    }
  };

  return (
    <div>
      <button
        className="btn bg-red-500 text-white text-[30px] active:scale-90 transition duration-300 hover:bg-red-700 px-2 py-2 rounded-md"
        onClick={() => document.getElementById(`my_modal_${id}`).showModal()}
      >
        <MdDeleteForever />
      </button>
      <dialog id={`my_modal_${id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Подтвердите удаление</h3>
          <p className="py-4 text-[17px] font-semibold">{confirmText}</p>
          <div className="modal-action">
            <button
              className="btn bg-red-500 hover:bg-red-700 text-white"
              onClick={fetchDelete}
            >
              Удалить
            </button>
            <form method="dialog">
              <button className="btn">Закрыть</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DeleteConfimModal;
