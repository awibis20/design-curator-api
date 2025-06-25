const axios = require("axios");

async function queryAirtable(formula) {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID;
  const apiKey = process.env.AIRTABLE_API_KEY;

  const url = `https://api.airtable.com/v0/${baseId}/${tableId}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    params: {
      filterByFormula: formula,
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
  });

  return response.data.records.map((record) => ({
    product_name: record.fields.Product_Name,
    product_url: record.fields.Product_URL,
    image_url: record.fields.Image_URL,
    design_summary: record.fields.Design_Summary,
  }));
}

module.exports = { queryAirtable };
