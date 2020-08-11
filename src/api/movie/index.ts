import { getReq } from '..';

const { REACT_APP_SESSION_ID } = process.env;

export interface MovieDataI {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
}

interface MovieDateI {
  maximum: string;
  minimum: string;
}

export interface MovieI {
  page: number;
  dates: MovieDateI;
  results: MovieDataI[];
  total_pages: number;
  total_results: number;
}

interface ProductionCompaniesI {
  name: string;
  id: number;
  logo_path: string | null;
  origin_country: string;
}

interface ProductionCountriesI {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguagesI {
  iso_639_1: string;
  name: string;
}

export interface DetailMovieI extends MovieDataI {
  backdrop_path: string | null;
  belongs_to_collection: null;
  budget: number;
  homepage: string | null;
  imdb_id: string | null;
  production_companies: ProductionCompaniesI;
  production_countries: ProductionCountriesI;
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguagesI[];
  status: string;
  tagline: string | null;
}

export const getMovies = (page = 1) => {
  return getReq<MovieI>(`/movie/now_playing?page=${page}`);
};

export const getPopularMovies = (page = 1) => {
  return getReq<MovieI>(`/movie/popular?page=${page}`);
};

export const getTopRatedMovies = (page = 1) => {
  return getReq<MovieI>(`/movie/top_rated?page=${page}`);
};

export const getUpcomingMovies = (page = 1) => {
  return getReq<MovieI>(`/movie/upcoming?page=${page}`);
};

export const getFavoriteMovies = (accountId: number, page = 1) => {
  return getReq<MovieI>(
    `/account/${accountId}/favorite/movies?page=${page}&session_id=${REACT_APP_SESSION_ID}`,
  );
};

export const getDetailMovie = (id: number) => {
  return getReq<DetailMovieI>(`/movie/${id}`);
};

export const getSearchMovies = (search: string, page = 1) => {
  return getReq<MovieI>(`/search/movie?page=${page}&query=${search}`);
};
