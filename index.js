const express = require("express");
const bodyParser = require("body-parser");
const { getMatchingProduct } = require("./utils");

const app = express();
app.use(bodyParser.json());

app.post("/query-products", async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: "Missing 'question'" });
  }

  try {
    const result = await getMatchingProduct(question);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
