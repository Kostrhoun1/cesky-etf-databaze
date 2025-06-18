
import React from 'react';
import Layout from '@/components/Layout';

const WhatAreETFs: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Co jsou ETF fondy?</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 mb-8">
            ETF (Exchange-Traded Fund) je investiční fond, který kombinuje výhody akcií a podílových fondů. 
            Obchoduje se na burze jako akcie, ale diverzifikuje investice jako tradiční podílový fond.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Hlavní charakteristiky ETF</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Diverzifikace</h3>
              <p className="text-blue-800">
                Jeden ETF obsahuje desítky až tisíce různých akcií nebo dluhopisů, 
                což snižuje riziko ve srovnání s investicí do jednotlivých akcií.
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Nízké poplatky</h3>
              <p className="text-green-800">
                ETF mají obvykle nižší poplatky než aktivně řízené podílové fondy, 
                typicky mezi 0,1-0,7% ročně.
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">Likvidita</h3>
              <p className="text-purple-800">
                ETF se obchodují na burze během obchodních hodin, 
                takže můžete koupit nebo prodat kdykoliv během dne.
              </p>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">Transparentnost</h3>
              <p className="text-yellow-800">
                Složení ETF je zveřejňováno denně, takže přesně víte, 
                do čeho investujete.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Typy ETF fondů</h2>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
              <div>
                <strong className="text-gray-900">Akciové ETF</strong> - sledují akciové indexy jako S&P 500, MSCI World
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
              <div>
                <strong className="text-gray-900">Dluhopisové ETF</strong> - investují do státních nebo korporátních dluhopisů
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
              <div>
                <strong className="text-gray-900">Komoditní ETF</strong> - sledují ceny zlata, ropy nebo jiných komodit
              </div>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
              <div>
                <strong className="text-gray-900">Sektorové ETF</strong> - zaměřují se na konkrétní odvětví (technologie, healthcare)
              </div>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Výhody investování do ETF</h2>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <ul className="space-y-3">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Automatická diverzifikace portfolia</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Nižší vstupní investice než u jednotlivých akcií</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Možnost reinvestice dividend</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Daňová efektivnost</span>
              </li>
            </ul>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Jak začít s ETF investicemi?</h2>
          
          <div className="space-y-4 mb-8">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900">1. Stanovte si investiční cíle</h3>
              <p className="text-gray-600">Rozhodněte se, jaký je váš investiční horizont a tolerance k riziku.</p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900">2. Vyberte si brokera</h3>
              <p className="text-gray-600">Najděte brokera s nízkými poplatky a dobrým výběrem ETF fondů.</p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900">3. Prozkumajte ETF fondy</h3>
              <p className="text-gray-600">Použijte naše srovnání pro výběr vhodných ETF podle vašich potřeb.</p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900">4. Začněte postupně</h3>
              <p className="text-gray-600">Začněte s menšími částkami a postupně navyšujte investice.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Tip pro začátečníky</h3>
            <p className="text-blue-800">
              Pro začátek doporučujeme široce diverzifikované ETF sledující světové indexy, 
              jako je MSCI World nebo FTSE All-World. Tyto fondy poskytují expozici tisícům společností 
              z celého světa a jsou ideální pro dlouhodobé investování.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WhatAreETFs;
