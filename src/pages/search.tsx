import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { Fragment, useState, FC } from "react";

import MovieLoading from "@/components/movie-loading";
import MovieCard from "@/components/movie-card";
import { Layout } from "@/components/layout";
import Button from "@/components/button";

import {
  MovieType,
  getSearchMovies,
  postFavoriteMovie,
} from "@/utils/apis/movies";
import { useToken } from "@/utils/contexts/token";

const Search: FC = () => {
  let [searchParams] = useSearchParams();
  const { userID } = useToken();
  const [loading] = useState(false);
  const query = searchParams.get("q") ?? " ";

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["search", query],
      queryFn: (context: any) => getSearchMovies({ ...context, query }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.total_pages !== lastPage.page ? 1 + lastPage.page : null,
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
      <div className="container flex flex-col">
        <div className="m-2 grid grid-flow-row auto-rows-max grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {status === "pending"
            ? [...Array(20).keys()].map((item) => <MovieLoading key={item} />)
            : data?.pages.map((page) => (
                <Fragment key={page.page}>
                  {page.results.map((item: MovieType) => {
                    return (
                      <MovieCard
                        key={item.id}
                        item={item}
                        button_label="Add to Favorite"
                        navigate={`/detail/${item.id}`}
                        onClick={() => handleFavorite(item)}
                        loading={loading}
                      />
                    );
                  })}
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

export default Search;
