import React from "react";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const Movie = ({
  title,
  poster_path,
  overview,
  vote_average,
  setSelectedMovie,
}) => {
  return (
    <div className="movie">
      <img
        src={
          poster_path
            ? IMGPATH + poster_path
            : "https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
        alt={title}
      />
      <div className="movieInfo">
        <h3>{title}</h3>
        <span>{vote_average}</span>{" "}
        {/* <h6
          onClick={() => {
            setSelectedMovie(IMGPATH + poster_path);
          }}
        >
          Add to Wishlist
        </h6> */}
      </div>
      <div className="movieOverview">
        <h2>Overview:</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default Movie;
