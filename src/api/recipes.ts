import axios, { AxiosResponse } from 'axios';
import { NewRecipe } from '../common/types';
import { Recipe } from '../common/types';

export const createRecipe = async (
  recipe: NewRecipe,
  token: string
): Promise<Recipe> => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  const response: AxiosResponse<Recipe> = await axios.post(
    'http://localhost:5000/recipes',
    recipe,
    config
  );
  return response.data;
};

export const getRecipes = async (token: string): Promise<Recipe[]> => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  const response: AxiosResponse<Recipe[]> = await axios.get(
    'http://localhost:5000/recipes',
    config
  );

  return response.data;
};

export const getRecipeById = async (
  id: string,
  token: string
): Promise<Recipe> => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  const recipe: AxiosResponse<Recipe> = await axios.get(
    `http://localhost:5000/recipes/${id}`,
    config
  );

  return recipe.data;
};
