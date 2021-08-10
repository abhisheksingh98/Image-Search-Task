import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

export default function Header({
  searchQuery,
  setSearchQuery,
  getSearchResults,
}) {
  return (
    <header>
      <div className="header-container">
        <Logo />
        {searchQuery !== undefined && (
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            getSearchResults={getSearchResults}
          />
        )}
      </div>
    </header>
  );
}
