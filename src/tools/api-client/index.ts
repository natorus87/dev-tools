import { Api } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'API client',
  path: '/api-client',
  description: 'Test, manage, and debug HTTP API requests securely from your browser.',
  keywords: ['api', 'rest', 'http', 'client', 'fetch', 'postman', 'insomnia', 'request'],
  component: () => import('./api-client.vue'),
  icon: Api,
  createdAt: new Date('2026-03-26'),
});