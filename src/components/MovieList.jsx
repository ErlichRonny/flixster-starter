import { useEffect, useState } from "react";

import MovieCard from "./MovieCard.jsx";

export default function MovieList({
  pageNumber,
  setPageNumber,
  searchQuery,
  isSearching,
}) {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const incrementPage = () => {
    setPageNumber((pageNumber) => pageNumber + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = import.meta.env.VITE_APP_API_KEY;

        let url;
        if (isSearching && searchQuery) {
          url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            searchQuery
          )}&include_adult=false&language=en-US&page=1`;
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

  useEffect(() => {
    setMovies([]);
    setPageNumber(1);
  }, [isSearching, searchQuery, setPageNumber]);

  return (
    <>
      {isSearching && <h3> Search results for : {searchQuery}</h3>}
      {!isSearching && <h3> Now playing: </h3>}
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
        {pageNumber < totalPages && (
          <div className="loadBtn">
            <button type="button" onClick={incrementPage}>
              Load More
            </button>
          </div>
        )}
        {pageNumber == totalPages && (
          <div className="no-results">
            <p> No movies found </p>
          </div>
        )}
      </div>
    </>
  );
}
