import React from "react";
import { Link } from "react-router-dom";

const Buttons = ({ text, color ,size}) => {
  return (
    <>
    <button
      className={`${color} ${size} btn mx-auto my-auto active:scale-90 transition duration-300 flex rounded-md`}
    >
      <Link>{text}</Link>
    </button>
    </>
    
  );
};

export default Buttons;
