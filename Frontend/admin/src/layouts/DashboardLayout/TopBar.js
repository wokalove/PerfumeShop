import {
  AppBar,

  Box,
  Hidden,
  IconButton,

  makeStyles, Toolbar
} from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { logout } from 'src/actions/authActions';
import Logo from 'src/components/Logo';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit" onClick={handleLogout}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
