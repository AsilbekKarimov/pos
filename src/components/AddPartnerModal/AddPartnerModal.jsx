import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import useFetch from '../useFetch/useFetch'; // Import the custom hook

const AddPartnerModal = () => {
  const [inn, setInn] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const token = useSelector((state) => state.auth.accessToken); // Get token from Redux store

  const inputHandler = (e) => {
    setInn(e.target.value);
  };

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleIsActiveChange = (e) => {
    setIsActive(e.target.checked);
  };

  const handleIsAdminChange = (e) => {
    setIsAdmin(e.target.checked);
  };

  useEffect(() => {
    setIsFormValid(inn && login && password);
  }, [inn, login, password]);

  const handleModalClose = () => {
    document.getElementById('my_modal_3').close();
  };

  const handleSubmit = async () => {
    const newPartner = {
      inn: inn,
      is_active: isActive,
      is_admin: isAdmin,
      password: password,
      username: login
    };

    try {
      const response = await axios.post('https://newterminal.onrender.com/api/users', newPartner, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Use the token in the headers
        }
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Partner created successfully:', response.data);
        // Handle success (e.g., clear the form, show a success message, etc.)
        // Close the modal if needed
        handleModalClose();
      } else {
        console.error('Failed to create partner:', response.statusText);
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <div>
      <button className="p-1 py-5 border-2 h-full bg-primary border-primary text-white w-full rounded-none" onClick={() => document.getElementById('my_modal_3').showModal()}>Добавить партнера</button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box bg-white">
          <form method="dialog" className='p-3'>
            <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleModalClose}>✕</button>
            <label className='font-semibold'>Введите ИНН партнера</label>
            <input
              type="text"
              value={inn}
              onChange={inputHandler}
              required
              className='py-2 pl-2 bg-white border border-gray-700 text-black rounded-s-sm max-w-[100%] w-full'
            />
            <div className='text-black mt-3'>
              <div className="flex gap-[10%] justify-center mt-4 mb-4">
                <label className="cursor-pointer flex gap-2 items-center">
                  <span className="label-text">Активен</span>
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={handleIsActiveChange}
                    className="checkbox checkbox-primary"
                  />
                </label>

                <label className="cursor-pointer flex gap-2 items-center">
                  <span className="label-text">Админ</span>
                  <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={handleIsAdminChange}
                    className="checkbox checkbox-primary"
                  />
                </label>
              </div>

              <div className='flex flex-col mb-3'>
                <label className='font-semibold'>Логин партнера</label>
                <input
                  type="text"
                  value={login}
                  onChange={handleLoginChange}
                  required
                  className='py-2 pl-2 mt-1 bg-white border border-gray-700 text-black rounded-sm max-w-[100%] w-full'
                />
              </div>

              <div className='flex flex-col mb-3'>
                <label className='font-semibold'>Пароль партнера</label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className='py-2 pl-2 mt-1 bg-white border border-gray-700 text-black rounded-sm max-w-[100%] w-full'
                />
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className='px-7 py-2 bg-emerald-400 text-white mt-8 rounded-lg'
                disabled={!isFormValid}
              >
                Создать
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddPartnerModal;
