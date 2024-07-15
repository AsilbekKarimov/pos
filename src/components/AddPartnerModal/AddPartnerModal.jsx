import React, { useState } from 'react';
import AdditionalInfoInput from './AdditionalInfoInput';

const AddPartnerModal = () => {
  const [inn, setInn] = useState('');

  const inputHandler = (e) => {
    setInn(e.target.value);
  };

  const handleModalClose = () => {
    document.getElementById('my_modal_3').close();
  };

  return (
    <div>
      <button className="btn bg-blue-500 text-white" onClick={() => document.getElementById('my_modal_3').showModal()}>Добавить партнера</button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white">
          <form method="dialog" className='p-3'>
            <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModalClose}>✕</button>
            <label className='font-semibold'>Введите ИНН партнера</label>
            <input
              type="text"
              value={inn}
              onChange={inputHandler}
              className='py-2 pl-2 bg-white border border-gray-700 text-black rounded-s-sm max-w-[100%] w-full'
            />
            <AdditionalInfoInput inn={inn} />
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddPartnerModal;
