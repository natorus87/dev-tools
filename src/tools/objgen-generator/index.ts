import { Braces } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'ObjGen generator',
  path: '/objgen-generator',
  description: 'Generate JSON datasets using the concise ObjGen formatting syntax.',
  keywords: ['objgen', 'json', 'generator', 'mock', 'data', 'shorthand', 'compiler'],
  component: () => import('./objgen-generator.vue'),
  icon: Braces,
  createdAt: new Date('2026-03-26'),
});