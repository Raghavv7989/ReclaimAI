export interface Conversation {
  id: string;
  match_id: string;
  participant_1: string;
  participant_2: string;
  last_message_at: string | null;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface MessageCreatePayload {
  content: string;
}
