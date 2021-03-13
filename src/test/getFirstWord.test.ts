import { expect } from 'chai';
import { getFirstWord } from '../utils/getFirstWord';

describe('getFirstWord util test suite', () => {
  it('should return the first word only', () => {
    const str = 'Lelia Murphy';

    const firstWord = getFirstWord(str);

    expect(firstWord).to.equal('Lelia');
  });

  it('should return the first word from one word string', () => {
    const str = 'Hades';

    const firstWord = getFirstWord(str);

    expect(firstWord).to.equal('Hades');
  });
});
