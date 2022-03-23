import { Component } from "react";
import axios from "axios";
import { Layout } from "../components/Layout";
import Header from "../components/Header";
import "../styles/App.css";

export default class Homepage extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
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
        this.setState({ data: response.data.results, isReady: true });
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
    if (this.state.isReady) {
      return (
        <div className="main-con">
          <Header />
          <Layout>
            <h1 className="text-white text-5xl">Now Playing</h1>
            <div className="grid grid-flow-row-dense grid-cols-4 grid-rows-4">
              {this.state.data.map((item) => {
                return (
                  <div key={item.id} className="grow m-5">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.poster_path}
                    />
                    <p className="text-center text-white font-bold text-xl">
                      {item.title}
                    </p>
                    <button
                      className="bg-indigo-500 rounded-none"
                      onClick={() => this.addFavorite(item)}
                    >
                      Favorite
                    </button>
                  </div>
                );
              })}
            </div>
          </Layout>
        </div>
      );
    } else {
      return (
        <div className="container">
          <p>LAGI LOADING</p>
        </div>
      );
    }
  }
}
