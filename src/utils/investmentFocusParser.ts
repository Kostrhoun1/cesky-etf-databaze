export interface InvestmentFocusInfo {
  assetClass: string;
  region: string;
  sector?: string;
  marketCap?: string;
  investmentStyle?: string;
  currency?: string;
}

/**
 * Parsuje investment_focus pole z JustETF a extrahuje strukturované informace
 * Příklad: "Equity, United States, Large Cap, Technology, USD"
 */
export function parseInvestmentFocus(investmentFocus: string): InvestmentFocusInfo {
  if (!investmentFocus) {
    return {
      assetClass: 'Unknown',
      region: 'Unknown'
    };
  }

  const parts = investmentFocus.split(',').map(part => part.trim());
  
  const result: InvestmentFocusInfo = {
    assetClass: 'Unknown',
    region: 'Unknown'
  };

  // Asset class je obvykle první element
  if (parts[0]) {
    result.assetClass = mapAssetClass(parts[0]);
  }

  // Region/geografické zaměření
  for (const part of parts) {
    const region = mapRegion(part);
    if (region !== 'Unknown') {
      result.region = region;
      break;
    }
  }

  // Sektor
  for (const part of parts) {
    const sector = mapSector(part);
    if (sector) {
      result.sector = sector;
      break;
    }
  }

  // Market cap
  for (const part of parts) {
    const marketCap = mapMarketCap(part);
    if (marketCap) {
      result.marketCap = marketCap;
      break;
    }
  }

  // Investment style
  for (const part of parts) {
    const style = mapInvestmentStyle(part);
    if (style) {
      result.investmentStyle = style;
      break;
    }
  }

  // Currency
  for (const part of parts) {
    if (/^[A-Z]{3}$/.test(part)) {
      result.currency = part;
      break;
    }
  }

  return result;
}

/**
 * Mapuje asset class z investment_focus na naše kategorie
 */
function mapAssetClass(assetClass: string): string {
  const normalized = assetClass.toLowerCase();
  
  if (normalized.includes('equity') || normalized.includes('stock')) {
    return 'Akcie';
  }
  
  if (normalized.includes('bond') || normalized.includes('fixed income')) {
    return 'Dluhopisy';
  }
  
  if (normalized.includes('real estate') || normalized.includes('reit')) {
    return 'Nemovitosti';
  }
  
  if (normalized.includes('commodity') || normalized.includes('commodities')) {
    return 'Komodity';
  }
  
  if (normalized.includes('crypto') || normalized.includes('bitcoin')) {
    return 'Krypto';
  }
  
  if (normalized.includes('money market') || normalized.includes('cash')) {
    return 'Peněžní trh';
  }
  
  return 'Ostatní';
}

/**
 * Mapuje geografické zaměření na standardizované regiony
 */
function mapRegion(region: string): string {
  const normalized = region.toLowerCase();
  
  // Spojené státy
  if (normalized.includes('united states') || normalized.includes('usa') || normalized.includes('us ')) {
    return 'Severní Amerika';
  }
  
  // Evropa
  if (normalized.includes('europe') || normalized.includes('eurozone') || normalized.includes('eu ')) {
    return 'Evropa';
  }
  
  // Specific European countries
  if (normalized.includes('germany') || normalized.includes('france') || 
      normalized.includes('italy') || normalized.includes('spain') ||
      normalized.includes('netherlands') || normalized.includes('switzerland') ||
      normalized.includes('united kingdom') || normalized.includes('uk')) {
    return 'Evropa';
  }
  
  // Asie
  if (normalized.includes('asia') || normalized.includes('pacific') || 
      normalized.includes('japan') || normalized.includes('china') ||
      normalized.includes('emerging asia') || normalized.includes('asia pacific')) {
    return 'Asie a Pacifik';
  }
  
  // Emerging markets
  if (normalized.includes('emerging') || normalized.includes('developing')) {
    return 'Rozvíjející se trhy';
  }
  
  // Global/World
  if (normalized.includes('global') || normalized.includes('world') || 
      normalized.includes('international') || normalized.includes('broad')) {
    return 'Celosvětově';
  }
  
  // Latin America
  if (normalized.includes('latin america') || normalized.includes('brazil')) {
    return 'Latinská Amerika';
  }
  
  // Middle East & Africa
  if (normalized.includes('middle east') || normalized.includes('africa')) {
    return 'Střední východ a Afrika';
  }
  
  return 'Unknown';
}

/**
 * Identifikuje sektor z investment_focus
 */
function mapSector(sector: string): string | undefined {
  const normalized = sector.toLowerCase();
  
  const sectorMap: Record<string, string> = {
    'technology': 'Technologie',
    'healthcare': 'Zdravotnictví',
    'financials': 'Finanční služby',
    'consumer discretionary': 'Spotřební zboží',
    'consumer staples': 'Spotřební zboží',
    'industrials': 'Průmysl',
    'energy': 'Energie',
    'utilities': 'Veřejné služby',
    'materials': 'Materiály',
    'telecommunications': 'Telekomunikace',
    'real estate': 'Nemovitosti'
  };
  
  for (const [key, value] of Object.entries(sectorMap)) {
    if (normalized.includes(key)) {
      return value;
    }
  }
  
  return undefined;
}

/**
 * Identifikuje market cap segment
 */
function mapMarketCap(text: string): string | undefined {
  const normalized = text.toLowerCase();
  
  if (normalized.includes('large cap') || normalized.includes('large-cap')) {
    return 'Large Cap';
  }
  
  if (normalized.includes('mid cap') || normalized.includes('mid-cap')) {
    return 'Mid Cap';
  }
  
  if (normalized.includes('small cap') || normalized.includes('small-cap')) {
    return 'Small Cap';
  }
  
  return undefined;
}

/**
 * Identifikuje investiční styl
 */
function mapInvestmentStyle(text: string): string | undefined {
  const normalized = text.toLowerCase();
  
  if (normalized.includes('dividend') || normalized.includes('yield')) {
    return 'Dividend';
  }
  
  if (normalized.includes('growth')) {
    return 'Growth';
  }
  
  if (normalized.includes('value')) {
    return 'Value';
  }
  
  if (normalized.includes('esg') || normalized.includes('sustainable')) {
    return 'ESG';
  }
  
  return undefined;
}

/**
 * Získá lidsky čitelný popis investment focus
 */
export function getInvestmentFocusDescription(info: InvestmentFocusInfo): string {
  const parts = [info.assetClass];
  
  if (info.region !== 'Unknown') {
    parts.push(info.region);
  }
  
  if (info.sector) {
    parts.push(info.sector);
  }
  
  if (info.marketCap) {
    parts.push(info.marketCap);
  }
  
  if (info.investmentStyle) {
    parts.push(info.investmentStyle);
  }
  
  return parts.join(' • ');
}

/**
 * Zkontroluje, zda ETF odpovídá regionu podle investment_focus
 */
export function matchesRegion(investmentFocus: string, targetRegion: string): boolean {
  const info = parseInvestmentFocus(investmentFocus);
  return info.region === targetRegion;
}

/**
 * Zkontroluje, zda ETF odpovídá asset class podle investment_focus
 */
export function matchesAssetClass(investmentFocus: string, targetAssetClass: string): boolean {
  const info = parseInvestmentFocus(investmentFocus);
  return info.assetClass === targetAssetClass;
}