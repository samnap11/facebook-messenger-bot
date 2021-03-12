import { Router } from 'express';
import messageRouter from './message';
import webhookRouter from './webhook';

const router = Router();

router.use('/webhook', webhookRouter);
router.use('/messages', messageRouter);

export default router;
