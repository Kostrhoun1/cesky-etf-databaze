
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 bg-blue-700 rounded-lg">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">CzechETF</h1>
                <p className="text-blue-100 text-sm">Databáze ETF fondů pro české investory</p>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-white hover:text-blue-200 transition-colors">
                Domů
              </Link>
              <Link to="/srovnani-etf" className="text-white hover:text-blue-200 transition-colors">
                Srovnání ETF
              </Link>
              <Link to="/co-jsou-etf" className="text-white hover:text-blue-200 transition-colors">
                Co jsou ETF
              </Link>
              <Link to="/kde-koupit-etf" className="text-white hover:text-blue-200 transition-colors">
                Kde koupit ETF
              </Link>
              <Link to="/nastroje" className="text-white hover:text-blue-200 transition-colors">
                Nástroje
              </Link>
              <Link to="/tipy" className="text-white hover:text-blue-200 transition-colors">
                Tipy
              </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main>
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default Layout;
