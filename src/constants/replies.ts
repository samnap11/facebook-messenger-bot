const userReplies = {
  AFFIRMATIVE: ['yes', 'yeah', 'yup', 'uh-huh', 'y', 'yep'],
  NEGATIVE: ['no', 'nah', 'n', 'nope', 'nuh-uh'],
  QUICK_REPLY: ['yes', 'no'],
};

const replies = {
  ASK_FIRST_NAME: "Hi, I'm Mask, what's your first name?",
  ASK_BIRTH_DATE: 'May I know your birth date?',
  TELL_BIRTH_DATE: 'It seems your birth date is ',
  ASK_DAYS_TILL_BIRTHDAY:
    '. Do you want to know how many days left until your next birthday?',
  GOODBYE: 'Goodbye 👋',
  TELL_REMAINING_DAYS: ' days left until your next birthday',
  TELL_HAPPY_BIRTHDAY: 'Today is your birthday! Happy Birthday!',
  UNRECOGNIZED_RESPONSE: "Sorry, I don't know what you mean 😞",
  UNRECOGNIZED_DATE_FORMAT:
    "I can't understand your birth date. Please specify it in YYYY-MM-DD format!",
};

export { userReplies, replies };
