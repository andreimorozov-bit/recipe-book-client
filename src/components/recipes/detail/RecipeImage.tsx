import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Recipe } from '../../../common/types';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { getFile } from '../../../api/getFile';

interface RecipeImageProps {
  recipe: Recipe;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      maxWidth: '90vw',
      maxHeight: '90vw',
      padding: '0.5rem',
      '& img': {
        width: '100%',
        height: 'auto',
      },
    },
  })
);

export const RecipeImage: React.FC<RecipeImageProps> = ({ recipe }) => {
  const classes = useStyles();
  const [recipeImage, setRecipeImage] = useState<string | null>(null);
  useEffect(() => {
    if (recipe.image && recipe.image.id) {
      const getImage = async () => {
        const response = await getFile(recipe.image?.id);
        setRecipeImage(URL.createObjectURL(response));
      };

      getImage();
    }
  }, []);

  return (
    <Grid container justify='center' item xs={12} sm={6} md={4}>
      {recipeImage && (
        <div className={classes.image}>
          <img src={recipeImage} alt='recipe' />
        </div>
      )}
    </Grid>
  );
};
