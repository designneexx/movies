import React, { FC, memo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { DefaultLayout } from '../Layouts/Default';
import { routes } from '.';

export const RoutesViewList: FC = memo(() => {
  return (
    <Switch>
      <DefaultLayout>
        {routes.map(({ Component, path, exact, ...routesData }) => (
          <Route path={path} exact={exact} key={path}>
            <Component {...routesData} path={path} exact={exact} />
          </Route>
        ))}
      </DefaultLayout>
    </Switch>
  );
});
