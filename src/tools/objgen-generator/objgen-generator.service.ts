import is from 'is_js';

// The objgen library is a legacy CommonJS package that expects 'is' to be global.
// We polyfill it here to satisfy its requirements in the browser environment.
if (typeof window !== 'undefined') {
  (window as any).is = is;
}

// @ts-ignore
import { ObjGen } from 'objgen/objgen.js';

export interface ObjGenResult {
  json: string;
  error?: string;
}

export function compileObjGen(input: string): ObjGenResult {
  if (!input || !input.trim()) return { json: '' };
  
  try {
    // We use the core xJson method from the ObjGen class directly.
    // The main 'objgen' package's entry point is a Node.js CLI script that crashes in the browser.
    const result = ObjGen.xJson(input, { numSpaces: 2 });
    return { json: result };
  } catch (error: any) {
    return { json: '', error: error.message || 'Failed to compile ObjGen syntax. Check for syntax errors.' };
  }
}
