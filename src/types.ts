export interface Project {
  category: string;
  title: string;
  description?: string;
  problem: string;
  architecture: string;
  outcome: string;
  keyEngineering: string;
  lessons: string[];
  tech: string[];
  link_code: string;
  link_demo: string | null;
  image1?: string;
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export interface HealthCheckResponse {
  ok: boolean;
}

export interface ChatResponse {
  reply: string;
}
