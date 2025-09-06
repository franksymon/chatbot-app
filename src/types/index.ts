export interface Message {
  type: 'HumanMessage' | 'AIMessage';
  content: string;
  timestamp?: string;
}

export interface ChatResponse {
  response: string;
}

export interface HistoryResponse {
  messages: Message[];
}

export interface PromptType {
  general: string;
  case_analysis: string;
  documentation: string;
  resources: string;
}

export interface PromptTypesResponse {
  prompt_types: PromptType;
  default: string;
}

export interface ChatRequest {
  message: string;
  session_id: string;
  prompt_type: keyof PromptType;
}

export interface Session {
  id: string;
  name: string;
  lastMessage?: string;
  timestamp?: string;
}

export type Provider = 'openai' | 'gemini';
