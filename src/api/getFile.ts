import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getFile = async (imageId: string | undefined) => {
  const response = await axios.get(`${baseUrl}/recipes/images/${imageId}`, {
    responseType: 'blob',
  });
  return response.data;
};
