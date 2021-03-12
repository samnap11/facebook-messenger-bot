import { Request, Response } from 'express';
import { httpStatus } from '../constants/statuscode';
import {
  getAllMessages,
  getMessageById,
  deleteMessageById,
} from '../controllers/message';

const getAllMessagesHandler = async (req: Request, res: Response) => {
  try {
    const messages = await getAllMessages();

    return res.status(httpStatus.OK).send({ data: messages });
  } catch (err) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
};

const getMessageByIdHandler = async (req: Request, res: Response) => {
  try {
    const message = await getMessageById(req.params.id);

    console.log('message received');

    if (!message) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send({ data: message });
  } catch (err) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const deleteMessageByIdHandler = async (req: Request, res: Response) => {
  try {
    const message = await deleteMessageById(req.params.id);

    if (!message) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send({ data: message });
  } catch (err) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
};

export {
  getAllMessagesHandler,
  getMessageByIdHandler,
  deleteMessageByIdHandler,
};
