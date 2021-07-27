import axios, { AxiosResponse } from 'axios';
import { GetRecipesDto } from '../common/get-recipes.dto';
import { NewRecipe } from '../common/types';
import { Recipe } from '../common/types';
import { uploadFile } from './uploadFile';
import { baseUrl } from '../common/constants';

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
  file: File | Blob | string | null,
  token: string
): Promise<Recipe> => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  let fileResponse;
  let newRecipe: NewRecipe = recipe;

  if (file) {
    fileResponse = await uploadFile(file, token);
    newRecipe = {
      ...recipe,
      imageName: fileResponse.newFilename,
    };
  }

  const response: AxiosResponse<Recipe> = await axios.post(
    `${baseUrl}/recipes`,
    newRecipe,
    config
  );

  console.log(response.data);

  return response.data;
};

export const updateRecipe = async (
  recipe: NewRecipe,
  file: File | Blob | string | null,
  token: string,
  id: string
): Promise<Recipe> => {
  let fileResponse;
  let updatedRecipe: NewRecipe = recipe;

  if (file) {
    fileResponse = await uploadFile(file, token);
    updatedRecipe = {
      ...recipe,
      imageName: fileResponse.newFilename,
    };
  }

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  const response: AxiosResponse<Recipe> = await axios.post(
    `${baseUrl}/recipes/${id}/edit`,
    updatedRecipe,
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
