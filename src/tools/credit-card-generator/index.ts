import { CreditCard } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Credit card generator',
  path: '/credit-card-generator',
  description: 'Generate valid mock credit card numbers (Luhn checksum) for testing payment flows.',
  keywords: ['credit', 'card', 'generator', 'luhn', 'mock', 'visa', 'mastercard', 'payment'],
  component: () => import('./credit-card-generator.vue'),
  icon: CreditCard,
  createdAt: new Date('2026-03-26'),
});