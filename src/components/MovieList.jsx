import { useEffect, useState } from "react";

import MovieCard from "./MovieCard.jsx";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = import.meta.env.VITE_APP_API_KEY;
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                `Bearer ${apiKey}`,
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
    fetchData();
  }, []);

  return (
    <div className="MovieList">
      {movies.map((element) => (
        <div className="MovieCard" key={element.id}>
          <MovieCard
            title={element.title}
            posterPath={element.poster_path}
            voteAverage={element.vote_average}
          />
        </div>
      ))}
    </div>
  );
}
