import { useState } from "react";
export default function MovieCard(props) {
  const [checked, setChecked] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
    console.log(checked);
  };
  const handleLike = (event) => {
    event.stopPropagation();
    liked ? setLiked(false) : setLiked(true);
  };

  return (
    <div>
      <h2 id="movieTitle"> {props.title}</h2>
      {checked && <p> ✅ </p>}
      <img src={props.posterPath} className="movieImg" />
      <p id="movieVoteAverage"> Vote average: {props.voteAverage}</p>
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
        {liked ? "❤️" : "♡"}
      </button>
    </div>
  );
}
