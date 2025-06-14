
// Utility funkce používané v edge funkci
 
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
 
export function getYahooSuffix(exchangeName: string | null): string {
  if (!exchangeName) return '';
  const normalized = exchangeName.trim().toLowerCase();
  if (normalized.includes('xetra')) return '.DE';
  if (normalized.includes('frankfurt')) return '.F';
  if (normalized.includes('swiss') || normalized.includes('zurich')) return '.SW';
  if (normalized.includes('milan')) return '.MI';
  if (normalized.includes('prague')) return '.PRG';
  if (normalized.includes('london')) return '.L';
  if (normalized.includes('amsterdam')) return '.AS';
  if (normalized.includes('nyse')) return '';
  if (normalized.includes('nasdaq')) return '';
  if (normalized.includes('paris')) return '.PA';
  return '';
}
