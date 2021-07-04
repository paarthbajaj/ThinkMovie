import "./App.css";
import Movie from "./components/Movie";
import React, { useEffect, useState } from "react";
import "./theme.css";
import Navbar from "./Navbar";

const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";

const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const moviePage = "moviePage";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [theme, setTheme] = useState("light");
  const [watchlist, setWatchlist] = useState([]);
  const [page, setPage] = useState(moviePage);

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

  const prevPage = () => {
    if (pageNumber > 1) {
      const pgNo = pageNumber - 1;
      setPageNumber(pgNo);
      if (searchTerm) {
        fetchMovies(SEARCHAPI + searchTerm + "&page=" + pgNo);
      } else {
        fetchMovies(
          "http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=" +
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
        "http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=" +
          pgNo
      );
    }
  };

  const addToWatchlist = (watchlistedMovie) => {
    console.log(watchlist);
    setWatchlist([...watchlist, { ...watchlistedMovie }]);
  };

  const removeFromWatchlist = (removeMovie) => {
    console.log(watchlist);
    setWatchlist(watchlist.filter((rmovie) => rmovie !== removeMovie));
  };

  return (
    <div className={`App ${theme}`}>
      <Navbar
        setMovies={setMovies}
        setPageNumber={setPageNumber}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        theme={theme}
        setTheme={setTheme}
        setPage={setPage}
        page={page}
      />

      {page === moviePage && (
        <nav>
          {" "}
          <button onClick={prevPage}>&#60;</button>
          <span>Page {pageNumber}</span>
          <button onClick={nextPage}>&#62;</button>
        </nav>
      )}

      <div className="movieContainer">
        {
          <Movie
            addToWatchlist={addToWatchlist}
            movies={movies}
            page={page}
            watchlist={watchlist}
            removeFromWatchlist={removeFromWatchlist}
          />
        }
      </div>
      {page === moviePage && (
        <nav className="bottomNav">
          {" "}
          <button onClick={prevPage}>&#60;</button>
          <span>Page {pageNumber}</span>
          <button onClick={nextPage}>&#62;</button>
        </nav>
      )}
    </div>
  );
}

export default App;
