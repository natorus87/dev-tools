import { World } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'IPv6 reverse DNS generator',
  path: '/ipv6-reverse-dns-generator',
  description: 'Convert an IPv6 address into its standard reverse DNS PTR record format (ip6.arpa).',
  keywords: ['ipv6', 'dns', 'reverse', 'ptr', 'record', 'ip6.arpa', 'network'],
  component: () => import('./ipv6-reverse-dns-generator.vue'),
  icon: World,
  createdAt: new Date('2026-03-26'),
});