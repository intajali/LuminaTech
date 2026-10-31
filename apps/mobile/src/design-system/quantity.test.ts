import { describe, expect, it } from 'vitest';

import { stepQuantity } from './quantity';

describe('stepQuantity', () => {
  it('moves one step inside the range', () => {
    expect(stepQuantity(2, 1, 1, 99)).toBe(3);
    expect(stepQuantity(2, -1, 1, 99)).toBe(1);
  });

  it('stays put at the minimum and maximum', () => {
    expect(stepQuantity(1, -1, 1, 99)).toBe(1);
    expect(stepQuantity(99, 1, 1, 99)).toBe(99);
  });

  it('rejects a quantity outside the range', () => {
    expect(() => stepQuantity(0, 1, 1, 99)).toThrow(
      'Quantity is outside the allowed range',
    );
  });

  it('rejects bounds whose minimum exceeds the maximum', () => {
    expect(() => stepQuantity(2, 1, 5, 1)).toThrow(
      'Quantity bounds are invalid',
    );
  });
});
