import { QueryFunctionContext } from "@tanstack/react-query";

import { MovieType } from "../apis/movies/types";

export interface Params extends QueryFunctionContext {
  pageParam?: number | false;
  query?: string;
  movie_id?: string;
  user_id?: string;
}

export interface Response {
  page: number;
  results: MovieType[];
  total_pages: number;
  total_results: number;
}
