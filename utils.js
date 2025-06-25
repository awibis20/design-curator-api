const { queryAirtable } = require("./airtable");

function buildFormulaFromTags(tags) {
  const clauses = [];

  for (const [field, values] of Object.entries(tags)) {
    for (const value of values) {
      clauses.push(`NOT(ISERROR(SEARCH("${value}", {${field}})))`);
    }
  }

  return `AND(${clauses.join(",")})`;
}

async function getMatchingProduct(tags) {
  const formula = buildFormulaFromTags(tags);
  const products = await queryAirtable(formula);

  return { products };
}

module.exports = { getMatchingProduct };
