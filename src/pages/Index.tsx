import React, { useState, useEffect } from 'react';
import { ETFListItem } from '@/types/etf';
import { parseCSV } from '@/utils/csvParser';
import { useETFData } from '@/hooks/useETFData';
import Header from '@/components/Header';
import CSVUploader from '@/components/CSVUploader';
import ETFTable from '@/components/ETFTable';

const Index = () => {
  const [etfs, setEtfs] = useState<ETFListItem[]>([]);
  const { upsertETFs, fetchETFs, isLoading } = useETFData();

  // Load ETFs from database on component mount
  useEffect(() => {
    const loadETFs = async () => {
      const dbETFs = await fetchETFs();
      setEtfs(dbETFs);
    };
    
    loadETFs();
  }, []);

  const handleFileUpload = async (csvContent: string) => {
    try {
      console.log('Processing CSV content...');
      const parsedETFs = parseCSV(csvContent);
      console.log('Successfully parsed', parsedETFs.length, 'ETFs');
      
      // Upsert to database
      await upsertETFs(parsedETFs);
      
      // Refresh the data from database
      const updatedETFs = await fetchETFs();
      setEtfs(updatedETFs);
      
    } catch (error) {
      console.error('Error processing CSV:', error);
    }
  };

  const handleLoadFromDatabase = async () => {
    const dbETFs = await fetchETFs();
    setEtfs(dbETFs);
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
                  <span>Nahrajte soubor pomocí tlačítka výše - data se automaticky uloží do databáze</span>
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
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium mb-2 text-blue-800">💡 Tip:</h3>
                <p className="text-sm text-blue-700">
                  Pokud již máte data v databázi, zkuste obnovit stránku nebo{' '}
                  <button 
                    onClick={handleLoadFromDatabase}
                    className="underline hover:no-underline font-medium"
                    disabled={isLoading}
                  >
                    načíst data z databáze
                  </button>
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
                  Načteno {etfs.length} ETF fondů z databáze
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleLoadFromDatabase}
                  disabled={isLoading}
                  className="text-sm text-green-600 hover:text-green-800 underline disabled:opacity-50"
                >
                  Obnovit z databáze
                </button>
                <button
                  onClick={() => setEtfs([])}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Nahrát nový soubor
                </button>
              </div>
            </div>
            
            <ETFTable etfs={etfs} />
          </div>
        )}
        
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span>
                  {etfs.length === 0 ? 'Načítám data z databáze...' : 'Zpracovávám CSV soubor...'}
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
