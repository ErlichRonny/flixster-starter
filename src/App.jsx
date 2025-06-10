import "./App.css";
import { useState } from "react";
import MovieList from "./components/MovieList";
import Header from "./components/Header";

function App() {
  const [pageNumber, setPageNumber] = useState(1);

  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <MovieList pageNumber={pageNumber} setPageNumber={setPageNumber} />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
