import axios from 'axios';
import { baseUrl } from '../common/constants';

export const getFile = async (imageId: string | undefined) => {
  const response = await axios.get(`${baseUrl}/recipes/images/${imageId}`, {
    responseType: 'blob',
  });
  return response.data;
};
