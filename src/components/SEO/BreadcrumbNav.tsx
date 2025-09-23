import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

const BreadcrumbNav: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Domů', href: '/' }
    ];

    const pathSegments = pathname.split('/').filter(Boolean);
    
    if (pathSegments.length === 0) return breadcrumbs;

    // Main pages mapping
    const pageMapping: Record<string, string> = {
      'srovnani-etf': 'Srovnání ETF',
      'portfolio-strategie': 'Portfolio Strategie',
      'co-jsou-etf': 'Co jsou ETF',
      'kde-koupit-etf': 'Kde koupit ETF', 
      'kalkulacky': 'Kalkulačky',
      'degiro-recenze': 'DEGIRO recenze',
      'xtb-recenze': 'XTB recenze',
      'trading212-recenze': 'Trading212 recenze',
      'interactive-brokers-recenze': 'Interactive Brokers recenze',
      'fio-ebroker-recenze': 'Fio e-Broker recenze',
      'navod-pro-zacatecniky': 'Návod pro začátečníky',
      'tipy': 'Tipy'
    };

    // Blog articles mapping
    const blogMapping: Record<string, string> = {
      'nejlepsi-etf-2025': 'Nejlepší ETF 2025',
      'nejlepsi-etf-na-americke-akcie': 'Nejlepší ETF na americké akcie',
      'nejlepsi-etf-na-nasdaq': 'Nejlepší ETF na NASDAQ',
      'nejlepsi-dividendove-etf': 'Nejlepší dividendové ETF',
      'nejlepsi-etf-na-evropske-akcie': 'Nejlepší ETF na evropské akcie',
      'all-weather-portfolio': 'All-Weather Portfolio'
    };

    // Portfolio strategies mapping
    const portfolioMapping: Record<string, string> = {
      'permanentni-portfolio': 'Permanentní Portfolio',
      'nobel-portfolio': 'Nobel Portfolio',
      'bogleheads-three-fund': 'Bogleheads Three-Fund',
      'akciove-portfolio': '100% Akciové Portfolio',
      'ray-dalio-all-weather': 'Ray Dalio All-Weather'
    };

    // Handle blog articles
    if (pathSegments[0] === 'tipy' && pathSegments.length > 1) {
      breadcrumbs.push({ label: 'Tipy', href: '/tipy' });
      const articleSlug = pathSegments[1];
      if (blogMapping[articleSlug]) {
        breadcrumbs.push({ 
          label: blogMapping[articleSlug], 
          href: `/tipy/${articleSlug}` 
        });
      }
    } 
    // Handle Portfolio Strategy detail pages
    else if (pathSegments[0] === 'portfolio-strategie' && pathSegments.length > 1) {
      breadcrumbs.push({ label: 'Portfolio Strategie', href: '/portfolio-strategie' });
      const strategySlug = pathSegments[1];
      if (portfolioMapping[strategySlug]) {
        breadcrumbs.push({ 
          label: portfolioMapping[strategySlug], 
          href: `/portfolio-strategie/${strategySlug}` 
        });
      }
    }
    // Handle calculator pages
    if (pathSegments[0] === 'kalkulacky' && pathSegments.length > 1) {
      breadcrumbs.push({ label: 'Kalkulačky', href: '/kalkulacky' });
      
      // Calculator names mapping
      const calculatorMapping: Record<string, string> = {
        'hypotecni-kalkulacka': 'Hypoteční kalkulačka',
        'uverova-kalkulacka': 'Spotřebitelský úvěr',
        'cisty-plat-2025': 'Čistý plat 2025',
        'investicni-kalkulacka': 'Investiční kalkulačka',
        'fire-kalkulacka': 'FIRE kalkulačka',
        'nouzova-rezerva': 'Nouzová rezerva',
        'kalkulacka-poplatku-etf': 'ETF poplatky',
        'monte-carlo-simulator': 'Monte Carlo simulátor',
        'kurzovy-dopad-etf': 'Měnový dopad'
      };
      
      const calculatorSlug = pathSegments[1];
      if (calculatorMapping[calculatorSlug]) {
        breadcrumbs.push({ 
          label: calculatorMapping[calculatorSlug], 
          href: `/kalkulacky/${calculatorSlug}` 
        });
      }
    }
    // Handle ETF detail pages
    else if (pathSegments[0] === 'etf' && pathSegments.length > 1) {
      breadcrumbs.push({ label: 'Srovnání ETF', href: '/srovnani-etf' });
      breadcrumbs.push({ 
        label: `ETF ${pathSegments[1]}`, 
        href: `/etf/${pathSegments[1]}` 
      });
    }
    // Handle main pages
    else if (pageMapping[pathSegments[0]]) {
      breadcrumbs.push({ 
        label: pageMapping[pathSegments[0]], 
        href: `/${pathSegments[0]}` 
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  // Don't show breadcrumbs on homepage
  if (pathname === '/' || breadcrumbs.length <= 1) {
    return null;
  }

  // Generate JSON-LD structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://etfpruvodce.cz${item.href}`
    }))
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData)
        }}
      />
      
      {/* Breadcrumb navigation */}
      <nav 
        aria-label="Breadcrumb" 
        className="bg-gray-50 border-b border-gray-200 py-3"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                )}
                {index === 0 ? (
                  <Link 
                    to={item.href}
                    className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
                  >
                    <Home className="h-4 w-4" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                ) : index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-900 font-medium">
                    {item.label}
                  </span>
                ) : (
                  <Link 
                    to={item.href}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
};

export default BreadcrumbNav;