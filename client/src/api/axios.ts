// client/src/api/axios.ts

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // The base URL for all API calls
});

// Request interceptor to add the token to the header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;