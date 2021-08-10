export const filterSearchHistory = (searchHistory, query) => {
  const regexSearchTerm = new RegExp(query, "gi");
  const filteredResult = searchHistory.filter((history) =>
    history.match(regexSearchTerm)
  );
  return filteredResult;
};
