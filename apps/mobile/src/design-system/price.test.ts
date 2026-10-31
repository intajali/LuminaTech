import { describe, expect, it } from 'vitest';

import { lightColor } from './color';
import { contrastRatio } from './contrast';
import { formatPrice } from './price';

const BODY_TEXT_CONTRAST = 4.5;
const UI_CONTRAST = 3;

describe('formatPrice', () => {
  it('formats minor units as currency', () => {
    expect(formatPrice({ amount: 1299, currency: 'USD' })).toBe('$12.99');
    expect(formatPrice({ amount: 0, currency: 'USD' })).toBe('$0.00');
    expect(formatPrice({ amount: 100000, currency: 'USD' })).toBe('$1,000.00');
    expect(formatPrice({ amount: -250, currency: 'USD' })).toBe('-$2.50');
  });

  it('uses the requested currency code', () => {
    expect(formatPrice({ amount: 2500, currency: 'AED' })).toBe(
      new Intl.NumberFormat('en-US', {
        currency: 'AED',
        style: 'currency',
      }).format(25),
    );
  });

  it('rejects amounts that are not minor-unit integers', () => {
    expect(() => formatPrice({ amount: 12.5, currency: 'USD' })).toThrow(
      'Price amount must be an integer in minor units',
    );
  });

  it('rejects currency codes that are not three uppercase letters', () => {
    expect(() => formatPrice({ amount: 100, currency: 'usd' })).toThrow(
      'Price currency must be a 3-letter ISO code',
    );
  });
});

describe('catalog component contrast', () => {
  it('keeps product card text and its border readable on the surface', () => {
    expect(
      contrastRatio(lightColor.text, lightColor.surface),
    ).toBeGreaterThanOrEqual(BODY_TEXT_CONTRAST);
    expect(
      contrastRatio(lightColor.textSecondary, lightColor.surface),
    ).toBeGreaterThanOrEqual(BODY_TEXT_CONTRAST);
    expect(
      contrastRatio(lightColor.primary, lightColor.surface),
    ).toBeGreaterThanOrEqual(BODY_TEXT_CONTRAST);
    expect(
      contrastRatio(lightColor.primary, lightColor.secondaryPressed),
    ).toBeGreaterThanOrEqual(BODY_TEXT_CONTRAST);
    expect(
      contrastRatio(lightColor.text, lightColor.secondaryPressed),
    ).toBeGreaterThanOrEqual(BODY_TEXT_CONTRAST);
    expect(
      contrastRatio(lightColor.border, lightColor.surface),
    ).toBeGreaterThanOrEqual(UI_CONTRAST);
  });

  it('keeps category card text readable and its border visible on mist', () => {
    expect(
      contrastRatio(lightColor.text, lightColor.secondary),
    ).toBeGreaterThanOrEqual(BODY_TEXT_CONTRAST);
    expect(
      contrastRatio(lightColor.textSecondary, lightColor.secondary),
    ).toBeGreaterThanOrEqual(BODY_TEXT_CONTRAST);
    expect(
      contrastRatio(lightColor.primary, lightColor.secondary),
    ).toBeGreaterThanOrEqual(UI_CONTRAST);
  });
});
