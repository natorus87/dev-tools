import { Book } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Citation generator',
  path: '/citation-generator',
  description: 'Generate academic reference strings safely mapped to standard MLA, APA, and Chicago formats.',
  keywords: ['citation', 'generator', 'mla', 'apa', 'chicago', 'reference', 'bibliography', 'academic'],
  component: () => import('./citation-generator.vue'),
  icon: Book,
  createdAt: new Date('2026-03-26'),
});