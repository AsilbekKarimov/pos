import React from 'react';
import { useLocation } from 'react-router-dom';

const Profile = () => {
    const location = useLocation();
    const row = location.state?.row;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Профиль</h2>
            {row ? (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p><strong>ID:</strong> {row.id}</p>
                    <p><strong>Серийный номер:</strong> {row.serialNumber}</p>
                    <p><strong>Версия апплета:</strong> {row.appletVersion}</p>
                    <p><strong>FMO/FM:</strong> {row.returnedFmoFm}</p>
                    <p><strong>Статус:</strong> {row.status}</p>
                    <p><strong>Компания:</strong> {row.cto}</p>
                    <p><strong>Страна:</strong> {row.inn}</p>
                </div>
            ) : (
                <p>Нет данных для отображения.</p>
            )}
        </div>
    );
};

export default Profile;
