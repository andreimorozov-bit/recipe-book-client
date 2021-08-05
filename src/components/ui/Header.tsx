import React, { Fragment, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {
  Theme,
  makeStyles,
  createStyles,
  useTheme,
} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import logo from '../../assets/favicon30.png';
import { useCookies } from 'react-cookie';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabContainer: {
      marginLeft: 'auto',
    },

    logo: {
      color: theme.palette.common.white,
      boxShadow: 'none',
      textTransform: 'none',
      cursor: 'pointer',
      userSelect: 'none',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
      '&:active': {
        backgroundColor: theme.palette.primary.main,
      },
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
      },
      '& img': {
        width: '30px',
        height: '30px',
        margin: '0 0.5rem 0 0',
      },
    },

    tab: {
      fontFamily: 'Raleway',
      fontWeight: 500,
      fontSize: '1rem',
      minWidth: '30px',
    },

    button: {
      borderRadius: '50px',
      marginLeft: '50px',
    },
  })
);

export const Header: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const screenSm = useMediaQuery(theme.breakpoints.only('sm'));
  const screenXs = useMediaQuery(theme.breakpoints.down('xs'));
  const screenMd = useMediaQuery(theme.breakpoints.up('md'));
  const [value, setValue] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cookies, setCookies, removeCookies] = useCookies(['jwtToken']);

  useEffect(() => {
    if (cookies.jwtToken && cookies.jwtToken?.length > 0) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [cookies]);

  const handleChange = (e: React.ChangeEvent<{}>, value: number) => {
    setValue(value);
  };

  const handleLogoClick = () => {
    history.push('/');
    setValue(0);
  };

  const handleSignOut = () => {
    removeCookies('jwtToken');
    // setCookies('jwtToken', '', { path: '/' });
    setIsLoggedIn(false);
    history.push('/signin/email');
  };

  const headerMd = (
    <Fragment>
      <div className={classes.logo} onClick={handleLogoClick}>
        <img src={logo} />
        <Typography variant='h5' component='span'>
          Recipe Book
        </Typography>
      </div>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor='primary'
      >
        {isLoggedIn && (
          <Fragment>
            <Tab
              className={classes.tab}
              label='My Recipes'
              component={Link}
              to='/recipes'
            />
            <Tab
              className={classes.tab}
              label='Create New'
              component={Link}
              to='/newrecipe'
            />
            <Tab
              className={classes.tab}
              label='Sign Out'
              onClick={handleSignOut}
            />
          </Fragment>
        )}
        {!isLoggedIn && (
          <Fragment>
            <Tab
              className={classes.tab}
              label='Sign Up'
              component={Link}
              to='/signup/email'
            />
            <Tab
              className={classes.tab}
              label='Sign In'
              component={Link}
              to='/signin/email'
            />
          </Fragment>
        )}
      </Tabs>
    </Fragment>
  );

  const headerSm = (
    <Fragment>
      <div className={classes.logo} onClick={handleLogoClick}>
        <img src={logo} />
      </div>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor='primary'
      >
        {isLoggedIn && (
          <Fragment>
            <Tab
              className={classes.tab}
              label='My Recipes'
              component={Link}
              to='/recipes'
            />
            <Tab
              className={classes.tab}
              label='Create New'
              component={Link}
              to='/newrecipe'
            />
            <Tab
              className={classes.tab}
              label='Sign Out'
              onClick={handleSignOut}
            />
          </Fragment>
        )}
        {!isLoggedIn && (
          <Fragment>
            <Tab
              className={classes.tab}
              label='Sign Up'
              component={Link}
              to='/signup/email'
            />
            <Tab
              className={classes.tab}
              label='Sign In'
              component={Link}
              to='/signin/email'
            />
          </Fragment>
        )}
      </Tabs>
    </Fragment>
  );

  const headerXs = (
    <Fragment>
      <div className={classes.logo} onClick={handleLogoClick}>
        <img src={logo} />
      </div>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor='primary'
      >
        {isLoggedIn && (
          <Fragment>
            <Tab
              className={classes.tab}
              label='My Recipes'
              component={Link}
              to='/recipes'
            />
            <Tab
              className={classes.tab}
              icon={<AddIcon />}
              component={Link}
              to='/newrecipe'
            />
            <Tab
              className={classes.tab}
              label='Sign Out'
              onClick={handleSignOut}
            />
          </Fragment>
        )}
        {!isLoggedIn && (
          <Fragment>
            <Tab
              className={classes.tab}
              label='Sign Up'
              component={Link}
              to='/signup/email'
            />
            <Tab
              className={classes.tab}
              label='Sign In'
              component={Link}
              to='/signin/email'
            />
          </Fragment>
        )}
      </Tabs>
    </Fragment>
  );

  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          {screenXs ? headerXs : null}
          {screenSm ? headerSm : null}
          {screenMd ? headerMd : null}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Fragment>
  );
};
