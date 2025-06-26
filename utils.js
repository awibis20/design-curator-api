// === FILE 2: utils.js ===
const { queryAirtable } = require('./airtable');

function buildFormula(requests) {
  const blocks = requests.map(req => {
    const conditions = [];
    conditions.push(`NOT(ISERROR(SEARCH("${req.Object_Type}", {Object_Type})))`);

    Object.entries(req).forEach(([field, values]) => {
      if (field === 'Object_Type') return;
      values.forEach(value => {
        conditions.push(`NOT(ISERROR(SEARCH("${value}", {${field}})))`);
      });
    });

    return `AND(${conditions.join(', ')})`;
  });

  return `OR(${blocks.join(', ')})`;
}

async function getFilteredProducts(payload) {
  const formula = buildFormula(payload.requests);
  return await queryAirtable(formula);
}

module.exports = { getFilteredProducts };
