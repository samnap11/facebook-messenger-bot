import { expect } from 'chai';
import { isValidDate } from '../utils/isValidDate';

describe('isValidDate util test suite', () => {
  it('should return isValidDate as false', () => {
    const date = '1999-10-222';

    const isValid = isValidDate(date);

    expect(isValid).to.equal(false);
  });
});
