// Placeholder if you're integrating Airtable later
const Airtable = require('airtable');
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});
const base = Airtable.base('YOUR_BASE_ID');

module.exports = base;
