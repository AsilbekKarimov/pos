import React from "react";

const Toast = ({ message, error }) => {
  return (
    <div className="toast toast-top toast-end z-50 mt-[55px]">
      <div
        className={
          error ? "alert alert-error text-white" : "alert alert-success text-white"
        }
      >
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
