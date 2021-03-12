import { Request, Response } from 'express';
import { httpStatus } from '../constants/statuscode';
import { queryParams } from '../constants/webhook';
import { saveMessage } from '../controllers/message';
import Message from '../interfaces/message';
import Sender from '../interfaces/sender';

const incomingMessageHandler = async (req: Request, res: Response) => {
  const { body } = req;

  if (body.object === 'page') {
    try {
      for (const entry of body.entry) {
        const webhookEvent = entry.messaging[0];

        const {
          sender,
          timestamp,
          message,
        }: {
          sender: Sender;
          timestamp: number;
          message: Message;
        } = webhookEvent;

        await saveMessage(sender, timestamp, message);
      }
      res.status(httpStatus.OK).send('EVENT_RECEIVED');
    } catch (err) {
      res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  } else {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
};

const verificationHandler = (req: Request, res: Response) => {
  const { query } = req;

  const verifyToken = process.env.VERIFY_TOKEN;

  const mode = query[queryParams.HUB_MODE];
  const token = query[queryParams.VERIFY_TOKEN];
  const challenge = query[queryParams.CHALLENGE];

  if (mode && token) {
    if (mode === 'subscribe' && token === verifyToken) {
      console.log('WEBHOOK_VERIFIED');

      res.status(httpStatus.OK).send(challenge);
    } else {
      res.sendStatus(httpStatus.FORBIDDEN);
    }
  }
};

export { incomingMessageHandler, verificationHandler };
