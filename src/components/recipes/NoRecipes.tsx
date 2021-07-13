import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '1270px',
      display: 'flex',
      margin: '2rem auto',
    },
    button: {
      margin: '2rem auto',
    },
  })
);

export const NoRecipes: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleCreateClick = () => {
    history.push('/newrecipe');
  };

  return (
    <div className={classes.root}>
      <Grid container direction='column' alignItems='center'>
        <Grid item>
          <Typography variant='h5'>You have no recipes yet</Typography>
        </Grid>
        <Grid item>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            onClick={handleCreateClick}
          >
            Create new recipe
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};
