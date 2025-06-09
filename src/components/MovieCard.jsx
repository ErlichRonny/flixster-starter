export default function MovieCard(props) {
  return (
    <div>
      <h2 id="movieTitle"> {props.title}</h2>
      <p> {props.posterPath}</p>
      <p id="movieVoteAverage"> Vote average: {props.voteAverage}</p>
    </div>
  );
}
