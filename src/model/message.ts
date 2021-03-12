import { model, Schema } from 'mongoose';
import mongoose from '../constants/mongoose';
import IMessageModel from '../interfaces/messagemodel';

const messageSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const MessageModel = model<IMessageModel>(
  mongoose.MESSAGE_MODEL,
  messageSchema
);

export default MessageModel;
