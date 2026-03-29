import { bech32, bech32m } from 'bech32';

export interface Bech32EncodeParams {
  hrp: string;
  dataHex: string;
  format: 'bech32' | 'bech32m';
}

export interface Bech32DecodeResult {
  hrp: string;
  dataHex: string;
  format: 'bech32' | 'bech32m';
  error?: string;
}

export interface Bech32EncodeResult {
  bech32String: string;
  error?: string;
}

function hexToBytes(hex: string): number[] {
  const bytes = [];
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return bytes;
}

function bytesToHex(bytes: number[]): string {
  return bytes.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function encodeBech32(params: Bech32EncodeParams): Bech32EncodeResult {
  try {
    if (!params.hrp) throw new Error('Human Readable Part (HRP) is required.');
    if (!params.dataHex) throw new Error('Data (HEX) is required.');

    const cleanHex = params.dataHex.replace(/\s+/g, '').replace(/^0x/i, '');
    if (!/^[0-9A-Fa-f]+$/.test(cleanHex)) throw new Error('Data must be valid hexadecimal.');
    if (cleanHex.length % 2 !== 0) throw new Error('Data HEX string must have an even length.');

    const bytes = hexToBytes(cleanHex);
    // Convert 8-bit bytes to 5-bit words
    const words = bech32.toWords(bytes);

    let result = '';
    if (params.format === 'bech32') {
      result = bech32.encode(params.hrp, words);
    } else {
      result = bech32m.encode(params.hrp, words);
    }
    
    return { bech32String: result };
  } catch (error: any) {
    return { bech32String: '', error: error.message || 'Failed to encode' };
  }
}

export function decodeBech32(str: string): Bech32DecodeResult {
  try {
    const cleanStr = str.trim();
    if (!cleanStr) throw new Error('Input string is empty.');

    let decoded;
    let format: 'bech32' | 'bech32m' = 'bech32';

    try {
      decoded = bech32m.decode(cleanStr);
      format = 'bech32m';
    } catch (e1) {
      try {
        decoded = bech32.decode(cleanStr);
        format = 'bech32';
      } catch (e2: any) {
        throw new Error(`Invalid Bech32/Bech32m string: ${e2.message || 'Unknown error'}`);
      }
    }

    // Convert 5-bit words back to 8-bit bytes
    const bytes = bech32.fromWords(decoded.words);
    const dataHex = bytesToHex(bytes);

    return {
      hrp: decoded.prefix,
      dataHex,
      format,
    };
  } catch (error: any) {
    return { hrp: '', dataHex: '', format: 'bech32', error: error.message || 'Failed to decode' };
  }
}
