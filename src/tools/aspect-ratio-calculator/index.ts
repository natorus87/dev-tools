import { AspectRatio } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Aspect ratio calculator',
  path: '/aspect-ratio-calculator',
  description: 'Calculate aspect ratios and resize dimensions while preserving the ratio.',
  keywords: ['aspect', 'ratio', 'calculator', 'dimensions', 'resize', 'image', 'video', 'resolution'],
  component: () => import('./aspect-ratio-calculator.vue'),
  icon: AspectRatio,
  createdAt: new Date('2026-03-26'),
});