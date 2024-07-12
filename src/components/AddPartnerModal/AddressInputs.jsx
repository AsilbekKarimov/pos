import React, { useState } from 'react';
import AddPartnerBtn from './AddPartnerBtn';

const AdditionalInfoInput = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const [address, setAddress] = useState('')

  const addressChange = (e) => {
    setAddress(e.target.value);
  };

  const [stirOrJshshir, setStirOrJshir] = useState('')
  
  const stirHandler = (e) => {
    setStirOrJshir(e.target.value);
  };

  return (
    <div className='text-black mt-6'>

      <div className='flex flex-col mb-6'>
        <label className='font-semibold'>Адрес</label>
        <input
          type="text"
          onChange={addressChange}
          className='py-2 pl-2 mt-2 bg-white border border-gray-700 text-black rounded-sm max-w-[100%] w-full'
        />
      </div>

      <div>
        <label className='font-semibold'>Номер телефона</label>
        <input
        type="tel"
        value={phoneNumber}
        onChange={handleChange}
        className='py-2 pl-2 mt-2 bg-white border border-gray-700 text-black rounded-sm max-w-[100%] w-full'
        placeholder="+998"
        pattern="\+998-\d{2}-\d{3}-\d{2}-\d{2}"
      />
      </div>

      <div className='mt-8 text-gray-500 mb-8'>
        <p className='text-xl mb-2'>{"... MCHJ"}</p>
        <p>ИНН субъекта предпринимательства: {'inn'}</p>
        <p>Область: {'viloyat nomi'}</p>
        <p>Район: {'район nomi'}</p>
        <p>Адрес: {address}</p>
      </div>

      <div>
            <input
              type="text"
              placeholder='Введите СТИР или ЖШШИР пользователя'
              value={stirOrJshshir}
              onChange={stirHandler}
              className='py-2 pl-2 placeholder:text-sm bg-white border border-gray-700 text-black rounded-s-sm max-w-[74%] w-full'
            />
            <AddPartnerBtn text={'Поиск'} onClick={stirHandler} />       
      </div>

      <div className='mt-8'>
        <label className='font-semibold'>Документы</label>
        <div className='flex mt-2'>
          <input
            type="text"
            className='py-2 pl-2 placeholder:text-sm bg-white border border-gray-700 text-black rounded-s-sm max-w-[50%] w-full'
          />
          <label className='relative cursor-pointer bg-blue-500 px-14 py-2 max-w-[50%] w-full text-white rounded-e-sm font-semibold'>
            <span className='absolute inset-0 flex items-center justify-center'>
              Выберите файл
            </span>
            <input type="file" className='absolute inset-0 opacity-0 w-full h-full cursor-pointer'/>
          </label>
        </div>
      </div>

      <button className='px-7 py-2 bg-emerald-400 text-white mt-8'>Сохранить</button>
    </div>
  );
};

export default AdditionalInfoInput;
