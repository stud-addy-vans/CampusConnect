// client/src/api/users.ts
import api from './axios';

export interface User {
  _id: string;
  username: string;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get('/users'); // We need to create this backend route
  return response.data;
};