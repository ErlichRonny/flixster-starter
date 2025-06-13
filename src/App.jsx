import "./App.css";
import { useState } from "react";
import MovieList from "./components/MovieList";
import Header from "./components/Header";
import { Sidebar } from "./components/Sidebar";

function App() {
  const [pageNumber, setPageNumber] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [lastSearchQuery, setLastSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("no sort");
  const [checked, setChecked] = useState([]);
  const [liked, setLiked] = useState([]);
  const [movies, setMovies] = useState([]);
  const [view, setView] = useState("nowPlaying");

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setLastSearchQuery(query);
    setPageNumber(1);
    setIsSearching(true);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setPageNumber(1);
    setLastSearchQuery("");
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  return (
    <div className="App">
      <header>
        <Header
          onSearch={handleSearchChange}
          onClear={clearSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </header>
      <main>
        <div className="layout">
          <aside>
            <nav>
              <Sidebar
                liked={liked}
                checked={checked}
                movies={movies}
                view={view}
                setView={setView}
              />
            </nav>
          </aside>
          <div className="mainContent">
            <div className="dropdown">
              <button className="dropbtn"> Sort Movies ▼ </button>
              <div className="dropdown-content">
                <option value="Sort by title" onClick={handleSortChange}>
                  {" "}
                  Sort by title, A-Z{" "}
                </option>
                <option value="Sort by release date" onClick={handleSortChange}>
                  {" "}
                  Sort by release date{" "}
                </option>
                <option value="Sort by vote average" onClick={handleSortChange}>
                  {" "}
                  Sort by vote average, descending{" "}
                </option>
              </div>
            </div>
            <MovieList
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isSearching={isSearching}
              setIsSearching={setIsSearching}
              sortCriteria={sortCriteria}
              checked={checked}
              setChecked={setChecked}
              liked={liked}
              setLiked={setLiked}
              lastSearchQuery={lastSearchQuery}
              movies={movies}
              setMovies={setMovies}
              view={view}
              setView={setView}
            />
          </div>
        </div>
      </main>
      <footer> © 2025 </footer>
    </div>
  );
}

export default App;
