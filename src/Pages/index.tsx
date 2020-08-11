import React, { FC, useState, useEffect, useCallback, useMemo, useContext, memo } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Pagination from '@material-ui/lab/Pagination';
import { useQueryParam, NumberParam } from 'use-query-params';
import styled from 'styled-components';
import { MediaCard } from '../Components/Card';
import {
  getMovies,
  MovieI,
  getFavoriteMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getSearchMovies,
} from '../api/movie';
import { addMovieToFavorite } from '../api/account';
import { StoreContext } from '../store';
import { RouteComponentI } from '../Routes';
import { IMAGE_SERVER } from '../api';
import { usePendings } from '../hooks';
import { Pending } from '../Components/Pending';

const useStylesPage = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

const useStylesSelect = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
`;

const moviesSortable = {
  getMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
};

type MovieSortable = keyof typeof moviesSortable;

export const IndexPage: FC<RouteComponentI> = memo(({ name: title }) => {
  const { loading, error, handlePendings } = usePendings();
  const [sort = 'getMovies', setSort] = useQueryParam<MovieSortable | void>('sort');
  const [rubric = '', setRubric] = useQueryParam<string | void>('rubric');
  const classes = useStylesPage();
  const selectClasses = useStylesSelect();
  const [favoriteMovies, setFavoriteMovies] = useState<MovieI | null>(null);
  const [movies, setMovies] = useState<MovieI | null>(null);
  const [page = 1, setPage] = useQueryParam('page', NumberParam);
  const [totalPage, setTotalPage] = useState<number>(0);
  const pagination = useMemo(
    () => ({
      page,
      totalPage,
    }),
    [page, totalPage],
  );
  const {
    value: { genres, account },
  } = useContext(StoreContext);
  const popularRadio = useMemo(() => <Radio />, []);
  const ratedRadio = useMemo(() => <Radio />, []);
  const upcomingRadio = useMemo(() => <Radio />, []);

  const handleChangeRubric = useCallback(
    ({ target: { value } }: React.ChangeEvent<{ value: unknown }>) => {
      setSort();
      setRubric(value as string);
    },
    [],
  );

  const handleChangeSort = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      setRubric();
      setSort(value as MovieSortable);
    },
    [],
  );

  const handlePaginate = useCallback(
    (_e, value) => {
      if (rubric) {
        handlePendings(() => getSearchMovies(rubric, value).then((data) => setMovies(data)));
      } else {
        handlePendings(() =>
          moviesSortable[sort](value).then((moviesData) => setMovies(moviesData)),
        );
      }
    },
    [sort, rubric],
  );

  const handleAddFavorite = useCallback(
    async ({ id, isFavorite }) => {
      await addMovieToFavorite(account.id, {
        media_id: id,
        favorite: !isFavorite,
      });
      const favMoviesData = await getFavoriteMovies(account.id);
      setFavoriteMovies(favMoviesData);
    },
    [account],
  );

  useEffect(() => {
    if (rubric) {
      handlePendings(() => getSearchMovies(rubric).then((data) => setMovies(data)));
    }
  }, [rubric]);

  useEffect(() => {
    if (movies) {
      const { total_pages, page: newPage } = movies;
      setTotalPage(total_pages);
      setPage(newPage, 'pushIn');
    }
  }, [movies]);

  useEffect(() => {
    handlePendings(async () => {
      await getFavoriteMovies(account.id).then((favMoviesData) => setFavoriteMovies(favMoviesData));
      await moviesSortable[sort]().then((moviesData) => setMovies(moviesData));
    });
  }, [sort, account]);

  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl className={selectClasses.formControl}>
            <InputLabel id="rubric-label">Жанр</InputLabel>
            <Select
              labelId="rubric-label"
              id="rubric-select"
              value={rubric}
              onChange={handleChangeRubric}
            >
              {genres.map(({ name, id }) => (
                <MenuItem value={name} key={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Сортировать</FormLabel>
            <RadioGroup row aria-label="sort" name="sort1" value={sort} onChange={handleChangeSort}>
              <FormControlLabel
                value="getPopularMovies"
                control={popularRadio}
                label="По популярности"
              />
              <FormControlLabel
                value="getTopRatedMovies"
                control={ratedRadio}
                label="По рейтингу"
              />
              <FormControlLabel
                value="getUpcomingMovies"
                control={upcomingRadio}
                label="По новизне"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Pending loading={loading} error={error}>
        <>
          <Grid container spacing={3}>
            {movies?.results.map(({ id, title: name, poster_path: image }) => (
              <Grid item xs={12} md={6} lg={3} key={id}>
                <MediaCard
                  id={id}
                  image={`${IMAGE_SERVER}${image}`}
                  title={name}
                  onFavorite={handleAddFavorite}
                  isFavorite={!!favoriteMovies?.results.find((item) => item.id === id)}
                />
              </Grid>
            ))}
          </Grid>
          <StyledDiv>
            <Pagination
              count={pagination.totalPage}
              page={pagination.page ?? 1}
              onChange={handlePaginate}
            />
          </StyledDiv>
        </>
      </Pending>
    </div>
  );
});
