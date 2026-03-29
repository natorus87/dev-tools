import { Lock } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Jasypt encryption/decryption',
  path: '/jasypt-encryption-decryption',
  description: 'Encrypt or decrypt strings using Jasypt (Java Simplified Encryption) standard algorithms commonly used in Spring Boot.',
  keywords: ['jasypt', 'java', 'spring', 'boot', 'encrypt', 'decrypt', 'password', 'pbe'],
  component: () => import('./jasypt-encryption-decryption.vue'),
  icon: Lock,
  createdAt: new Date('2026-03-26'),
});