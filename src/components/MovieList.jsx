import { useEffect, useState } from "react";

import MovieCard from "./MovieCard.jsx";
import MovieModal from "./MovieModal.jsx";

export default function MovieList({
  pageNumber,
  setPageNumber,
  searchQuery,
  setSearchQuery,
  isSearching,
  setIsSearching,
  sortCriteria,
  checked,
  setChecked,
  liked,
  setLiked,
  lastSearchQuery,
  movies,
  setMovies
}) {
  const [originalMovies, setOriginalMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [view, setCurrentView] = useState("nowPlaying");
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [genres, setGenres] = useState([]);
  const [genreMapping, setGenreMapping] = useState({});

  const handleMovieClick = (title, img, releaseDate, overview, genres, id) => {
    setSelectedMovie([title, img, releaseDate, overview, genres, id]);
    setIsModalOpen(true);
  };

  const incrementPage = () => {
    setPageNumber((pageNumber) => pageNumber + 1);
  };

  const toggleViewChange = (newView) => {
    if (newView === view && movies.length > 0) {
      return;
    }
    setCurrentView(newView);
    setPageNumber(1);
    setMovies([]);
    setOriginalMovies(movies);

    if (newView == "nowPlaying") {
      setIsSearching(false);
      setSearchQuery("");
    } else if (newView === "search") {
      setIsSearching(true);
      if (lastSearchQuery) {
        setSearchQuery(lastSearchQuery);
      }
    }
    setCurrentView(newView);
  };

  useEffect(() => {
    if (isSearching && view !== "search") {
      setCurrentView("search");
    } else if (!isSearching && view !== "nowPlaying") {
      setCurrentView("nowPlaying");
    }
  }, [isSearching]);

  const getGenres = (genreIds) => {
    let genreList = [];

    genreIds.forEach((id) => {
      genreList.push(" " + genreMapping[id]);
    });
    return genreList;
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const apiKey = import.meta.env.VITE_APP_API_KEY;

        const response = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie data");
        }
        const data = await response.json();

        let genreDict = {};
        data["genres"].forEach((genre) => {
          genreDict[genre.id] = genre.name;
        });

        setGenreMapping(genreDict);
        setGenres(data["genres"]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = import.meta.env.VITE_APP_API_KEY;

        let url;
        if (isSearching && searchQuery) {
          url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            searchQuery
          )}&include_adult=false&language=en-US&page=1`;
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
          setOriginalMovies(data.results);
          setMovies(data.results);
        } else {
          setOriginalMovies((prevMovies) => [...prevMovies, ...data.results]);
          setMovies((prevMovies) => [...prevMovies, ...data.results]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(pageNumber);
  }, [pageNumber, searchQuery, isSearching]);

  useEffect(() => {
    let sortedMovies = originalMovies;
    if (sortCriteria === "no sort") {
      setMovies(originalMovies);
    } else if (sortCriteria === "Sort by title") {
      sortedMovies = [...movies].sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      );
      setMovies(sortedMovies);
    } else if (sortCriteria === "Sort by release date") {
      sortedMovies = [...movies].sort((a, b) =>
        b.release_date.localeCompare(a.release_date)
      );
      setMovies(sortedMovies);
    } else if (sortCriteria === "Sort by vote average") {
      sortedMovies = [...movies].sort(
        (a, b) => b.vote_average - a.vote_average
      );
      setMovies(sortedMovies);
    }
  }, [sortCriteria]);

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
      {view === "search" && searchQuery && (
        <h3> Search results for : {searchQuery}</h3>
      )}
      {view === "search" && !searchQuery && (
        <h3> Enter a search term to find movies! {searchQuery}</h3>
      )}

      {view === "nowPlaying" && <h3> Now playing: </h3>}
      <div className="MovieList">
        {movies.map((element) => (
          <div
            className="MovieCard"
            key={element.id}
            onClick={() =>
              handleMovieClick(
                element.title,
                `https://image.tmdb.org/t/p/w500${element.poster_path}`,
                element.release_date,
                element.overview,
                getGenres(element.genre_ids),
                element.id
              )
            }
          >
            <MovieCard
              id={element.id}
              title={element.title}
              posterPath={`https://image.tmdb.org/t/p/w500${element.poster_path}`}
              voteAverage={element.vote_average}
              checked={checked}
              setChecked={setChecked}
              liked={liked}
              setLiked={setLiked}
              onCardClick={() =>
                handleMovieClick(
                  element.title,
                  `https://image.tmdb.org/t/p/w500${element.poster_path}`,
                  element.release_date,
                  element.overview,
                  getGenres(element.genre_ids)
                )
              }
            />
          </div>
        ))}
      </div>
      {isModalOpen && (
        <MovieModal
          onClose={() => setIsModalOpen(false)}
          movie={selectedMovie}
        ></MovieModal>
      )}
      {pageNumber < totalPages && !isSearching && (
        <div className="loadBtn">
          <button type="button" id="loadMore" onClick={incrementPage}>
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
