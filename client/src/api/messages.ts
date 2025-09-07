// client/src/api/messages.ts

import api from './axios';

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
}

export const getMessages = async (userId: string): Promise<Message[]> => {
  const response = await api.get(`/messages/${userId}`);
  return response.data;
};

export const sendMessage = async (userId: string, message: string) => {
  const response = await api.post(`/messages/send/${userId}`, { message });
  return response.data;
};