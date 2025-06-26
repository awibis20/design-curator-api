const axios = require('axios');

async function queryAirtable(formula) {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID;
  const apiKey = process.env.AIRTABLE_API_KEY;

  const encodedFormula = encodeURIComponent(formula);

  const fields = [
    'Image_URL',
    'Product_Name',
    'Object_Type',
    'Color_Material',
    'Form',
    'Design_Language',
    'Emotional_Character',
    'Design_Summary'
  ];
  const fieldParams = fields.map(field => `fields[]=${encodeURIComponent(field)}`).join('&');

  const url =
    'https://api.airtable.com/v0/' +
    baseId + '/' +
    tableId +
    '?filterByFormula=' + encodedFormula +
    '&' + fieldParams;

  console.log("🧪 Encoded Formula:", encodedFormula);
  console.log("✅ Airtable URL:", url);

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });

  return {
    formula_used: formula,
    encoded_formula: encodedFormula,
    records: response.data.records
  };
}

module.exports = { queryAirtable };
