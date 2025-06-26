const axios = require('axios');

async function queryAirtable(formula) {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableId = process.env.AIRTABLE_TABLE_ID;
  const apiKey = process.env.AIRTABLE_API_KEY;

  const encodedFormula = encodeURIComponent(formula);

  const fields = [
    'Object_Type',
    'Product_Name',
    'Color_Material',
    'Form',
    'Design_Language',
    'Emotional_Character',
    'Image_URL',
    'Product_URL',
    'Design_Summary'
  ];
  const fieldParams = fields.map(field => `fields%5B%5D=${field}`).join('&');

  const url = `https://api.airtable.com/v0/${baseId}/${tableId}?${fieldParams}&filterByFormula=${encodedFormula}`;

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
