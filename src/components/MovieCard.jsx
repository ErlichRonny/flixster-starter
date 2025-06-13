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
    setChecked((prevChecked) =>
      prevChecked.includes(id)
        ? prevChecked.filter((movieId) => movieId !== id)
        : [...prevChecked, id]
    );
  };
  const handleLike = (event) => {
    event.stopPropagation();
    setLiked((prevLiked) =>
      prevLiked.includes(id)
        ? prevLiked.filter((movieId) => movieId !== id)
        : [...prevLiked, id]
    );
  };

  return (
    <article onClick={onCardClick}>
      <h2 id="mainMovieTitle"> {title}</h2>
      <div className="iconDiv">
        {checked.includes(id) && (
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
      <p id="movieVoteAverage">
        {" "}
        Vote average: {Math.round(voteAverage * 10) / 10}
      </p>
      <div>
        <input
          type="checkbox"
          id="watchedBox"
          checked={checked.includes(id)}
          onClick={(event) => event.stopPropagation()}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="watched" id="watchedText">
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
    </article>
  );
}
