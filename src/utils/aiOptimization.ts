// Utility functions for AI optimization

interface AIOptimizationConfig {
  enableStructuredData: boolean;
  enableFAQSchema: boolean;
  enableCitationBlocks: boolean;
  enableKeywordDensity: boolean;
}

// Default configuration for AI optimization
export const defaultAIConfig: AIOptimizationConfig = {
  enableStructuredData: true,
  enableFAQSchema: true,
  enableCitationBlocks: true,
  enableKeywordDensity: true,
};

// Generate AI-friendly content structure
export const generateAIContentStructure = (content: {
  title: string;
  sections: Array<{
    heading: string;
    content: string;
    keyPoints?: string[];
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  lastUpdated: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": content.title,
    "dateModified": content.lastUpdated,
    "author": {
      "@type": "Organization",
      "name": "ETF průvodce.cz"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "ETF průvodce.cz",
      "logo": {
        "@type": "ImageObject",
        "url": "https://etfpruvodce.cz/og-image.jpg"
      }
    },
    "mainEntity": content.faqs ? {
      "@type": "FAQPage",
      "mainEntity": content.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    } : undefined,
    "articleSection": content.sections.map(section => ({
      "@type": "ArticleSection",
      "headline": section.heading,
      "text": section.content,
      "keywords": section.keyPoints
    }))
  };
};

// Generate quick answers for common queries
export const generateQuickAnswers = (topic: string): Array<{question: string; answer: string}> => {
  const answers: Record<string, Array<{question: string; answer: string}>> = {
    etf: [
      {
        question: "Co jsou ETF fondy?",
        answer: "ETF (Exchange Traded Funds) jsou investiční fondy obchodované na burze, které sledují výkonnost indexu nebo jiného aktiva. Umožňují investovat do stovek nebo tisíců akcií jednou transakcí."
      },
      {
        question: "Jaké jsou nejlepší ETF fondy pro rok 2025?",
        answer: "Pro rok 2025 doporučujeme Vanguard FTSE All-World (VWCE), iShares Core MSCI World (IWDA), nebo iShares Core S&P 500 (CSPX). Všechny mají nízké poplatky a širokou diverzifikaci."
      }
    ],
    brokers: [
      {
        question: "Který broker je nejlepší pro ETF v Česku?",
        answer: "Pro rok 2025: XTB (0% poplatky na ETF), DEGIRO (nejnižší poplatky), Trading 212 (0% poplatky na akcie/ETF). Všichni jsou regulovaní v EU."
      },
      {
        question: "Jaké jsou poplatky za ETF u různých brokerů?",
        answer: "XTB: 0% na ETF, DEGIRO: od 1€ + 0,02%, Trading 212: 0% na ETF, Interactive Brokers: od $1. Pozor na poplatky za směnu měn."
      }
    ],
    investment: [
      {
        question: "Kolik peněz potřebuji na začátek investování?",
        answer: "Můžete začít s 500-1000 Kč měsíčně. Důležité je mít nejdříve nouzovou rezervu 3-6 měsíčních výdajů a investovat pouze přebytečné peníze."
      },
      {
        question: "Jak se daní ETF v Česku?",
        answer: "Kapitálové výnosy se daní 15%. Pokud držíte ETF déle než 3 roky, je prodej osvobozen od daně. Dividendy se daní podle typu fondu."
      }
    ]
  };

  return answers[topic] || [];
};

// Generate key facts for AI consumption
export const generateKeyFacts = (pageType: string, data?: any): Array<{label: string; value: string; unit?: string}> => {
  const facts: Record<string, Array<{label: string; value: string; unit?: string}>> = {
    homepage: [
      { label: "ETF fondů v databázi", value: "3500+", unit: "" },
      { label: "Nejnižší dostupný TER", value: "0,07", unit: "%" },
      { label: "Porovnávaných brokerů", value: "5", unit: "" },
      { label: "Frekvence aktualizace", value: "Denně", unit: "" }
    ],
    comparison: [
      { label: "Průměrný TER ETF", value: "0,25", unit: "%" },
      { label: "Nejlevnější TER", value: "0,07", unit: "%" },
      { label: "Nejvyšší hodnocení", value: "95", unit: "/100" }
    ],
    broker: [
      { label: "Nejnižší poplatky", value: "0", unit: "%" },
      { label: "Regulace", value: "EU", unit: "" },
      { label: "Pojištění vkladů", value: "20 000", unit: "€" }
    ]
  };

  return facts[pageType] || [];
};

// Add AI-readable timestamps
export const addAITimestamp = () => {
  const now = new Date();
  return {
    iso: now.toISOString(),
    readable: now.toLocaleDateString('cs-CZ', {
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    }),
    aiFormat: `${now.getDate()}. ${now.toLocaleDateString('cs-CZ', { month: 'long' })} ${now.getFullYear()}`
  };
};

// Generate breadcrumb data for AI
export const generateAIBreadcrumbs = (path: string) => {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs = [{ name: 'Domů', href: '/' }];
  
  let currentPath = '';
  segments.forEach(segment => {
    currentPath += `/${segment}`;
    let name = segment;
    
    // Map common paths to Czech names
    const pathMap: Record<string, string> = {
      'srovnani-etf': 'Srovnání ETF',
      'co-jsou-etf': 'Co jsou ETF',
      'kde-koupit-etf': 'Kde koupit ETF',
      'nastroje': 'Investiční nástroje',
      'navod-pro-zacatecniky': 'Návod pro začátečníky',
      'tipy': 'Tipy a články',
      'recenze': 'Recenze brokerů'
    };
    
    name = pathMap[segment] || segment;
    breadcrumbs.push({ name, href: currentPath });
  });
  
  return breadcrumbs;
};

// Validate AI optimization score
export const calculateAIOptimizationScore = (page: {
  hasStructuredData: boolean;
  hasFAQs: boolean;
  hasQuickAnswers: boolean;
  hasKeyFacts: boolean;
  hasCitationInfo: boolean;
  hasTimestamps: boolean;
  hasKeywordDensity: boolean;
}) => {
  let score = 0;
  const maxScore = 7;
  
  if (page.hasStructuredData) score++;
  if (page.hasFAQs) score++;
  if (page.hasQuickAnswers) score++;
  if (page.hasKeyFacts) score++;
  if (page.hasCitationInfo) score++;
  if (page.hasTimestamps) score++;
  if (page.hasKeywordDensity) score++;
  
  return Math.round((score / maxScore) * 100);
};