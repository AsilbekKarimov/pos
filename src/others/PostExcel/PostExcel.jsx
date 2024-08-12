import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Toast from "../toastNotification/Toast";

const PostExcel = ({ filename, tableData }) => {
  const [message, setMessage] = useState(null);

  const token = useSelector((state) => state.auth.accessToken);

  const handleExport = async () => {
    try {
      const response = await axios.post(
        "https://newnewterminal.onrender.com/api/export",
        {
          filename: filename,
          objects: tableData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${filename}.xlsx`);
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
    } catch (error) {
      setMessage("Ошибка при скачивании таблицы. Повторите попытку!");
    }
  };

  if (message) {
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  }

  return (
    <div>
      {message && <Toast message={message} error={true} />}
      <button onClick={handleExport} className="btn btn-primary text-white">
        Выгрузить в Эксель
      </button>
    </div>
  );
};

export default PostExcel;
