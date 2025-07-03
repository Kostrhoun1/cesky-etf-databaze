import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ETFListItem } from "@/types/etf";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import ETFTable from "../ETFTable";

interface FilteredETFListProps {
  filter: {
    category?: string;
    top?: number;
    sortBy?: keyof ETFListItem;
    sortOrder?: "asc" | "desc";
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
        
        // Aplikuj SQL filtrování a sortování
        if (filter.sortBy) {
          // Nejprv odfiltruj nulové hodnoty v SQL
          if (filter.sortBy === 'fund_size_numeric') {
            query = query.gt('fund_size_numeric', 0);
          } else if (filter.sortBy === 'ter_numeric') {
            query = query.gt('ter_numeric', 0);
          } else if (filter.sortBy === 'return_1y') {
            query = query.not('return_1y', 'is', null);
          }
          
          // Sortování v SQL
          const ascending = filter.sortOrder === 'asc';
          query = query.order(filter.sortBy, { ascending });
        }
        
        // Vezmi více než potřebujem a pak ořežu
        query = query.limit(filter.top ? filter.top * 2 : 50);
        
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
        
        // Zobraz prvních 10 pro debug
        console.log(`Top 10 results for ${filter.sortBy}:`);
        etfs.slice(0, 10).forEach((etf, i) => {
          const value = etf[filter.sortBy as keyof ETFListItem];
          console.log(`${i+1}. ${etf.name}: ${value}`);
        });
        
        // Vezmi jen požadovaný počet
        const result = filter.top ? etfs.slice(0, filter.top) : etfs;
        
        console.log(`Final result: ${result.length} ETFs`);
        setData(result);
        
      } catch (err) {
        console.error("Load error:", err);
        setError(String(err));
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [filter.sortBy, filter.sortOrder, filter.top]);

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
          <ETFTable etfs={data} />
        </div>
      </CardContent>
    </Card>
  );
};

export default FilteredETFList;