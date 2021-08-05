import { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Recipe } from '../../../common/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: theme.palette.primary.main,
      margin: '0.5rem auto',
    },
  })
);

interface DescriptionProps {
  recipe: Recipe;
}

export const Description: React.FC<DescriptionProps> = ({ recipe }) => {
  const classes = useStyles();
  const { description } = recipe;

  return (
    <Fragment>
      <Grid item xs={12} md={12}>
        <Typography variant='h6' className={classes.title}>
          Description
        </Typography>
        <Grid container direction='column'>
          <Grid item>
            <Typography variant='body1'>{description}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};
