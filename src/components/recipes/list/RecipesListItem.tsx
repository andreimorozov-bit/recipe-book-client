import { Link } from 'react-router-dom';
import { Recipe } from '../../../common/types';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@material-ui/lab/Rating';
import { RecipeListItemImage } from './RecipeListItemImage';

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

      fontWeight: 500,
      textTransform: 'capitalize',
    },
    category: {
      margin: '0.2rem 1rem',
    },
    rating: {
      margin: '0.2rem 1rem',
    },
    noWrap: {
      flexWrap: 'nowrap',
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
          <Link className={classes.link} to={`/recipes/${recipe.id}`}>
            <Grid
              container
              direction='row'
              justifyContent='flex-start'
              alignItems='flex-start'
              className={classes.noWrap}
            >
              <Grid item justifyContent='flex-start'>
                <RecipeListItemImage
                  imageId={recipe.image?.id}
                  title={recipe.title}
                />
              </Grid>

              <Grid item>
                <Grid
                  container
                  direction='column'
                  alignItems='flex-start'
                  justifyContent='flex-start'
                >
                  <Grid item>
                    <div className={classes.title}>{recipe.title}</div>
                  </Grid>
                  <Grid item>
                    <div className={classes.category}>{recipe.category}</div>
                  </Grid>
                  <Grid item>
                    <div className={classes.rating}>
                      <Rating
                        size='small'
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
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};
