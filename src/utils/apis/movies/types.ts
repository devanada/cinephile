export interface MovieType {
  adult: boolean;
  backdrop_path: string;
  budget: number;
  genres: MovieGenre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompanies[];
  production_countries: ProductionCountries[];
  release_date: string;
  revenue: string;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos?: {
    results: MovieVidsType[];
  };
  vote_average: number;
  vote_count: number;
}

interface MovieGenre {
  id: number;
  name: string;
}

interface ProductionCompanies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProductionCountries {
  iso_3166_1: string;
  name: string;
}

export interface MovieVidsType {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

export interface FavoritePayload {
  media_type: string;
  media_id: number;
  favorite: boolean;
}
