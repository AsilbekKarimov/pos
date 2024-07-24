import React, { useState } from 'react';
import axios from 'axios';

const AdditionalInfoInput = ({ inn }) => {
  const [partnerName, setPartnerName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handlePartnerChange = (e) => {
    setPartnerName(e.target.value);
  };

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    const newPartner = {
      id: 0, // Typically, ID would be assigned by the backend
      inn: inn, // Use the INN passed from the parent component
      is_active: true,
      is_admin: true,
      password: password,
      username: login
    };

    try {
      const response = await axios.post('https://verified-gorilla-yearly.ngrok-free.app/api/partner', newPartner, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Partner created successfully:', response.data);
        // Handle success (e.g., clear the form, show a success message, etc.)
        // Close the modal if needed
        document.getElementById('my_modal_3').close();
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
    <div className='text-black mt-3'>
      <div className='flex flex-col mb-3'>
        <label className='font-semibold'>Название партнера</label>
        <input
          type="text"
          value={partnerName}
          onChange={handlePartnerChange}
          className='py-2 pl-2 mt-1 bg-white border border-gray-700 text-black rounded-sm max-w-[100%] w-full'
        />
      </div>

      <div className='flex flex-col mb-3'>
        <label className='font-semibold'>Логин партнера</label>
        <input
          type="text"
          value={login}
          onChange={handleLoginChange}
          className='py-2 pl-2 mt-1 bg-white border border-gray-700 text-black rounded-sm max-w-[100%] w-full'
        />
      </div>

      <div className='flex flex-col mb-3'>
        <label className='font-semibold'>Пароль партнера</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className='py-2 pl-2 mt-1 bg-white border border-gray-700 text-black rounded-sm max-w-[100%] w-full'
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className='px-7 py-2 bg-emerald-400 text-white mt-8'
      >
        Создать
      </button>
    </div>
  );
};

export default AdditionalInfoInput;
