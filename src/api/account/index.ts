import { getReq, postReq } from '..';

const { REACT_APP_SESSION_ID } = process.env;

interface AvatarI {
  gravatar: {
    hash: string;
  };
}

export interface AccountI {
  avatar: AvatarI;
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

export interface FavoriteI {
  media_id: number;
  favorite: boolean;
}

export const getAccount = () => {
  return getReq<AccountI>(`/account?session_id=${REACT_APP_SESSION_ID}`);
};

export const addMovieToFavorite = (accountId: number, payload: FavoriteI) => {
  return postReq<
    FavoriteI & { media_type: 'movie' | 'tv' },
    { status_code: number; status_message: string }
  >(`/account/${accountId}/favorite?session_id=${REACT_APP_SESSION_ID}`, {
    ...payload,
    media_type: 'movie',
  });
};
