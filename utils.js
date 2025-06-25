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

module.exports = { buildFormulaFromTags };
