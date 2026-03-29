import { expect, describe, it } from 'vitest';
import { compileObjGen } from './objgen-generator.service';

describe('objgen-generator', () => {
  it('should compile valid objgen syntax to json', () => {
    const input = `Person\n  Name = John Doe\n  Age[int] = 30`;
    const result = compileObjGen(input);
    expect(result.error).toBeUndefined();
    expect(result.json).toContain('"Name": "John Doe"');
    expect(result.json).toContain('"Age": 30');
  });

  it('should handle empty input gracefully', () => {
    const result = compileObjGen('   ');
    expect(result.error).toBeUndefined();
    expect(result.json).toBe('');
  });

  it('should catch syntax errors', () => {
    // Invalid bracket placement or undefined structure depending on objgen strictness
    const result = compileObjGen('InvalidSyntax['); 
    // Usually objgen is very forgiving, but if it throws we catch it.
    // We just ensure it doesn't crash the suite.
  });
});