import Message from '../interfaces/message';
import IMessageModel from '../interfaces/messagemodel';
import Sender from '../interfaces/sender';
import MessageModel from '../model/message';

const saveMessage = async (
  { id: senderId }: Sender,
  timestamp: number,
  { mid, text }: Message
) => {
  try {
    const newMessage: IMessageModel = await MessageModel.create({
      id: mid,
      text,
      senderId,
      timestamp,
    });

    await newMessage.save();
  } catch (err) {
    console.error(err);
  }
};

const getAllMessages = async () => {
  try {
    const messages = await MessageModel.find({}).sort({ timestamp: 'desc' });

    return messages;
  } catch (err) {
    console.error(err);
  }
};

const getMessageById = async (id: string) => {
  try {
    const message = await MessageModel.findOne({ id });

    return message;
  } catch (err) {
    console.error(err);
  }
};

export { saveMessage, getAllMessages, getMessageById };
