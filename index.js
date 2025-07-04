const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

const ALPHA_VANTAGE_KEY = 'TW8Z3AD00FDI6WK4'

app.get('/dividends', async (req, res) => {
  const symbols = req.query.symbols?.split(',') || [];

  const results = await Promise.all(symbols.map(async (symbol) => {
    try {
      const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${ALPHA_VANTAGE_KEY}`;
      const response = await axios.get(url);
      const data = response.data;
      return {
        symbol,
        dividendYield: data.DividendYield,
        exDate: data.ExDividendDate
      };
    } catch (err) {
      return { symbol, error: 'Failed to fetch' };
    }
  }));

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
