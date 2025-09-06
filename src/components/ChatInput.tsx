import { useState, KeyboardEvent } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { ChatRequest, Provider } from '../types';

interface ChatInputProps {
  onSendMessage: (message: string, promptType: ChatRequest['prompt_type'], provider: Provider) => void;
  isLoading: boolean;
  promptTypes: Record<string, string>;
}

export const ChatInput = ({ onSendMessage, isLoading, promptTypes }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [selectedPromptType, setSelectedPromptType] = useState<ChatRequest['prompt_type']>('general');
  const [selectedProvider, setSelectedProvider] = useState<Provider>('openai');

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message, selectedPromptType, selectedProvider);
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t bg-white p-4">
      {/* Selectores */}
      <div className="flex gap-4 mb-3">
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Tipo de Consulta
          </label>
          <select
            value={selectedPromptType}
            onChange={(e) => setSelectedPromptType(e.target.value as ChatRequest['prompt_type'])}
            className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {Object.entries(promptTypes).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Proveedor LLM
          </label>
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value as Provider)}
            className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="openai">OpenAI</option>
            <option value="gemini">Google Gemini</option>
          </select>
        </div>
      </div>

      {/* Input de mensaje */}
      <div className="flex gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu consulta clínica aquí..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
          rows={2}
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          disabled={!message.trim() || isLoading}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};
