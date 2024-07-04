import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const PieChart = () => {
  const data = {
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
    datasets: [
      {
        data: [20, 25, 15, 30, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)', 
          'rgba(255, 159, 64, 0.7)',  
          'rgba(255, 205, 86, 0.7)',  
          'rgba(75, 192, 192, 0.7)',  
          'rgba(54, 162, 235, 0.7)',  
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
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
        text: 'STATISTIKA №1',
        font: {
          size: 25,
        },
      },
    },
  };

  const summaryData = [
    { label: 'Red', color: 'rgba(255, 99, 132, 1)' },
    { label: 'Orange', color: 'rgba(255, 159, 64, 1)' },
    { label: 'Yellow', color: 'rgba(255, 205, 86, 1)' },
    { label: 'Green', color: 'rgba(75, 192, 192, 1)' },
    { label: 'Blue', color: 'rgba(54, 162, 235, 1)' },
  ];

  return (
    <div style={{ width: '350px', height: '400px', margin: '0 auto' }}>
      <Pie data={data} options={options} />
      <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', justifyContent: 'space-between' }}>
        {summaryData.map((item, index) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
            <div style={{ width: '15px', height: '15px', backgroundColor: item.color, marginRight: '5px' }}></div>
            <span style={{ color: 'black' }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
