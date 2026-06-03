import { authApi } from '@/services/axios';

export const getSuggestedQueries = async () => {
  const response = await authApi.get('/chatbot/suggested-queries');
  return response.data;
};

export const getChatHistory = async (userId) => {
  const response = await authApi.get(`/chatbot/history/${userId}`);
  return response.data;
};

export const askQuestion = async (payload) => {
  const response = await authApi.post('/chatbot/ask', payload);
  return response.data;
};
