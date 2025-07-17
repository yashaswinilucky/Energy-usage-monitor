import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import EnergyForm from './EnergyForm';

const EnergyChart = () => {
  const [energyData, setEnergyData] = useState([]);

  const fetchEnergyData = () => {
    axios.get('http://localhost:5000/api/energy')
      .then(res => {
        console.log("Fetched data:", res.data);
        setEnergyData(res.data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchEnergyData();
  }, []);

  const sortedData = [...energyData].sort((a, b) => a.time.localeCompare(b.time));

  const chartData = {
    labels: sortedData.map(item => item.time || ''), // avoid undefined
    datasets: [
      {
        label: 'Energy Usage (kWh)',
        data: sortedData.map(item => Number(item.usage)),
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgba(34, 197, 94, 1)',
        tension: 0.4,
        fill: true,
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#22c55e',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 100,
        ticks: {
          stepSize: 10
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time'
        }
      }
    }
  };

  return (
    <div style={{ width: '80%', margin: 'auto', paddingTop: '20px', textAlign: 'center' }}>
      <EnergyForm onAdd={fetchEnergyData} />
      <h2>⚡ Energy Usage Monitor</h2>
      <p style={{ color: 'gray' }}>Last Updated: {new Date().toLocaleString()}</p>
      <Line key={JSON.stringify(chartData)} data={chartData} options={chartOptions} />
    </div>
  );
};

export default EnergyChart;
