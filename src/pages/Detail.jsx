/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Layout } from "../components/Layout";

const Detail = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { movie_id } = params;
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((response) => {
        setMovie(response.data);
        document.title = `Cinephile - ${response.data.title}`;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsReady(true));
  };

  return (
    <Layout>
      <h1 className="text-slate-900 dark:text-white text-5xl text-center">
        {isReady ? movie.title : "Loading..."}
      </h1>
    </Layout>
  );
};

export default Detail;
