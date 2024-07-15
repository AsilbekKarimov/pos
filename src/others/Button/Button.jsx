import React, { useEffect, useState } from 'react';

const Button = () => {
    const [active, setActive] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://basedjangoapi.pythonanywhere.com/users/2');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setActive(result.user.is_activate);
            } catch (error) {
                console.error('Error fetching data:', error);
                setActive(false);
            }
        };
        
        fetchData();
    }, []);
    
    const handleClick = async () => {
        try {
            const token = localStorage.getItem("accessToken")
            const response = await fetch('https://basedjangoapi.pythonanywhere.com/users/edit/2', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    is_activate: !active
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setActive(data.user.is_activate);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return (
        <button
            className={`mx-auto my-auto py-2 active:scale-90 transition duration-300 flex ${active ? 'bg-primary hover:bg-blue-700' : 'bg-red-500 hover:bg-red-700'} rounded-md text-white px-3`}
            onClick={handleClick}
        >
            {active ? <p>Актив</p> : <p>Деактив</p>}
        </button>
    );
};

export default Button;
