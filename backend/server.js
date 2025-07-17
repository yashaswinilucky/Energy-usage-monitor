const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const energyData = [
  { time: "08:00", usage: 30 },
  { time: "10:00", usage: 45 },
  { time: "12:00", usage: 60 },
  { time: "14:00", usage: 90 },
  { time: "16:00", usage: 35 },
  { time: "18:00", usage: 20 }
];

// GET route
app.get('/api/energy', (req, res) => {
  res.json([...energyData]); // Send copy to avoid mutation bugs
});

// POST route
app.post('/api/energy', (req, res) => {
  const { time, usage } = req.body;
  console.log("Received in POST:", time, usage);

  if (!time || usage === undefined) {
    return res.status(400).json({ error: "Time and usage are required" });
  }

  energyData.push({
    time: time.trim(),
    usage: Number(usage)
  });

  res.status(201).json({ message: "Data added successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
