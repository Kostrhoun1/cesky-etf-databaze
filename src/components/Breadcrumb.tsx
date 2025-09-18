import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  // Generate structured data for breadcrumbs
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `https://etfpruvodce.cz${item.href}` : undefined
    })).filter(item => item.item) // Remove items without href (current page)
  };

  React.useEffect(() => {
    // Add breadcrumb structured data to page head
    const existingBreadcrumbData = document.querySelector('script[type="application/ld+json"][data-breadcrumb-structured-data]');
    if (existingBreadcrumbData) {
      existingBreadcrumbData.remove();
    }
    
    const structuredDataScript = document.createElement('script');
    structuredDataScript.type = 'application/ld+json';
    structuredDataScript.setAttribute('data-breadcrumb-structured-data', 'true');
    structuredDataScript.textContent = JSON.stringify(breadcrumbStructuredData);
    document.head.appendChild(structuredDataScript);

    return () => {
      const script = document.querySelector('script[type="application/ld+json"][data-breadcrumb-structured-data]');
      if (script) script.remove();
    };
  }, [breadcrumbStructuredData]);

  return (
    <nav aria-label="Breadcrumb" className={`mb-6 ${className}`}>
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        <li>
          <Link 
            to="/" 
            className="flex items-center hover:text-blue-600 transition-colors"
            aria-label="Domů"
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Domů</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            {item.current ? (
              <span className="font-medium text-gray-900" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link 
                to={item.href!} 
                className="hover:text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;