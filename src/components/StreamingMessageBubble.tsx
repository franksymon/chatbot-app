import { useEffect, useState } from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';
import { clsx } from 'clsx';

interface StreamingMessageBubbleProps {
  message: Message;
  isStreaming?: boolean;
  isLastMessage?: boolean;
}

export const StreamingMessageBubble = ({ 
  message, 
  isStreaming = false, 
  isLastMessage = false 
}: StreamingMessageBubbleProps) => {
  const [displayedContent, setDisplayedContent] = useState('');
  const isUser = message.type === 'HumanMessage';

  useEffect(() => {
    // Mostrar el contenido directamente sin efecto de escritura adicional
    // El efecto de streaming ya se maneja en tiempo real desde el backend
    setDisplayedContent(message.content);
  }, [message.content]);

  return (
    <div className={clsx(
      'flex gap-3 mb-4',
      isUser ? 'justify-end' : 'justify-start'
    )}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}
      
      <div className={clsx(
        'max-w-[70%] px-4 py-2 rounded-lg',
        isUser 
          ? 'bg-primary-500 text-white rounded-br-sm' 
          : 'bg-secondary-100 text-gray-800 rounded-bl-sm'
      )}>
        <p className="text-sm whitespace-pre-wrap">
          {displayedContent}
          {isStreaming && !isUser && isLastMessage && (
            <span className="animate-pulse ml-1 text-primary-500">|</span>
          )}
        </p>
        {message.timestamp && (
          <p className={clsx(
            'text-xs mt-1',
            isUser ? 'text-primary-100' : 'text-gray-500'
          )}>
            {new Date(message.timestamp).toLocaleTimeString()}
          </p>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-secondary-500 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
};
