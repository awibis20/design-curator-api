const express = require("express");
const cors = require("cors");
const { queryAirtable } = require("./airtable");
const { buildFormulaFromTags } = require("./utils");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/query-products", async (req, res) => {
  try {
    const { tags } = req.body;

    const formula = buildFormulaFromTags(tags);
    const products = await queryAirtable(formula);

    res.json({ products });
  } catch (error) {
    console.error("Error in /query-products:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(10000, () => {
  console.log("Server running on port 10000");
});
