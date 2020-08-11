import React, { FC, useMemo, useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { QueryParamProvider } from 'use-query-params';
import { RoutesViewList } from '../Routes/RoutesViewList';
import { StoreContext, StoreStateI } from '../store';
import { primary, typography } from './mock';
import '../css/fonts.css';
import '../css/index.css';
import { AuthProvider } from '../Components/Auth';
import { getGenres } from '../api/genre';

const App: FC = () => {
  const [value, updateStore] = useState<StoreStateI>({
    pallete: 'dark',
    genres: [],
    account: null as any,
  });

  const { pallete } = value;

  const storeValue = useMemo(() => ({ value, updateStore }), [value]);

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: pallete,
          primary,
        },
        typography,
      }),
    [pallete],
  );

  useEffect(() => {
    getGenres()
      .then(({ genres }) =>
        updateStore((state) => ({
          ...state,
          genres,
        })),
      )
      .catch(console.log);
  }, []);

  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <StoreContext.Provider value={storeValue}>
          <ThemeProvider theme={theme}>
            <AuthProvider>
              <CssBaseline />
              <RoutesViewList />
            </AuthProvider>
          </ThemeProvider>
        </StoreContext.Provider>
      </QueryParamProvider>
    </BrowserRouter>
  );
};

export default App;
