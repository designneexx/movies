import React, { FC, useCallback, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    maxWidth: '100%',
  },
});

export const MediaCard: FC<{
  id: number;
  title: string;
  image: string;
  isFavorite: boolean;
  onPlay?: () => void;
  onFavorite: (data: { id: number; isFavorite: boolean }) => void;
}> = memo(({ id, title, image, isFavorite, onPlay, onFavorite }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = useCallback(() => {
    history.push(`/movies/${id}`);
  }, []);

  const handleAddFavorite = useCallback(() => {
    onFavorite({
      id,
      isFavorite,
    });
  }, [onFavorite, id, isFavorite]);

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClick}>
        <CardMedia component="img" alt={title} height="140" image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h5">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent>
        <Button variant="contained" color="secondary" onClick={handleAddFavorite}>
          {isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
        </Button>
      </CardContent>
      <CardActions>
        <IconButton aria-label="play/pause" onClick={onPlay}>
          <PlayArrowIcon />
        </IconButton>
        <Button size="small" color="primary">
          Подробнее
        </Button>
      </CardActions>
    </Card>
  );
});
