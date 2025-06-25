const { queryAirtable } = require("./airtable");

function buildFormulaFromTags(tags) {
  const conditions = [];

  for (const [field, values] of Object.entries(tags)) {
    for (const value of values) {
      conditions.push(`NOT(ISERROR(SEARCH("${value}", {${field}})))`);
    }
  }

  return conditions.length > 0
    ? `AND(${conditions.join(",")})`
    : "";
}

async function getMatchingProduct(tags) {
  const formula = buildFormulaFromTags(tags);
  console.log("Generated formula:", formula); // ✅ ← ADD THIS LINE

  const products = await queryAirtable(formula);
  return { products };
}

module.exports = { getMatchingProduct };
