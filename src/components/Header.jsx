import { useState } from "react";

export default function Header({ onSearch, onClear }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
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
      {/* <div class="netflix-stick">
        <div class="thing"></div>
      </div> */}
      <div className="header">
        <h2 id="websiteTitle" className="bebas-neue-regular">
          {" "}
          Flixster{" "}
        </h2>
        <div className="searchBar">
          <input
            type="search"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search movies..."
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
        </div>
      </div>
    </>
  );
}
