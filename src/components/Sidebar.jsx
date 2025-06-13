import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";

export function Sidebar({ liked, checked, movies }) {
  return (
    <div className="sidebarDiv">
      <div className="favoriteMovies">
        <div className="sidebarTitle">
          <FontAwesomeIcon icon={faHeartSolid} style={{ color: "#F06A71" }} />
          <h2> Favorited Movies </h2>
        </div>
        {liked.map((id) => {
          const movie = movies.find((m) => m.id === id);
          return <p key={id}>{movie ? movie.title : id}</p>;
        })}
      </div>
      <div className="watchedMovies">
        <div className="sidebarTitle">
          <FontAwesomeIcon icon={faEye} style={{ color: "#B7DDF0" }} />
          <h2> Watched List </h2>
        </div>
        {checked.map((id) => {
          const movie = movies.find((m) => m.id === id);
          return <p key={id}>{movie ? movie.title : id}</p>;
        })}
      </div>
    </div>
  );
}
