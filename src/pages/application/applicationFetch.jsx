import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataTable = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Используйте правильный URL для вашего API
        const fetchData = async () => {
            try {
                const response = await axios.get('https://verified-gorilla-yearly.ngrok-free.app/swagger/index.html#/terminal/get_terminal');
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        console.log(data);
        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.inn}>
                        <td>{item.id}</td>
                        <td>{item.company_name}</td>
                        <td>{item.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataTable;
