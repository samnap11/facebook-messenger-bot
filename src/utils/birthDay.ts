const hasBirthDayPassed = (birthdate: Date): boolean => {
  const today = new Date();

  const birthDate = new Date(birthdate);

  birthDate.setFullYear(today.getFullYear());

  return birthDate.getTime() < today.getTime();
};

const isBirthDayToday = (birthdate: Date): boolean => {
  const today = new Date();

  return (
    birthdate.getMonth() === today.getMonth() &&
    birthdate.getDate() === today.getDate()
  );
};

const nextBirthdayInDays = (nextBirthDate: Date): number => {
  const today = new Date();

  const nextBirthDate_ = new Date(nextBirthDate);

  nextBirthDate_.setFullYear(today.getFullYear());

  const difference = nextBirthDate_.getTime() - today.getTime();

  const millisecondsInADay = 24 * 3600 * 1000;

  return Math.ceil(difference / millisecondsInADay);
};

const printBirthDate = (birthdate: Date): string => {
  return birthdate.toLocaleDateString();
};

export {
  hasBirthDayPassed,
  isBirthDayToday,
  nextBirthdayInDays,
  printBirthDate,
};
