import React, { useState, lazy } from 'react';
import Loadable from './Loadable'; // Path to the Loadable file
import AddPartnerBtn from './AddPartnerBtn';

const LazyAdditionalInfoInput = Loadable(lazy(() => import('./AddressInputs')));

const AddPartnerModal = () => {
  const [inn, setInn] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const checkInputValue = '123'; // Define check value as a string

  const inputHandler = (e) => {
    setInn(e.target.value);
  };

  const checkValueHandler = () => {
    setIsChecked(true);
  };

  const handleModalClose = () => {
    // Reset the input field when the modal is closed
    setInn('');
  };

  return (
    <div>
      <button className="btn bg-blue-500 text-white" onClick={() => document.getElementById('my_modal_3').showModal()}>Добавить партнера</button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white">
          <form method="dialog" className='p-5'>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModalClose}>✕</button>
            <input
              type="text"
              placeholder='Введите ИНН партнера'
              value={inn}
              onChange={inputHandler}
              className='py-2 pl-2 bg-white border border-gray-700 text-black rounded-s-sm max-w-[74%] w-full'
            />
            <AddPartnerBtn text={'Поиск'} onClick={checkValueHandler} />
            {isChecked && inn === checkInputValue && (
              <LazyAdditionalInfoInput />
            )}
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddPartnerModal;
