import axios, { AxiosResponse } from 'axios';
import { GetRecipesDto } from '../common/get-recipes.dto';
import { NewRecipe } from '../common/types';
import { Recipe } from '../common/types';

const baseUrl =
  process.env.REACT_APP_BASE_URL ||
  'https://recipe-book-server-andrei.herokuapp.com';

const queryBuilder = (queryParams: GetRecipesDto) => {
  let query = '?';
  for (let [key, value] of Object.entries(queryParams)) {
    if (value && value.length > 0) {
      query = query + key + '=' + value.toString() + '&';
    }
  }

  if (query.length > 1) {
    return query.slice(0, -1);
  }
  return '';
};

export const getRecipes = async (
  getRecipesDto: GetRecipesDto,
  token: string
): Promise<Recipe[]> => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  const queryParams: GetRecipesDto = {
    ...getRecipesDto,
    category: getRecipesDto.category === 'all' ? '' : getRecipesDto.category,
  };

  const queryString = queryBuilder(queryParams);

  const response: AxiosResponse<Recipe[]> = await axios.get(
    `${baseUrl}/recipes${queryString}`,
    config
  );

  return response.data;
};

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

export const updateRecipe = async (
  recipe: NewRecipe,
  token: string,
  id: string
): Promise<Recipe> => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  const response: AxiosResponse<Recipe> = await axios.post(
    `${baseUrl}/recipes/${id}/edit`,
    recipe,
    config
  );
  return response.data;
};

export const deleteRecipe = async (
  id: string,
  token: string
): Promise<Recipe> => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  const response: AxiosResponse<Recipe> = await axios.delete(
    `${baseUrl}/recipes/${id}`,
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
