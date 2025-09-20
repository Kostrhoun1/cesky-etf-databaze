// Alternative market data API using free services
// This will be used as fallback if Yahoo Finance doesn't work

// Using Alpha Vantage free tier (5 API calls per minute, 500 per day)
const ALPHA_VANTAGE_API_KEY = 'demo'; // Replace with real key if needed

// Mock data generator as last resort
export function generateMockMarketData(period: string) {
  console.log('🎭 Generating mock market data for development/demo purposes');
  
  // Generate realistic-looking mock data
  const generateMockPerformance = () => {
    // Generate performance between -15% and +15%
    return Number((Math.random() * 30 - 15).toFixed(2));
  };

  const generateMockPrice = (basePrice: number) => {
    // Vary price by ±20%
    return Number((basePrice * (0.8 + Math.random() * 0.4)).toFixed(2));
  };

  const mockData = {
    metadata: {
      period,
      generated_at: new Date().toISOString(),
      data_source: 'Mock Data (Development)'
    },
    sectors: {
      'Technology': {
        symbol: 'XLK',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(150),
        currency: 'USD',
        name: 'Technology Select Sector SPDR Fund',
        last_updated: new Date().toISOString()
      },
      'Healthcare': {
        symbol: 'XLV',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(140),
        currency: 'USD',
        name: 'Health Care Select Sector SPDR Fund',
        last_updated: new Date().toISOString()
      },
      'Financials': {
        symbol: 'XLF',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(38),
        currency: 'USD',
        name: 'Financial Select Sector SPDR Fund',
        last_updated: new Date().toISOString()
      },
      'Energy': {
        symbol: 'XLE',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(85),
        currency: 'USD',
        name: 'Energy Select Sector SPDR Fund',
        last_updated: new Date().toISOString()
      },
      'Utilities': {
        symbol: 'XLU',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(75),
        currency: 'USD',
        name: 'Utilities Select Sector SPDR Fund',
        last_updated: new Date().toISOString()
      },
      'Consumer Staples': {
        symbol: 'XLP',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(78),
        currency: 'USD',
        name: 'Consumer Staples Select Sector SPDR Fund',
        last_updated: new Date().toISOString()
      },
      'Consumer Discretionary': {
        symbol: 'XLY',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(160),
        currency: 'USD',
        name: 'Consumer Discretionary Select Sector SPDR Fund',
        last_updated: new Date().toISOString()
      },
      'Industrials': {
        symbol: 'XLI',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(115),
        currency: 'USD',
        name: 'Industrial Select Sector SPDR Fund',
        last_updated: new Date().toISOString()
      },
      'Materials': {
        symbol: 'XLB',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(88),
        currency: 'USD',
        name: 'Materials Select Sector SPDR Fund',
        last_updated: new Date().toISOString()
      },
      'Real Estate': {
        symbol: 'XLRE',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(45),
        currency: 'USD',
        name: 'Real Estate Select Sector SPDR Fund',
        last_updated: new Date().toISOString()
      },
      'Communication Services': {
        symbol: 'XLC',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(78),
        currency: 'USD',
        name: 'Communication Services Select Sector SPDR Fund',
        last_updated: new Date().toISOString()
      }
    },
    regions: {
      'USA': {
        symbol: 'VTI',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(250),
        currency: 'USD',
        name: 'Vanguard Total Stock Market ETF',
        last_updated: new Date().toISOString()
      },
      'Europe': {
        symbol: 'VGK',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(65),
        currency: 'USD',
        name: 'Vanguard FTSE Europe ETF',
        last_updated: new Date().toISOString()
      },
      'Japan': {
        symbol: 'EWJ',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(58),
        currency: 'USD',
        name: 'iShares MSCI Japan ETF',
        last_updated: new Date().toISOString()
      },
      'China': {
        symbol: 'FXI',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(28),
        currency: 'USD',
        name: 'iShares China Large-Cap ETF',
        last_updated: new Date().toISOString()
      },
      'Emerging Markets': {
        symbol: 'VWO',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(45),
        currency: 'USD',
        name: 'Vanguard FTSE Emerging Markets ETF',
        last_updated: new Date().toISOString()
      },
      'Developed Markets': {
        symbol: 'VEA',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(52),
        currency: 'USD',
        name: 'Vanguard FTSE Developed Markets ETF',
        last_updated: new Date().toISOString()
      },
      'Asia Pacific': {
        symbol: 'VPL',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(85),
        currency: 'USD',
        name: 'Vanguard FTSE Pacific ETF',
        last_updated: new Date().toISOString()
      }
    },
    asset_classes: {
      'US Stocks': {
        symbol: 'VTI',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(250),
        currency: 'USD',
        name: 'Vanguard Total Stock Market ETF',
        last_updated: new Date().toISOString()
      },
      'International Stocks': {
        symbol: 'VTIAX',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(32),
        currency: 'USD',
        name: 'Vanguard Total International Stock Index Fund',
        last_updated: new Date().toISOString()
      },
      'Bonds': {
        symbol: 'BND',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(75),
        currency: 'USD',
        name: 'Vanguard Total Bond Market ETF',
        last_updated: new Date().toISOString()
      },
      'REITs': {
        symbol: 'VNQ',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(95),
        currency: 'USD',
        name: 'Vanguard Real Estate ETF',
        last_updated: new Date().toISOString()
      },
      'Commodities': {
        symbol: 'DJP',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(28),
        currency: 'USD',
        name: 'iPath Bloomberg Commodity Index Total Return ETN',
        last_updated: new Date().toISOString()
      },
      'Gold': {
        symbol: 'GLD',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(185),
        currency: 'USD',
        name: 'SPDR Gold Shares',
        last_updated: new Date().toISOString()
      },
      'Bitcoin': {
        symbol: 'BTC-USD',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(45000),
        currency: 'USD',
        name: 'Bitcoin USD',
        last_updated: new Date().toISOString()
      },
      'Oil': {
        symbol: 'USO',
        performance: generateMockPerformance(),
        current_price: generateMockPrice(78),
        currency: 'USD',
        name: 'United States Oil Fund',
        last_updated: new Date().toISOString()
      }
    }
  };

  // Generate summary statistics
  const stats = {
    best_performers: {} as Record<string, [string, number]>,
    worst_performers: {} as Record<string, [string, number]>,
    category_averages: {} as Record<string, number>
  };
  
  for (const [category, items] of Object.entries(mockData)) {
    if (category === 'metadata') continue;
    
    const categoryData = items as Record<string, any>;
    const performances = Object.entries(categoryData).map(([name, item]) => [name, item.performance]);
    performances.sort((a, b) => (b[1] as number) - (a[1] as number));
    
    if (performances.length > 0) {
      stats.best_performers[category] = performances[0] as [string, number];
      stats.worst_performers[category] = performances[performances.length - 1] as [string, number];
      
      const avgPerformance = performances.reduce((sum, [, perf]) => sum + (perf as number), 0) / performances.length;
      stats.category_averages[category] = Number(avgPerformance.toFixed(2));
    }
  }

  return {
    ...mockData,
    summary_stats: stats
  };
}