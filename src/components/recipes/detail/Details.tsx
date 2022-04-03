import { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@material-ui/lab/Rating';
import { Recipe } from '../../../common/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0.5rem',
    },
    title: {
      color: theme.palette.primary.main,
      textTransform: 'capitalize',
    },
    rating: {
      display: 'flex',
      '& > *': {
        margin: '0 0.5rem 0.7rem 0',
      },
    },
    servings: {
      display: 'flex',
      '& button': {},
    },
    servingsText: {
      margin: '0.7rem 0.5rem 0 0',
    },
    servingsNumber: {
      margin: '0.7rem 0 0 0',
      fontWeight: 500,
    },
  })
);

interface DetailsProps {
  recipe: Recipe;
  newServings: number;
  onServingsIncrease(): void;
  onServingsDecrease(): void;
}

export const Details: React.FC<DetailsProps> = ({
  recipe,
  newServings,

  onServingsDecrease,
  onServingsIncrease,
}) => {
  const classes = useStyles();
  const { category } = recipe;

  return (
    <Fragment>
      <Grid className={classes.root} item xs={12} sm={6} md={4}>
        <Typography variant='h6' className={classes.title}>
          Details
        </Typography>
        <Grid container direction='column'>
          <Grid item>
            <div className={classes.servings}>
              <Typography component='span' className={classes.servingsText}>
                Servings:
              </Typography>
              <IconButton aria-label='decrease' onClick={onServingsDecrease}>
                <RemoveIcon />
              </IconButton>
              <Typography component='span' className={classes.servingsNumber}>
                {newServings}
              </Typography>
              <IconButton aria-label='increase' onClick={onServingsIncrease}>
                <AddIcon />
              </IconButton>
            </div>
          </Grid>

          <Grid item className={classes.rating}>
            <Typography variant='body1' component='span'>
              Rating:
            </Typography>
            <Rating
              name='simple-controlled'
              size='small'
              readOnly
              value={recipe.rating}
              emptyIcon={<StarBorderIcon fontSize='inherit' />}
            />
          </Grid>
          <Grid item>
            <Typography variant='body1'>Category: {category}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};
