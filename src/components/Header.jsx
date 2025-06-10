export default function Header() {
  return (
    <div className="header">
      <h2 id="websiteTitle"> Flixster </h2>
      <div className="searchBar">
        <input type="search" placeholder="" />
        <button> Search </button>
      </div>
      <div className="dropDown">
        <select name="sortMovies">
            <option value="select 1"> Select 1</option>
        </select>
      </div>
    </div>
  );
}
