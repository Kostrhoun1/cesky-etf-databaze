import React, { useState, useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useETFData } from '@/hooks/useETFData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Sparkles, TrendingUp, Shield, Bitcoin, Gem, Building } from 'lucide-react';
import MarketHeatmapEN from '@/components/infographics/MarketHeatmapEN';

interface InfographicProps {
  title: string;
  subtitle?: string;
  data?: any[];
  type: 'bar' | 'pie' | 'stats';
  children?: React.ReactNode;
  category?: string;
}

// ETF Guide colors
const COLORS = {
  primary: '#8B5FBF', // violet-600 from design
  primaryLight: '#A78BFA', // violet-400
  primaryDark: '#6D28D9', // violet-700
  success: '#10B981', // emerald-500
  warning: '#F59E0B', // amber-500
  danger: '#EF4444', // red-500
  info: '#3B82F6', // blue-500
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    600: '#4B5563',
    900: '#111827'
  }
};

const CHART_COLORS = [COLORS.primary, COLORS.success, COLORS.info, COLORS.warning, COLORS.danger, COLORS.primaryLight];

// Function to get icon and colors by category
const getCategoryVisuals = (category: string) => {
  switch (category.toLowerCase()) {
    case 'stocks':
    case 'equity':
      return {
        icon: TrendingUp,
        bgClass: 'from-green-600 via-green-700 to-emerald-800',
        iconBg: 'bg-green-100',
        iconColor: 'text-green-700'
      };
    case 'bonds':
    case 'fixed income':
      return {
        icon: Shield,
        bgClass: 'from-blue-600 via-blue-700 to-cyan-800',
        iconBg: 'bg-blue-100',
        iconColor: 'text-blue-700'
      };
    case 'crypto':
    case 'cryptocurrency':
      return {
        icon: Bitcoin,
        bgClass: 'from-orange-600 via-orange-700 to-amber-800',
        iconBg: 'bg-orange-100',
        iconColor: 'text-orange-700'
      };
    case 'commodities':
    case 'raw materials':
      return {
        icon: Gem,
        bgClass: 'from-yellow-600 via-yellow-700 to-amber-800',
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-700'
      };
    case 'real estate':
    case 'reits':
      return {
        icon: Building,
        bgClass: 'from-purple-600 via-purple-700 to-violet-800',
        iconBg: 'bg-purple-100',
        iconColor: 'text-purple-700'
      };
    default:
      return {
        icon: Sparkles,
        bgClass: 'from-violet-600 via-violet-700 to-purple-800',
        iconBg: 'bg-violet-100',
        iconColor: 'text-violet-700'
      };
  }
};

const InfographicCard: React.FC<InfographicProps> = ({ title, subtitle, data, type, children, category }) => {
  const visuals = getCategoryVisuals(category || '');
  const IconComponent = visuals.icon;

  return (
    <Card className="h-full bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className={`bg-gradient-to-r ${visuals.bgClass} text-white`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${visuals.iconBg}`}>
            <IconComponent className={`h-6 w-6 ${visuals.iconColor}`} />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            {subtitle && <CardDescription className="text-purple-100 mt-1">{subtitle}</CardDescription>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {children || (
          <div className="h-64">
            {type === 'bar' && data && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="value" fill={COLORS.primary} />
                </BarChart>
              </ResponsiveContainer>
            )}
            {type === 'pie' && data && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill={COLORS.primary}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const InfographicsGeneratorEN: React.FC = () => {
  const { data: etfs, loading, error } = useETFData();
  const [infographicType, setInfographicType] = useState<'performance' | 'ter' | 'heatmap'>('performance');
  const [performanceFilter, setPerformanceFilter] = useState<'all' | 'best' | 'worst'>('best');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [terFilter, setTerFilter] = useState<'low' | 'high'>('low');
  const [heatmapPeriod, setHeatmapPeriod] = useState<'1d' | 'wtd' | 'mtd' | 'ytd' | '1y' | '3y' | '5y' | '10y'>('1d');
  const [heatmapData, setHeatmapData] = useState<any>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Load heatmap data
  useEffect(() => {
    const loadHeatmapData = async () => {
      try {
        const response = await fetch(`/src/data/market_heatmap_${heatmapPeriod}.json`);
        const data = await response.json();
        setHeatmapData(data);
      } catch (error) {
        console.error('Error loading heatmap data:', error);
      }
    };

    if (infographicType === 'heatmap') {
      loadHeatmapData();
    }
  }, [heatmapPeriod, infographicType]);

  const exportAsImage = async () => {
    if (!cardRef.current) return;

    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const link = document.createElement('a');
      link.download = `etf-infographic-${infographicType}-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error exporting image:', error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading data...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-red-600">Error loading data: {error}</div>
          </div>
        </div>
      </Layout>
    );
  }

  // Prepare data based on type
  const getInfographicData = () => {
    if (!etfs || etfs.length === 0) return [];
    
    if (infographicType === 'performance') {
      let filteredETFs = etfs;
      
      // Filter by category
      if (categoryFilter !== 'all') {
        filteredETFs = etfs.filter(etf => 
          etf.category?.toLowerCase().includes(categoryFilter.toLowerCase())
        );
      }
      
      // Sort by performance
      const sorted = [...filteredETFs].sort((a, b) => {
        const aPerf = a.performance_1y || 0;
        const bPerf = b.performance_1y || 0;
        return performanceFilter === 'best' ? bPerf - aPerf : aPerf - bPerf;
      });
      
      return sorted.slice(0, 10).map(etf => ({
        name: etf.short_name || etf.name,
        value: etf.performance_1y || 0,
        category: etf.category
      }));
    }
    
    if (infographicType === 'ter') {
      let filteredETFs = etfs.filter(etf => etf.ter && etf.ter > 0);
      
      // Filter by category
      if (categoryFilter !== 'all') {
        filteredETFs = filteredETFs.filter(etf => 
          etf.category?.toLowerCase().includes(categoryFilter.toLowerCase())
        );
      }
      
      // Sort by TER
      const sorted = [...filteredETFs].sort((a, b) => {
        return terFilter === 'low' ? (a.ter || 0) - (b.ter || 0) : (b.ter || 0) - (a.ter || 0);
      });
      
      return sorted.slice(0, 10).map(etf => ({
        name: etf.short_name || etf.name,
        value: etf.ter || 0,
        category: etf.category
      }));
    }
    
    return [];
  };

  const categories = Array.from(new Set(etfs?.map(etf => etf.category).filter(Boolean) || []));
  const infographicData = getInfographicData();

  const getTitle = () => {
    switch (infographicType) {
      case 'performance':
        return `${performanceFilter === 'best' ? 'Top 10 Best' : 'Top 10 Worst'} Performing ETFs`;
      case 'ter':
        return `ETFs with ${terFilter === 'low' ? 'Lowest' : 'Highest'} Management Fees (TER)`;
      case 'heatmap':
        return 'Market Performance Heatmap';
      default:
        return 'ETF Analysis';
    }
  };

  const getSubtitle = () => {
    switch (infographicType) {
      case 'performance':
        return '1-year performance comparison';
      case 'ter':
        return 'Total Expense Ratio comparison';
      case 'heatmap':
        return `${heatmapPeriod.toUpperCase()} period performance across sectors, regions and asset classes`;
      default:
        return '';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-violet-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <h1 className="text-4xl font-black text-gray-900">
                📊 ETF Infographics Generator (EN)
              </h1>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/admin/infografiky'}
                className="text-sm ml-4"
              >
                🇨🇿 Česká verze
              </Button>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create professional infographics from ETF data for social media and presentations
            </p>
            <div className="mt-4">
              <Badge variant="outline" className="bg-violet-100 text-violet-700 border-violet-300">
                @TomAlphaTrades
              </Badge>
            </div>
          </div>

          {/* Controls */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-violet-600" />
                Infographic Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Type Selection */}
              <div>
                <Label className="text-base font-semibold">Infographic Type</Label>
                <RadioGroup 
                  value={infographicType} 
                  onValueChange={(value) => setInfographicType(value as any)}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="performance" id="performance" />
                    <Label htmlFor="performance">📈 Performance Comparison</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ter" id="ter" />
                    <Label htmlFor="ter">💰 Management Fees (TER)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="heatmap" id="heatmap" />
                    <Label htmlFor="heatmap">🔥 Market Heatmap</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Performance Settings */}
              {infographicType === 'performance' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="performance-filter">Performance Filter</Label>
                    <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="best">Best Performing</SelectItem>
                        <SelectItem value="worst">Worst Performing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category-filter">Category</Label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* TER Settings */}
              {infographicType === 'ter' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ter-filter">TER Filter</Label>
                    <Select value={terFilter} onValueChange={setTerFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Lowest TER</SelectItem>
                        <SelectItem value="high">Highest TER</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category-filter">Category</Label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Heatmap Settings */}
              {infographicType === 'heatmap' && (
                <div>
                  <Label htmlFor="heatmap-period">Time Period</Label>
                  <Select value={heatmapPeriod} onValueChange={setHeatmapPeriod}>
                    <SelectTrigger className="w-full md:w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1d">Daily</SelectItem>
                      <SelectItem value="wtd">Week-to-Date</SelectItem>
                      <SelectItem value="mtd">Month-to-Date</SelectItem>
                      <SelectItem value="ytd">Year-to-Date</SelectItem>
                      <SelectItem value="1y">1 Year</SelectItem>
                      <SelectItem value="3y">3 Years</SelectItem>
                      <SelectItem value="5y">5 Years</SelectItem>
                      <SelectItem value="10y">10 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Export Button */}
              <div className="flex justify-center">
                <Button onClick={exportAsImage} className="bg-violet-600 hover:bg-violet-700">
                  📷 Export as Image
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Generated Infographic */}
          <div ref={cardRef}>
            {infographicType === 'heatmap' ? (
              heatmapData ? (
                <div className="bg-white rounded-lg p-8">
                  <MarketHeatmapEN data={heatmapData} />
                </div>
              ) : (
                <div className="flex items-center justify-center h-64">
                  <div className="text-lg">Loading heatmap data...</div>
                </div>
              )
            ) : (
              <InfographicCard
                title={getTitle()}
                subtitle={getSubtitle()}
                data={infographicData}
                type={infographicType === 'performance' ? 'bar' : 'bar'}
                category={categoryFilter !== 'all' ? categoryFilter : undefined}
              />
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              💡 Data from representative ETF funds | 📊 <strong>@TomAlphaTrades</strong>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InfographicsGeneratorEN;