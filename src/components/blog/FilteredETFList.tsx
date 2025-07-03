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
      console.log("=== LOADING DATA ===", filter);
      setIsLoading(true);
      setError(null);
      
      try {
        // Přímé volání Supabase
        const { data: etfs, error } = await supabase
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
          `)
          .limit(3000); // Zvýším limit
        
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
        
        console.log(`Loaded ${etfs.length} ETFs`);
        
        let result = [...etfs];
        
        // Pro velikost fondu odfiltruj fondy s nulovou velikostí
        if (filter.sortBy === 'fund_size_numeric') {
          result = result.filter(etf => etf.fund_size_numeric && etf.fund_size_numeric > 0);
          console.log(`After filtering zero fund sizes: ${result.length} ETFs`);
        }
        
        // Pro TER odfiltruj fondy s nulowym nebo prázdnym TER
        if (filter.sortBy === 'ter_numeric') {
          result = result.filter(etf => etf.ter_numeric && etf.ter_numeric > 0);
          console.log(`After filtering zero TER: ${result.length} ETFs`);
        }
        
        // Pro výnosy odfiltruj pouze null/undefined
        if (filter.sortBy === 'return_1y') {
          result = result.filter(etf => etf.return_1y != null);
          console.log(`After filtering null returns: ${result.length} ETFs`);
        }
        
        // Sorting
        if (filter.sortBy) {
          console.log(`Sorting by ${filter.sortBy} (${filter.sortOrder})`);
          
          result.sort((a, b) => {
            const aVal = a[filter.sortBy as keyof ETFListItem];
            const bVal = b[filter.sortBy as keyof ETFListItem];
            
            // Nulls last
            if (aVal == null && bVal == null) return 0;
            if (aVal == null) return 1;
            if (bVal == null) return -1;
            
            const aNum = Number(aVal) || 0;
            const bNum = Number(bVal) || 0;
            
            return filter.sortOrder === "asc" ? aNum - bNum : bNum - aNum;
          });
          
          console.log(`Top 5 after sorting:`, result.slice(0, 5).map(etf => ({
            name: etf.name,
            value: etf[filter.sortBy as keyof ETFListItem]
          })));
        }
        
        // Take top N
        if (filter.top) {
          result = result.slice(0, filter.top);
        }
        
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
  }, [filter.sortBy, filter.sortOrder, filter.top, filter.category]);

  console.log("Render state:", { isLoading, error: !!error, dataLength: data.length });

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
          <p>Žádné fondy nenalezeny</p>
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