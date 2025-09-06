import { useState, useCallback } from 'react';
import { chatAPI } from '../services/api';
import { Message, ChatRequest, Provider } from '../types';

export const useChat = (sessionId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (
    message: string, 
    promptType: ChatRequest['prompt_type'], 
    provider: Provider
  ) => {
    setIsLoading(true);
    setError(null);

    // Agregar mensaje del usuario
    const userMessage: Message = {
      type: 'HumanMessage',
      content: message,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await chatAPI.sendMessage({
        message,
        session_id: sessionId,
        prompt_type: promptType,
      }, provider);

      // Agregar respuesta del asistente
      const assistantMessage: Message = {
        type: 'AIMessage',
        content: response.response,
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar mensaje');
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  const loadHistory = useCallback(async () => {
    try {
      const history = await chatAPI.getHistory(sessionId);
      setMessages(history.messages.map(msg => ({
        ...msg,
        timestamp: new Date().toISOString(),
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar historial');
    }
  }, [sessionId]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    loadHistory,
    clearMessages,
  };
};
