import React from "react";

const APIURL =
  "http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";

const SEARCHAPI =
  "http://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const trend =
  "http://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const bestDrama =
  "http://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const rRated =
  "http://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=revenue.desc&with_cast=3896&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const kid =
  "http://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=cartoon";

const superH =
  "http://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=marvel";

const moviePage = "moviePage";
const watchlistedPage = "watchlistedPage";

const Navbar = (props) => {
  const {
    setMovies,
    setPageNumber,
    theme,
    setTheme,
    searchTerm,
    setSearchTerm,
    setPage,
    page,
  } = props;

  const changeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchMovies(SEARCHAPI + searchTerm);
      setPageNumber(1);
    }
  };

  const fetchMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        console.log(data.results);
      });
  };

  const trending = () => {
    fetchMovies(trend);
  };

  const dramas = () => {
    fetchMovies(bestDrama);
  };
  const superhero = () => {
    fetchMovies(superH);
  };
  const rated = () => {
    fetchMovies(rRated);
  };
  const kids = () => {
    fetchMovies(kid);
  };

  const clickHandler = () => {
    setPage(watchlistedPage);
  };
  return (
    <div className={`App ${theme}`}>
      <header>
        <span
          onClick={() => {
            fetchMovies(APIURL + 1);
            setPage(moviePage);
          }}
        >
          ThinkMovie
        </span>
        {page === moviePage && (
          <div className="links">
            <button onClick={trending}>Trending right now!</button>
            <button onClick={dramas}>Best Dramas</button>
            <button onClick={superhero}>Superheroes</button>
            <button onClick={rated}>Romance &amp; Crime</button>
            <button
              style={{
                fontFamily: "Permanent Marker",
                fontSize: "1.3rem",
                color: "var(--theme-kids-button)",
                marginLeft: "1.8rem",
              }}
              onClick={kids}
            >
              Kids
            </button>
          </div>
        )}

        <form onSubmit={submitHandler}>
          <button onClick={clickHandler} className="watchlist">
            WATCHLIST
          </button>
          <input
            className="searchbar"
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={changeHandler}
          />
        </form>
        <button
          className={"theme-button"}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌛" : "🌞"}
        </button>
      </header>
    </div>
  );
};

export default Navbar;
