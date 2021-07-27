import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Recipe } from '../../../common/types';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface RecipeImageProps {
  recipe: Recipe;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      width: '100%',
      maxWidth: '90vw',
      maxHeight: '90vw',
    },
  })
);

export const RecipeImage: React.FC<RecipeImageProps> = ({ recipe }) => {
  const classes = useStyles();

  return (
    <Grid container justify='center' item xs={12} sm={6} md={4}>
      <img
        className={classes.image}
        src={`http://localhost:5000/recipes/images/${recipe.imageName}`}
        alt='recipe'
      />
    </Grid>
  );
};
