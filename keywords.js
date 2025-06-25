function getMatchingProduct(question) {
  // Dummy logic for testing — replace with actual logic later
  if (question.toLowerCase().includes('walnut')) {
    return { match: 'Walnut Chair', reason: 'Matches "walnut" keyword' };
  }
  return { match: 'Default Chair', reason: 'Fallback result' };
}

module.exports = { getMatchingProduct };
