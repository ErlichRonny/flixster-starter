export function Sidebar({ liked, checked }) {
  return (
    <div className="sidebarDiv">
      <div className="favoriteMovies">
        <h2> Favorited Movies </h2>
        <p> {liked} </p>
        {liked.map((movie) => (
          <p> {movie} </p>
        ))} 
      </div>
      <div className="watchedMovis">
        <h2> Watched List </h2>
        {checked.map((movie) => (
          <p> {movie} </p>
        ))}
      </div>
    </div>
  );
}
