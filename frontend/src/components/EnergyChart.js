import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const EnergyChart = () => {
  const [energyData, setEnergyData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/energy')
      .then(res => setEnergyData(res.data))
      .catch(err => console.error(err));
  }, []);

  const chartData = {
    labels: energyData.map(item => item.time),
    datasets: [
      {
        label: 'Energy Usage (kWh)',
        data: energyData.map(item => item.usage),
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgba(34, 197, 94, 1)',
        tension: 0.3
      }
    ]
  };

  return (
    <div>
      <h2>Energy Usage Monitor</h2>
      <Line data={chartData} />
    </div>
  );
};

export default EnergyChart;
