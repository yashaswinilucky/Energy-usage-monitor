const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

const energyData = [
  { time: "08:00", usage: 30 },
  { time: "10:00", usage: 45 },
  { time: "12:00", usage: 60 },
  { time: "14:00", usage: 50 },
  { time: "16:00", usage: 35 },
  { time: "18:00", usage: 20 }
];

app.get('/api/energy', (req, res) => {
  res.json(energyData);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
