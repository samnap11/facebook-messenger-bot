import Message from '../interfaces/message';
import IMessageModel from '../interfaces/messagemodel';
import Sender from '../interfaces/sender';
import MessageModel from '../model/message';

const saveMessage = async (
  { id: senderId }: Sender,
  timestamp: number,
  { mid, text }: Message
) => {
  const newMessage: IMessageModel = await MessageModel.create({
    id: mid,
    text,
    senderId,
    timestamp,
  });

  await newMessage.save();
};

const deleteMessageById = async (id: string) => {
  return await MessageModel.findOneAndDelete({ id });
};

const getAllMessages = async () => {
  const messages = await MessageModel.find({}, '-_id -__v').sort({
    timestamp: 'desc',
  });

  return messages;
};

const getMessageById = async (id: string) => {
  const message = await MessageModel.findOne({ id }, '-_id -__v');

  return message;
};

export { saveMessage, getAllMessages, getMessageById, deleteMessageById };
