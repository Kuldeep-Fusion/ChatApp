import api from './api'

export const AskToAi = (message) => {
  return api.post("/ai/ask", {
    message: message,
  });
};

export const  GetAiChatHistory = async () => api.get(`/ai/history`);

export const  DeleteAiChatHistory = async () => api.delete(`/ai/history`);
