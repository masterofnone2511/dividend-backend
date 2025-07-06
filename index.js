const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Dividend backend is running!');
});

app.get('/dividends', (req, res) => {
  const { symbols } = req.query;

  const allData = [
    { symbol: "TCS", dividend: 10.5, currency: "INR", date: "2025-07-01" },
    { symbol: "INFY", dividend: 10.5, currency: "INR", date: "2025-07-01" },
    { symbol: "RELIANCE", dividend: 10.5, currency: "INR", date: "2025-07-01" }
  ];

  if (!symbols) {
    return res.json(allData);
  }

  const requestedSymbols = symbols.split(',').map(s => s.trim().toUpperCase());
  const filtered = allData.filter(item => requestedSymbols.includes(item.symbol));
  
  res.json(filtered);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

