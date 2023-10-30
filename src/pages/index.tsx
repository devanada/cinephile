import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useState, FC, Fragment } from "react";
import { useNavigate } from "react-router-dom";

import MovieLoading from "@/components/movie-loading";
import MovieCard from "@/components/movie-card";
import Carousel from "@/components/carousel";
import Button from "@/components/button";
import Layout from "@/components/layout";

import {
  getNowPlaying,
  getTopRatedMovies,
  getUpcomingMovies,
  postFavoriteMovie,
  MovieType,
} from "@/utils/apis/movies";
import { useToken } from "@/utils/contexts/token";

const Homepage: FC = () => {
  const navigate = useNavigate();
  const [loading] = useState(false);
  const { userID } = useToken();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["movies"],
      queryFn: getNowPlaying,
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.total_pages !== lastPage.page ? 1 + lastPage.page : null,
    });
  const { data: topRated } = useQuery({
    queryKey: ["topRated"],
    queryFn: getTopRatedMovies,
  });
  const { data: upcoming, isLoading } = useQuery({
    queryKey: ["upcoming"],
    queryFn: getUpcomingMovies,
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

  return (
    <Layout>
      <div
        className="hero min-h-[50vh] bg-no-repeat lg:bg-top"
        style={{
          backgroundImage: topRated?.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${topRated?.backdrop_path})`
            : `url("https://via.placeholder.com/1000x800?text=No+Image")`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">{topRated?.title}</h1>
            <p className="mb-5">{topRated?.overview}</p>
            <Button
              id="btn-topRated-detail"
              label="See Detail"
              onClick={() => navigate(`/detail/${topRated?.id}`)}
            />
          </div>
        </div>
      </div>
      <div className="container flex flex-col pb-7">
        <h1 className="my-10 text-center text-5xl text-slate-900 dark:text-white">
          Upcoming Movie
        </h1>
        {!isLoading && (
          <Carousel
            datas={upcoming?.results!}
            name="upcoming"
            content={(item: MovieType) => (
              <MovieCard
                key={item.id}
                item={item}
                button_label="Add to Favorite"
                navigate={`/detail/${item.id}`}
                onClick={() => handleFavorite(item)}
                loading={loading}
              />
            )}
          />
        )}
        <h1 className="my-10 text-center text-5xl text-slate-900 dark:text-white">
          Now Playing
        </h1>
        <div className="m-2 grid grid-flow-row auto-rows-max grid-cols-2 gap-3 pb-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {status === "pending"
            ? [...Array(20).keys()].map((item) => <MovieLoading key={item} />)
            : data?.pages.map((page) => (
                <Fragment key={page.page}>
                  {page.results.map((item: MovieType) => (
                    <MovieCard
                      key={item.id}
                      item={item}
                      button_label="Add to Favorite"
                      navigate={`/detail/${item.id}`}
                      onClick={() => handleFavorite(item)}
                      loading={loading}
                      hover
                    />
                  ))}
                </Fragment>
              ))}
        </div>
        {hasNextPage && (
          <Button
            id="btn-load-more"
            label={isFetchingNextPage ? "Loading..." : "Load More"}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          />
        )}
      </div>
    </Layout>
  );
};

export default Homepage;
