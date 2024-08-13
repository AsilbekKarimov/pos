import React from "react";

const Toast = ({ message, error }) => {
  return (
    <div className="toast toast-top toast-end z-50 mt-[55px]">
      <div
        className={`alert ${
          error ? "alert-error" : "alert-success"
        } text-white p-4 rounded-lg shadow-md transition-transform transform duration-300`}
      >
        <span className="text-sm md:text-base">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
