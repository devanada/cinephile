/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, lazy } from "react";
import axios from "axios";
import "../styles/App.css";
const Layout = lazy(() => import("../components/Layout"));
const MovieCard = lazy(() => import("../components/MovieCard"));
const MovieLoading = lazy(() => import("../components/MovieLoading"));

const Homepage = () => {
  const [skeleton] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchData(page);
  }, []);

  const handleScrollFetch = async (e) => {
    let element = e.target;
    const bottom =
      element.scrollHeight - element.scrollTop === element.clientHeight;
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

  return (
    <Layout onScroll={handleScrollFetch}>
      <h1 className="text-slate-900 dark:text-white text-5xl text-center">
        Now Playing
      </h1>
      <div className="grid grid-flow-row auto-rows-max grid-cols-2 md:grid-cols-4 lg:grid-cols-5 m-2">
        {loading
          ? skeleton.map((item) => {
              return <MovieLoading key={item} />;
            })
          : movies.map((item) => {
              return (
                <MovieCard
                  key={item.id}
                  item={item}
                  navigate={`/detail/${item.id}`}
                />
              );
            })}
      </div>
    </Layout>
  );
};

export default Homepage;
