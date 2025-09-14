
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CSVUploaderProps {
  onFileUpload: (content: string) => void;
  disabled?: boolean;
}

const CSVUploader: React.FC<CSVUploaderProps> = ({ onFileUpload, disabled = false }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Neplatný soubor",
        description: "Prosím nahrajte CSV soubor.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onFileUpload(content);
      toast({
        title: "Soubor nahrán",
        description: `CSV soubor "${file.name}" byl úspěšně nahrán.`,
      });
    };
    
    reader.onerror = () => {
      toast({
        title: "Chyba při čtení souboru",
        description: "Nepodařilo se načíst CSV soubor.",
        variant: "destructive",
      });
    };

    reader.readAsText(file, 'utf-8');
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  return (
    <Card className={`border-2 border-dashed transition-colors ${
      disabled 
        ? 'border-gray-200 bg-gray-50' 
        : 'border-gray-300 hover:border-blue-400'
    }`}>
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <FileText className="h-6 w-6" />
          Nahrát ETF data
        </CardTitle>
        <CardDescription>
          Nahrajte CSV soubor s daty ETF fondů oddělenými středníkem
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="hidden"
          disabled={disabled}
        />
        <Button 
          onClick={handleUploadClick}
          className="w-full max-w-xs"
          size="lg"
          disabled={disabled}
        >
          {disabled ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Zpracovávám...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Vybrat CSV soubor
            </>
          )}
        </Button>
        <p className="text-sm text-muted-foreground mt-4">
          Podporované formáty: CSV (středník jako oddělovač)
        </p>
      </CardContent>
    </Card>
  );
};

export default CSVUploader;
