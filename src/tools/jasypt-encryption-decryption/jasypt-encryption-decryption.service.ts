import Jasypt from 'jasypt';

export interface JasyptResult {
  text: string;
  error?: string;
}

export function encryptJasypt(text: string, password?: string): JasyptResult {
  try {
    if (!text) return { text: '' };
    if (!password) return { text: '', error: 'Password is required for encryption.' };

    const jasypt = new Jasypt();
    jasypt.setPassword(password);
    
    // Default to PBEWithMD5AndDES logic which is what standard JS jasypt uses securely
    const encrypted = jasypt.encrypt(text);
    return { text: encrypted };
  } catch (error: any) {
    return { text: '', error: error.message || 'Encryption failed' };
  }
}

export function decryptJasypt(encryptedText: string, password?: string): JasyptResult {
  try {
    if (!encryptedText) return { text: '' };
    if (!password) return { text: '', error: 'Password is required for decryption.' };

    // Strip out ENC( ) if the user pasted it
    let cleanText = encryptedText.trim();
    if (cleanText.startsWith('ENC(') && cleanText.endsWith(')')) {
      cleanText = cleanText.substring(4, cleanText.length - 1);
    }

    const jasypt = new Jasypt();
    jasypt.setPassword(password);
    
    const decrypted = jasypt.decrypt(cleanText);
    return { text: decrypted };
  } catch (error: any) {
    return { text: '', error: error.message || 'Decryption failed (Invalid password or text)' };
  }
}
