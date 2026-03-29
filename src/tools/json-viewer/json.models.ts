import { type MaybeRef, get } from '@vueuse/core';
import JSON5 from 'json5';

export { sortObjectKeys, formatJson };

function sortObjectKeys<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys) as unknown as T;
  }

  return Object.keys(obj)
    .sort((a, b) => a.localeCompare(b))
    .reduce((sortedObj, key) => {
      sortedObj[key] = sortObjectKeys((obj as Record<string, unknown>)[key]);
      return sortedObj;
    }, {} as Record<string, unknown>) as T;
}

function formatJson({
  rawJson,
  sortKeys = true,
  indentSize = 3,
}: {
  rawJson: MaybeRef<string>
  sortKeys?: MaybeRef<boolean>
  indentSize?: MaybeRef<number>
}) {
  const json = get(rawJson);

  // Wrap large integers in strings to prevent precision loss during JSON5.parse
  // This regex finds integers that are 16 digits or longer and wraps them.
  const BIGINT_MARKER = '___@BIGINT@___';
  const wrappedJson = json.replace(/([:[,]\s*)(-?\d{16,})(\s*[,\]}])/g, `$1"${BIGINT_MARKER}$2"$3`);

  const parsedObject = JSON5.parse(wrappedJson);
  const processedObject = get(sortKeys) ? sortObjectKeys(parsedObject) : parsedObject;

  const stringified = JSON.stringify(processedObject, null, get(indentSize));

  // Unwrap the large integers
  return stringified.replace(new RegExp(`"${BIGINT_MARKER}(\\d+)"`, 'g'), '$1');
}
