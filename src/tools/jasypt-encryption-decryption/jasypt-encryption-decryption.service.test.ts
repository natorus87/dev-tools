import { expect, describe, it } from 'vitest';
import { encryptJasypt, decryptJasypt } from './jasypt-encryption-decryption.service';

describe('jasypt-encryption-decryption', () => {
  it('should encrypt and decrypt a string with a password', () => {
    const plainText = 'my-secret-token';
    const password = 'my-master-password';

    const encryptResult = encryptJasypt(plainText, password);
    expect(encryptResult.error).toBeUndefined();
    expect(encryptResult.text).not.toBe('');
    expect(encryptResult.text).not.toBe(plainText);

    const decryptResult = decryptJasypt(encryptResult.text, password);
    expect(decryptResult.error).toBeUndefined();
    expect(decryptResult.text).toBe(plainText);
  });

  it('should fail to decrypt with wrong password', () => {
    const plainText = 'my-secret-token';
    const password = 'my-master-password';
    
    const encryptResult = encryptJasypt(plainText, password);
    const decryptResult = decryptJasypt(encryptResult.text, 'wrong-password');
    expect(decryptResult.error).toBeDefined();
    expect(decryptResult.text).toBe('');
  });

  it('should strip ENC() block from decryption', () => {
    const encryptResult = encryptJasypt('test', 'pass');
    
    // Explicitly add ENC( )
    const encWrapped = `ENC(${encryptResult.text})`;
    
    const decryptResult = decryptJasypt(encWrapped, 'pass');
    expect(decryptResult.text).toBe('test');
  });
});