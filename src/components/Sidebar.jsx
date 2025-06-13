export function Sidebar({ liked, checked, movies }) {
  return (
    <div className="sidebarDiv">
      <div className="favoriteMovies">
        <h2> Favorited Movies </h2>
        {liked.map((id) => {
          const movie = movies.find((m) => m.id === id);
          return <p key={id}>{movie ? movie.title : id}</p>;
        })}
      </div>
      <div className="watchedMovies">
        <h2> Watched List </h2>
        {checked.map((id) => {
          const movie = movies.find((m) => m.id === id);
          return <p key={id}>{movie ? movie.title : id}</p>;
        })}
      </div>
    </div>
  );
}
