import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faHeart as faHeartSolid,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

export function Sidebar({ liked, checked, movies, view, setView }) {
  return (
    <div className="sidebarDiv">
      <div className="allMovies">
        <button className="sidebarTitle" id="sidebarBtn" onClick={() => setView("nowPlaying")}>
          <FontAwesomeIcon icon={faHome} style={{ color: "white" }} />
          <h2> Home </h2>
        </button>
      </div>
      <div className="favoriteMovies">
        <button className="sidebarTitle" id="sidebarBtn" onClick={() => setView("liked")}>
          <FontAwesomeIcon icon={faHeartSolid} style={{ color: "#F06A71" }} />
          <h2> Favorites </h2>
        </button>
      </div>
      <div className="watchedMovies">
        <button className="sidebarTitle" id="sidebarBtn" onClick={() => setView("watched")}>
          <FontAwesomeIcon icon={faEye} style={{ color: "#B7DDF0" }} />
          <h2> Watched List </h2>
        </button>
      </div>
    </div>
  );
}
