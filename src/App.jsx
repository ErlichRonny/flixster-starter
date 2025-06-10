import "./App.css";
import { useState } from "react";
import MovieList from "./components/MovieList";
import Header from "./components/Header";

function App() {
  const [pageNumber, setPageNumber] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

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

  return (
    <div className="App">
      <header>
        <Header onSearch={handleSearchChange} onClear={clearSearch} />
      </header>
      <main>
        <MovieList
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          searchQuery={searchQuery}
          isSearching={isSearching}
        />
      </main>
      {/* <footer></footer> */}
    </div>
  );
}

export default App;
