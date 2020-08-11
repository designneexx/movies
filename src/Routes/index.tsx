import { FC } from 'react';
import { IndexPage } from '../Pages';
import { SecondaryPage } from '../Pages/Secondary';

export interface RouteComponentI {
  name?: string;
  path?: string;
  exact?: boolean;
  routes?: RouteI[];
}

export interface RouteDataI extends RouteComponentI {
  path: string;
}

export interface RouteI extends RouteDataI {
  Component: FC<RouteComponentI>;
}

export const routes: RouteI[] = [
  {
    name: 'Главная',
    path: '/',
    Component: IndexPage,
    exact: true,
  },
  {
    name: 'Проекты',
    path: '/movies/:id',
    Component: SecondaryPage,
    exact: true,
  },
];
