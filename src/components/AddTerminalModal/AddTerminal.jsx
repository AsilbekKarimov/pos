import React, { useState } from 'react';

const AddTerminalModal = () => {
  const [formData, setFormData] = useState({
    partnerName: '',
    partnerInn: '',
    login: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can do something with formData here, like sending it to an API or displaying it in the DOM
    alert(JSON.stringify(formData, null, 2)); // For now, we'll just alert the data
  };

  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg">create portner !</h3>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col items-center gap-2'>
              <input
                className='h-11 w-72 text-center rounded-lg bg-slate-100 relative top-5'
                placeholder='Название ПАРТНЕРА'
                type="text"
                name="partnerName"
                value={formData.partnerName}
                onChange={handleChange}
              />
              <input
                className='h-11 w-72 text-center rounded-lg bg-slate-100 relative top-5'
                placeholder='ИНН ПАРТНЕРА'
                type="text"
                name="partnerInn"
                value={formData.partnerInn}
                onChange={handleChange}
              />
              <input
                className='h-11 w-72 text-center rounded-lg bg-slate-100 relative top-5'
                placeholder='Логин'
                type="text"
                name="login"
                value={formData.login}
                onChange={handleChange}
              />
              <input
                className='h-11 w-72 text-center rounded-lg bg-slate-100 relative top-5'
                placeholder='Проль'
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
            <button type="submit" className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">create</button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default AddTerminalModal;
