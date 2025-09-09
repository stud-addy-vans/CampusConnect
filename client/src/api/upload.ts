// client/src/api/upload.ts

import api from './axios';

export const uploadImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data; // This will return { imageUrl: '...' }
};