import { DeviceDesktopAnalytics } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Dead pixel tester',
  path: '/dead-pixel-tester',
  description: 'Test your screen native full-screen view for stuck and dead pixels.',
  keywords: ['dead', 'pixel', 'stuck', 'monitor', 'screen', 'test', 'display'],
  component: () => import('./dead-pixel-tester.vue'),
  icon: DeviceDesktopAnalytics,
  createdAt: new Date('2026-03-26'),
});