import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import dayjs from "dayjs";

import Loading from "@/components/loading";
import Button from "@/components/button";
import { Layout, Layout2 } from "@/components/layout";
import MovieCard from "@/components/movie-card";
import MovieLoading from "@/components/movie-loading";
import Carousel from "@/components/carousel";

import {
  getDetailMovie,
  getSimilarMovies,
  postFavoriteMovie,
} from "@/utils/apis/movies";
import { MovieType, MovieVidsType } from "@/utils/apis/movies/types";
import { useToken } from "@/utils/contexts/token";
import { useTitle } from "@/utils/hooks";

const Detail = () => {
  const { movie_id } = useParams();
  const { userID } = useToken();

  const [loading] = useState<boolean>(false);
  const { isLoading, error, data } = useQuery({
    queryKey: ["detailMovie", movie_id],
    queryFn: (context) => getDetailMovie({ ...context, movie_id }),
  });
  const { isLoading: similarsLoading, data: similars } = useQuery({
    queryKey: ["similarMovie", movie_id],
    queryFn: (context) => getSimilarMovies({ ...context, movie_id }),
  });

  const handleFavorite = async (movie: MovieType) => {
    try {
      const payload = {
        media_type: "movie",
        media_id: movie.id,
        favorite: true,
      };
      const result = await postFavoriteMovie({ user_id: userID }, payload);
      const { status_message } = result;
      alert(status_message);
    } catch (error) {
      alert(error);
    }
  };

  useTitle(`${data?.title} - Cinephile`);

  if (isLoading) {
    return (
      <Layout>
        <Layout2>
          <Loading />
        </Layout2>
      </Layout>
    );
  } else if (error) {
    return <Navigate to="/404" />;
  } else {
    return (
      <Layout>
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${data?.backdrop_path})`,
          }}
          className="h-full w-full bg-cover bg-center bg-no-repeat"
        >
          <div className="flex h-full w-full flex-wrap items-center justify-center bg-gradient-to-t from-white p-6 dark:from-black">
            <div className="card w-4/5 gap-4 bg-glass p-3 shadow-lg shadow-black backdrop-blur-md lg:card-side lg:h-4/5">
              <img
                className="h-3/5 w-2/5 place-self-center object-contain md:h-4/5 md:w-3/5"
                src={
                  data?.poster_path
                    ? `https://image.tmdb.org/t/p/w500${data?.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={data?.poster_path}
              />
              <div className="card-body justify-between">
                <div className="flex flex-col">
                  <h1 className="text-center text-3xl font-bold text-black dark:text-white">
                    {data?.title}
                  </h1>
                  <p className="text-lg font-medium text-black dark:text-white">
                    Runtime:{" "}
                    <span className="font-normal text-black dark:text-white">
                      {data?.runtime} minutes{" "}
                    </span>
                  </p>
                  <p className="text-lg font-medium text-black dark:text-white">
                    Release date:{" "}
                    <span className="font-normal text-black dark:text-white">
                      {dayjs(data?.release_date).format("dddd, D MMMM YYYY")}
                    </span>
                  </p>
                  <p className="text-lg font-medium text-black dark:text-white">
                    Genre:{" "}
                    <span className="font-normal text-black dark:text-white">
                      {data?.genres
                        .map((genre) => {
                          return genre.name;
                        })
                        .join(", ")}
                    </span>
                  </p>
                  <p className="text-lg font-medium text-black dark:text-white">
                    Language:{" "}
                    <span className="font-normal">
                      {data?.original_language}
                    </span>
                  </p>
                  <p className="text-lg font-medium text-black dark:text-white">
                    Rating:{" "}
                    <span className="font-normal">
                      {data?.vote_average.toFixed(1)} ★ ({data?.vote_count})
                    </span>
                  </p>
                  <p className="text-lg font-medium text-black dark:text-white">
                    Overview:
                    <br />
                    <span className="font-normal">{data?.overview}</span>
                  </p>
                </div>
                <Button
                  id="btn-watch"
                  label="Watch Now"
                  onClick={() => window.open(data?.homepage)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-full">
          {data?.videos!.results.length !== 0 && (
            <Carousel
              datas={data!.videos!.results.slice(0, 8)}
              name="videos"
              fullWidth
              content={(data: MovieVidsType) => (
                <iframe
                  key={data.id}
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${data.key}`}
                  title={data.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            />
          )}
        </div>
        <div className="container flex flex-col">
          <h1 className="my-10 text-center text-5xl text-slate-900 dark:text-white">
            Similar Movie
          </h1>
          <div className="m-2 grid grid-flow-row auto-rows-max grid-cols-2 gap-3 pb-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {similarsLoading
              ? [...Array(20).keys()].map((item) => <MovieLoading key={item} />)
              : similars?.results.map((similar) => (
                  <MovieCard
                    key={similar.id}
                    item={similar}
                    button_label="Add to Favorite"
                    navigate={`/detail/${similar.id}`}
                    onClick={() => handleFavorite(similar)}
                    loading={loading}
                  />
                ))}
          </div>
        </div>
      </Layout>
    );
  }
};

export default Detail;
