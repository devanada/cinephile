/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Layout } from "../components/Layout";
import { MovieCard, MovieLoading } from "../components/MovieCard";
import "../styles/App.css";

const Homepage = () => {
  const [skeleton] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [page, setPage] = useState(1);
  const h1Ref = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(page);
  }, []);

  const funcTest = async (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      !noData && fetchData(page);
    }
  };

  const fetchData = async (page) => {
    const newPage = page + 1;
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
      )
      .then((response) => {
        const { results } = response.data;
        document.title = "Cinephile";
        const temp = [...movies];
        temp.push(...results);
        if (results.length === 0) setNoData(true);
        setMovies(temp);
        setPage(newPage);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
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

  return (
    <Layout onScroll={funcTest}>
      <h1
        ref={h1Ref}
        className="text-slate-900 dark:text-white text-5xl text-center"
      >
        Now Playing
      </h1>
      <div className="grid grid-flow-row auto-rows-max grid-cols-2 sm:grid-cols-5 m-2">
        {loading
          ? skeleton.map((item) => {
              return <MovieLoading item={item} />;
            })
          : movies.map((item) => {
              return (
                <MovieCard
                  item={item}
                  navigate={`/detail/${item.id}`}
                  onClick={() => console.log(h1Ref)}
                />
              );
            })}
      </div>
    </Layout>
  );
};

export default Homepage;
