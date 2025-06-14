
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                ETF průvodce.cz
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.current
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">ETF průvodce.cz</h3>
              <p className="text-gray-300 mb-4">
                Komplexní průvodce světem ETF fondů pro české investory. 
                Srovnání, analýzy a vzdělávací obsah pro vaše investiční rozhodnutí.
              </p>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">Sekce</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/srovnani-etf" className="hover:text-white">Srovnání ETF</Link></li>
                <li><Link to="/co-jsou-etf" className="hover:text-white">Co jsou ETF</Link></li>
                <li><Link to="/nastroje" className="hover:text-white">Nástroje</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-semibold mb-4">Brokeři</h4>
              <ul className="space-y-2 text-gray-300">
                <li>DEGIRO</li>
                <li>Interactive Brokers</li>
                <li>XTB</li>
                <li>Portu</li>
                <li>Trading 212</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
            <p>&copy; 2025 ETF průvodce.cz. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
