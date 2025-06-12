import { useState } from "react";

export default function Header({ onSearch, onClear }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleEnter = (event) => {
    console.log(event);
    if (event.key === "Enter") {
      handleSearch();
    } else if (event.key === "Backspace") {
      handleClear();
    }
  };
  const handleSearch = () => {
    onSearch(searchQuery.trim());
  };

  const handleClear = () => {
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
              onKeyUp={(event) => handleEnter(event)}
              placeholder="Search movies..."
              class="input"
            />
            <button id="searchBtn" onClick={handleSearch}>
              {" "}
              🔍{" "}
            </button>
            {searchQuery && (
              <button id="clearBtn" onClick={handleClear}>
                Clear
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
