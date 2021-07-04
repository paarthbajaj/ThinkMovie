import React from "react";
const IMGPATH = "http://image.tmdb.org/t/p/w1280";

const moviePage = "moviePage";
const watchlistedPage = "watchlistedPage";

const Movie = ({
  addToWatchlist,
  watchlist,
  movies,
  page,
  removeFromWatchlist,
}) => {
  return (
    <>
      {console.log(page)}
      {page === moviePage &&
        movies.map((movie) => (
          <div className="movie">
            <img
              src={
                movie.poster_path
                  ? IMGPATH + movie.poster_path
                  : "http://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              }
              alt={movie.title}
            />
            <div className="movieInfo">
              <h3>{movie.title}</h3>
              <span>{movie.vote_average}</span>{" "}
            </div>
            <div className="movieOverview">
              <h2>Overview:</h2>
              <button
                onClick={() => addToWatchlist(movie)}
                className="watchlistCard"
              >
                + Add to watchlist
              </button>
              <p>{movie.overview}</p>
            </div>
          </div>
        ))}
      {page === watchlistedPage && watchlist.length > 0
        ? watchlist.map((movie) => (
            <div className="movie">
              <img
                src={
                  movie.poster_path
                    ? IMGPATH + movie.poster_path
                    : "http://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                }
                alt={movie.title}
              />
              <div className="movieInfo">
                <h3>{movie.title}</h3>
                <span>{movie.vote_average}</span>{" "}
              </div>
              <div className="movieOverview">
                <h2>Overview:</h2>
                <button
                  onClick={() => removeFromWatchlist(movie)}
                  className="watchlistCard"
                  style={{ fontSize: "11px" }}
                >
                  - Remove from Watchlist
                </button>
                <p>{movie.overview}</p>
              </div>
            </div>
          ))
        : page === watchlistedPage && (
            <h3 style={{ marginTop: "10vh" }}>
              Not a single movie added in the watchlist 😓
            </h3>
          )}
    </>
  );
};

export default Movie;
