/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Layout } from "../components/Layout";
import { MovieCard, MovieLoading } from "../components/MovieCard";
import { useFetchGet } from "../utils/customHooks";
import "../styles/App.css";

const Homepage = () => {
  const [data] = useFetchGet("https://jsonplaceholder.typicode.com/todos/1");
  const [movies, setMovies] = useState([]);
  const [skeleton] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [isReady, setIsReady] = useState(false);
  const [page, setPage] = useState(1);
  const h1Ref = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
      )
      .then((response) => {
        document.title = "Cinephile";
        setMovies(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsReady(true));
  };

  const addFavorite = (item) => {
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
  };

  // console.log(data); // <~~~~~~~ USE CUSTOM HOOKS
  return (
    <Layout>
      <h1
        ref={h1Ref}
        className="text-slate-900 dark:text-white text-5xl text-center"
      >
        Now Playing
      </h1>
      <div className="grid grid-flow-row auto-rows-max grid-cols-2 sm:grid-cols-5 m-2">
        {isReady
          ? movies.map((item) => {
              return (
                <MovieCard
                  item={item}
                  navigate={`/detail/${item.id}`}
                  onClick={() => console.log(h1Ref)}
                />
              );
            })
          : skeleton.map((item) => {
              return <MovieLoading item={item} />;
            })}
      </div>
    </Layout>
  );
};

export default Homepage;
