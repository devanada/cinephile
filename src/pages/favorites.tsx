import { useInfiniteQuery } from "@tanstack/react-query";
import { useState, FC, Fragment } from "react";

import MovieLoading from "@/components/movie-loading";
import MovieCard from "@/components/movie-card";
import { Layout } from "@/components/layout";
import Button from "@/components/button";

import {
  getFavoriteMovies,
  postFavoriteMovie,
  MovieType,
} from "@/utils/apis/movies";
import { useToken } from "@/utils/contexts/token";

const Favorites: FC = () => {
  const { userID } = useToken();
  const [loading] = useState<boolean>(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["favorites"],
    queryFn: (context: any) =>
      getFavoriteMovies({ ...context, user_id: userID }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.total_pages !== lastPage.page ? 1 + lastPage.page : null,
  });

  const handleFavorite = async (movie: MovieType) => {
    try {
      const payload = {
        media_type: "movie",
        media_id: movie.id,
        favorite: false,
      };
      const result = await postFavoriteMovie({ user_id: userID }, payload);
      const { status_message } = result;
      alert(status_message);
      refetch();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Layout>
      <div className="container flex flex-col">
        <h1 className="my-10 text-center text-5xl text-slate-900 dark:text-white">
          My Favorite Movies
        </h1>
        <div className="m-2 pb-6 grid grid-flow-row auto-rows-max grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
          {status === "pending"
            ? [...Array(20).keys()].map((item) => <MovieLoading key={item} />)
            : data?.pages.map((page) => (
                <Fragment key={page.page}>
                  {page.results.map((item) => (
                    <MovieCard
                      key={item.id}
                      item={item}
                      button_label="Remove from Favorite"
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

export default Favorites;
