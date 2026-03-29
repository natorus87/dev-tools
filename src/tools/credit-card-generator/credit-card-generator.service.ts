export interface CardNetwork {
  name: string;
  prefixes: string[];
  length: number;
}

export const cardNetworks: Record<string, CardNetwork> = {
  visa: { name: 'Visa', prefixes: ['4'], length: 16 },
  mastercard: { name: 'MasterCard', prefixes: ['51', '52', '53', '54', '55'], length: 16 },
  amex: { name: 'American Express', prefixes: ['34', '37'], length: 15 },
  discover: { name: 'Discover', prefixes: ['6011', '65'], length: 16 },
  jcb: { name: 'JCB', prefixes: ['3528', '3529', '353', '354', '355', '356', '357', '358'], length: 16 },
  diners: { name: 'Diners Club', prefixes: ['300', '301', '302', '303', '304', '305', '36', '38'], length: 14 }
};

export function getLuhnChecksum(partialNumber: string): number {
  let sum = 0;
  let toggle = true; // starting multiplier 2 for the rightmost digit of partial
  
  for (let i = partialNumber.length - 1; i >= 0; i--) {
     let digit = parseInt(partialNumber[i], 10);
     if (toggle) {
        digit *= 2;
        if (digit > 9) digit -= 9;
     }
     sum += digit;
     toggle = !toggle;
  }
  return (sum * 9) % 10;
}

export function isValidLuhn(cardNumber: string): boolean {
  const sanitized = cardNumber.replace(/\D/g, '');
  if (!sanitized) return false;
  let sum = 0;
  let toggle = false;
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized[i], 10);
    if (toggle) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    toggle = !toggle;
  }
  return sum % 10 === 0;
}

export function generateCreditCard(networkId: string, formatSpaces: boolean): string {
  const network = cardNetworks[networkId] || cardNetworks.visa;
  const prefix = network.prefixes[Math.floor(Math.random() * network.prefixes.length)];
  let partial = prefix;
  while (partial.length < network.length - 1) {
    partial += Math.floor(Math.random() * 10).toString();
  }
  const checkDigit = getLuhnChecksum(partial);
  let result = partial + checkDigit.toString();

  if (formatSpaces) {
    if (networkId === 'amex') {
       result = result.replace(/^(\d{4})(\d{6})(\d{5})$/, '$1 $2 $3');
    } else if (networkId === 'diners') {
       result = result.replace(/^(\d{4})(\d{6})(\d{4})$/, '$1 $2 $3');
    } else {
       result = result.replace(/(\d{4})(?=\d)/g, '$1 ');
    }
  }

  return result;
}

export function generateMultipleCards(networkId: string, formatSpaces: boolean, count: number): string[] {
  return Array.from({ length: Math.max(1, count) }, () => generateCreditCard(networkId, formatSpaces));
}
