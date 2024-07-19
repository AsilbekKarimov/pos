import React from "react";

const Toast = ({ success, error }) => {

  return (
    <div className="toast toast-top toast-end">
      {success ? (
        <div className="alert alert-success">
          <span>{success}</span>
        </div>
      ) : (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default Toast;
