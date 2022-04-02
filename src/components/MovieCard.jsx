import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ item, navigate, onClick }) => {
  return (
    <div
      key={item.id}
      className="container grow m-2 p-3 flex flex-col justify-between"
    >
      <Link to={navigate}>
        <img
          className="max-w-full h-auto"
          width="500"
          height="750"
          src={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={item.poster_path}
        />
        <p
          className="text-center text-slate-900 dark:text-white font-bold text-xl mb-2"
          onClick={onClick}
        >
          {item.title}
        </p>
      </Link>
      <button className="bg-neutral-500 rounded text-white" onClick={onClick}>
        Add to Favorite
      </button>
    </div>
  );
};

export default MovieCard;
