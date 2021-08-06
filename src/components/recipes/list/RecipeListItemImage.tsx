import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Recipe } from '../../../common/types';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { getFile } from '../../../api/getFile';

interface RecipeListItemImageProps {
  imageId: string | undefined;
  title: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      width: '195px',
      height: '195px',
      margin: '0.5rem',
      maxWidth: '30vw',
      maxHeight: '30vw',
      '& img': {
        width: '100%',
        height: 'auto',
        overflow: 'hidden',
      },
    },
  })
);

export const RecipeListItemImage: React.FC<RecipeListItemImageProps> = ({
  imageId,
  title,
}) => {
  const classes = useStyles();
  const [recipeImage, setRecipeImage] = useState<string | null>(null);
  useEffect(() => {
    if (imageId) {
      const getImage = async () => {
        const response = await getFile(imageId);
        setRecipeImage(URL.createObjectURL(response));
      };

      getImage();
    }
  }, []);

  return (
    <Grid container justify='flex-start' item>
      {recipeImage && (
        <div className={classes.image}>
          <img src={recipeImage} alt={title} />
        </div>
      )}
    </Grid>
  );
};
