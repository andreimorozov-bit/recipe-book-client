import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import {
  Ingredient,
  NewRecipe as NewRecipeType,
  Recipe,
  Unit,
} from '../../../common/types';
import { createRecipe, updateRecipe } from '../../../api/recipes';
import { useCookies } from 'react-cookie';
import { categories } from '../../../common/recipeCategories';
import { DescriptionForm } from './DescriptionForm';
import { IngredientFormItem } from './IngredientFormItem';
import { baseUrl } from '../../../common/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '1270px',
      margin: '0 auto',
    },
    form: {},
    addIngredientContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    addIngredientIcon: {
      width: '3rem',
      height: '3rem',
      color: theme.palette.primary.main,
    },
    titleContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: '1rem',
      '& > * > * > *': {
        marginRight: '1rem',
      },
    },
    title: {
      margin: '0 0 1rem 0',
      width: '25rem',
    },
    category: {
      margin: '0 0 1rem 0',
      width: '12rem',
    },
    rating: {
      margin: '0.5rem 0 1rem 0',
    },
    imageInput: {
      display: 'none',
    },
    selectedImage: {
      height: '60px',
      cursor: 'pointer',
    },

    center: {
      display: 'flex',
      justifyContent: 'center',
    },
    save: {
      display: 'flex',
      justifyContent: 'center',
      '& button': {
        margin: '1rem',
      },
    },
    clearButton: {
      width: '35px',
      height: '35px',
      margin: '18px 0 0 0',
    },
  })
);

interface NewRecipeProps {
  recipe?: Recipe | null;
}

export const NewRecipe: React.FC<NewRecipeProps> = ({ recipe }) => {
  const classes = useStyles();
  const history = useHistory();
  const [isNewRecipe, setIsNewRecipe] = useState<boolean>(true);
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | Blob | string | null>(null);
  const [imageName, setImageName] = useState<string | null | undefined>(null);

  const [title, setTitle] = useState<string>('');
  const [servings, setServings] = useState<number>(1);
  const [rating, setRating] = useState<number | null>(0);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { amount: '', unit: '', name: '' },
  ]);
  const [cookies] = useCookies(['jwtToken']);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (recipe) {
      setCategory(recipe.category);
      setRating(recipe.rating);
      setDescription(recipe.description);
      setTitle(recipe.title);
      setServings(recipe.servings);
      setIngredients(recipe.ingredients);
      setIsNewRecipe(false);
      setImageName(recipe.imageName);
    }
  }, [recipe]);

  const handleTitleChange = (event: React.ChangeEvent<{ value: any }>) => {
    setTitle(event.target.value);
  };

  const handleUnitChange = (
    event: React.ChangeEvent<{ value: any }>,
    index: number
  ) => {
    const newIngredients = ingredients.map((item, ind) => {
      const newItem = { ...item, unit: event.target.value };
      if (index === ind) {
        return newItem;
      }
      return item;
    });

    setIngredients(newIngredients);
  };

  const handleAmountChange = (
    event: React.ChangeEvent<{ value: any }>,
    index: number
  ) => {
    const newAmount =
      event.target.value.length > 0 ? parseInt(event.target.value) : '';
    let newIngredients = [];
    if (
      (typeof newAmount === 'number' && newAmount >= 0 && !isNaN(newAmount)) ||
      event.target.value === ''
    ) {
      newIngredients = ingredients.map((item, ind) => {
        const newItem = { ...item, amount: newAmount.toString() };
        if (index === ind) {
          return newItem;
        }
        return item;
      });

      setIngredients(newIngredients);
    }
    return;
  };

  const handleIngredientNameChange = (
    event: React.ChangeEvent<{ value: any }>,
    index: number
  ) => {
    const newIngredients = ingredients.map((item, ind) => {
      const newItem = { ...item, name: event.target.value };
      if (index === ind) {
        return newItem;
      }
      return item;
    });
    setIngredients(newIngredients);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<{ value: any }>
  ) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<{ value: any }>) => {
    setCategory(event.target.value);
  };

  const handleServingsDecrease = () => {
    if (servings > 1) {
      setServings(servings - 1);
    }
  };

  const handleServingsIncrease = () => {
    setServings(servings + 1);
  };

  const handleRatingChange = (newRating: number | null) => {
    setRating(newRating);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.currentTarget.files && event.currentTarget.files.length > 0) {
      // const newImage = await imageResize(event.currentTarget.files[0]);
      setImage(event.currentTarget.files[0]);
      // setImgObjectUrl(URL.createObjectURL(image));
      // uploadFile(event.currentTarget.files[0], cookies.jwtToken);
    }
  };

  const handleImageClear = () => {
    if (imageInputRef.current !== null) {
      imageInputRef.current.value = '';
    }
    setImage(null);
  };

  // const handleUploadClick = () => {
  //   if (image) {
  //     // uploadFile(image, cookies.jwtToken);
  //   }
  // };

  const handleAddIngredientClick = () => {
    const newIngredients = [
      ...ingredients,
      { name: '', unit: '' as Unit, amount: '' },
    ];
    setIngredients(newIngredients);
  };

  const deleteIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleSaveClick = async () => {
    const filteredIngredients = ingredients.filter((ingredient) => {
      if (
        ingredient.amount.toString().trim() === '' ||
        ingredient.name.toString().trim() === ''
      ) {
        return false;
      }
      return true;
    });
    const newRecipe: NewRecipeType = {
      title,
      ingredients: filteredIngredients,
      category,
      description,
      servings,
      rating: rating ? rating : 0,
    };
    let response: Recipe;
    if (isNewRecipe) {
      response = await createRecipe(newRecipe, image, cookies.jwtToken);
    } else {
      response = await updateRecipe(
        newRecipe,
        image,
        cookies.jwtToken,
        recipe?.id as string
      );
    }
    if (response?.id) {
      history.push(`/recipes/${response.id}`);
    }
  };

  return (
    <div className={classes.root}>
      <form noValidate autoComplete='off'>
        <div className={classes.titleContainer}>
          <Grid container>
            <TextField
              className={classes.title}
              margin='dense'
              label='Title'
              value={title}
              onChange={handleTitleChange}
              variant='outlined'
            />
            <FormControl variant='outlined' className={classes.category}>
              <InputLabel margin='dense' id='category-label'>
                Category
              </InputLabel>
              <Select
                labelId='category-label'
                id='category'
                margin='dense'
                value={category}
                onChange={handleCategoryChange}
                label='Category'
              >
                {Object.keys(categories).map((category, index) => {
                  return (
                    <MenuItem value={category} key={index}>
                      {category}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <div>
              <Typography component='span'>Servings:</Typography>
              <IconButton
                aria-label='decrease'
                onClick={handleServingsDecrease}
              >
                <RemoveIcon />
              </IconButton>
              <Typography component='span'>{servings}</Typography>
              <IconButton
                aria-label='increase'
                onClick={handleServingsIncrease}
              >
                <AddIcon />
              </IconButton>
            </div>
            <div className={classes.rating}>
              <Rating
                name='simple-controlled'
                value={rating}
                onChange={(event, newRating) => handleRatingChange(newRating)}
                emptyIcon={<StarBorderIcon fontSize='inherit' />}
              />
            </div>
            <div>
              <input
                className={classes.imageInput}
                type='file'
                name='file'
                accept='image/*'
                id='file-input'
                ref={imageInputRef}
                onChange={handleFileChange}
              />
              <label htmlFor='file-input'>
                {!image && !imageName && (
                  <Button
                    variant='contained'
                    color='secondary'
                    component='span'
                  >
                    upload image
                  </Button>
                )}
                {!image && imageName && (
                  <img
                    alt=''
                    className={classes.selectedImage}
                    src={`${baseUrl}/recipes/images/${imageName}`}
                  />
                )}
                {image && (
                  <Fragment>
                    <img
                      alt=''
                      className={classes.selectedImage}
                      src={URL.createObjectURL(image)}
                    />
                  </Fragment>
                )}
              </label>
              {image && (
                <IconButton
                  className={classes.clearButton}
                  onClick={handleImageClear}
                >
                  <ClearIcon />
                </IconButton>
              )}
            </div>
          </Grid>
        </div>

        <Grid
          container
          direction='row'
          justify='center'
          alignItems='flex-start'
        >
          <Grid item xs={12} sm={12} md={6} className={classes.center}>
            <Grid container direction='row' alignItems='flex-start'>
              <Typography variant='h6' color='primary'>
                Ingredients
              </Typography>
              {ingredients.map((item, index) => {
                return (
                  <IngredientFormItem
                    key={index}
                    onAmountChange={handleAmountChange}
                    onUnitChange={handleUnitChange}
                    onIngredientChange={handleIngredientNameChange}
                    onIngredientDelete={deleteIngredient}
                    ingredient={item}
                    index={index}
                  />
                );
              })}

              <Grid item xs={12}>
                <div className={classes.addIngredientContainer}>
                  <IconButton onClick={handleAddIngredientClick}>
                    <AddCircleIcon className={classes.addIngredientIcon} />
                  </IconButton>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant='h6' color='primary'>
              Description
            </Typography>
            <DescriptionForm
              description={description}
              onDescriptionChange={handleDescriptionChange}
            />
          </Grid>
        </Grid>
        <div className={classes.save}>
          <Button variant='contained' color='primary' onClick={handleSaveClick}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
