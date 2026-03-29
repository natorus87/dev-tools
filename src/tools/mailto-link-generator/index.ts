import { Mail } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Mailto link generator',
  path: '/mailto-link-generator',
  description: 'Create standardized HTML mailto tags with pre-filled subjects and multipart bodies.',
  keywords: ['mailto', 'email', 'link', 'generator', 'html', 'href'],
  component: () => import('./mailto-link-generator.vue'),
  icon: Mail,
  createdAt: new Date('2026-03-26'),
});