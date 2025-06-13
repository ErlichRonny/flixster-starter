export function Sidebar({ liked, checked }) {
  return (
    <div className="sidebarDiv">
      <div className="favoriteMovies">
        <h2> Favorited Movies </h2>
        <p> {liked} </p>
        {liked.map((movie) => (
          <p key={movie}> {movie} </p>
        ))} 
      </div>
      <div className="watchedMovies">
        <h2> Watched List </h2>
        {checked.map((movie) => (
          <p key={movie}> {movie} </p>
        ))}
      </div>
    </div>
  );
}
