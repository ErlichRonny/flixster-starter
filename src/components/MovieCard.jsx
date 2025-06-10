export default function MovieCard(props) {
  return (
    <div>
      <h2 id="movieTitle"> {props.title}</h2>
      <img src={props.posterPath} className="movieImg"/>
      <p id="movieVoteAverage"> Vote average: {props.voteAverage}</p>
    </div>
  );
}
