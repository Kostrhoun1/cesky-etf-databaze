
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Domů', href: '/', current: location.pathname === '/' },
    { name: 'Srovnání ETF', href: '/srovnani-etf', current: location.pathname === '/srovnani-etf' },
    { name: 'Co jsou ETF', href: '/co-jsou-etf', current: location.pathname === '/co-jsou-etf' },
    { name: 'Nástroje', href: '/nastroje', current: location.pathname === '/nastroje' },
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
            <nav className="hidden md:flex space-x-1">
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
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                Menu
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Main content */}
      <main>
        {children}
      </main>
      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2 flex flex-col gap-4">
              <div className="flex items-center">
                <Logo size={200} />
              </div>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                Váš moderní a komplexní průvodce světem ETF fondů pro české investory. 
                Srovnání, analýzy a vzdělávací obsah pro vaše investiční rozhodnutí.
              </p>
            </div>
            <div>
              <h4 className="text-md font-semibold text-slate-200 mb-4 uppercase tracking-wider">Sekce</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link to="/srovnani-etf" className="hover:text-white transition-colors">Srovnání ETF</Link></li>
                <li><Link to="/co-jsou-etf" className="hover:text-white transition-colors">Co jsou ETF</Link></li>
                <li><Link to="/nastroje" className="hover:text-white transition-colors">Nástroje</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold text-slate-200 mb-4 uppercase tracking-wider">Brokeři</h4>
              <ul className="space-y-3 text-slate-400">
                <li>DEGIRO</li>
                <li>Interactive Brokers</li>
                <li>XTB</li>
                <li>Portu</li>
                <li>Trading 212</li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-800 text-center text-slate-500">
            <p>&copy; 2025 ETF průvodce.cz. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
