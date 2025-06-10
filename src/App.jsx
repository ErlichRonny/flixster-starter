import "./App.css";
import MovieList from "./components/MovieList";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <MovieList />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
