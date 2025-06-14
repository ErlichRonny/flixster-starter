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
      event.preventDefault();
      handleSearch();
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
              <button
                id="clearBtn"
                className="clearBtn"
                type="button"
                onClick={handleClear}
              >
                Clear
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
