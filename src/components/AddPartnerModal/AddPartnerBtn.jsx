import React from 'react';

const AddPartnerBtn = ({ onClick, text }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className='py-2 px-7 mt-2 bg-blue-500 border border-blue-500 text-white rounded-e-sm font-medium'
    >
      {text}
    </button>
  );
};

export default AddPartnerBtn;
