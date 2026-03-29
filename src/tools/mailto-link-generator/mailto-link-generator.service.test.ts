import { expect, describe, it } from 'vitest';
import { generateMailtoLink } from './mailto-link-generator.service';

describe('mailto-link-generator.service', () => {
  it('should correctly build query bindings focusing on %20 spacing', () => {
    const raw = generateMailtoLink({
      to: 'test@example.com',
      cc: '',
      bcc: '',
      subject: 'Hello World',
      body: 'This is a test'
    });
    
    expect(raw).toContain('mailto:test@example.com');
    // Ensure standard form URL search params don't leak + into mailto handlers where %20 is necessary
    expect(raw).toContain('Hello%20World');
    expect(raw).not.toContain('+');
  });

  it('tolerates empty inputs gracefully', () => {
    const empty = generateMailtoLink({ to: '', cc: '', bcc: '', subject: '', body: '' });
    expect(empty).toBe('mailto:');
  });
});