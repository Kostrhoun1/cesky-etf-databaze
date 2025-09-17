// Mapping of ETF tickers to their ISIN codes for creating links to ETF details
export const ETF_TICKER_TO_ISIN: Record<string, string> = {
  // Global ETFs
  "VWCE": "IE00BK5BQT80", // Vanguard FTSE All-World
  "IWDA": "IE00B4L5Y983", // iShares Core MSCI World
  "VEVE": "IE00BK5BQV03", // Vanguard FTSE Developed World
  
  // US ETFs  
  "CSPX": "IE00B5BMR087", // iShares Core S&P 500 UCITS ETF USD (Acc)
  "SXR8": "IE00B5BMR087", // Alternative ticker for iShares Core S&P 500
  "VUAA": "IE00B3XXRP09", // Vanguard S&P 500
  "SWDA": "IE00BFY0GT14", // SPDR S&P 500 (Acc)
  "SPY5": "IE00B6YX5C33", // SPDR S&P 500 (Dist)
  
  // Europe ETFs
  "SX5E": "IE0008471009", // iShares Core EURO STOXX 50
  "CSX1": "IE00B4L5YX21", // iShares Core EURO STOXX 50
  "EUNL": "IE00B4L5Y983", // iShares Core MSCI Europe
  "VMID": "IE00BKX55T58", // Vanguard FTSE Europe
  
  // Emerging Markets
  "VFEM": "IE00BK5BR626", // Vanguard FTSE Emerging Markets
  "EIMI": "IE00BKM4GZ66", // iShares Core MSCI Emerging Markets
  "XMME": "IE00BTJRMP35", // Xtrackers MSCI Emerging Markets
  
  // Bond ETFs  
  "AGGG": "IE00BZ163L38", // iShares Core Global Aggregate Bond
  "IEAG": "IE00B3F81R35", // iShares Core Euro Aggregate Bond
  "IGLH": "IE00BZ163M29", // iShares Global Government Bond
  
  // Dividend ETFs
  "VHYL": "IE00BZ0PKT83", // Vanguard FTSE All-World High Dividend Yield
  "UDVD": "IE00B6YX5D40", // SPDR S&P U.S. Dividend Aristocrats
  "WDIV": "IE00BYTRR863", // SPDR S&P Global Dividend Aristocrats
  
  // Sector ETFs
  "INRG": "IE00B1XNHC34", // iShares Global Clean Energy
  "XWT1": "IE00BM67HM91", // Xtrackers MSCI World Information Technology
  "IUSN": "IE00BD45KH83", // iShares Core S&P 500
  
  // Others
  "CORP": "IE00BZ163H91", // iShares Global Corp Bond
  "XGLE": "IE00BG47KB92", // Xtrackers Global Government Bond
};

// Helper function to get ISIN for a ticker
export const getETFIsin = (ticker: string): string | undefined => {
  return ETF_TICKER_TO_ISIN[ticker.toUpperCase()];
};

// Reverse mapping: ISIN to ticker
export const ETF_ISIN_TO_TICKER: Record<string, string> = {};
Object.entries(ETF_TICKER_TO_ISIN).forEach(([ticker, isin]) => {
  ETF_ISIN_TO_TICKER[isin] = ticker;
});

// Helper function to get ticker for an ISIN
export const getETFTicker = (isin: string): string | undefined => {
  return ETF_ISIN_TO_TICKER[isin];
};