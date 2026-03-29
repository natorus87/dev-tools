export function getIpv6ReverseDns(ip: string): string | null {
  try {
    const trimmed = ip.trim();
    if (!trimmed) return null;

    // Reject definitely invalid characters
    if (!/^[0-9a-fA-F:\.]+$/.test(trimmed)) return null;

    const parts = trimmed.split('::');
    if (parts.length > 2) return null;

    let left = parts[0] ? parts[0].split(':') : [];
    let right = parts.length === 2 && parts[1] ? parts[1].split(':') : [];

    // Handle IPv4-mapped IPv6 suffix
    const processIpv4 = (arr: string[]) => {
      if (arr.length > 0 && arr[arr.length - 1].includes('.')) {
        const ipv4 = arr.pop()!;
        const ipv4Parts = ipv4.split('.');
        if (ipv4Parts.length !== 4) return false;
        const hex1 = (parseInt(ipv4Parts[0], 10) << 8) | parseInt(ipv4Parts[1], 10);
        const hex2 = (parseInt(ipv4Parts[2], 10) << 8) | parseInt(ipv4Parts[3], 10);
        arr.push(hex1.toString(16), hex2.toString(16));
      }
      return true;
    };

    if (!processIpv4(right)) return null;
    if (!processIpv4(left)) return null;

    const missing = 8 - left.length - right.length;
    if (missing < 0 && parts.length === 2) return null;
    if (parts.length === 1 && left.length !== 8) return null;

    const middle = parts.length === 2 ? Array(missing).fill('0000') : [];

    const paddedLeft = left.map(p => p.padStart(4, '0'));
    const paddedRight = right.map(p => p.padStart(4, '0'));

    const full = [...paddedLeft, ...middle, ...paddedRight].join('').toLowerCase();
    
    if (full.length !== 32) return null;

    return full.split('').reverse().join('.') + '.ip6.arpa.';
  } catch (e) {
    return null;
  }
}
