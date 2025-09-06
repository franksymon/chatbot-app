import { useState, useCallback, useRef } from 'react';
import { chatAPI } from '../services/api';
import { Message, ChatRequest, Provider } from '../types';

export const useChat = (sessionId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (
    message: string,
    promptType: ChatRequest['prompt_type'],
    provider: Provider,
    useStreaming: boolean = true
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

    if (useStreaming) {
      // Usar streaming
      setIsStreaming(true);

      // Crear mensaje del asistente vacío para streaming
      const assistantMessage: Message = {
        type: 'AIMessage',
        content: '',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);

      try {
        // Cancelar petición anterior si existe
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        await chatAPI.sendMessageStream(
          {
            message,
            session_id: sessionId,
            prompt_type: promptType,
          },
          provider,
          // onChunk
          (content: string) => {
            setMessages(prev =>
              prev.map((msg, index) =>
                index === prev.length - 1 && msg.type === 'AIMessage'
                  ? { ...msg, content: content }
                  : msg
              )
            );
          },
          // onDone
          () => {
            setIsLoading(false);
            setIsStreaming(false);
          },
          // onError
          (error: string) => {
            setError(error);
            setIsLoading(false);
            setIsStreaming(false);
          }
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al enviar mensaje');
        setIsLoading(false);
        setIsStreaming(false);
      }
    } else {
      // Usar método tradicional (sin streaming)
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

  const stopStreaming = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsLoading(false);
    setIsStreaming(false);
  }, []);

  return {
    messages,
    isLoading,
    error,
    isStreaming,
    sendMessage,
    loadHistory,
    clearMessages,
    stopStreaming,
  };
};
