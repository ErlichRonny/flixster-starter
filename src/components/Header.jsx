import { useState } from "react";

export default function Header({
  onSearch,
  onClear,
  searchQuery,
  setSearchQuery,
}) {
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      console.log("Enter");
      event.preventDefault();
      handleSearch();
    } else if (event.key === "Backspace") {
      handleClear();
    }
  };
  const handleSearch = (event) => {
    if (event) {
      event.preventDefault();
    }
    onSearch(searchQuery.trim());
  };

  const handleClear = (event) => {
    if (event) {
      event.preventDefault();
    }
    setSearchQuery("");
    onClear();
  };

  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
      </style>
      {/* Based on CodePen by hamdiye - https://codepen.io/hamdiye/pen/povPRQJ */}
      {/* <div class="netflix-stick">
        <div class="thing"></div>
      </div>  */}
      <div className="header">
        <h2 id="websiteTitle" className="bebas-neue-regular">
          {" "}
          Flixster{" "}
        </h2>
        <div className="searchBar">
          <form>
            <input
              type="search"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={(event) => handleEnter(event)}
              placeholder="Search movies..."
              className="input"
            />
            <button id="searchBtn" type="button" onClick={handleSearch}>
              {" "}
              🔍{" "}
            </button>
            {searchQuery && (
              <button id="clearBtn" type="button" onClick={handleClear}>
                Clear
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
