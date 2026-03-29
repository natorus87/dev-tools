import { expect, describe, it, vi } from 'vitest';
import { executeApiRequest } from './api-client.service';

describe('api-client.service', () => {
  it('should handle simple GET requests', async () => {
    // Mock the global fetch
    global.fetch = vi.fn().mockResolvedValue({
      status: 200,
      statusText: 'OK',
      headers: new Headers({ 'content-type': 'application/json' }),
      text: () => Promise.resolve('{"title":"test"}'),
    } as unknown as Response);

    const result = await executeApiRequest({
      method: 'GET',
      url: 'https://jsonplaceholder.typicode.com/posts/1',
      headers: [],
      body: '',
      useProxy: false
    });

    expect(result.status).toBe(200);
    expect(result.data.title).toBe('test');
    expect(result.isJson).toBe(true);
  });

  it('should capture network errors safely', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network offline'));

    const result = await executeApiRequest({
      method: 'GET',
      url: 'https://example.com',
      headers: [],
      body: '',
      useProxy: false
    });

    expect(result.status).toBe(0);
    expect(result.error).toContain('Network offline');
  });
});