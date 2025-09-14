import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  structuredData?: Record<string, unknown>;
}

export const useSEOOptimization = (config?: SEOConfig) => {
  const location = useLocation();

  useEffect(() => {
    // Update page title
    if (config?.title) {
      document.title = config.title;
    }

    // Update meta description
    if (config?.description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', config.description);
      }
    }

    // Update meta keywords
    if (config?.keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', config.keywords);
      }
    }

    // Update canonical URL
    if (config?.canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', config.canonical);
    }

    // Update Open Graph image
    if (config?.ogImage) {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', config.ogImage);
      }
    }

    // Add structured data
    if (config?.structuredData) {
      const existingScript = document.querySelector('script[data-seo-structured-data]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-structured-data', 'true');
      script.textContent = JSON.stringify(config.structuredData);
      document.head.appendChild(script);
    }

    // Add hreflang for Czech language
    let hreflangLink = document.querySelector('link[rel="alternate"][hreflang="cs"]');
    if (!hreflangLink) {
      hreflangLink = document.createElement('link');
      hreflangLink.setAttribute('rel', 'alternate');
      hreflangLink.setAttribute('hreflang', 'cs');
      document.head.appendChild(hreflangLink);
    }
    hreflangLink.setAttribute('href', `https://etfpruvodce.cz${location.pathname}`);

  }, [config, location.pathname]);

  // Long-tail keyword optimization based on current path
  const getOptimizedSEOForPath = (path: string) => {
    const optimizations: Record<string, SEOConfig> = {
      '/degiro-recenze': {
        title: 'DEGIRO recenze 2025 - Zkušenosti, poplatky a hodnocení | ETF průvodce.cz',
        description: 'Kompletní DEGIRO recenze 2025. Zkušenosti českých investorů, poplatky za ETF, seznam zdarma ETF, výhody a nevýhody. Je DEGIRO bezpečný broker pro ETF investice?',
        keywords: 'DEGIRO recenze, DEGIRO zkušenosti, DEGIRO poplatky, DEGIRO ETF zdarma, DEGIRO bezpečnost, DEGIRO česká republika',
      },
      '/xtb-recenze': {
        title: 'XTB recenze 2025 - Zkušenosti, poplatky a hodnocení | ETF průvodce.cz',
        description: 'Detailní XTB recenze 2025. Zkušenosti s XTB brokerem, 0% poplatky za ETF do 100 000 EUR, xStation 5 platforma. Je XTB vhodný pro české investory?',
        keywords: 'XTB recenze, XTB zkušenosti, XTB poplatky, XTB ETF, xStation 5, XTB česká republika',
      },
      '/trading212-recenze': {
        title: 'Trading212 recenze 2025 - Zkušenosti a hodnocení | ETF průvodce.cz',
        description: 'Kompletní Trading212 recenze 2025. Zkušenosti českých uživatelů, 0% poplatky za akcie a ETF, PIE portfolio, výhody a nevýhody. Je Trading212 bezpečný?',
        keywords: 'Trading212 recenze, Trading212 zkušenosti, Trading212 poplatky, Trading212 PIE, Trading212 česká republika',
      },
      '/tipy/nejlepsi-etf-2025': {
        title: 'Nejlepší ETF 2025 - Top doporučení pro české investory | ETF průvodce.cz',
        description: 'Nejlepší ETF fondy pro rok 2025. VWCE, CSPX, EUNL a další top ETF s nízkými poplatky. Doporučení pro začátečníky i pokročilé investory na českém trhu.',
        keywords: 'nejlepší ETF 2025, top ETF fondy, VWCE, CSPX, EUNL, doporučené ETF, české investování',
      }
    };

    return optimizations[path] || {};
  };

  return { getOptimizedSEOForPath };
};

// Helper function for dynamic keyword generation
export const generateKeywords = (base: string[], additional?: string[]) => {
  const commonETFKeywords = [
    'ETF fondy',
    'investování',
    'české investování',
    'brokeři',
    'poplatky',
    'TER',
    'výkonnost',
    'diverzifikace'
  ];

  return [...base, ...(additional || []), ...commonETFKeywords].join(', ');
};

// Helper function for generating structured data
export const generateETFStructuredData = (etfData: Record<string, unknown>) => {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": etfData.name,
    "identifier": etfData.isin,
    "description": etfData.description,
    "provider": {
      "@type": "Organization",
      "name": etfData.fund_provider
    },
    "category": etfData.category,
    "feesAndCommissionsSpecification": {
      "@type": "MonetaryAmount",
      "value": etfData.ter_numeric,
      "currency": "EUR"
    }
  };
};