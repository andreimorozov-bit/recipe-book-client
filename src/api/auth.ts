import axios, { AxiosResponse } from 'axios';
import { User } from '../common/types';
import { AuthResponse } from '../common/types';

export const signInUser = async (user: User): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await axios.post(
    'http://localhost:5000/auth/signin',
    user
  );
  console.log(response.data);
  return response.data;
};

export const signUpUser = async (user: User): Promise<AuthResponse> => {
  const response: AxiosResponse<AuthResponse> = await axios.post(
    'http://localhost:5000/auth/signup',
    user
  );
  console.log(response.data);
  return response.data;
};
