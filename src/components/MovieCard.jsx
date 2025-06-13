import defaultPoster from "../assets/default_poster.png";

export default function MovieCard({
  id,
  title,
  posterPath,
  voteAverage,
  checked,
  setChecked,
  liked,
  setLiked,
  onCardClick,
}) {
  const handleCheckboxChange = () => {
    checked.includes(title)
      ? setChecked(checked.filter((movieTitle) => movieTitle !== title))
      : setChecked([...checked, title]);

    console.log(checked);
  };
  const handleLike = (event) => {
    console.log("handleLike called for:", title);
    event.stopPropagation();
    setLiked((prevLiked) =>
      prevLiked.includes(id)
        ? prevLiked.filter((movieId) => movieId !== id)
        : [...prevLiked, id]
    );
  };

  return (
    <div onClick={onCardClick}>
      <h2 id="movieTitle"> {title}</h2>
      <div class="iconDiv">
        {checked.includes(title) && <p> ✅ </p>}
        {liked.includes(id) && <p> ❤️ </p>}
      </div>
      <img
        src={!posterPath.endsWith("null") ? posterPath : defaultPoster}
        className="movieImg"
      />
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
        {liked.includes(id) ? "❤️" : "♡"}
      </button>
    </div>
  );
}
