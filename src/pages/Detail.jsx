/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Layout, Layout2 } from "../components/Layout";
import Loading from "../components/Loading";

const Detail = () => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { movie_id } = params;
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`
      )
      .then((response) => {
        setMovie(response.data);
        setVideos(response.data.videos.results);
        console.log(response.data.videos.results);
        document.title = `Cinephile - ${response.data.title}`;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <Layout>
        <Layout2>
          <Loading />
        </Layout2>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="w-full h-screen flex justify-center items-center p-6 bg-gradient-to-t from-white dark:from-black">
            <div className="w-4/5 grid sm:grid-cols-2 gap-4 bg-white/40 border-2 border-zinc-800 rounded-lg p-3">
              <img
                className="w-3/5 sm:w-4/5 place-self-center"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.poster_path}
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-center">
                    {movie.title}
                  </h1>
                  <p className="text-lg font-medium">
                    Runtime:{" "}
                    <span className="font-normal">
                      {movie.runtime} minutes{" "}
                    </span>
                  </p>
                  <p className="text-lg font-medium">
                    Release date:{" "}
                    <span className="font-normal">{movie.release_date}</span>
                  </p>
                  <p className="text-lg font-medium">
                    Language:{" "}
                    <span className="font-normal">
                      {movie.original_language}
                    </span>
                  </p>
                  <p className="text-lg font-medium">
                    Overview:
                    <br />
                    <span className="font-normal">{movie.overview}</span>
                  </p>
                </div>
              </div>
              <button
                className="bg-neutral-500 hover:bg-neutral-600 rounded text-white font-bold p-2 border-2 border-zinc-800"
                onClick={() => window.open(movie.homepage)}
              >
                Watch Now
              </button>
            </div>
          </div>
        </div>
        <Carousel showStatus={false} showIndicators={false} showThumbs={false}>
          {videos.length > 0 &&
            videos.map((video) => (
              <iframe
                key={video.id}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
            ))}
        </Carousel>
      </Layout>
    );
  }
};

export default Detail;
