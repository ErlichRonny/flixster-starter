import { useEffect, useState } from "react";

import MovieCard from "./MovieCard.jsx";

export default function MovieList({
  pageNumber,
  setPageNumber,
  searchQuery,
  setSearchQuery,
  isSearching,
  setIsSearching,
}) {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [view, setCurrentView] = useState("nowPlaying");

  const incrementPage = () => {
    setPageNumber((pageNumber) => pageNumber + 1);
  };

  const toggleViewChange = (view) => {
    setCurrentView(view);
    setMovies([]);
    setPageNumber(1);
    if (view == "nowPlaying") {
      setIsSearching(false);
      setSearchQuery("");
    } else {
      if (searchQuery) {
        setIsSearching(true);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = import.meta.env.VITE_APP_API_KEY;

        let url;
        if (isSearching && searchQuery) {
          //   url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          //     searchQuery
          //   )}&include_adult=false&language=en-US&page=1`;
          url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            searchQuery
          )}&include_adult=false&language=en-US&page=${pageNumber}`;
          console.log(url);
        } else {
          url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`;
        }

        const response = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch movie data");
        }
        const data = await response.json();

        setTotalPages(data.total_pages);

        if (pageNumber === 1) {
          setMovies(data.results);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(pageNumber);
  }, [pageNumber, searchQuery, isSearching]);

  return (
    <>
      <button
        type="button"
        onClick={() => toggleViewChange("nowPlaying")}
        className={view === "nowPlaying" ? "active" : ""}
      >
        {" "}
        Now playing{" "}
      </button>
      <button
        type="button"
        onClick={() => toggleViewChange("search")}
        className={view === "search" ? "active" : ""}
      >
        {" "}
        Search Results{" "}
      </button>

      {view === "search" && <h3> Search results for : {searchQuery}</h3>}
      {view === "nowPlaying" && <h3> Now playing: </h3>}

      <div className="MovieList">
        {movies.map((element) => (
          <div className="MovieCard" key={element.id}>
            <MovieCard
              title={element.title}
              posterPath={`https://image.tmdb.org/t/p/w500${element.poster_path}`}
              voteAverage={element.vote_average}
            />
          </div>
        ))}
      </div>
      {pageNumber < totalPages && !isSearching && (
        <div className="loadBtn">
          <button type="button" onClick={incrementPage}>
            Load More
          </button>
        </div>
      )}
      {pageNumber >= totalPages && movies.length === 0 && (
        <div className="no-results">
          <p> No movies found </p>
        </div>
      )}
    </>
  );
}
