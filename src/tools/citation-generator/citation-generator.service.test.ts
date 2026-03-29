import { expect, describe, it } from 'vitest';
import { generateAPA, generateMLA } from './citation-generator.service';

describe('citation-generator.service', () => {
  it('formats authors correctly based on style boundaries', () => {
    const src = { type: 'book', authorFirst: 'John', authorLast: 'Doe', title: 'Life', publisher: '', year: '', url: '', accessDate: '' } as any;
    
    expect(generateAPA(src)).toContain('Doe, J.');
    expect(generateMLA(src)).toContain('Doe, John.');
  });
});