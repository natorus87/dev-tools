import { World } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Whois lookup',
  path: '/whois-lookup',
  description: 'Query comprehensive registration public domain histories using native RDAP integration.',
  keywords: ['whois', 'lookup', 'domain', 'rdap', 'network', 'registration', 'dns'],
  component: () => import('./whois-lookup.vue'),
  icon: World,
  createdAt: new Date('2026-03-26'),
});