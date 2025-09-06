// client/src/api/auth.ts

import api from './axios'; // Import our new api instance

// Define the shape of the data for registration and login
interface AuthData {
  username?: string;
  email?: string;
  password?: string;
}

// Register function now uses the 'api' instance
export const registerUser = async (userData: AuthData) => {
  // We no longer need the full URL, just the endpoint
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Login function now uses the 'api' instance
export const loginUser = async (userData: AuthData) => {
  const response = await api.post('/auth/login', userData);
  return response.data;
};