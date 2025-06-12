export default function MovieCard({
  title,
  posterPath,
  voteAverage,
  checked,
  setChecked,
  liked,
  setLiked,
}) {
  const handleCheckboxChange = () => {
    checked.includes(title)
      ? setChecked(checked.filter((movieTitle) => movieTitle !== title))
      : setChecked([...checked, title]);

    console.log(checked);
  };
  const handleLike = (event) => {
    console.log('handleliked called');
    event.stopPropagation();
    liked.includes(title)
      ? setLiked(liked.filter((movieTitle) => movieTitle !== title))
      : setLiked([...liked, title]);
    console.log(liked);
  };
  

  return (
    <div>
      <h2 id="movieTitle"> {title}</h2>
      {checked.includes(title) && <p> ✅ </p>}
      <img src={posterPath} className="movieImg" />
      <p id="movieVoteAverage"> Vote average: {voteAverage}</p>
      <div>
        <input
          type="checkbox"
          id="watchedBox"
          onClick={(event) => event.stopPropagation()}
          onChange={handleCheckboxChange}
        />
        <label for="watched" id="watchedText">
          {" "}
          Watched?{" "}
        </label>
      </div>
      <button type="button" className="likeButton" onClick={handleLike}>
        {liked.includes(title) ? "❤️" : "♡"}
      </button>
    </div>
  );
}
