import React, { FC, memo, useEffect, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useParams } from 'react-router-dom';
import { DetailMovieI, getDetailMovie } from '../../api/movie';
import { IMAGE_SERVER } from '../../api';
import { RouteComponentI } from '../../Routes';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 500,
  },
});
const useStylesList = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '100%',
    },
  }),
);

export const SecondaryPage: FC<RouteComponentI> = memo(() => {
  const classes = useStyles();
  const listClasses = useStylesList();
  const { id } = useParams();
  const [movie, setMovie] = useState<DetailMovieI | null>(null);

  useEffect(() => {
    if (id) {
      getDetailMovie(id).then(setMovie).catch(console.log);
    }
  }, [id]);

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`${IMAGE_SERVER}${movie?.poster_path}`}
            title={movie?.title ?? ''}
            component="img"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {movie && movie.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <div className={listClasses.root}>
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem>
            <ListItemText primary={`Дата релиза: ${movie?.release_date}`} />
          </ListItem>
          <ListItem>
            {movie?.adult ? (
              <ListItemText primary="Только для взрослых" />
            ) : (
              <ListItemText primary="Для всех возрастов" />
            )}
          </ListItem>
          <ListItem>
            <ListItemText primary={`Рейтинг: ${movie?.popularity}`} />
          </ListItem>
        </List>
      </div>
    </>
  );
});
