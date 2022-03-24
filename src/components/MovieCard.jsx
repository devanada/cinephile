import React from "react";
import { Link } from "react-router-dom";

const MovieCard = (props) => {
  return (
    <div
      key={props.item.id}
      className="container grow m-2 p-3 flex flex-col justify-between"
    >
      <Link to={props.navigate}>
        <img
          src={
            props.item.poster_path
              ? `https://image.tmdb.org/t/p/w500${props.item.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={props.item.poster_path}
        />
        <p
          className="text-center text-slate-900 dark:text-white font-bold text-xl mb-2"
          onClick={props.onClick}
        >
          {props.item.title}
        </p>
      </Link>
      <button className="bg-neutral-500 rounded text-white">
        Add to Favorite
      </button>
    </div>
  );
};

const MovieLoading = (props) => {
  return (
    <div
      key={props.item}
      className="grow m-2 p-3 flex flex-col justify-between"
    >
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-5 py-1">
          <div className="h-52 bg-slate-700 rounded" />
          <div className="space-y-2">
            <div className="h-6 bg-slate-700 rounded" />
            <div className="h-6 bg-slate-700 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { MovieCard, MovieLoading };
