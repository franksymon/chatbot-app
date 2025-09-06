import axios from 'axios';
import { ChatRequest, ChatResponse, HistoryResponse, PromptTypesResponse, Provider } from '../types';

const API_BASE_URL = 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatAPI = {
  sendMessage: async (data: ChatRequest, provider: Provider): Promise<ChatResponse> => {
    const response = await api.post(`/chat?provider=${provider}`, data);
    return response.data;
  },

  getHistory: async (sessionId: string): Promise<HistoryResponse> => {
    const response = await api.get(`/history/${sessionId}`);
    return response.data;
  },

  getPromptTypes: async (): Promise<PromptTypesResponse> => {
    const response = await api.get('/prompt-types');
    return response.data;
  },

  exportPDF: async (sessionId: string): Promise<Blob> => {
    const response = await api.get(`/export-pdf/${sessionId}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  testConnection: async (provider: Provider) => {
    const response = await api.get(`/test-connection?provider=${provider}`);
    return response.data;
  },
};

export default api;
