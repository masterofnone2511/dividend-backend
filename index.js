const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Dividend backend is running!');
});

// Dummy dividend route
app.get('/dividends', (req, res) => {
  const symbols = req.query.symbols;
  if (!symbols) {
    return res.status(400).json({ error: 'Symbols query parameter is required' });
  }

  const symbolList = symbols.split(',');
  const data = symbolList.map(symbol => ({
    symbol,
    dividend: '10.5',
    currency: 'INR',
    date: '2025-07-01',
  }));

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

