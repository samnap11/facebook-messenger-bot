import { Request, Response } from 'express';
import { httpStatus } from '../constants/statuscode';
import { queryParams } from '../constants/webhook';

const subscriptionHandler = (req: Request, res: Response) => {
  const { body } = req;

  for (const entry of body.entry) {
    const webhookEvent = entry.messaging[0];

    console.log(webhookEvent);
  }

  res.status(httpStatus.OK).send('EVENT_RECEIVED');
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

export { subscriptionHandler, verificationHandler };
