// client/src/api/auth.ts

import api from './axios';

export interface AuthData {
  username?: string;
  email?: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: 'student' | 'club_head' | 'admin'; // Role is now included
  };
}

export const registerAdmin = async (userData: AuthData) => {
  const response = await api.post('/auth/register/admin', userData);
  return response.data;
};

export const registerStudent = async (userData: AuthData) => {
    const response = await api.post('/auth/register/student', userData);
    return response.data;
};

export const registerUser = async (userData: AuthData): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (userData: AuthData): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', userData);
  return response.data;
};