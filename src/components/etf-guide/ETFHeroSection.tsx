
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { TrendingUp, BookOpen, Calculator } from 'lucide-react';

const ETFHeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900 overflow-hidden text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-500/30 to-transparent"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium mb-8 animate-fade-in border border-white/20">
            <BookOpen className="w-4 h-4 mr-2" />
            Kompletní průvodce pro české investory
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight animate-fade-in">
            Co jsou <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">ETF fondy?</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-violet-100 max-w-4xl mx-auto leading-relaxed mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Jednoduché vysvětlení, praktické tipy a vše, co potřebujete vědět o burzovně obchodovaných fondech
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold mb-2">Snadné investování</h3>
              <p className="text-sm text-violet-200">Diverzifikované portfolio jedním nákupem</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold mb-2">Nízké poplatky</h3>
              <p className="text-sm text-violet-200">Často pod 0,5% ročně</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="font-semibold mb-2">Globální trhy</h3>
              <p className="text-sm text-violet-200">Investice do celého světa</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all">
              <Link to="/srovnani-etf">
                <TrendingUp className="w-5 h-5 mr-2" />
                Porovnat ETF fondy
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold">
              <Link to="/nastroje">
                <Calculator className="w-5 h-5 mr-2" />
                Investiční nástroje
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETFHeroSection;
