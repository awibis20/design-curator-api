const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { getMatchingProduct } = require("./utils");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

app.post("/", async (req, res) => {
  try {
    const { tags } = req.body;

    if (!tags || typeof tags !== "object") {
      return res.status(400).json({ error: "Invalid or missing 'tags' field" });
    }

    const result = await getMatchingProduct(tags);

    res.json(result);
  } catch (err) {
    console.error("Error handling request:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
