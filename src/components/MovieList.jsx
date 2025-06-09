import data from "../data/data.js";
import MovieCard from "./MovieCard.jsx";

export default function MovieList() {
  return (
    <div className="MovieList">
      {data.results.map((element) => (
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
