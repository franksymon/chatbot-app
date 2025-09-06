import { useEffect, useRef, useState } from 'react';
import { StreamingMessageBubble } from './StreamingMessageBubble';
import { ChatInput } from './ChatInput';
import { useChat } from '../hooks/useChat';
import { chatAPI } from '../services/api';
import { History, AlertCircle, FileText, Loader2, CheckCircle } from 'lucide-react';

interface ChatContainerProps {
  sessionId: string;
}

export const ChatContainer = ({ sessionId }: ChatContainerProps) => {
  const { messages, isLoading, error, isStreaming, sendMessage, loadHistory, stopStreaming } = useChat(sessionId);
  const [promptTypes, setPromptTypes] = useState<Record<string, string>>({});
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cargar tipos de prompt al montar
    chatAPI.getPromptTypes().then(response => {
      setPromptTypes(response.prompt_types);
    });

    // Cargar historial si existe
    loadHistory();
  }, [loadHistory]);

  useEffect(() => {
    // Auto-scroll al último mensaje
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleExportPDF = async () => {
    if (isExportingPDF) return; // Prevenir múltiples clics

    setIsExportingPDF(true);
    setExportSuccess(false);

    try {
      const blob = await chatAPI.exportPDF(sessionId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `informe_clinico_${sessionId}_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Mostrar feedback de éxito
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000); // Ocultar después de 3 segundos

    } catch (error) {
      console.error('Error al exportar PDF:', error);
      // Aquí podrías mostrar un toast o mensaje de error al usuario
    } finally {
      setIsExportingPDF(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Asistente Clínico para Psicólogos
          </h1>
          <p className="text-sm text-gray-600">Sesión: {sessionId}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={loadHistory}
            className="px-3 py-2 text-sm bg-secondary-100 text-secondary-600 rounded-lg hover:bg-secondary-200 flex items-center gap-2"
          >
            <History className="w-4 h-4" />
            Recargar
          </button>
          <button
            onClick={handleExportPDF}
            disabled={messages.length === 0 || isExportingPDF}
            className={`px-3 py-2 text-sm rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-200 ${
              exportSuccess
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-primary-500 text-white hover:bg-primary-600'
            }`}
            title={
              messages.length === 0
                ? "No hay conversación para exportar"
                : isExportingPDF
                ? "Generando informe clínico..."
                : exportSuccess
                ? "¡Informe generado exitosamente!"
                : "Generar informe clínico profesional en PDF"
            }
          >
            {isExportingPDF ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generando...
              </>
            ) : exportSuccess ? (
              <>
                <CheckCircle className="w-4 h-4" />
                ¡Generado!
              </>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                Generar Informe
              </>
            )}
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Bienvenido al Asistente Clínico
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Comienza una conversación para obtener apoyo profesional en análisis de casos, 
              documentación clínica y recursos terapéuticos.
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <StreamingMessageBubble
                key={index}
                message={message}
                isStreaming={isStreaming}
                isLastMessage={index === messages.length - 1}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <ChatInput
        onSendMessage={sendMessage}
        isLoading={isLoading}
        isStreaming={isStreaming}
        promptTypes={promptTypes}
        onStop={stopStreaming}
      />
    </div>
  );
};
