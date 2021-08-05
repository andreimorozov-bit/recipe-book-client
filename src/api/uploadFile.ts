import axios from 'axios';
import { baseUrl } from '../common/constants';

export const uploadFile = async (
  file: any,
  recipeId: string,
  token: string
) => {
  const data = new FormData();
  data.append('file', file);
  data.append('recipeId', recipeId);
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${baseUrl}/recipes/upload`, data, config);
  console.log(response.data);
  return response.data;
};
