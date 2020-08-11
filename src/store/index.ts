import { Dispatch, SetStateAction, createContext } from 'react';
import { AccountI } from '../api/account';
import { GenreI } from '../api/genre';

export interface StoreStateI {
  pallete: 'dark' | 'light';
  genres: GenreI[];
  account: AccountI;
}

export interface StoreI {
  value: StoreStateI;
  updateStore: Dispatch<SetStateAction<StoreStateI>>;
}

export const StoreContext = createContext<StoreI>({
  value: {
    pallete: 'dark',
    genres: [],
    account: null as any,
  },
  updateStore: () => undefined,
});
