import React, { useState, useEffect } from "react";

const PartnerList = () => {
  const initialData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    inn: `ИНН ${i + 1}`,
    companyName: `Компания ${i + 1}`,
    isActive: Math.random() > 0.5,
  }));

  const [partners, setPartners] = useState(initialData);

  const toggleActivation = (id) => {
    setPartners((prevPartners) =>
      prevPartners.map((partner) =>
        partner.id === id
          ? { ...partner, isActive: !partner.isActive }
          : partner
      )
    );
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-grow overflow-y-auto">
        <table className="table-fixed w-full border h-full table-zebra">
          <thead>
            <tr className="border font-normal text-[15px] text-blue-700">
              <th className="border">#</th>
              <th className="border">ИНН</th>
              <th className="border">Название компании</th>
              <th className="border">Активный/Не активный</th>
              <th className="border">Действия</th>
            </tr>
          </thead>
          <tbody className="text-[12px]">
            {partners.map((partner) => (
              <tr className="border h-12" key={partner.id}>
                <td className="border">{partner.id}</td>
                <td className="border">{partner.inn}</td>
                <td className="border">{partner.companyName}</td>
                <td className="border">
                  {partner.isActive ? "Активный" : "Не активный"}
                </td>
                <td className="border flex">
                  <button
                    onClick={() => toggleActivation(partner.id)}
                    className="mx-auto my-auto py-2 active:scale-90 transition duration-300 hover:bg-blue-700 flex bg-primary rounded-md text-white px-3"
                  >
                    {partner.isActive ? "Деактивировать" : "Активировать"}
                  </button>
                  <button className="ml-2 mx-auto my-auto py-2 active:scale-90 transition duration-300 hover:bg-blue-700 flex bg-secondary rounded-md text-white px-3">
                    Профиль
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PartnerList;
