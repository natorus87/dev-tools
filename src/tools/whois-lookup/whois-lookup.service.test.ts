import { expect, describe, it, vi } from 'vitest';
import { lookupDomain } from './whois-lookup.service';

describe('whois-lookup.service', () => {
  it('should format successful mocks gracefully', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        ldhName: 'EXAMPLE.COM',
        status: ['active'],
        nameservers: [{ ldhName: 'NS1.EXAMPLE.COM' }],
        events: [{ eventAction: 'registration', eventDate: '2000-01-01T00:00:00Z' }]
      })
    } as unknown as Response);

    const result = await lookupDomain('example.com');
    expect(result.domain).toBe('example.com');
    expect(result.nameservers[0]).toBe('ns1.example.com');
  });

  it('removes protocols from domain', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ldhName: 'EXAMPLE.COM' })
    } as unknown as Response);

    const result = await lookupDomain('https://example.com/path/to/thing');
    expect(global.fetch).toHaveBeenCalledWith('https://rdap.org/domain/example.com');
  });
});