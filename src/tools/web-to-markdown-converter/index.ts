import { Markdown } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Web to Markdown converter',
  path: '/web-to-markdown-converter',
  description: 'Convert any website URL or raw HTML code into a formatted Markdown string.',
  keywords: ['web', 'html', 'markdown', 'converter', 'url', 'scrape', 'fetch'],
  component: () => import('./web-to-markdown-converter.vue'),
  icon: Markdown,
  createdAt: new Date('2026-03-26'),
});