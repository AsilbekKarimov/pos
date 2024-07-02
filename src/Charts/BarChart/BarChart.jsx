import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FiscalModullarChart = () => {
  const data = {
    labels: ['Не активный', 'Активный', 'Память заполнена', 'Неточний', 'Потерян', 'Блокиран'],
    datasets: [
      {
        label: 'Модули',
        data: [185, 296, 33, 11, 2, 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)', // Red for Не активный
          'rgba(54, 162, 235, 0.5)', // Blue for Активный
          'rgba(75, 192, 192, 0.5)', // Green for Память заполнена
          'rgba(255, 206, 86, 0.5)', // Yellow for Неточний
          'rgba(153, 102, 255, 0.5)', // Purple for Потерян
          'rgba(255, 159, 64, 0.5)',  // Orange for Блокиран
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Фискал модуллар',
      },
    },
  };

  return (
    <div style={{ width: '600px', height: '300px' }}>
      <Bar data={data} options={options} />
      <div style={{ marginTop: '20px', textAlign: 'center', }}>
        <p>Не активный: 185</p>
        <p>Активный: 296</p>
        <p>Память заполнена: 33</p>
        <p>Неточний: 11</p>
        <p>Потерян: 2</p>
        <p>Блокиран: 0</p>
      </div>
    </div>
  );
};

export default FiscalModullarChart;
