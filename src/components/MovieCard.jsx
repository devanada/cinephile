import React, { Component } from "react";

class MovieCard extends Component {
  render() {
    return (
      <div
        key={this.props.item.id}
        className="grow m-2 p-3 flex flex-col justify-between"
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${this.props.item.poster_path}`}
          alt={this.props.item.poster_path}
        />
        <p className="text-center text-slate-900 dark:text-white font-bold text-xl">
          {this.props.item.title}
        </p>
        <button
          className="bg-sky-400 rounded font-bold"
          onClick={() => this.addFavorite(this.props.item)}
        >
          Add to Favorite
        </button>
      </div>
    );
  }
}

class MovieLoading extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [1, 2, 3, 4, 5],
    };
  }
  render() {
    return (
      <div
        key={this.props.item}
        className="grow m-2 p-3 flex flex-col justify-between"
      >
        <div class="animate-pulse flex space-x-4">
          <div class="flex-1 space-y-5 py-1">
            <div class="h-52 bg-slate-700 rounded" />
            <div class="space-y-2">
              <div class="h-6 bg-slate-700 rounded" />
              <div class="h-6 bg-slate-700 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { MovieCard, MovieLoading };
