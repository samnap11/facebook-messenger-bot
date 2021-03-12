import { Router } from 'express';
import { subscriptionHandler, verificationHandler } from '../handlers/webhook';

const webhookRouter = Router();

webhookRouter.post('/', subscriptionHandler);

webhookRouter.get('/', verificationHandler);

export default webhookRouter;
