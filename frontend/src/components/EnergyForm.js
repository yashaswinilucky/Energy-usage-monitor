import React, { useState } from 'react';
import axios from 'axios';

const EnergyForm = ({ onAdd }) => {
  const [time, setTime] = useState('');
  const [usage, setUsage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/energy', {
        time: time.trim(),
        usage: parseFloat(usage)
      });
      onAdd(); // Refresh chart
      setTime('');
      setUsage('');
    } catch (error) {
      console.error('Failed to submit', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h3>Add New Energy Usage</h3>
      <input
        type="text"
        placeholder="Time (e.g. 21:00)"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        required
        style={{ marginRight: '10px' }}
      />
      <input
        type="number"
        placeholder="Usage (kWh)"
        value={usage}
        onChange={(e) => setUsage(e.target.value)}
        required
        style={{ marginRight: '10px' }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default EnergyForm;
