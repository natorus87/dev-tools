import { expect, describe, it } from 'vitest';
import { calculateRatio, calculateNewHeight, calculateNewWidth, gcd } from './aspect-ratio-calculator.service';

describe('aspect-ratio-calculator', () => {
  it('gcd calculates greatest common divisor', () => {
    expect(gcd(1920, 1080)).toBe(120);
    expect(gcd(1280, 720)).toBe(80);
    expect(gcd(1024, 768)).toBe(256);
  });

  it('calculateRatio computes proper width and height ratios', () => {
    expect(calculateRatio(1920, 1080)).toEqual({ widthRatio: 16, heightRatio: 9 });
    expect(calculateRatio(1280, 720)).toEqual({ widthRatio: 16, heightRatio: 9 });
    expect(calculateRatio(1024, 768)).toEqual({ widthRatio: 4, heightRatio: 3 });
    expect(calculateRatio(800, 600)).toEqual({ widthRatio: 4, heightRatio: 3 });
    expect(calculateRatio(2560, 1080)).toEqual({ widthRatio: 64, heightRatio: 27 }); // Ultra-wide
  });

  it('calculateRatio handles invalid inputs gracefully', () => {
    expect(calculateRatio(0, 1080)).toBeNull();
    expect(calculateRatio(1920, -1080)).toBeNull();
    expect(calculateRatio(1920.5, 1080)).toBeNull(); // non-integers
  });

  it('calculateNewHeight calculates correct height preserving aspect ratio', () => {
    expect(calculateNewHeight(1920, 1080, 1280)).toBe(720);
    expect(calculateNewHeight(16, 9, 1280)).toBe(720);
    expect(calculateNewHeight(4, 3, 1024)).toBe(768);
  });

  it('calculateNewWidth calculates correct width preserving aspect ratio', () => {
    expect(calculateNewWidth(1920, 1080, 720)).toBe(1280);
    expect(calculateNewWidth(16, 9, 720)).toBe(1280);
    expect(calculateNewWidth(4, 3, 768)).toBe(1024);
  });
});