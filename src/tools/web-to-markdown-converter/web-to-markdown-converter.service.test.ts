import { expect, describe, it } from 'vitest';
import { convertHtmlToMarkdown } from './web-to-markdown-converter.service';

describe('web-to-markdown-converter', () => {
  it('should convert basic HTML to markdown', () => {
    const html = '<h1>Title</h1><p>Hello <strong>World</strong></p>';
    const result = convertHtmlToMarkdown(html);
    expect(result.error).toBeUndefined();
    expect(result.markdown).toContain('# Title');
    expect(result.markdown).toContain('Hello **World**');
  });

  it('should remove scripts and styles', () => {
    const html = '<script>alert("test")</script><style>body { color: red; }</style><p>Content</p>';
    const result = convertHtmlToMarkdown(html);
    expect(result.error).toBeUndefined();
    expect(result.markdown).not.toContain('alert');
    expect(result.markdown).not.toContain('color: red');
    expect(result.markdown).toBe('Content');
  });

  it('should handle empty input gracefully', () => {
    const html = '   ';
    const result = convertHtmlToMarkdown(html);
    expect(result.error).toBeUndefined();
    expect(result.markdown).toBe('');
  });
});