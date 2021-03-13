import { expect } from 'chai';
import {
  hasBirthDayPassed,
  isBirthDayToday,
  nextBirthdayInDays,
} from '../utils/birthDay';

describe('birthday util test suite', () => {
  it('should return hasBirthDayPassed as true', () => {
    const date = new Date(2010, 0, 31);

    const hasPassed = hasBirthDayPassed(date);

    expect(hasPassed).to.equal(true);
  });

  it('should return hasBirthDayPassed as false', () => {
    const date = new Date();

    const today = new Date();
    date.setMonth(today.getMonth() + 1);

    const hasPassed = hasBirthDayPassed(date);

    expect(hasPassed).to.equal(false);
  });

  it('should return isBirthDayToday as true', () => {
    const date = new Date();

    const isToday = isBirthDayToday(date);

    expect(isToday).to.equal(true);
  });

  it('should return isBirthDayToday as false', () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    const isToday = isBirthDayToday(date);

    expect(isToday).to.equal(false);
  });

  it('should return nextBirthDayInDays to 2', () => {
    const date = new Date();
    date.setDate(date.getDate() + 2);

    const nextBirthDay = nextBirthdayInDays(date);

    expect(nextBirthDay).to.equal(2);
  });
});
