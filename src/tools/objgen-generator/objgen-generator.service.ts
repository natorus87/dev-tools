import objgen from 'objgen';

export interface ObjGenResult {
  json: string;
  error?: string;
}

export function compileObjGen(input: string): ObjGenResult {
  if (!input || !input.trim()) return { json: '' };
  
  try {
    // The objgen library compiles the shorthand into a native JS object
    const compiledObject = objgen.compile(input);
    const formattedJson = JSON.stringify(compiledObject, null, 2);
    return { json: formattedJson };
  } catch (error: any) {
    return { json: '', error: error.message || 'Failed to compile ObjGen syntax. Check for syntax errors.' };
  }
}
