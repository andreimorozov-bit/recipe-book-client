import axios, { AxiosResponse } from 'axios';
import { NewRecipe } from '../common/types';
import { Recipe } from '../common/types';

const baseUrl =
  process.env.REACT_APP_BASE_URL ||
  'https://recipe-book-server-andrei.herokuapp.com';

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
    `${baseUrl}/recipes`,
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
    `${baseUrl}/recipes`,
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
    `${baseUrl}/recipes/${id}`,
    config
  );

  return recipe.data;
};
