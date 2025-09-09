// client/src/api/chatbot.ts

import api from './axios';

export const getBotReply = async (prompt: string) => {
    const pageData = document.documentElement.innerText;

  const response = await api.post('/chatbot', { prompt, pageData });
  return response.data; // This will return { reply: '...' }
};