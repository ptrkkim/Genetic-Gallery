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

  test('mutateValBy returns a number within (mutateAmt) of original value', () => {
    global.Math.random = jest.fn(trueRandom).mockReturnValue(1);
    expect(mutateValBy(0, 0.1)).toBe(0.4);
    global.Math.random = jest.fn(trueRandom).mockReturnValue(0);
    expect(mutateValBy(0, 0.1)).toBe(-0.4);
  });
});
