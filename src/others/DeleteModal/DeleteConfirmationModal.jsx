import React from "react";

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 w-1/3">
        <h3 className="font-bold text-lg">Confirm Deletion</h3>
        <p className="py-4">
          Are you sure that you want to delete {user.username}?
        </p>
        <div className="flex justify-end space-x-2">
          <button className="btn bg-blue-700 text-white hover:bg-blue-500" onClick={onClose}>
            Cancel
          </button>
          <button className="btn bg-red-700 text-white border-none hover:bg-red-600" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
