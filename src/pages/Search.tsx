/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, FC, lazy, UIEvent } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { moviesType } from "../types/movies";
import { RootState } from "../utils/redux/reducers/reducer";
const Layout = lazy(() => import("../components/Layout"));
const Button = lazy(() => import("../components/Button"));
const MovieCard = lazy(() => import("../components/MovieCard"));
const MovieLoading = lazy(() => import("../components/MovieLoading"));

const Search: FC = () => {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const session_id = useSelector((state: RootState) => state.session_id || "");
  const user_id = useSelector((state: RootState) => state.user_id || "");
  const [skeleton] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [movies, setMovies] = useState<moviesType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [noData, setNoData] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [searchBy] = useState<any>([
    { id: 1, label: "Movie", value: "movie" },
    { id: 2, label: "Company", value: "company" },
    { id: 3, label: "People", value: "person" },
  ]);

  useEffect(() => {
    fetchData(1);
  }, [searchParams]);

  const fetchData = async (page: number) => {
    const query = searchParams.get("q") || " ";
    const type = searchParams.get("t") || "movie";
    const newPage = page + 1;
    await axios
      .get(
        `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=${page}`
      )
      .then((response) => {
        const { results } = response.data;
        document.title = `${query} - Cinephile search`;
        if (results.length === 0) setNoData(true);
        else {
          setMovies(results);
          setPage(newPage);
        }
      })
      .catch((err) => {
        navigate("/nowhere");
      })
      .finally(() => setLoading(false));
  };

  const handleScrollFetch = async (e: UIEvent<HTMLElement>) => {
    let element = e.target as HTMLElement;
    const bottom =
      element.scrollHeight - element.scrollTop === element.clientHeight;
    if (bottom) {
      if (!noData) {
        const newPage = page + 1;
        const query = searchParams.get("q") || " ";
        const type = searchParams.get("t") || "movie";
        await axios
          .get(
            `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=${page}`
          )
          .then((response) => {
            const { results } = response.data;
            const temp: moviesType[] = [...movies];
            temp.push(...results);
            if (results.length === 0) setNoData(true);
            else {
              setMovies(temp);
              setPage(newPage);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const handleFavorite = (item: moviesType) => {
    if (session_id === "") {
      navigate("/auth");
    } else {
      axios
        .post(
          `https://api.themoviedb.org/3/account/${user_id}/favorite?api_key=${process.env.REACT_APP_API_KEY}&session_id=${session_id}`,
          {
            media_type: "movie",
            media_id: item.id,
            favorite: true,
          }
        )
        .then((res) => {
          const { status_message } = res.data;
          alert(status_message);
        })
        .catch((err) => {
          const { status_message } = err.response.data;
          alert(status_message);
        });
    }
  };

  const changeQueryType = (val: any) => {
    searchParams.set("t", val);
    setSearchParams(searchParams);
  };

  return (
    <Layout onScroll={handleScrollFetch}>
      {/* <div className="flex m-2 justify-center gap-x-3">
        {searchBy.map((item: any) => (
          <div
            key={item.id}
            className={`text-white rounded-full px-4 py-1 font-bold ${
              searchParams.get("t") === item.value
                ? "bg-zinc-800"
                : "bg-neutral-500"
            }`}
            onClick={() => changeQueryType(item.value)}
          >
            {item.label}
          </div>
        ))}
      </div> */}
      <div className="grid grid-flow-row auto-rows-max grid-cols-2 md:grid-cols-4 lg:grid-cols-5 m-2 gap-3">
        {loading
          ? skeleton.map((item) => {
              return <MovieLoading key={item} />;
            })
          : movies.map((item) => {
              return (
                <MovieCard
                  key={item.id}
                  item={item}
                  button_label="Add to Favorite"
                  navigate={`/detail/${item.id}`}
                  onClick={() => handleFavorite(item)}
                />
              );
            })}
      </div>
      {!noData && (
        <Button
          id="btn-load-more"
          label="Load More"
          onClick={() => !noData && fetchData(page)}
        />
      )}
    </Layout>
  );
};

export default Search;
