import React from "react";
import { Button } from "@chakra-ui/react";

import {filterSearchHistory} from "../utils/filterSearchHistory";

const SearchContext = ({
  searchHistory,
  setSearchHistory,
  status,
  setSearchContextStatus,
  setSearchQuery,
  searchRef,
  removeSearchHistory,
  getSearchResults,
  searchQuery,
}) => {
  const filteredSearchHistory = filterSearchHistory(searchHistory, searchQuery);

  const clearSearchHistory = () => {
    setSearchHistory([]);
    removeSearchHistory();
    searchRef.current.focus();
  };

  const getSearchQuery = (history) => {
    getSearchResults(history);
    setSearchQuery(history);
    setSearchContextStatus("close");
    searchRef.current.blur();
  };

  if (status === "open" && filteredSearchHistory.length > 0) {
    return (
      <div className="search-context">
        <div className="suggestion-container">
          {filteredSearchHistory.map((history, index) => (
            <Button
              className="search-context__item"
              key={index}
              onClick={() => {
                getSearchQuery(history);
              }}
              isFullWidth={true}
              backgroundColor="gray.300"
              _hover={{ backgroundColor: "gray.600" }}
              justifyContent={"flex-start"}
            >
              {history}
            </Button>
          ))}
        </div>
        <div className="search-context__item--reverse">
          <Button
            onClick={() => {
              clearSearchHistory();
            }}
            color="red.600"
            variant="link"
            size="sm"
            onFocus={() => setSearchContextStatus("open")}
          >
            Clear History
          </Button>
        </div>
      </div>
    );
  }
  return null;
};

export default SearchContext;
