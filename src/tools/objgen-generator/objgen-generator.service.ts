import { ObjGen } from './lib/objgen.js';

export interface ObjGenResult {
  json: string;
  error?: string;
}

export function compileObjGen(input: string): ObjGenResult {
  if (!input || !input.trim()) return { json: '' };
  
  try {
    // We use the core xJson method from the ObjGen class directly.
    // The library is now a local ESM-compatible file.
    const result = (ObjGen as any).xJson(input, { numSpaces: 2 });
    return { json: result };
  } catch (error: any) {
    return { json: '', error: error.message || 'Failed to compile ObjGen syntax. Check for syntax errors.' };
  }
}
