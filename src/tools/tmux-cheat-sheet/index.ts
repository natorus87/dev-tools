import { Command } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Tmux cheat sheet',
  path: '/tmux-cheat-sheet',
  description: 'Quick reference guide for Tmux terminal multiplexer shortcuts and commands.',
  keywords: ['tmux', 'terminal', 'multiplexer', 'cheat sheet', 'memo', 'shortcuts', 'bindings'],
  component: () => import('./tmux-cheat-sheet.vue'),
  icon: Command,
  createdAt: new Date('2026-03-26'),
});