const axios = require("axios");
require("dotenv").config();

const baseId = process.env.AIRTABLE_BASE_ID;
const tableId = process.env.AIRTABLE_TABLE_ID;
const apiKey = process.env.AIRTABLE_API_KEY;

async function queryAirtable(formula) {
  const encodedFormula = encodeURIComponent(formula);
  const url = `https://api.airtable.com/v0/${baseId}/${tableId}?filterByFormula=${encodedFormula}`;

  const config = {
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    params: {
      fields: [
        "Product_Name",
        "Product_URL",
        "Image_URL",
        "Color_Material",
        "Form",
        "Object_Type",
        "Design_Language",
        "Emotional_Character",
        "Design_Summary"
      ]
    }
  };

  const response = await axios.get(url, config);
  return response.data.records.map(record => record.fields);
}

module.exports = { queryAirtable };
