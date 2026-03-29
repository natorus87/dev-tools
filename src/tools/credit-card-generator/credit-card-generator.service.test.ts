import { expect, describe, it } from 'vitest';
import { isValidLuhn, generateCreditCard } from './credit-card-generator.service';

describe('credit-card-generator.service', () => {
  it('should generate mathematically valid luhn sums', () => {
    const visa = generateCreditCard('visa', false);
    expect(visa.startsWith('4')).toBe(true);
    expect(visa.length).toBe(16);
    expect(isValidLuhn(visa)).toBe(true);
  });

  it('should format numbers according to parameter', () => {
    const visaSpaced = generateCreditCard('visa', true);
    expect(visaSpaced.includes(' ')).toBe(true);
    expect(visaSpaced.length).toBe(19);

    const amexSpaced = generateCreditCard('amex', true);
    expect(amexSpaced.length).toBe(17);
    expect(isValidLuhn(amexSpaced)).toBe(true);
  });
});