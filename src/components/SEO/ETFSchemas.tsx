export interface ETFDetailedSchema {
  name: string;
  isin: string;
  ter: string;
  fundSize: string;
  provider: string;
  category: string;
  description: string;
  price?: number;
  currency?: string;
  exchange?: string;
  dividendYield?: string;
  inception?: string;
  returns?: {
    oneYear?: number;
    threeYear?: number;
    fiveYear?: number;
  };
}

export const generateETFProductSchema = (etf: ETFDetailedSchema, url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": etf.name,
    "identifier": {
      "@type": "PropertyValue",
      "name": "ISIN",
      "value": etf.isin
    },
    "description": etf.description,
    "category": etf.category,
    "provider": {
      "@type": "Organization",
      "name": etf.provider
    },
    "url": url,
    "offers": {
      "@type": "Offer",
      "price": etf.price || "Variable",
      "priceCurrency": etf.currency || "EUR",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization", 
        "name": etf.provider
      }
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "TER (Total Expense Ratio)",
        "value": etf.ter
      },
      {
        "@type": "PropertyValue",
        "name": "Fund Size",
        "value": etf.fundSize
      },
      ...(etf.dividendYield ? [{
        "@type": "PropertyValue",
        "name": "Dividend Yield",
        "value": etf.dividendYield
      }] : []),
      ...(etf.inception ? [{
        "@type": "PropertyValue",
        "name": "Inception Date",
        "value": etf.inception
      }] : [])
    ],
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "ETF",
      "recognizedBy": {
        "@type": "Organization",
        "name": "European Securities and Markets Authority"
      }
    }
  };
};

export const generateComparisonTableSchema = (etfs: ETFDetailedSchema[], url: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "ETF Comparison Table",
    "description": "Comparison of ETF funds by fees, performance and size",
    "url": url,
    "numberOfItems": etfs.length,
    "itemListElement": etfs.map((etf, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "FinancialProduct",
        "name": etf.name,
        "identifier": etf.isin,
        "provider": {
          "@type": "Organization",
          "name": etf.provider
        }
      }
    }))
  };
};