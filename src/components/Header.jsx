import { useState } from "react";

export default function Header({ onSearch, onClear }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery.trim());
  }

  const handleClear = () => {
    setSearchQuery("");
    onClear();
  };
  return (
    <div className="header">
      <h2 id="websiteTitle"> Flixster </h2>
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
      <div className="dropDown">
        <select name="sortMovies">
          <option value="select 1"> Select 1</option>
        </select>
      </div>
    </div>
  );
}
