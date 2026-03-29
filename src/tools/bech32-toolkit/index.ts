import { CurrencyBitcoin } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Bech32 toolkit',
  path: '/bech32-toolkit',
  description: 'Encode and decode base32 data using Bech32 and Bech32m checksum formats (BIP-173 and BIP-350).',
  keywords: ['bech32', 'bech32m', 'bitcoin', 'segwit', 'bip173', 'bip350', 'encode', 'decode', 'hrp'],
  component: () => import('./bech32-toolkit.vue'),
  icon: CurrencyBitcoin,
  createdAt: new Date('2026-03-26'),
});