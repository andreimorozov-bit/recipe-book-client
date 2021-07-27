import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Details } from './Details';
import { Ingredients } from './Ingredients';
import { Description } from './Description';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { useCookies } from 'react-cookie';
import { Ingredient, Recipe } from '../../../common/types';
import { getRecipeById, deleteRecipe } from '../../../api/recipes';
import { RecipeImage } from './RecipeImage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '1280px',
      margin: '0 auto',
    },

    title: {
      textAlign: 'center',
      color: theme.palette.primary.main,
      margin: '1rem auto',
      fontWeight: 500,
    },

    rootContainer: {
      marginRight: '500px',
    },

    editButton: {
      margin: '1rem 0.5rem',
    },
  })
);

interface RecipeDetailProps {
  id: string;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ id }) => {
  const classes = useStyles();
  const history = useHistory();

  const [cookies, setCookies, deleteCookies] = useCookies(['jwtToken']);
  const [recipe, setRecipe] = useState<Recipe>();
  const [newIngredients, setNewIngredients] = useState<Ingredient[]>([]);
  const [newServings, setNewServings] = useState<number>();

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await getRecipeById(id, cookies.jwtToken);
      setRecipe(response);
      setNewServings(response.servings);
      setNewIngredients(response.ingredients);
    };

    fetchRecipe();
  }, []);

  useEffect(() => {
    handleServingsChange();
  }, [newServings]);

  const handleServingsChange = () => {
    if (recipe && newServings) {
      const factor = newServings / recipe.servings;
      const ingredients = recipe.ingredients.map((ingredient) => {
        const newAmount = Math.ceil(Number(ingredient.amount) * factor);

        return { ...ingredient, amount: newAmount.toString() };
      });
      setNewIngredients(ingredients);
    }
  };

  const handleServingsDecrease = () => {
    if (newServings && newServings > 1) {
      setNewServings(newServings - 1);
    }
  };

  const handleServingsIncrease = () => {
    if (newServings) {
      setNewServings(newServings + 1);
    }
  };

  const handleEditClick = () => {
    history.push(`/recipes/${recipe?.id}/edit`);
  };

  const handleDeleteClick = async () => {
    if (recipe) {
      await deleteRecipe(recipe.id, cookies.jwtToken);
      history.replace('/recipes');
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant='h5' className={classes.title}>
        {recipe?.title}
      </Typography>
      <Grid
        container
        className={classes.rootContainer}
        justify='center'
        spacing={3}
      >
        {recipe?.imageName && <RecipeImage recipe={recipe} />}
        {recipe && newServings && (
          <Details
            onServingsIncrease={handleServingsIncrease}
            onServingsDecrease={handleServingsDecrease}
            newServings={newServings}
            recipe={recipe}
          />
        )}
        {recipe && (
          <Ingredients newIngredients={newIngredients} recipe={recipe} />
        )}
        {recipe && <Description recipe={recipe} />}
        <Grid container item xs={12} justify='center'>
          <Grid item>
            <Button
              variant='contained'
              color='primary'
              onClick={handleEditClick}
              className={classes.editButton}
            >
              Edit
            </Button>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleDeleteClick}
              className={classes.editButton}
            >
              delete
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
