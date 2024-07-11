import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Buttons = ({ text, color, size }) => {
  return (
    <button
      className={`${color} ${size} btn mx-auto my-auto active:scale-90 transition duration-300 flex rounded-md`}
    >
      <Link to="#">{text}</Link>
    </button>
  );
};

const ButtonList = () => {
  const [buttonsData, setButtonsData] = useState([]);

  useEffect(() => {
    fetch('https://668fd580c0a7969efd99bcf6.mockapi.io/terminal/terminalapi')
      .then((response) => response.json())
      .then((data) => setButtonsData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {buttonsData.map((button, index) => (
        <Buttons
          key={index}
          text={button.text}
          color={button.color}
          size={button.size}
        />
      ))}
    </div>
  );
};

export default ButtonList;
