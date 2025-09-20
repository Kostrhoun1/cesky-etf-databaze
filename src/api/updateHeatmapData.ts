// Market symbols data - same as in Python script
const MARKET_DATA = {
  sectors: {
    'Technology': 'XLK',
    'Healthcare': 'XLV', 
    'Financials': 'XLF',
    'Energy': 'XLE',
    'Utilities': 'XLU',
    'Consumer Staples': 'XLP',
    'Consumer Discretionary': 'XLY',
    'Industrials': 'XLI',
    'Materials': 'XLB',
    'Real Estate': 'XLRE',
    'Communication Services': 'XLC'
  },
  regions: {
    'USA': 'VTI',
    'Europe': 'VGK', 
    'Japan': 'EWJ',
    'China': 'FXI',
    'Emerging Markets': 'VWO',
    'Developed Markets': 'VEA',
    'Asia Pacific': 'VPL'
  },
  asset_classes: {
    'US Stocks': 'VTI',
    'International Stocks': 'VTIAX',
    'Bonds': 'BND',
    'REITs': 'VNQ',
    'Commodities': 'DJP',
    'Gold': 'GLD',
    'Bitcoin': 'BTC-USD',
    'Oil': 'USO'
  }
};

// Yahoo Finance API helper
async function fetchYahooFinanceData(symbol: string, period: string = '1mo') {
  try {
    console.log(`📊 Fetching data for ${symbol} (${period})...`);
    
    // Use Yahoo Finance API v7 (more reliable)
    const apiUrl = `https://query2.finance.yahoo.com/v7/finance/chart/${symbol}`;
    const params = new URLSearchParams({
      period1: getPeriodStartTimestamp(period).toString(),
      period2: Math.floor(Date.now() / 1000).toString(),
      interval: '1d',
      includePrePost: 'true',
      events: 'div,splits'
    });

    const fullUrl = `${apiUrl}?${params}`;
    console.log(`🔗 Request URL: ${fullUrl}`);

    // Try direct Yahoo Finance first, then fall back to proxy if CORS issues
    let response;
    try {
      response = await fetch(fullUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });
    } catch (corsError) {
      console.warn(`🚫 CORS error for ${symbol}, trying proxy...`, corsError);
      // Fallback to CORS proxy
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(fullUrl)}`;
      response = await fetch(proxyUrl);
      
      if (response.ok) {
        const proxyData = await response.json();
        const data = JSON.parse(proxyData.contents);
        // Process the data the same way...
        const result = data.chart.result[0];
        
        if (!result || !result.indicators?.quote?.[0]?.close) {
          throw new Error('No price data available via proxy');
        }
        
        const prices = result.indicators.quote[0].close.filter((p: number) => p !== null);
        if (prices.length < 2) {
          throw new Error('Insufficient price data via proxy');
        }
        
        const startPrice = prices[0];
        const endPrice = prices[prices.length - 1];
        const performance = ((endPrice - startPrice) / startPrice) * 100;
        
        const resultData = {
          symbol,
          performance: Number(performance.toFixed(2)),
          current_price: Number(endPrice.toFixed(2)),
          currency: result.meta.currency || 'USD',
          name: result.meta.longName || symbol,
          last_updated: new Date().toISOString()
        };
        
        console.log(`✅ Success via proxy for ${symbol}:`, resultData);
        return resultData;
      }
    }
    
    console.log(`📡 Response status: ${response.status} ${response.statusText}`);
    
    if (!response.ok) {
      const responseText = await response.text();
      console.error(`❌ API Error for ${symbol}:`, responseText);
      throw new Error(`HTTP error! status: ${response.status} - ${responseText}`);
    }
    
    const data = await response.json();
    console.log(`📦 Raw data for ${symbol}:`, data);
    
    const result = data.chart.result[0];
    
    if (!result) {
      console.error(`❌ No result in chart data for ${symbol}`);
      throw new Error('No result in chart data');
    }
    
    if (!result.indicators?.quote?.[0]?.close) {
      console.error(`❌ No price data in result for ${symbol}:`, result);
      throw new Error('No price data available');
    }
    
    const prices = result.indicators.quote[0].close.filter((p: number) => p !== null);
    console.log(`📈 Prices for ${symbol}: ${prices.length} data points, first: ${prices[0]}, last: ${prices[prices.length - 1]}`);
    
    if (prices.length < 2) {
      throw new Error('Insufficient price data');
    }
    
    const startPrice = prices[0];
    const endPrice = prices[prices.length - 1];
    const performance = ((endPrice - startPrice) / startPrice) * 100;
    
    const meta = result.meta;
    
    const resultData = {
      symbol,
      performance: Number(performance.toFixed(2)),
      current_price: Number(endPrice.toFixed(2)),
      currency: meta.currency || 'USD',
      name: meta.longName || symbol,
      last_updated: new Date().toISOString()
    };
    
    console.log(`✅ Success for ${symbol}:`, resultData);
    return resultData;
    
  } catch (error) {
    console.error(`❌ Failed to fetch data for ${symbol}:`, error);
    return null;
  }
}

// Helper to calculate period start timestamp
function getPeriodStartTimestamp(period: string): number {
  const now = new Date();
  const nowTimestamp = Math.floor(now.getTime() / 1000);
  
  switch (period) {
    case '1d':
      return nowTimestamp - (24 * 60 * 60);
    case 'wtd': // Week to date - from Monday
      const daysFromMonday = (now.getDay() + 6) % 7; // Monday = 0
      return nowTimestamp - (daysFromMonday * 24 * 60 * 60);
    case 'mtd': // Month to date - from 1st of month
      const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return Math.floor(firstOfMonth.getTime() / 1000);
    case 'ytd': // Year to date
      const firstOfYear = new Date(now.getFullYear(), 0, 1);
      return Math.floor(firstOfYear.getTime() / 1000);
    case '1y':
      return nowTimestamp - (365 * 24 * 60 * 60);
    case '3y':
      return nowTimestamp - (3 * 365 * 24 * 60 * 60);
    case '5y':
      return nowTimestamp - (5 * 365 * 24 * 60 * 60);
    case '10y':
      return nowTimestamp - (10 * 365 * 24 * 60 * 60);
    default:
      return nowTimestamp - (30 * 24 * 60 * 60); // 1 month default
  }
}

// Helper function to add delay between requests
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate performance data for a category with rate limiting
async function generateCategoryData(symbols: Record<string, string>, period: string) {
  const results: Record<string, any> = {};
  
  // Process sequentially with delays to avoid rate limiting
  for (const [name, symbol] of Object.entries(symbols)) {
    try {
      const data = await fetchYahooFinanceData(symbol, period);
      if (data) {
        results[name] = data;
      }
      // Wait 100ms between requests to avoid rate limiting
      await delay(100);
    } catch (error) {
      console.warn(`Failed to fetch ${symbol}:`, error);
      // Continue with next symbol
    }
  }
  
  return results;
}

// Generate summary statistics
function generateSummaryStats(data: any) {
  const stats = {
    best_performers: {} as Record<string, [string, number]>,
    worst_performers: {} as Record<string, [string, number]>,
    category_averages: {} as Record<string, number>
  };
  
  for (const [category, items] of Object.entries(data)) {
    if (category === 'metadata') continue;
    
    const categoryData = items as Record<string, any>;
    if (!categoryData || Object.keys(categoryData).length === 0) continue;
    
    const performances = Object.entries(categoryData).map(([name, item]) => [name, item.performance]);
    performances.sort((a, b) => (b[1] as number) - (a[1] as number));
    
    if (performances.length > 0) {
      stats.best_performers[category] = performances[0] as [string, number];
      stats.worst_performers[category] = performances[performances.length - 1] as [string, number];
      
      const avgPerformance = performances.reduce((sum, [, perf]) => sum + (perf as number), 0) / performances.length;
      stats.category_averages[category] = Number(avgPerformance.toFixed(2));
    }
  }
  
  return stats;
}

export async function updateHeatmapData(period: string = '1mo'): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    console.log(`🔥 Generating market heatmap for period: ${period}`);
    
    // Generate data for all categories sequentially to avoid rate limiting
    console.log('🔄 Fetching sectors data...');
    const sectorsData = await generateCategoryData(MARKET_DATA.sectors, period);
    
    console.log('🔄 Fetching regions data...');
    const regionsData = await generateCategoryData(MARKET_DATA.regions, period);
    
    console.log('🔄 Fetching asset classes data...');
    const assetClassesData = await generateCategoryData(MARKET_DATA.asset_classes, period);
    
    const totalDataPoints = Object.keys(sectorsData).length + Object.keys(regionsData).length + Object.keys(assetClassesData).length;
    
    // If we got very few data points, fall back to mock data for development
    if (totalDataPoints < 5) {
      console.warn('⚠️ Yahoo Finance API failed to return sufficient data, falling back to mock data');
      const { generateMockMarketData } = await import('./alternativeMarketData');
      const mockData = generateMockMarketData(period);
      
      return {
        success: true,
        message: `Market heatmap data aktualizována pomocí demo dat! (11 sektorů, 7 regionů, 8 tříd aktiv) - Yahoo Finance API nedostupné`,
        data: mockData
      };
    }
    
    const heatmapData = {
      metadata: {
        period,
        generated_at: new Date().toISOString(),
        data_source: 'Yahoo Finance'
      },
      sectors: sectorsData,
      regions: regionsData,
      asset_classes: assetClassesData
    };
    
    // Add summary statistics
    const summaryStats = generateSummaryStats(heatmapData);
    const finalData = {
      ...heatmapData,
      summary_stats: summaryStats
    };
    
    console.log(`✅ Generated heatmap data with ${totalDataPoints} data points`);
    
    return {
      success: true,
      message: `Market heatmap data úspěšně aktualizována! (${Object.keys(sectorsData).length} sektorů, ${Object.keys(regionsData).length} regionů, ${Object.keys(assetClassesData).length} tříd aktiv)`,
      data: finalData
    };
    
  } catch (error) {
    console.error('Error updating heatmap data:', error);
    
    // Final fallback to mock data if everything fails
    console.warn('🆘 All market data sources failed, using mock data');
    try {
      const { generateMockMarketData } = await import('./alternativeMarketData');
      const mockData = generateMockMarketData(period);
      
      return {
        success: true,
        message: `Market heatmap data aktualizována pomocí demo dat! API nedostupné: ${(error as Error).message}`,
        data: mockData
      };
    } catch (mockError) {
      return {
        success: false,
        message: 'Kritická chyba: ' + (error as Error).message
      };
    }
  }
}