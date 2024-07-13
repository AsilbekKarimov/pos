import React from "react";
import { Link } from "react-router-dom";

const Buttons = ({ text, bgcolor ,size}) => {
  return (
    <>
    <button
      className={`${bgcolor} ${size} btn mx-auto my-auto active:scale-90 transition duration-300 flex rounded-md`}
    >
      <Link>{text}</Link>
    </button>
    </>
    
  );
};

export default Buttons; 
