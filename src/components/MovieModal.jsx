import { createPortal } from "react-dom";

export default function MovieModal({ onClose, movie }) {
  return (
    <div className="movieModal">
      <div className="modalContent">
        <button onClick={onClose} id="closeModalBtn">
          𝘅
        </button>
        <h2 id="movieTitle"> {movie[0]} </h2>
        <img src={movie[1]} className="modalImg" />
        <p> Release date: {movie[2]} </p>
        <p> Overview: {movie[3]} </p>
        <p> Genres: {movie[4].join()} </p>
        {createPortal(<p> {movie} </p>, document.body)}
      </div>
    </div>
  );
}
