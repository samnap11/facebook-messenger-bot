import { Router } from 'express';
import {
  incomingMessageHandler,
  verificationHandler,
} from '../handlers/webhook';

const webhookRouter = Router();

webhookRouter.post('/', incomingMessageHandler);

webhookRouter.get('/', verificationHandler);

export default webhookRouter;
