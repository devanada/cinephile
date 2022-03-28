/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { reduxAction } from "../utils/redux/actions/action";
import { ThemeContext } from "../utils/context";
import { Layout } from "../components/Layout";

const Detail = () => {
  const params = useParams();
  const theme = useContext(ThemeContext);
  const movie = useSelector((state) => state.movie);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
    getFavMovies();
  }, []);

  const getFavMovies = () => {
    const favMovies = JSON.parse(localStorage.getItem("favorites"));
    dispatch(reduxAction("GET_FAVORITES", favMovies));
  };

  const fetchData = async () => {
    dispatch(reduxAction("FETCH_START"));
    const { movie_id } = params;
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((response) => {
        dispatch(reduxAction("FETCH_MOVIE_SUCCESS", response.data));
        document.title = `Cinephile - ${response.data.title}`;
      })
      .catch((err) => {
        console.log(err);
        dispatch(reduxAction("FETCH_FAILURE"));
      });
  };

  return (
    <Layout>
      <h1 className="text-slate-900 dark:text-white text-5xl text-center">
        {!loading ? movie.title : "Loading..."}
      </h1>
    </Layout>
  );
};

export default Detail;
