export interface Message {
  role: 'user' | 'model';
  parts: string;
}

export interface ChatHistoryItem {
  id: string;
  title: string;
  messages: Message[];
}

export interface UserProfile {
  username: string;
  profilePicture: string | null; // Base64 string or URL
  isProMember: boolean;
  voice: string; // e.g., 'Zephyr', 'Kore'
  language: string; // e.g., 'en', 'es'
}
