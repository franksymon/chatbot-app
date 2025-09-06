import axios from 'axios';
import { ChatRequest, ChatResponse, HistoryResponse, PromptTypesResponse, Provider } from '../types';

// Configuración de la URL base del API
const API_BASE_URL = import.meta.env.VITE_ENVIRONMENT === 'local'
  ? import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
  : 'https://chatbot-api-xfum.onrender.com';

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatAPI = {
  sendMessage: async (data: ChatRequest, provider: Provider): Promise<ChatResponse> => {
    const response = await api.post(`/chat?provider=${provider}`, data);
    return response.data;
  },

  sendMessageStream: (
    data: ChatRequest,
    provider: Provider,
    onChunk: (content: string) => void,
    onDone: () => void,
    onError: (error: string) => void
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Usar fetch con streaming en lugar de EventSource
      fetch(`${API_BASE_URL}/api/v1/chat?provider=${provider}&stream=true`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('No reader available');
        }

        const decoder = new TextDecoder();

        async function readStream(): Promise<void> {
          try {
            while (true) {
              const { done, value } = await reader!.read();

              if (done) {
                onDone();
                resolve();
                return;
              }

              const chunk = decoder.decode(value, { stream: true });
              const lines = chunk.split('\n');

              for (const line of lines) {
                if (line.startsWith('data: ')) {
                  try {
                    const eventData = JSON.parse(line.slice(6));

                    switch (eventData.type) {
                      case 'start':
                        // Inicio del streaming
                        break;
                      case 'chunk':
                        onChunk(eventData.content);
                        break;
                      case 'done':
                        onDone();
                        resolve();
                        return;
                      case 'error':
                        onError(eventData.error);
                        reject(new Error(eventData.error));
                        return;
                    }
                  } catch (err) {
                    // Ignorar líneas que no son JSON válido
                  }
                }
              }
            }
          } catch (err) {
            onError('Stream reading error');
            reject(err);
          }
        }

        return readStream();
      })
      .catch(err => {
        onError(err.message);
        reject(err);
      });
    });
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
