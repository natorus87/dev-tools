export function gcd(a: number, b: number): number {
  if (!b)
    return a;
  return gcd(b, a % b);
}

export function calculateRatio(width: number, height: number): { widthRatio: number; heightRatio: number } | null {
  if (width <= 0 || height <= 0 || !Number.isInteger(width) || !Number.isInteger(height)) {
    return null;
  }
  const divisor = gcd(width, height);
  return {
    widthRatio: width / divisor,
    heightRatio: height / divisor,
  };
}

export function calculateNewHeight(originalWidth: number, originalHeight: number, newWidth: number): number | null {
  if (originalWidth <= 0 || originalHeight <= 0 || newWidth <= 0) {
    return null;
  }
  return Math.round((originalHeight / originalWidth) * newWidth);
}

export function calculateNewWidth(originalWidth: number, originalHeight: number, newHeight: number): number | null {
  if (originalWidth <= 0 || originalHeight <= 0 || newHeight <= 0) {
    return null;
  }
  return Math.round((originalWidth / originalHeight) * newHeight);
}
