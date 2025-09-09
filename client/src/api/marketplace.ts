// client/src/api/marketplace.ts

import api from './axios';

export interface MarketplaceItem {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  seller: {
    _id: string;
    username: string;
  };
  createdAt: string;
}

interface ItemData {
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

export const createItem = async (itemData: ItemData) => {
  const response = await api.post('/marketplace', itemData);
  return response.data;
};

export const getItems = async (): Promise<MarketplaceItem[]> => {
  const response = await api.get('/marketplace');
  return response.data;
};

export const uploadImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
