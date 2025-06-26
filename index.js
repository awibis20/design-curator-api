
const express = require('express');
const bodyParser = require('body-parser');
const { buildFormula } = require('./utils');
const { queryAirtable } = require('./airtable');

const app = express();
app.use(bodyParser.json());

app.post('/api/products', async (req, res) => {
  try {
    const tagGroups = req.body.tagGroups;
    if (!Array.isArray(tagGroups) || tagGroups.length === 0) {
      return res.status(400).json({ error: 'tagGroups must be a non-empty array of field-value maps' });
    }

    const formula = buildFormula(tagGroups);
    const result = await queryAirtable(formula);
    res.json(result);
  } catch (err) {
    console.error('❌ API Error:', err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
