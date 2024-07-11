import React from 'react';

const Modal = ({ inputs, topText, buttonText }) => {

    return (
        <div>
            <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{topText}</h3>
                    <div className='grid grid-cols-2 gap-4 my-5'>
                        {inputs.map((item, _) => (
                            <input
                                type="text"
                                className="input input-bordered w-full focus:outline-none"
                                placeholder={item}
                            />
                        ))}
                    </div>
                    <div className="modal-action">
                        <button className='btn'>{buttonText}</button>
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
}

export default Modal;
