import { useEffect, useState } from "react";

import MovieCard from "./MovieCard.jsx";

export default function MovieList({ pageNumber, setPageNumber }) {
  const [movies, setMovies] = useState([]);

  const incrementPage = () => {
    setPageNumber((pageNumber) => pageNumber + 1);
  };

  useEffect(() => {
    const fetchData = async (pageNumber) => {
      try {
        const apiKey = import.meta.env.VITE_APP_API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNumber}`,
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
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(pageNumber);
  }, [pageNumber]);

  return (
    <>
      <div className="loadBtn">
        <button type="button" onClick={incrementPage}>
          Load More
        </button>
      </div>

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
    </>
  );
}
