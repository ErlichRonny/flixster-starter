import defaultPoster from "../assets/default_poster.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";

import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

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
      <h2 id="mainMovieTitle"> {title}</h2>
      <div class="iconDiv">
        {checked.includes(title) && (
          <FontAwesomeIcon icon={faEye} style={{ color: "#B7DDF0" }} />
        )}
        {liked.includes(id) && (
          <FontAwesomeIcon icon={faHeartSolid} style={{ color: "#F06A71" }} />
        )}
      </div>
      <img
        src={!posterPath.endsWith("null") ? posterPath : defaultPoster}
        className="movieImg"
        alt={`Poster for ${title}`}
      />
      <p id="movieVoteAverage"> Vote average: {Math.round(voteAverage * 10) / 10}</p>
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
      <button type="button" id="likeButton" onClick={handleLike}>
        {liked.includes(id) ? (
          <FontAwesomeIcon icon={faHeartSolid} style={{ color: "white" }} />
        ) : (
          <FontAwesomeIcon icon={faHeartRegular} />
        )}
      </button>
    </div>
  );
}
