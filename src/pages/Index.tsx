
import React, { useState } from 'react';
import { ETF } from '@/types/etf';
import { parseCSV } from '@/utils/csvParser';
import Header from '@/components/Header';
import CSVUploader from '@/components/CSVUploader';
import ETFTable from '@/components/ETFTable';

const Index = () => {
  const [etfs, setEtfs] = useState<ETF[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (csvContent: string) => {
    setIsLoading(true);
    try {
      console.log('Processing CSV content...');
      const parsedETFs = parseCSV(csvContent);
      setEtfs(parsedETFs);
      console.log('Successfully parsed', parsedETFs.length, 'ETFs');
    } catch (error) {
      console.error('Error parsing CSV:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {etfs.length === 0 ? (
          <div className="max-w-2xl mx-auto">
            <CSVUploader onFileUpload={handleFileUpload} />
            
            <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Jak začít?</h2>
              <ol className="space-y-3 text-sm text-gray-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">1</span>
                  <span>Připravte si CSV soubor s daty ETF fondů oddělenými středníkem</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">2</span>
                  <span>Nahrajte soubor pomocí tlačítka výše</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">3</span>
                  <span>Prohlížejte, filtrujte a analyzujte data ETF fondů</span>
                </li>
              </ol>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Očekávaný formát CSV:</h3>
                <p className="text-xs text-gray-500 font-mono break-all">
                  isin;name;url;description_en;description_cs;ter;ter_numeric;fund_size;fund_size_numeric;...
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">ETF Databáze</h2>
                <p className="text-gray-600">
                  Načteno {etfs.length} ETF fondů z CSV souboru
                </p>
              </div>
              <button
                onClick={() => setEtfs([])}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Nahrát nový soubor
              </button>
            </div>
            
            <ETFTable etfs={etfs} />
          </div>
        )}
        
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span>Zpracovávám CSV soubor...</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
