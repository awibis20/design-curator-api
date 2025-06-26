const express = require('express');
const { getFilteredProducts } = require('./utils');

const app = express();
app.use(express.json());

app.post('/filter-products', async (req, res) => {
  try {
    const result = await getFilteredProducts(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running...');
});
