import "./App.css";
import { useState } from "react";
import MovieList from "./components/MovieList";
import Header from "./components/Header";

function App() {
  const [pageNumber, setPageNumber] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("no sort");

  const handleSearchChange = (event) => {
    setSearchQuery(event);
    setPageNumber(1);
    setIsSearching(true);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setPageNumber(1);
  };

  const handleSortChange = (event) => {
    console.log(event.target.value);
    setSortCriteria(event.target.value);
  };

  return (
    <div className="App">
      <header>
        <Header onSearch={handleSearchChange} onClear={clearSearch} />
      </header>
      <main>
        <div className="dropDown">
          <select name="sortMovies" onChange={handleSortChange}>
            <option value="no sort"> Sort movies </option>
            <option value="Sort by title"> Sort by title, A-Z </option>
            <option value="Sort by release date"> Sort by release date </option>
            <option value="Sort by vote average">
              {" "}
              Sort by vote average, descending{" "}
            </option>
          </select>
        </div>
        <MovieList
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
          sortCriteria={sortCriteria}
        />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
