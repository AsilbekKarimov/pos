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

const BarChart = () => {
  const data = {
    labels: ['Не активный', 'Активный', 'Память заполнена', 'Негодный', 'Потерян', 'Блокирован'],
    datasets: [
      {
        label: 'Модули',
        data: [185, 296, 33, 11, 2, 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)', 
          'rgba(54, 162, 235, 0.7)', 
          'rgba(75, 192, 192, 0.7)', 
          'rgba(255, 206, 86, 0.7)', 
          'rgba(153, 102, 255, 0.7)', 
          'rgba(255, 159, 64, 0.7)',
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
        display: false,
      },
      title: {
        display: true,
        text: 'Фискал модуллар',
        font: {
          size: 25,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const summaryData = [
    { label: 'Не активный', value: 185, color: 'rgba(255, 99, 132, 1)' },
    { label: 'Активный', value: 296, color: 'rgba(54, 162, 235, 1)' },
    { label: 'Память заполнена', value: 33, color: 'rgba(75, 192, 192, 1)' },
    { label: 'Негодный', value: 11, color: 'rgba(255, 206, 86, 1)' },
    { label: 'Потерян', value: 2, color: 'rgba(153, 102, 255, 1)' },
    { label: 'Блокирован', value: 0, color: 'rgba(255, 159, 64, 1)' },
  ];

  return (
    <div style={{ width: '700px', height: '500px', margin: '0 auto' }}>
      <Bar data={data} options={options} />
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '50px', textAlign: 'center' }}>
        <div>
          {summaryData.slice(0, 3).map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: item.color, marginRight: '5px' }}></div>
              <span style={{ color: 'black' }}>{item.label} - {item.value}</span>
            </div>
          ))}
        </div>
        <div>
          {summaryData.slice(3).map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: item.color, marginRight: '5px' }}></div>
              <span style={{ color: 'black' }}>{item.label} - {item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarChart;
