import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import defaultPoster from "../assets/default_poster.png";

export default function MovieModal({ onClose, movie }) {
  const [trailerKey, setTrailerKey] = useState("");

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const apiKey = import.meta.env.VITE_APP_API_KEY;

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie[5]}/videos?language=en-US`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie data");
        }
        const data = await response.json();

        data.results.forEach((video) => {
          if (
            video.site === "YouTube" &&
            video.type === "Trailer" &&
            video.official
          ) {
            setTrailerKey(video.key);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchTrailer();
  }, [movie]);

  return (
    <>
      <div className="modal-backdrop">
        <div className="movieModal">
          <div className="modalContent">
            <button onClick={onClose} id="closeModalBtn">
              𝘅
            </button>
            <h2 id="modalTitle"> {movie[0]} </h2>
            <div className="modalMedia">
              <img
                src={!movie[1].endsWith("null") ? movie[1] : defaultPoster}
                className="modalImg"
                alt={`Poster for ${movie[0]}`}
              />
              <iframe
                width="100%"
                height="430"
                src={`https://www.youtube.com/embed/${trailerKey}`}
              ></iframe>
            </div>
            <p> Release date: {movie[2]} </p>
            <p> Overview: {movie[3]} </p>
            <p> Genres: {movie[4].join()} </p>
            {createPortal(<p> {movie} </p>, document.body)}
          </div>
        </div>{" "}
      </div>
    </>
  );
}
