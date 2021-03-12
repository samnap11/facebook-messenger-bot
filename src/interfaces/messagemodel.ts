import { Document } from 'mongoose';

interface IMessageModel extends Document {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
}

export default IMessageModel;
