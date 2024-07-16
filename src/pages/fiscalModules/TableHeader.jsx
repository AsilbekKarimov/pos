import React from "react";
import FilterRow from "./FilterRow";

const TableHeader = ({ filters, handleFilterChange }) => {
  return (
    <thead>
      <tr className="border font-normal text-[14px] text-blue-700">
        <th className="border">#</th>
        <th className="border">Серийный номер фискального модуля</th>
        <th className="border">Версия апплета</th>
        <th className="border">ЦТО</th>
        <th className="border">ИНН</th>
        <th className="border">Статус на кассе</th>
        <th className="border">Статус</th>
        <th className="border">Возвращенные ФМО ФМ</th>
      </tr>
      <FilterRow filters={filters} handleFilterChange={handleFilterChange} />
    </thead>
  );
};

export default TableHeader;
