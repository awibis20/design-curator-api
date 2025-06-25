const express = require("express");
const { getMatchingProduct } = require("./utils");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const tags = req.query.tags ? JSON.parse(req.query.tags) : {};
    const result = await getMatchingProduct(tags);
    res.json(result);
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
