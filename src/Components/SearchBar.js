import React, { useState, useRef } from "react";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  CloseButton,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import SearchContext from "./SearchContext";
import useLocalStorage  from "../hooks/useLocalStorage";

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  getSearchResults,
}) {
  const searchRef = useRef(null);

  const [
    searchHistory,
    setSearchHistory,
    removeSearchHistory,
  ] = useLocalStorage("searchHistory", []);

  const [searchContextStatus, setSearchContextStatus] = useState("close");

  const startSearch = (e) => {
    e.preventDefault();
    getSearchResults(e.target.searchQuery.value);
    setSearchHistory([...searchHistory, e.target.searchQuery.value]);
    setSearchContextStatus("close");
    searchRef.current.blur();
  };

  const handleKeybEvents = (event) => {
    if (event.key === "Escape") {
      setSearchContextStatus("close");
      searchRef.current.blur();
    }
  };

  const clearSearchBar = () => {
    searchRef.current.focus();
    setSearchQuery("");
  };

  return (
    <form
      className="search-bar"
      onSubmit={(e) => {
        startSearch(e);
      }}
      onFocus={() => setSearchContextStatus("open")}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setSearchContextStatus("close");
        }
      }}
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.400" />
        </InputLeftElement>
        <Input
          ref={searchRef}
          name="searchQuery"
          placeholder="Search Here"
          color="gray.800"
          backgroundColor="gray.200"
          focusBorderColor="blue.600"
          _placeholder={{ color: "gray.700" }}
          autoComplete="off"
          onKeyDown={(e) => {
            handleKeybEvents(e);
          }}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          value={searchQuery}
        />
        <InputRightElement>
          {searchQuery.length > 0 && (
            <CloseButton mr="0.2rem" onClick={clearSearchBar} />
          )}
        </InputRightElement>
        <SearchContext
          searchHistory={searchHistory}
          setSearchHistory={setSearchHistory}
          status={searchContextStatus}
          setSearchContextStatus={setSearchContextStatus}
          setSearchQuery={setSearchQuery}
          searchRef={searchRef}
          removeSearchHistory={removeSearchHistory}
          getSearchResults={getSearchResults}
          searchQuery={searchQuery}
        />
      </InputGroup>
    </form>
  );
}
