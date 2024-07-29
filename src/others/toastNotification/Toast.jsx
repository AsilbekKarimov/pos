import React from "react";

const Toast = ({ children, type }) => {
  return (
    <div className="toast toast-top toast-end">
      {type === "success" ? (
        <div className="alert alert-success">
          <span>{children}</span>
        </div>
      ) : (
        <div className="alert alert-error text-white">
          <span>{children}</span>
        </div>
      )}
    </div>
  );
};

export default Toast;
