import React from 'react';
import axios from 'axios';

const PostExcel = ({ tableData }) => {
  const handleExport = async () => {
    try {
      const response = await axios.post('https://newnewterminal.onrender.com/api/export', tableData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        alert('Table exported successfully!');
      }
    } catch (error) {
      console.error('Error exporting table:', error);
      alert('Failed to export table.');
    }
  };

  return (
    <div>
      <button onClick={handleExport} className="btn btn-success text-white">
        Выгрузить в Эксель
      </button>
    </div>
  );
};

export default PostExcel;
