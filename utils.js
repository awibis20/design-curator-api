function buildFormula(tagGroups) {
  const formulaBlocks = tagGroups.map(group => {
    const subConditions = Object.entries(group)
      .map(([field, value]) => `SEARCH("${value}", {${field}})`);
    return `AND(${subConditions.join(', ')})`;
  });
  return `OR(${formulaBlocks.join(', ')})`;
}

module.exports = { buildFormula };

