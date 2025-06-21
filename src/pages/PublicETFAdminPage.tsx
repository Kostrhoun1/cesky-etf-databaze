
import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import CSVUploader from "@/components/CSVUploader";
import { parseCSV } from "@/utils/csvParser";
import { useETFData } from "@/hooks/useETFData";
import Layout from "@/components/Layout";

const PublicETFAdminPage: React.FC = () => {
  const { upsertETFs, getETFCount } = useETFData();
  const [etfCount, setEtfCount] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const loadETFCount = async () => {
    try {
      const count = await getETFCount();
      setEtfCount(count);
    } catch (error) {
      console.error('Error loading ETF count:', error);
      toast({
        title: "Chyba při načítání",
        description: "Nepodařilo se načíst počet ETF fondů.",
        variant: "destructive",
      });
    }
  };

  React.useEffect(() => {
    loadETFCount();
  }, []);

  const handleCSVUpload = async (csvContent: string) => {
    if (isUploading) return;
    
    setIsUploading(true);
    try {
      console.log('Zpracovávám CSV obsah...');
      const parsedETFs = parseCSV(csvContent);
      console.log('Úspěšně naparsováno', parsedETFs.length, 'ETF fondů');
      
      if (parsedETFs.length === 0) {
        toast({
          title: "Prázdný soubor",
          description: "CSV soubor neobsahuje žádná validní data.",
          variant: "destructive",
        });
        return;
      }
      
      // Upsert do databáze
      await upsertETFs(parsedETFs);
      
      // Aktualizovat počet ETF fondů
      await loadETFCount();
      
      toast({
        title: "CSV soubor úspěšně nahrán",
        description: `${parsedETFs.length} ETF fondů bylo aktualizováno v databázi.`,
      });
      
    } catch (error) {
      console.error('Chyba při zpracování CSV:', error);
      toast({
        title: "Chyba při zpracování CSV",
        description: error instanceof Error ? error.message : "Nepodařilo se nahrát a zpracovat CSV soubor.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto my-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Správa ETF databáze</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Aktualizace ETF databáze</h2>
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              Aktuální počet ETF fondů v databázi: <strong>{etfCount}</strong>
            </p>
          </div>
          <CSVUploader 
            onFileUpload={handleCSVUpload} 
            disabled={isUploading}
          />
          {isUploading && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-700">
                Nahrávám a zpracovávám CSV soubor...
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Jak nahrát CSV soubor:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            <li>Připravte CSV soubor s ETF daty (oddělovač středník)</li>
            <li>Klikněte na "Vybrat CSV soubor" nebo přetáhněte soubor do oblasti</li>
            <li>Počkejte na zpracování a aktualizaci databáze</li>
            <li>Zkontrolujte aktualizovaný počet ETF fondů</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
};

export default PublicETFAdminPage;
