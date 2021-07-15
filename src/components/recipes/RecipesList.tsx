import { useState } from 'react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getRecipes } from '../../api/recipes';
import { Recipe } from '../../common/types';
import { RecipesListItem } from './RecipesListItem';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { NoRecipes } from './NoRecipes';
import { categories } from '../../common/recipeCategories';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '1100px',
      margin: '0 auto',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    categorySelect: {
      margin: '0.5rem 1rem 0.5rem 0',
    },
    noMatch: {
      display: 'flex',
      justifyContent: 'center',
    },
  })
);

export const RecipesList: React.FC = () => {
  const classes = useStyles();
  const [cookies, setCookies, deleteCookies] = useCookies(['jwtToken']);
  const [notEmpty, setNotEmpty] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [category, setCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      const response = await getRecipes({ category }, cookies.jwtToken);
      setRecipes(response);
      setIsLoading(false);
    };

    fetchRecipes();
  }, [category]);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      const response = await getRecipes({ category: 'all' }, cookies.jwtToken);
      if (response.length !== 0) {
        setNotEmpty(true);
      }

      setIsLoading(false);
    };
    if (!notEmpty) {
      fetchRecipes();
    }
  }, []);

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCategory(event.target.value as string);
  };

  if (!notEmpty && !isLoading && recipes.length === 0) {
    return <NoRecipes />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.categorySelect}>
        <FormControl
          variant='outlined'
          margin='dense'
          className={classes.formControl}
        >
          <InputLabel id='category-select-label'>category</InputLabel>
          <Select
            labelId='category-select-label'
            id='category-select'
            value={category}
            onChange={handleCategoryChange}
            label='category'
          >
            <MenuItem value='all'>all</MenuItem>
            {Object.keys(categories).map((category, index) => {
              return (
                <MenuItem value={category} key={index}>
                  {category}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      {notEmpty && !isLoading && recipes.length === 0 && (
        <div className={classes.noMatch}>
          <Typography variant='body1'>No recipes match the filter</Typography>
        </div>
      )}

      {recipes.map((recipe) => {
        return <RecipesListItem key={recipe.id} recipe={recipe} />;
      })}
    </div>
  );
};
