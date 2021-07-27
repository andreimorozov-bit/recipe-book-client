import React, { useState, useCallback } from 'react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getRecipes } from '../../api/recipes';
import { Recipe } from '../../common/types';
import { RecipesListItem } from './RecipesListItem';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { NoRecipes } from './NoRecipes';
import { categories } from '../../common/recipeCategories';
import debounce from 'lodash/debounce';

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
    searchInput: {
      margin: theme.spacing(1),
    },
    noMatch: {
      display: 'flex',
      justifyContent: 'center',
    },
    sort: {
      margin: '0 0.5rem 0 1rem',
      cursor: 'pointer',
    },
    sortText: {
      color: theme.palette.grey[700],
      cursor: 'pointer',
    },
    sortPaper: {
      padding: theme.spacing(1),
    },
    sortItem: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.1)',
      },
    },
  })
);

export const RecipesList: React.FC = () => {
  const classes = useStyles();
  const [cookies, setCookies, deleteCookies] = useCookies(['jwtToken']);
  const [notEmpty, setNotEmpty] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [sortOpen, setSortOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [orderBy, setOrderBy] = useState<string>('title');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      const response = await getRecipes(
        { category, search, orderBy },
        cookies.jwtToken
      );
      setRecipes(response);
      setIsLoading(false);
    };

    fetchRecipes();
  }, [category, orderBy]);

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

  const debouncedGetRecipes = useCallback(
    debounce(async (category, searchString: string, orderBy) => {
      const response = await getRecipes(
        { category, search: searchString, orderBy },
        cookies.jwtToken
      );
      setRecipes(response);
    }, 1000),
    []
  );

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCategory(event.target.value as string);
  };

  const handleSearchChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearch(event.target.value as string);
    debouncedGetRecipes(category, event.target.value as string, orderBy);
  };

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setSortOpen(true);
  };

  const handleSortClose = () => {
    setAnchorEl(null);
    setSortOpen(false);
  };

  const handleSortByTitleClick = () => {
    setOrderBy('title');
    setSortOpen(false);
  };

  const handleSortByCategoryClick = () => {
    setOrderBy('category');
    setSortOpen(false);
  };

  const handleSortByRatingClick = () => {
    setOrderBy('rating');
    setSortOpen(false);
  };

  const id = sortOpen ? 'sort-popover' : undefined;

  if (!notEmpty && !isLoading && recipes.length === 0) {
    return <NoRecipes />;
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item>
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
        </Grid>
        <Grid item>
          <TextField
            className={classes.searchInput}
            label='search'
            type='search'
            margin='dense'
            variant='outlined'
            value={search}
            onChange={handleSearchChange}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item onClick={handleSortClick}>
          <Grid container>
            <Grid item>
              <Typography className={classes.sort} variant='body1'>
                Sort by
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.sortText} variant='body1'>
                {orderBy}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Popover
        id={id}
        open={sortOpen}
        anchorEl={anchorEl}
        onClose={handleSortClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Paper className={classes.sortPaper}>
          <Typography
            className={classes.sortItem}
            onClick={handleSortByTitleClick}
          >
            Title
          </Typography>
          <Typography
            className={classes.sortItem}
            onClick={handleSortByCategoryClick}
          >
            Category
          </Typography>
          <Typography
            className={classes.sortItem}
            onClick={handleSortByRatingClick}
          >
            Rating
          </Typography>
        </Paper>
      </Popover>

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
