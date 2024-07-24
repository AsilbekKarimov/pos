import React, { useEffect, useState } from 'react';


const Button = ({activeText, NoactiveText}) => {
    const [active, setActive] = useState(false);
    

  
    return (
        <button
        className={`mx-auto my-auto py-2 active:scale-90 transition duration-300 flex ${active ? 'bg-primary hover:bg-blue-700' : 'bg-red-500 hover:bg-red-700'} rounded-md text-white px-3`}
        onClick={()=> setActive(!active) }
        >
        {active ? <p>{activeText}</p> : <p>{NoactiveText}</p>}
        

        </button>
    );
};

export default Button;
