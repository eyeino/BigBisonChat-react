export interface Conversation {
  other_username: string;
  body: string;
  avatar_url: string;
  created_at: string;
}

export interface Message {
  message_id: string;
  sender_username: string;
  body: string;
  created_at: string;
  otherUsername: string;
}
