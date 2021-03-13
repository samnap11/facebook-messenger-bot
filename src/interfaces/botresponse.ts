interface QuickReply {
  content_type: string;
  title: string;
  payload: string;
}

interface BotResponse {
  recipient: {
    id: string;
  };
  messaging_type: string;
  message: {
    text: string;
    quick_replies?: Array<QuickReply>;
  };
}

export { QuickReply, BotResponse };
