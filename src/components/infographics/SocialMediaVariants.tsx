import React, { useRef } from 'react';
import { TrendingUp, Shield, Bitcoin, Gem, Building, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Barvy optimalizované pro sociální sítě (vyšší kontrast)
const SOCIAL_COLORS = {
  primary: '#6D28D9', // tmavší violet pro lepší čitelnost
  primaryLight: '#8B5FBF',
  accent: '#10B981', // emerald
  danger: '#DC2626', // červená
  warning: '#D97706', // oranžová
  info: '#1D4ED8', // modrá
  dark: '#1F2937',
  light: '#F9FAFB'
};

interface SocialInfographicProps {
  title: string;
  subtitle?: string;
  data?: any[];
  category?: string;
  variant: 'compact' | 'wide' | 'square' | 'story';
  children?: React.ReactNode;
}

// Instagram Story Format (1080x1920)
const StoryInfographic: React.FC<SocialInfographicProps> = ({ title, subtitle, children, category }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={cardRef}
      className="relative w-[1080px] h-[1920px] bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 text-white overflow-hidden"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-emerald-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col p-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <TrendingUp className="w-6 h-6" />
            <span className="font-semibold text-lg">ETF průvodce.cz</span>
          </div>
          <h1 className="text-7xl font-black leading-tight mb-6">{title}</h1>
          {subtitle && <p className="text-3xl text-white/80 font-medium">{subtitle}</p>}
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="text-lg text-white/60 font-medium">
            📊 Analýza ETF fondů pro české investory
          </div>
          <div className="text-base text-white/40 mt-2">
            etfpruvodce.cz
          </div>
        </div>
      </div>
    </div>
  );
};

// Twitter/X Format (1200x675)
const TwitterInfographic: React.FC<SocialInfographicProps> = ({ title, subtitle, children, category }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={cardRef}
      className="relative w-[1200px] h-[675px] bg-white shadow-xl overflow-hidden"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* Header Strip */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="bg-white/20 p-4 rounded-xl">
              <TrendingUp className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold leading-tight">{title}</h1>
              {subtitle && <p className="text-white/80 text-lg mt-1">{subtitle}</p>}
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg text-white/80 font-medium">ETF průvodce.cz</div>
            <div className="text-sm text-white/60">Analýza pro české investory</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="h-[535px] p-6 flex items-center justify-center bg-gray-50">
        {children}
      </div>

      {/* Bottom Strip */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-violet-600 to-purple-600"></div>
    </div>
  );
};

// LinkedIn Format (1200x627)
const LinkedInInfographic: React.FC<SocialInfographicProps> = ({ title, subtitle, children, category }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={cardRef}
      className="relative w-[1200px] h-[627px] bg-white shadow-xl border border-gray-200"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      <div className="h-full flex">
        {/* Content Area */}
        <div className="flex-1 p-8">
          <div className="h-full flex flex-col">
            <div className="mb-6">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">{title}</h1>
              {subtitle && <p className="text-2xl text-gray-600">{subtitle}</p>}
            </div>
            
            <div className="flex-1 flex items-center justify-center">
              {children}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-gradient-to-br from-violet-600 to-purple-700 text-white p-8 flex flex-col justify-between">
          <div>
            <div className="bg-white/20 p-4 rounded-xl mb-6 text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-3" />
              <div className="font-bold text-lg">ETF průvodce</div>
            </div>
            
            <div className="space-y-4">
              <div className="text-white/80 text-sm">
                📊 Komplexní analýza ETF fondů
              </div>
              <div className="text-white/80 text-sm">
                🇨🇿 Pro české investory
              </div>
              <div className="text-white/80 text-sm">
                💰 3500+ ETF v databázi
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-white/60 text-sm">
              etfpruvodce.cz
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Instagram Square (1080x1080)
const SquareInfographic: React.FC<SocialInfographicProps> = ({ title, subtitle, children, category }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={cardRef}
      className="relative w-[1080px] h-[1080px] bg-white shadow-xl"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-violet-50"></div>
      
      <div className="relative z-10 h-full flex flex-col p-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 bg-violet-600 text-white px-6 py-3 rounded-full mb-6">
            <TrendingUp className="w-6 h-6" />
            <span className="font-bold text-lg">ETF průvodce.cz</span>
          </div>
          <h1 className="text-6xl font-black text-gray-900 leading-tight mb-6">{title}</h1>
          {subtitle && <p className="text-2xl text-gray-600 font-medium">{subtitle}</p>}
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-4xl">
            {children}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-10">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <span>📊 Analýza ETF fondů</span>
            <span>•</span>
            <span>🇨🇿 Pro české investory</span>
            <span>•</span>
            <span>etfpruvodce.cz</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Hlavní komponenta s výběrem variant
const SocialMediaInfographics: React.FC<{
  title: string;
  subtitle?: string;
  data?: any[];
  category?: string;
  children?: React.ReactNode;
}> = ({ title, subtitle, data, category, children }) => {
  const [selectedVariant, setSelectedVariant] = React.useState<'compact' | 'wide' | 'square' | 'story'>('square');

  const downloadImage = (format: string) => {
    // Implementation for downloading image
    console.log(`Downloading ${format} format`);
  };

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          variant={selectedVariant === 'square' ? 'default' : 'outline'}
          onClick={() => setSelectedVariant('square')}
          className="gap-2"
        >
          📱 Instagram Square (1080x1080)
        </Button>
        <Button
          variant={selectedVariant === 'wide' ? 'default' : 'outline'}
          onClick={() => setSelectedVariant('wide')}
          className="gap-2"
        >
          🐦 Twitter/X (1200x675)
        </Button>
        <Button
          variant={selectedVariant === 'compact' ? 'default' : 'outline'}
          onClick={() => setSelectedVariant('compact')}
          className="gap-2"
        >
          💼 LinkedIn (1200x627)
        </Button>
        <Button
          variant={selectedVariant === 'story' ? 'default' : 'outline'}
          onClick={() => setSelectedVariant('story')}
          className="gap-2"
        >
          📱 Story (1080x1920)
        </Button>
      </div>

      {/* Download Buttons */}
      <div className="flex gap-2 justify-center">
        <Button variant="outline" onClick={() => downloadImage('png')} className="gap-2">
          <Download className="w-4 h-4" />
          PNG
        </Button>
        <Button variant="outline" onClick={() => downloadImage('jpg')} className="gap-2">
          <Download className="w-4 h-4" />
          JPG
        </Button>
        <Button variant="outline" onClick={() => downloadImage('svg')} className="gap-2">
          <Share2 className="w-4 h-4" />
          SVG
        </Button>
      </div>

      {/* Preview */}
      <div className="flex justify-center overflow-auto">
        <div className="transform scale-50 origin-top">
          {selectedVariant === 'square' && (
            <SquareInfographic title={title} subtitle={subtitle} category={category} variant="square">
              {children}
            </SquareInfographic>
          )}
          {selectedVariant === 'wide' && (
            <TwitterInfographic title={title} subtitle={subtitle} category={category} variant="wide">
              {children}
            </TwitterInfographic>
          )}
          {selectedVariant === 'compact' && (
            <LinkedInInfographic title={title} subtitle={subtitle} category={category} variant="compact">
              {children}
            </LinkedInInfographic>
          )}
          {selectedVariant === 'story' && (
            <StoryInfographic title={title} subtitle={subtitle} category={category} variant="story">
              {children}
            </StoryInfographic>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialMediaInfographics;
export { TwitterInfographic, LinkedInInfographic, SquareInfographic, StoryInfographic };