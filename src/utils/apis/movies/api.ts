import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { Params, Response } from "@/utils/types/api";
import { FavoritePayload, MovieType } from "@/utils/apis/movies";

export const getNowPlaying = async (params: Params) => {
  const { pageParam } = params;

  try {
    const response = await axiosWithConfig.get(
      `/movie/now_playing?page=${pageParam}`
    );

    return response.data as Response;
  } catch (error: any) {
    throw Error("Failed to get now playing movies");
  }
};

export const getTopRatedMovies = async () => {
  try {
    const response = await axiosWithConfig.get(`/movie/top_rated`);

    const { results } = response.data as Response;

    return results[Math.floor(Math.random() * results.length)];
  } catch (error: any) {
    throw Error("Failed to get top rated movies");
  }
};

export const getUpcomingMovies = async () => {
  try {
    const response = await axiosWithConfig.get(`/movie/upcoming`);

    return response.data as Response;
  } catch (error: any) {
    throw Error("Failed to get upcoming movies");
  }
};

export const getDetailMovie = async (params: Params) => {
  const { movie_id } = params;

  try {
    const response = await axiosWithConfig.get(
      `/movie/${movie_id}?append_to_response=videos`
    );

    return response.data as MovieType;
  } catch (error: any) {
    throw Error("Failed to get detail movie");
  }
};

export const getSimilarMovies = async (params: Params) => {
  const { movie_id } = params;

  try {
    const response = await axiosWithConfig.get(`/movie/${movie_id}/similar`);

    return response.data as Response;
  } catch (error: any) {
    throw Error("Failed to get similar movies");
  }
};

export const getSearchMovies = async (params: Params) => {
  const { query, pageParam } = params;

  try {
    const response = await axiosWithConfig.get(
      `/search/movie?query=${query}&page=${pageParam}`
    );

    return response.data as Response;
  } catch (error: any) {
    throw Error("Failed to get search movies");
  }
};

export const getFavoriteMovies = async (params: Params) => {
  const { pageParam, user_id } = params;

  try {
    const response = await axiosWithConfig.get(
      `/account/${user_id}/favorite/movies?page=${pageParam}&sort_by=created_at.desc`
    );

    return response.data as Response;
  } catch (error: any) {
    throw Error("Failed to get now playing movies");
  }
};

export const postFavoriteMovie = async (
  params: Partial<Params>,
  payload: FavoritePayload
) => {
  const { user_id } = params;

  try {
    const response = await axiosWithConfig.post(
      `/account/${user_id}/favorite`,
      payload
    );

    return response.data;
  } catch (error: any) {
    throw Error("Failed to post favorite movie");
  }
};
