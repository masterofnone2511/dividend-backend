const express = require('express');
const cors = require('cors');
const yahooFinance = require('yahoo-finance2').default;

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());

app.get('/dividends', async (req, res) => {
  const symbolsParam = req.query.symbols;
  if (!symbolsParam) return res.status(400).json({ error: 'Missing symbols' });

  const symbols = symbolsParam.split(',');
  const results = [];

  for (const symbol of symbols) {
    try {
      const data = await yahooFinance.quoteSummary(symbol, { modules: ['summaryDetail'] });
      console.log(`Data for ${symbol}:`, data);

      const dividend = data.summaryDetail?.dividendRate || null;
      const dividendDate = data.summaryDetail?.exDividendDate
        ? new Date(data.summaryDetail.exDividendDate).toISOString().split('T')[0]
        : 'N/A';

      results.push({
        symbol,
        dividend,
        currency: data.summaryDetail.currency || 'INR',
        date: dividendDate,
      });
    } catch (err) {
      console.log(`Error fetching ${symbol}:`, err.message);
      results.push({
        symbol,
        dividend: null,
        currency: 'N/A',
        date: 'N/A',
      });
    }
  }

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

