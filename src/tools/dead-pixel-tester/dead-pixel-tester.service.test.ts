import { expect, describe, it } from 'vitest';
import { TEST_COLORS } from './dead-pixel-tester.service';

describe('dead-pixel-tester.service', () => {
  it('should export standard check colors', () => {
    expect(TEST_COLORS).toContain('#000000');
    expect(TEST_COLORS).toContain('#FFFFFF');
    expect(TEST_COLORS).toContain('#FF0000');
    expect(TEST_COLORS.length).toBeGreaterThan(5);
  });
});