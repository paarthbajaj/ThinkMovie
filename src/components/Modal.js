import React from "react";
// const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const Modal = ({ selectedMovie }) => {
  //   const clickHandler = (e) => {
  //     if (e.target.classList.contains("blanket")) {
  //       setSelectedImage(null);
  //     }
  //   };

  return (
    <div className="blanket">
      {/* <li>
        {list.map(() => {
          <img src={selectedMovie} alt="random" />;
        })} */}
      <img src={selectedMovie} alt="random" />
      {/* </li> */}

      {/* <div>
        <h2>Overview:</h2>
        <p>{overview}</p>
      </div> */}
    </div>
  );
};
export default Modal;
