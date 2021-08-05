import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { signUpUser } from '../../api/auth';
import { useCookies } from 'react-cookie';
import { AuthResponse } from '../../common/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      maxWidth: '700px',
      justifyContent: 'center',
      margin: '0 auto',
    },
    input: {
      width: '20rem',
    },
    form: {
      padding: '1rem',
    },
    button: {
      margin: '1rem 0 0 0',
    },
  })
);

export const SignUp: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [cookies, setCookies] = useCookies(['jwtToken']);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatPassword(event.target.value);
  };

  const handleSubmitClick = async () => {
    setPasswordsMatch(true);
    if (password === repeatPassword) {
      const response: AuthResponse = await signUpUser({ email, password });
      if (response.accessToken) {
        setCookies('jwtToken', response.accessToken, { path: '/' });
        history.replace('/recipes');
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container justify='center' direction='row'>
        <Grid item>
          <form className={classes.form}>
            <Typography variant='h6' color='primary'>
              Sign Up with email
            </Typography>
            <Grid container direction='column' alignItems='center'>
              <Grid item>
                <TextField
                  className={classes.input}
                  variant='outlined'
                  margin='dense'
                  label='email'
                  value={email}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  className={classes.input}
                  variant='outlined'
                  margin='dense'
                  type='password'
                  label='password'
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item>
                <TextField
                  className={classes.input}
                  variant='outlined'
                  margin='dense'
                  type='password'
                  label='repeat password'
                  value={repeatPassword}
                  onChange={handleRepeatPasswordChange}
                />
              </Grid>
              {!passwordsMatch && (
                <Grid item>
                  <Typography variant='body1' color='error'>
                    Passwords should match
                  </Typography>
                </Grid>
              )}
              <Grid item>
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.button}
                  onClick={handleSubmitClick}
                >
                  Sign Up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
