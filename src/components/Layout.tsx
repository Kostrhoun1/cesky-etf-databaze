
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Mail, Settings } from 'lucide-react';
import Logo from './Logo';
import BreadcrumbNav from './SEO/BreadcrumbNav';
import LastUpdatedInfo from './LastUpdatedInfo';

interface LayoutProps {
  children: React.ReactNode;
  lastUpdated?: Date | null;
}

const Layout: React.FC<LayoutProps> = ({ children, lastUpdated }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Zjednodušené hlavní menu - logické pořadí od základů k pokročilým nástrojům
  const navigation = [
    { name: 'Co jsou ETF', href: '/co-jsou-etf', current: location.pathname === '/co-jsou-etf' },
    { name: 'Kde koupit ETF', href: '/kde-koupit-etf', current: location.pathname === '/kde-koupit-etf' },
    { name: 'Srovnání ETF', href: '/srovnani-etf', current: location.pathname === '/srovnani-etf' },
    { name: 'Portfolio', href: '/portfolio-strategie', current: location.pathname.startsWith('/portfolio-strategie') },
    { name: 'Kalkulačky', href: '/kalkulacky', current: location.pathname.startsWith('/kalkulacky') || location.pathname === '/nastroje' },
    { name: 'Tipy', href: '/tipy', current: location.pathname.startsWith('/tipy') },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <Link to="/" className="flex items-center group">
                <Logo size={180} className="group-hover:opacity-90 transition-opacity" />
              </Link>
            </div>
            
            {/* Desktop navigation - centered */}
            <nav className="hidden md:flex space-x-1 absolute left-1/2 transform -translate-x-1/2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                    item.current
                      ? 'text-violet-600 bg-violet-100'
                      : 'text-gray-600 hover:text-violet-600 hover:bg-violet-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            
            {/* Mobile menu */}
            <div className="md:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Otevřít menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="mt-6">
                    <nav className="flex flex-col space-y-2">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`px-4 py-3 rounded-md text-base font-medium transition-colors ${
                            item.current
                              ? 'text-violet-600 bg-violet-100'
                              : 'text-gray-600 hover:text-violet-600 hover:bg-violet-50'
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      
      {/* Breadcrumb Navigation */}
      <BreadcrumbNav />
      
      {/* Main content */}
      <main>
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="flex items-center">
                <Logo size={200} />
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                Váš moderní a komplexní průvodce světem ETF fondů pro české investory. 
                Srovnání, analýzy a vzdělávací obsah pro vaše investiční rozhodnutí.
              </p>
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="h-4 w-4" />
                <a href="mailto:info@etfpruvodce.cz" className="hover:text-white transition-colors">
                  info@etfpruvodce.cz
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-md font-semibold text-slate-200 mb-4 uppercase tracking-wider">Nástroje</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link to="/srovnani-etf" className="hover:text-white transition-colors">🔍 Srovnání ETF</Link></li>
                <li><Link to="/portfolio-strategie" className="hover:text-white transition-colors">📊 Portfolio Strategie</Link></li>
                <li><Link to="/kalkulacky" className="hover:text-white transition-colors">🧮 Kalkulačky</Link></li>
                <li><Link to="/navod-pro-zacatecniky" className="hover:text-white transition-colors">📄 Průvodce (PDF)</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold text-slate-200 mb-4 uppercase tracking-wider">Vzdělání</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link to="/co-jsou-etf" className="hover:text-white transition-colors">Co jsou ETF</Link></li>
                <li><Link to="/kde-koupit-etf" className="hover:text-white transition-colors">Kde koupit ETF</Link></li>
                <li><Link to="/tipy" className="hover:text-white transition-colors">Tipy a články</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold text-slate-200 mb-4 uppercase tracking-wider">Brokeři</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link to="/degiro-recenze" className="hover:text-white transition-colors">DEGIRO - detailní recenze</Link></li>
                <li><Link to="/xtb-recenze" className="hover:text-white transition-colors">XTB - detailní recenze</Link></li>
                <li><Link to="/interactive-brokers-recenze" className="hover:text-white transition-colors">Interactive Brokers - recenze</Link></li>
                <li><Link to="/fio-ebroker-recenze" className="hover:text-white transition-colors">Fio e-Broker - recenze</Link></li>
                <li><Link to="/trading212-recenze" className="hover:text-white transition-colors">Trading 212 - recenze</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-slate-500">&copy; 2025 ETF průvodce.cz. Všechna práva vyhrazena.</p>
              {lastUpdated && (
                <LastUpdatedInfo lastUpdated={lastUpdated} className="text-slate-500" />
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
