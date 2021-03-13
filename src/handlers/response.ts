import axios from 'axios';
import { replies, userReplies } from '../constants/replies';
import userState from '../constants/state';
import {
  getUserById,
  saveUser,
  updateUserBirthDateAndState,
  updateUserFirstNameAndState,
  resetUserState,
} from '../controllers/user';
import { BotResponse, QuickReply } from '../interfaces/botresponse';
import Message from '../interfaces/message';
import Sender from '../interfaces/sender';
import User from '../interfaces/user';
import {
  hasBirthDayPassed,
  isBirthDayToday,
  nextBirthdayInDays,
  printBirthDate,
} from '../utils/birthDay';
import { getFirstWord } from '../utils/getFirstWord';
import { isValidDate } from '../utils/isValidDate';

const generateReply = async (
  { id }: Sender,
  { text }: Message
): Promise<BotResponse> => {
  const user = await getUserById(id);

  const botResponse = await receiveUserResponse(
    id,
    text,
    user?.state,
    user?.birthdate
  );

  return botResponse;
};

const receiveUserResponse = async (
  id: string,
  text: string,
  currentState: number | undefined,
  birthdate: Date | undefined
): Promise<BotResponse> => {
  switch (currentState) {
    case userState.GREETINGS_RECEIVED:
      await updateUserFirstNameAndState(
        id,
        getFirstWord(text),
        userState.FIRSTNAME_RECEIVED
      );
      return textBotResponse(id, replies.ASK_BIRTH_DATE);
    case userState.FIRSTNAME_RECEIVED:
      if (isValidDate(text)) {
        const user = await updateUserBirthDateAndState(
          id,
          new Date(text),
          userState.BIRTHDATE_RECEIVED
        );
        return textBotResponseAndQuickReply(
          id,
          askRemainingDays(user!),
          userReplies.QUICK_REPLY
        );
      } else {
        return textBotResponse(id, replies.UNRECOGNIZED_DATE_FORMAT);
      }
    case userState.BIRTHDATE_RECEIVED:
      if (userReplies.AFFIRMATIVE.includes(text)) {
        resetUserState(id);
        if (isBirthDayToday(birthdate!)) {
          return textBotResponse(id, replies.TELL_HAPPY_BIRTHDAY);
        } else if (hasBirthDayPassed(birthdate!)) {
          const today = new Date();
          const nextBirthDate = new Date(birthdate!);

          nextBirthDate.setFullYear(today.getFullYear() + 1);

          const nextBirthDateInDays = nextBirthdayInDays(nextBirthDate);

          return textBotResponse(
            id,
            'There are ' + nextBirthDateInDays + replies.TELL_REMAINING_DAYS
          );
        } else {
          const nextBirthDateInDays = nextBirthdayInDays(birthdate!);
          console.log(birthdate?.toLocaleDateString());

          console.log('Birthday has not passed yet');

          return textBotResponse(
            id,
            'There are ' + nextBirthDateInDays + replies.TELL_REMAINING_DAYS
          );
        }
      } else if (userReplies.NEGATIVE.includes(text)) {
        resetUserState(id);
        return textBotResponse(id, replies.GOODBYE);
      } else {
        return textBotResponse(id, replies.UNRECOGNIZED_RESPONSE);
      }
    default:
      await saveUser({ id, state: userState.GREETINGS_RECEIVED });
      return textBotResponse(id, replies.ASK_FIRST_NAME);
  }
};

const askRemainingDays = ({ firstname, birthdate }: User): string =>
  `Hi, ${firstname}. ` +
  replies.TELL_BIRTH_DATE +
  printBirthDate(birthdate!) +
  replies.ASK_DAYS_TILL_BIRTHDAY;

const textBotResponse = (id: string, text: string): BotResponse => ({
  recipient: {
    id,
  },
  messaging_type: 'RESPONSE',
  message: {
    text,
  },
});

const textBotResponseAndQuickReply = (
  id: string,
  text: string,
  quickReplies: string[]
): BotResponse => {
  const quickReplyArr: Array<QuickReply> = [];

  quickReplies.forEach((quickReply) => {
    quickReplyArr.push({
      content_type: 'text',
      title: quickReply,
      payload: quickReply,
    });
  });

  return {
    recipient: {
      id,
    },
    messaging_type: 'RESPONSE',
    message: {
      text,
      quick_replies: quickReplyArr,
    },
  };
};

const sendReply = async (botResponse: BotResponse) => {
  const sendUrl = `${process.env.GRAPH_URL}?access_token=${process.env.ACCESS_TOKEN}`;

  await axios.post(sendUrl, botResponse);
};

export { generateReply, sendReply };
