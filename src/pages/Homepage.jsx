import { Component } from "react";
import axios from "axios";
import { Layout } from "../components/Layout";
import { MovieCard, MovieLoading } from "../components/MovieCard";
import "../styles/App.css";

export default class Homepage extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      skeleton: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      isReady: false,
      page: 1,
    };
  }

  async componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${this.state.page}`
      )
      .then((response) => {
        this.setState({
          data: response.data.results,
          isReady: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // fetch(
    //   `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${this.state.page}`
    // )
    //   .then((response) => response.json())
    //   .then((res) => {
    //     this.setState({ data: res.results, isReady: true });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  async addFavorite(item) {
    let getLocal = JSON.parse(localStorage.getItem("favorites"));
    if (getLocal) {
      /*
      Bikin variabel find untuk mengecek apakah item yang diklik sudah ada di local storage
      const findIsExist = (pakai function find)
      Setelah mencari, buat satu conditional ketika findIsExist ada, maka item tidak di push, melainkan di remove, selain itu 
      berarti di push
      */
      getLocal.push(item);
      localStorage.setItem("favorites", JSON.stringify(getLocal));
    } else {
      localStorage.setItem("favorites", JSON.stringify([item]));
    }
  }

  render() {
    return (
      <Layout>
        <h1 className="text-slate-900 dark:text-white text-5xl text-center">
          Now Playing
        </h1>
        <div className="grid grid-flow-row auto-rows-max grid-cols-2 sm:grid-cols-5 m-2">
          {this.state.isReady
            ? this.state.data.map((item) => {
                return <MovieCard item={item} />;
              })
            : this.state.skeleton.map((item) => {
                return <MovieLoading item={item} />;
              })}
        </div>
      </Layout>
    );
  }
}
