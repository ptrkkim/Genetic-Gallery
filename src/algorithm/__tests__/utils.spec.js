import { clamp, mutateValBy } from '../utils';

describe('utility functions', () => {
  const trueRandom = Math.random;
  beforeEach(() => {
    global.Math.random = trueRandom;
  });

  test('clamp bounds a value by a min and a max', () => {
    const min = 0;
    const max = 255;
    expect(clamp(min, max, 300)).toBe(255);
    expect(clamp(min, max, -1)).toBe(0);
    expect(clamp(min, max, 100)).toBe(100);
  });

  test.skip('mutateValBy returns a number within (mutateAmt) of original value', () => {
    global.Math.random = jest.fn(trueRandom)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(1);
  });
});
