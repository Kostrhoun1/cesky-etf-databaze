import React, { useState } from 'react';
import { Download, FileText, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ETFGuideDownload = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      // Open the HTML guide in a new window for PDF generation
      const guideWindow = window.open('/etf-investicni-pruvodce.html', '_blank');
      
      // Wait a moment for content to load, then trigger print dialog
      setTimeout(() => {
        if (guideWindow) {
          guideWindow.print();
        }
      }, 1000);
    } catch (error) {
      console.error('Error opening PDF guide:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadHTML = () => {
    // Create a link to download the HTML file directly
    const link = document.createElement('a');
    link.href = '/etf-investicni-pruvodce.html';
    link.download = 'etf-investicni-pruvodce.html';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-600 rounded-full mb-6">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Jak investovat do ETF fondů
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Praktický průvodce pro rok 2025 - Komplexní manuál pro úspěšné investování do ETF fondů
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Left Column - Guide Preview */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Co obsahuje průvodce</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-violet-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Plánování investování</h3>
                    <p className="text-gray-600 text-sm">4 klíčové otázky pro definování vaší investiční strategie</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-violet-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">3 ověřené strategie</h3>
                    <p className="text-gray-600 text-sm">Permanentní 4%, Nobel 6% a Akciové 8% portfolio</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-violet-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Praktická realizace</h3>
                    <p className="text-gray-600 text-sm">Výběr brokera, pravidelné investování a rebalancing</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-violet-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Pokročilá témata</h3>
                    <p className="text-gray-600 text-sm">Daňové aspekty, kurzové riziko a ESG investování</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-violet-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Časté chyby</h3>
                    <p className="text-gray-600 text-sm">10 nejčastějších chyb a jak se jim vyhnout</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-violet-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Nástroje a zdroje</h3>
                    <p className="text-gray-600 text-sm">Kalkulačky, databáze ETF a doporučená literatura</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Download Options */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Stáhnout průvodce</h2>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-red-600" />
                    <span className="font-semibold text-gray-900">PDF verze</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Optimalizováno pro tisk a offline čtení. Obsahuje všech 25+ stránek průvodce.
                  </p>
                  <Button 
                    onClick={generatePDF}
                    disabled={isGenerating}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {isGenerating ? 'Generuji PDF...' : 'Stáhnout jako PDF'}
                  </Button>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-900">HTML verze</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Interaktivní verze s klikacími odkazy na naše nástroje a kalkulačky.
                  </p>
                  <Button 
                    onClick={downloadHTML}
                    variant="outline" 
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Stáhnout HTML
                  </Button>
                </div>
              </div>

              <div className="mt-6 p-4 bg-violet-50 rounded-lg border border-violet-200">
                <h3 className="font-semibold text-violet-900 mb-2">💡 Tip</h3>
                <p className="text-sm text-violet-800">
                  Pro nejlepší zážitek doporučujeme nejprve prostudovat online verzi s interaktivními kalkulačkami, 
                  poté si stáhnout PDF pro offline studium a reference.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 font-bold text-xl">✓</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Ověřené strategie</h3>
            <p className="text-gray-600 text-sm">Založeno na letitých zkušenostech úspěšných investorů</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 font-bold text-xl">🎯</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Pro české investory</h3>
            <p className="text-gray-600 text-sm">Specificky zaměřeno na české prostředí a legislativu</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-600 font-bold text-xl">📊</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Praktické nástroje</h3>
            <p className="text-gray-600 text-sm">Odkazy na kalkulačky a databázi ETF fondů</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Připraveni začít investovat? Prozkoumejte naše nástroje a databázi ETF fondů.
          </p>
          <div className="space-x-4">
            <Button 
              onClick={() => window.open('/srovnani-etf', '_blank')}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              Srovnání ETF
            </Button>
            <Button 
              onClick={() => window.open('/kalkulacky', '_blank')}
              variant="outline"
              className="border-violet-600 text-violet-600 hover:bg-violet-50"
            >
              Kalkulačky
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETFGuideDownload;