import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { signInUser } from '../../api/auth';
import { AuthResponse } from '../../common/types';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';

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

export const SignIn: React.FC = () => {
  const classes = useStyles();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [cookies, setCookies, deleteCookies] = useCookies(['jwtToken']);
  const history = useHistory();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmitClick = async () => {
    const response: AuthResponse = await signInUser({ email, password });
    if (response.accessToken) {
      setCookies('jwtToken', response.accessToken, { path: '/' });
      history.push('/recipes');
    }
  };

  return (
    <div className={classes.root}>
      <Grid container justify='center' direction='row'>
        <Grid item>
          <form className={classes.form}>
            <Typography variant='h6' color='primary'>
              Sign In with email
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
                <Button
                  variant='contained'
                  color='primary'
                  className={classes.button}
                  onClick={handleSubmitClick}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};
