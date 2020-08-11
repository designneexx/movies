import React, { FC, useState, useCallback, useContext, useMemo, memo } from 'react';
import {
  AppBar,
  IconButton,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Container,
  Switch,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import styled from 'styled-components';
import { EmojiObjects, NewReleases, Star, PermMedia, Visibility } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';
import { StoreContext } from '../../store';
import { Logo } from '../../Components/Logo';

const useDrawerStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

const useAppBarStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const StyledLogo = styled(Logo)`
  a {
    justify-content: center;
    padding: 21px 0;
  }
`;

const StyledDiv = styled.div`
  margin-top: 45px;
`;

const inputProps = { 'aria-label': 'primary checkbox' };

export const DefaultLayout: FC = memo(({ children }) => {
  const {
    value: { pallete },
    updateStore,
  } = useContext(StoreContext);
  const drawerClasses = useDrawerStyles();
  const appBarClasses = useAppBarStyles();
  const [open, setOpen] = useState(false);

  const handleDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpenMenu = useCallback(() => {
    setOpen(true);
  }, []);

  const handleThemeChange = useCallback(() => {
    updateStore((state) => {
      return {
        ...state,
        pallete: state.pallete === 'light' ? 'dark' : 'light',
      };
    });
  }, []);

  const formSwitchControl = useMemo(
    () => (
      <>
        <EmojiObjects />
        <Switch
          checked={pallete === 'dark'}
          onChange={handleThemeChange}
          color="primary"
          name="checkedThemeColor"
          inputProps={inputProps}
        />
      </>
    ),
    [pallete, handleThemeChange, inputProps],
  );
  const drawerDivClassNames = useMemo(
    () =>
      clsx(drawerClasses.list, {
        [drawerClasses.fullList]: false,
      }),
    [drawerClasses.list, drawerClasses.fullList],
  );

  return (
    <>
      <div className={appBarClasses.root}>
        <AppBar position="static" color="default">
          <Container>
            <Toolbar>
              <IconButton
                onClick={handleOpenMenu}
                edge="start"
                className={appBarClasses.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Logo className={appBarClasses.title} />
              <FormGroup row>
                <FormControlLabel control={formSwitchControl} label="" />
              </FormGroup>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
      <Drawer open={open} anchor="left" onClose={handleDrawer}>
        <div role="presentation" onClick={handleCloseDrawer} className={drawerDivClassNames}>
          <StyledLogo />
          <Divider />
          <List>
            <ListItem button component={NavLink} to="/">
              <ListItemIcon>
                <PermMedia />
              </ListItemIcon>
              <ListItemText primary="Каталог" />
            </ListItem>
            <ListItem button component={NavLink} to="/?sort=getPopularMovies">
              <ListItemIcon>
                <Visibility />
              </ListItemIcon>
              <ListItemText primary="Популярное" />
            </ListItem>
            <ListItem button component={NavLink} to="/?sort=getTopRatedMovies">
              <ListItemIcon>
                <Star />
              </ListItemIcon>
              <ListItemText primary="Культовое" />
            </ListItem>
            <ListItem button component={NavLink} to="/?sort=getUpcomingMovies">
              <ListItemIcon>
                <NewReleases />
              </ListItemIcon>
              <ListItemText primary="Новинки" />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <StyledDiv>
        <Container>
          <div>{children}</div>
        </Container>
      </StyledDiv>
    </>
  );
});
