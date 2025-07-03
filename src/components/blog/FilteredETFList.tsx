import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ETFListItem } from "@/types/etf";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ETFSearchTable from "../home/ETFSearchTable";

interface FilteredETFListProps {
  filter: {
    category?: string;
    top?: number;
    sortBy?: keyof ETFListItem;
    sortOrder?: "asc" | "desc";
    indexNameKeywords?: string[]; // Hledání v index_name
    regionKeywords?: string[]; // Hledání v region
    nameKeywords?: string[]; // Hledání v názvu
    fundProviderKeywords?: string[]; // Hledání podle správce
    hasDividendYield?: boolean; // Filtr pro dividendové ETF (current_dividend_yield_numeric > 0)
    minDividendYield?: number; // Minimální dividendový výnos
  };
}

const FilteredETFList: React.FC<FilteredETFListProps> = ({ filter }) => {
  const [data, setData] = useState<ETFListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        console.log(`=== LOADING ${filter.sortBy} (${filter.sortOrder}) ===`);
        
        // Použiju direktní sortování v SQL
        let query = supabase
          .from('etf_funds')
          .select(`
            isin,
            name,
            fund_provider,
            category,
            ter_numeric,
            return_1y,
            return_3y,
            return_5y,
            return_ytd,
            fund_size_numeric,
            degiro_free,
            primary_ticker,
            distribution_policy,
            index_name,
            fund_currency,
            replication,
            region,
            current_dividend_yield_numeric,
            exchange_1_ticker,
            exchange_2_ticker,
            exchange_3_ticker,
            exchange_4_ticker,
            exchange_5_ticker
          `);
        
        // Debug: jaké filtry používáme
        console.log('=== FILTER DEBUG ===');
        console.log('Filter object:', filter);
        
        // Aplikuj SQL filtrování podle zadaných kritérií
        if (filter.indexNameKeywords && filter.indexNameKeywords.length > 0) {
          console.log(`SQL filtering by index keywords: ${filter.indexNameKeywords.join(', ')}`);
          const firstIndexKeyword = filter.indexNameKeywords[0];
          query = query.ilike('index_name', `%${firstIndexKeyword}%`);
        }
        
        if (filter.regionKeywords && filter.regionKeywords.length > 0) {
          console.log(`SQL filtering by region keywords: ${filter.regionKeywords.join(', ')}`);
          // Pro region filtry zkusím jeden po druhém
          const firstRegionKeyword = filter.regionKeywords[0];
          query = query.ilike('region', `%${firstRegionKeyword}%`);
        }
        
        if (filter.nameKeywords && filter.nameKeywords.length > 0) {
          console.log(`SQL filtering by name keywords: ${filter.nameKeywords.join(', ')}`);
          const firstNameKeyword = filter.nameKeywords[0];
          query = query.ilike('name', `%${firstNameKeyword}%`);
        }
        
        if (filter.hasDividendYield) {
          console.log('SQL filtering by dividend yield > 0');
          query = query.gt('current_dividend_yield_numeric', 0);
        }
        
        if (filter.minDividendYield) {
          console.log(`SQL filtering by minimum dividend yield: ${filter.minDividendYield}%`);
          query = query.gte('current_dividend_yield_numeric', filter.minDividendYield);
        }
        
        // Sortování v SQL
        if (filter.sortBy) {
          const ascending = filter.sortOrder === 'asc';
          query = query.order(filter.sortBy, { ascending });
        }
        
        // Limit výsledků
        query = query.limit(filter.top || 50);
        
        const { data: etfs, error } = await query;
        
        if (error) {
          console.error("Supabase error:", error);
          setError(error.message);
          return;
        }
        
        if (!etfs || etfs.length === 0) {
          console.log("No ETFs returned");
          setData([]);
          return;
        }
        
        console.log(`Loaded ${etfs.length} ETFs from SQL query`);
        
        // Debug: ukázat výsledky SQL dotazu
        console.log('=== SQL QUERY RESULTS ===');
        console.log(`Found ${etfs.length} ETFs matching criteria`);
        etfs.slice(0, 5).forEach((etf, i) => {
          console.log(`\n${i+1}. "${etf.name}"`);
          console.log(`  Index: "${etf.index_name || 'NULL'}"`);
          console.log(`  Region: "${etf.region || 'NULL'}"`);
          console.log(`  Dividend yield: ${etf.current_dividend_yield_numeric || 0}%`);
        });
        console.log('=== END RESULTS ===');
        
        setData(etfs);
        
      } catch (err) {
        console.error("Load error:", err);
        setError(String(err));
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [filter.sortBy, filter.sortOrder, filter.top, filter.indexNameKeywords, filter.regionKeywords, filter.nameKeywords, filter.fundProviderKeywords, filter.hasDividendYield, filter.minDividendYield]);

  if (isLoading) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p>Načítání ETF fondů...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p>Chyba: {error}</p>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p>Žádné fondy nenalezeny pro {filter.sortBy}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>
          {filter.sortBy === 'ter_numeric' && 'Nejlevnější ETF podle poplatků (TER)'}
          {filter.sortBy === 'return_1y' && 'Nejvýnosnější ETF za posledních 12 měsíců'}
          {filter.sortBy === 'fund_size_numeric' && 'Největší ETF podle spravovaných aktiv'}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Nalezeno {data.length} fondů
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <ETFSearchTable 
            etfs={data} 
            sortBy={filter.sortBy || 'ter_numeric'}
            sortOrder={filter.sortOrder || 'asc'}
            onSort={() => {}} // Čtení pouze - bez sort funkcionality
            isLoading={false}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FilteredETFList;