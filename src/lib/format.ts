export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Spread onto an <img> to request high fetch priority. React 18 warns on the
 * camelCase `fetchPriority` prop, so pass the lowercase DOM attribute instead.
 */
export const HIGH_PRIORITY = { fetchpriority: 'high' } as Record<string, string>;
