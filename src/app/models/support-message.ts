export interface SupportMessage {
  id: number;
  messages: SupportMessage[];
  requestId: number;
  senderId: number;
  receiverId: number;
  messageText: string;
  createdAt: string;
}

export interface CreateSupportMessage {
  requestId: number;
  messageText: string;
}