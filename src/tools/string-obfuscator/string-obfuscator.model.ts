import { get } from '@vueuse/core';
import { type MaybeRef, computed } from 'vue';

export { obfuscateString, useObfuscateString };

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function obfuscateString(
  str: string,
  { replacementChar = '*', keepFirst = 4, keepLast = 0, keepSpace = true, substringsToRemove = [] }: { replacementChar?: string; keepFirst?: number; keepLast?: number; keepSpace?: boolean; substringsToRemove?: string[] } = {}): string {
  let resultText = str;

  substringsToRemove.forEach((sub) => {
    if (sub) {
      const regex = new RegExp(escapeRegExp(sub), 'gi');
      resultText = resultText.replace(regex, '');
    }
  });

  return resultText
    .split('')
    .map((char, index, array) => {
      if (keepSpace && char === ' ') {
        return char;
      }

      return (index < keepFirst || index >= array.length - keepLast) ? char : replacementChar;
    })
    .join('');
}

function useObfuscateString(
  str: MaybeRef<string>,
  config: { replacementChar?: MaybeRef<string>; keepFirst?: MaybeRef<number>; keepLast?: MaybeRef<number>; keepSpace?: MaybeRef<boolean>; substringsToRemove?: MaybeRef<string[]> } = {},

) {
  return computed(() => obfuscateString(
    get(str),
    {
      replacementChar: get(config.replacementChar),
      keepFirst: get(config.keepFirst),
      keepLast: get(config.keepLast),
      keepSpace: get(config.keepSpace),
      substringsToRemove: get(config.substringsToRemove),
    },
  ));
}
