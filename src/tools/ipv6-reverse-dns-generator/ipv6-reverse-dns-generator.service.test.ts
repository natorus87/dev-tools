import { expect, describe, it } from 'vitest';
import { getIpv6ReverseDns } from './ipv6-reverse-dns-generator.service';

describe('ipv6-reverse-dns-generator', () => {
  it('should correctly expand standard ipv6', () => {
    expect(getIpv6ReverseDns('2001:db8::567:89ab')).toBe('b.a.9.8.7.6.5.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa.');
    expect(getIpv6ReverseDns('::1')).toBe('1.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.ip6.arpa.');
    expect(getIpv6ReverseDns('2001:0db8:0000:0000:0000:0000:0000:0000')).toBe('0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa.');
  });

  it('should correctly expand IPv4-mapped IPv6', () => {
    expect(getIpv6ReverseDns('::ffff:192.168.1.1')).toBe('1.0.1.0.8.6.1.0.2.9.1.0.f.f.f.f.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.ip6.arpa.');
  });

  it('should return null for invalid inputs', () => {
    expect(getIpv6ReverseDns('')).toBeNull();
    expect(getIpv6ReverseDns('invalid-ipv6')).toBeNull();
    expect(getIpv6ReverseDns('2001:db8:::567')).toBeNull();
    expect(getIpv6ReverseDns('2001:db8::x567')).toBeNull();
  });
});