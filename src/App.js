import "./App.css";
import Movie from "./components/Movie";
import React, { useEffect, useState } from "react";
import "./theme.css";

const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";

const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const trend =
  "http://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const bestDrama =
  "http://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const rRated =
  "http://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=revenue.desc&with_cast=3896&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const kid =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=cartoon";

const superH =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=marvel";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [theme, setTheme] = useState("dark");
  // const [selectedMovie, setSelectedMovie] = useState(null);
  // const [list, setList] = useState([]);

  const fetchMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        console.log(data.results);
      });
  };

  useEffect(() => {
    fetchMovies(APIURL + 1);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchMovies(SEARCHAPI + searchTerm);

      // setSearchTerm("");
      setPageNumber(1);
    }
  };

  const changeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const prevPage = () => {
    if (pageNumber > 1) {
      const pgNo = pageNumber - 1;
      setPageNumber(pgNo);
      if (searchTerm) {
        fetchMovies(SEARCHAPI + searchTerm + "&page=" + pgNo);
      } else {
        fetchMovies(
          "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=" +
            pgNo
        );
      }
    }
  };
  const nextPage = () => {
    const pgNo = pageNumber + 1;
    setPageNumber(pgNo);
    if (searchTerm) {
      fetchMovies(SEARCHAPI + searchTerm + "&page=" + pgNo);
    } else {
      fetchMovies(
        "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=" +
          pgNo
      );
    }
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

  return (
    <div className={`App ${theme}`}>
      <header>
        <span
          onClick={() => {
            fetchMovies(APIURL + 1);
          }}
        >
          ThinkMovie
        </span>
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

        <form onSubmit={submitHandler}>
          <input
            className="searchbar"
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={changeHandler}
          />
          <button
            className={"theme-button"}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? "🌛" : "🌞"}
          </button>
        </form>
      </header>
      <nav>
        {" "}
        <button onClick={prevPage}>&#60;</button>
        <span>Page {pageNumber}</span>
        <button onClick={nextPage}>&#62;</button>
      </nav>

      <div className="movieContainer">
        {movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
      <nav className="bottomNav">
        {" "}
        <button onClick={prevPage}>&#60;</button>
        <span>Page {pageNumber}</span>
        <button onClick={nextPage}>&#62;</button>
      </nav>
    </div>
  );
}

export default App;
