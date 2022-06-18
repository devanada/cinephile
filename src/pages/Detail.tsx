/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, lazy } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import moment from "moment";
import axios from "axios";
import { moviesType } from "../types/movies";
import { videoType } from "../types/videos";
const Loading = lazy(() => import("../components/Loading"));
const Layout = lazy(() => import("../components/Layout"));
const Layout2 = lazy(() => import("../components/Layout2"));

const Detail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<moviesType | any>({});
  const [videos, setVideos] = useState<videoType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
        document.title = `Cinephile - ${response.data.title}`;
      })
      .catch((err) => {
        navigate("404");
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
          className="w-full"
        >
          <div className="w-full h-full flex flex-wrap justify-center items-center p-6 bg-gradient-to-t from-white dark:from-black">
            <div className="w-4/5 lg:h-4/5 flex flex-wrap lg:flex-nowrap gap-4 bg-white/70 border-2 border-zinc-800 rounded-lg p-3 shadow-lg shadow-black justify-center">
              <img
                className="w-3/5 h-3/5 sm:h-4/5 object-contain place-self-center"
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
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
                    <span className="font-normal">
                      {moment(movie.release_date).format("dddd, D MMMM YYYY")}
                    </span>
                  </p>
                  <p className="text-lg font-medium">
                    Genre:{" "}
                    <span className="font-normal">
                      {movie.genres
                        .map((genre: any) => {
                          return genre.name;
                        })
                        .join(", ")}
                    </span>
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
                <button
                  className="bg-neutral-500 hover:bg-neutral-600 rounded text-white font-bold p-2 border-2 border-zinc-800"
                  onClick={() => window.open(movie.homepage)}
                >
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        </div>
        {videos.length !== 0 && (
          <Carousel
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
          >
            {videos.map((video) => (
              <iframe
                key={video.id}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video.key}`}
                title={video.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                // allowFullScreen
              />
            ))}
          </Carousel>
        )}
      </Layout>
    );
  }
};

export default Detail;
