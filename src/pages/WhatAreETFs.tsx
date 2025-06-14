
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const WhatAreETFs: React.FC = () => {
  useEffect(() => {
    document.title = 'Co jsou ETF fondy? - ETF průvodce.cz';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      'Kompletní průvodce ETF fondy. Zjistěte co jsou ETF, jak fungují, jejich výhody a nevýhody. Nejlepší ETF 2025.'
    );
  }, []);

  const articles = [
    {
      title: 'Nejlepší ETF fondy 2025',
      description: 'Přehled nejlepších ETF fondů pro rok 2025 podle kategorií a rizikového profilu',
      category: 'Doporučení',
      readTime: '8 min'
    },
    {
      title: 'Nejlepší ETF na S&P 500',
      description: 'Srovnání ETF fondů sledujících index S&P 500 - poplatky, výkonnost a doporučení',
      category: 'Analýza',
      readTime: '6 min'
    },
    {
      title: 'Nejlepší celosvětové ETF',
      description: 'Globálně diverzifikované ETF fondy pro vytvoření základu portfolia',
      category: 'Diverzifikace',
      readTime: '10 min'
    },
    {
      title: 'ETF vs. podílové fondy',
      description: 'Porovnání ETF a aktivně řízených podílových fondů - výhody a nevýhody',
      category: 'Vzdělání',
      readTime: '7 min'
    },
    {
      title: 'Daně z ETF v České republice',
      description: 'Kompletní průvodce zdaněním ETF fondů pro české investory',
      category: 'Daně',
      readTime: '12 min'
    },
    {
      title: 'Jak začít s ETF investováním',
      description: 'Krok za krokem průvodce pro začínající investory do ETF fondů',
      category: 'Pro začátečníky',
      readTime: '15 min'
    }
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Co jsou ETF fondy?
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Kompletní průvodce světem ETF fondů pro české investory
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>ETF - Exchange Traded Fund</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                ETF (Exchange Traded Fund) je typ investičního fondu, který se obchoduje na burze stejně jako akcie. 
                ETF fondy sledují výkonnost určitého indexu, komodity, dluhopisů nebo košů aktiv.
              </p>
              
              <h3 className="text-lg font-semibold mb-3">Hlavní výhody ETF:</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Nízké poplatky:</strong> TER obvykle 0,05% - 0,5% ročně</li>
                <li><strong>Diverzifikace:</strong> Jeden fond obsahuje desítky až tisíce aktiv</li>
                <li><strong>Likvidita:</strong> Možnost obchodování během obchodních hodin</li>
                <li><strong>Transparentnost:</strong> Denní zveřejňování složení fondu</li>
                <li><strong>Flexibilita:</strong> Široká škála investičních strategií</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Typy ETF fondů</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Podle regionu:</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700">
                    <li>Celosvětové ETF</li>
                    <li>USA ETF</li>
                    <li>Evropské ETF</li>
                    <li>Emerging Markets ETF</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Podle sektorů:</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700">
                    <li>Technologické ETF</li>
                    <li>Zdravotnictví ETF</li>
                    <li>Energetické ETF</li>
                    <li>Nemovitostní ETF (REIT)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Podle asset třídy:</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700">
                    <li>Akciové ETF</li>
                    <li>Dluhopisové ETF</li>
                    <li>Komoditní ETF</li>
                    <li>REIT ETF</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Podle strategie:</h4>
                  <ul className="list-disc pl-4 text-sm text-gray-700">
                    <li>Indexové ETF</li>
                    <li>Dividendové ETF</li>
                    <li>ESG ETF</li>
                    <li>Smart Beta ETF</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Articles Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Vzdělávací články a průvodci
          </h2>
          
          <div className="grid gap-6">
            {articles.map((article, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 hover:text-blue-600 cursor-pointer">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <Button variant="outline" size="sm">
                    Číst článek
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-4">
              Připraveni začít s ETF investováním?
            </h3>
            <p className="text-gray-600 mb-6">
              Použijte naše nástroje k vytvoření a analýze vašeho ETF portfolia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/srovnani-etf">Porovnat ETF fondy</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/nastroje">Investiční kalkulačka</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default WhatAreETFs;
