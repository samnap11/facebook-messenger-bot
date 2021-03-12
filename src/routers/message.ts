import { Router } from 'express';
import {
  deleteMessageByIdHandler,
  getAllMessagesHandler,
  getMessageByIdHandler,
} from '../handlers/message';

const messageRouter = Router();

messageRouter.get('/', getAllMessagesHandler);
messageRouter.get('/:id', getMessageByIdHandler);
messageRouter.delete('/:id', deleteMessageByIdHandler);

export default messageRouter;
