import { Link } from 'react-router-dom';
import { Recipe } from '../../common/types';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      fontFamily: 'Roboto',
      flexGrow: 1,
      flexDirection: 'row',
      borderBottom: `1px solid ${theme.palette.grey[200]}`,
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.common.black,
    },
    title: {
      margin: '0.5rem 1rem',
      fontSize: '1.2rem',
      fontWeight: 500,
      textTransform: 'capitalize',
    },
    category: {
      margin: '0.5rem 1rem',
      fontSize: '1.2rem',
    },
    rating: {
      margin: '0.5rem 1rem',
      fontSize: '1.2rem',
    },
  })
);

interface RecipesListItemProps {
  recipe: Recipe;
}

export const RecipesListItem: React.FC<RecipesListItemProps> = ({ recipe }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Link className={classes.link} to={`/recipes/${recipe.id}`}>
                <div className={classes.title}>{recipe.title}</div>
              </Link>
            </Grid>

            <Grid item xs={3}>
              <div className={classes.category}>{recipe.category}</div>
            </Grid>
            <Grid item xs={3}>
              <div className={classes.rating}>
                <Rating
                  name='simple-controlled'
                  readOnly
                  value={recipe.rating}
                  emptyIcon={<StarBorderIcon fontSize='inherit' />}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
