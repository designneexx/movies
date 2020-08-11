import { getReq } from '..';

export interface GenreI {
  id: number;
  name: string;
}

export interface GenreDataI {
  genres: GenreI[];
}

export const getGenres = () => {
  return getReq<GenreDataI>('/genre/movie/list');
};
