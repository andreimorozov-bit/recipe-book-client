import axios, { AxiosResponse } from 'axios';
import { User } from '../common/types';
import { AuthResponse } from '../common/types';

const baseUrl =
  process.env.REACT_APP_BASE_URL ||
  'https://recipe-book-server-andrei.herokuapp.com';

export const signInUser = async (user: User): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await axios.post(
    `${baseUrl}/auth/signin`,
    user
  );

  return response.data;
};

export const signUpUser = async (user: User): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await axios.post(
    `${baseUrl}/auth/signup`,
    user
  );

  return response.data;
};
