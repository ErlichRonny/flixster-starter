export default function MovieCard(props) {
  return (
    <div>
      <h2>Movie title: {props.title}</h2>
      <p>Movie poster image: {props.posterPath}</p>
      <p>Movie vote average: {props.voteAverage}</p>
    </div>
  );
}
