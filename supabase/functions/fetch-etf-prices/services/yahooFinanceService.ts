
// Služba pro získání dat z Yahoo Finance

export interface YahooFinanceResponse {
  chart: {
    result: Array<{
      meta: {
        regularMarketPrice: number;
        previousClose: number;
        fiftyTwoWeekHigh: number;
        fiftyTwoWeekLow: number;
      };
      timestamp: number[];
      indicators: {
        quote: Array<{
          close: number[];
        }>;
      };
    }>;
  };
}

async function fetchYahooFinanceData(ticker: string): Promise<any> {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?range=5y&interval=1mo`;

    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      return null;
    }

    const data: YahooFinanceResponse = await response.json();
    if (!data.chart?.result?.[0]) return null;

    const result = data.chart.result[0];
    const currentPrice = result.meta.regularMarketPrice;
    const previousClose = result.meta.previousClose;
    const timestamps = result.timestamp;
    const closePrices = result.indicators.quote[0].close;

    if (!timestamps || !closePrices || closePrices.length === 0) {
      return { currentPrice, previousClose };
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const startOfYear = new Date(currentYear, 0, 1).getTime() / 1000;

    let ytdPrice = null;
    let oneYearPrice = null;
    let threeYearPrice = null;
    let fiveYearPrice = null;
    let tenYearPrice = null;

    const oneYearAgo = now.getTime() / 1000 - 365 * 24 * 60 * 60;
    const threeYearsAgo = now.getTime() / 1000 - 3 * 365 * 24 * 60 * 60;
    const fiveYearsAgo = now.getTime() / 1000 - 5 * 365 * 24 * 60 * 60;
    const tenYearsAgo = now.getTime() / 1000 - 10 * 365 * 24 * 60 * 60;

    for (let i = 0; i < timestamps.length; i++) {
      const timestamp = timestamps[i];
      const price = closePrices[i];
      if (!price) continue;
      if (!ytdPrice && timestamp >= startOfYear) ytdPrice = price;
      if (!oneYearPrice && timestamp >= oneYearAgo) oneYearPrice = price;
      if (!threeYearPrice && timestamp >= threeYearsAgo) threeYearPrice = price;
      if (!fiveYearPrice && timestamp >= fiveYearsAgo) fiveYearPrice = price;
      if (!tenYearPrice && timestamp >= tenYearsAgo) tenYearPrice = price;
    }

    const calculateReturn = (current: number, old: number | null) =>
      !old || old === 0 ? 0 : ((current - old) / old) * 100;

    const returns = {
      currentPrice,
      previousClose,
      ytdReturnPercent: calculateReturn(currentPrice, ytdPrice),
      return1yPercent: calculateReturn(currentPrice, oneYearPrice),
      return3yPercent: calculateReturn(currentPrice, threeYearPrice),
      return5yPercent: calculateReturn(currentPrice, fiveYearPrice),
      return10yPercent: calculateReturn(currentPrice, tenYearPrice),
    };

    return returns;
  } catch {
    return null;
  }
}

export { fetchYahooFinanceData };
