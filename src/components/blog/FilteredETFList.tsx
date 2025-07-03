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
          .limit(4000); // Zvýším limit na všechny fondy
        
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
        
        console.log(`=== DEBUGGING ${filter.sortBy} ===`);
        console.log(`Raw data count: ${result.length}`);
        
        // Nejprve ukážeme sample dat před filtrováním
        console.log('Sample raw data:');
        result.slice(0, 10).forEach((etf, i) => {
          console.log(`${i+1}. ${etf.name}:`);
          console.log(`  TER: ${etf.ter_numeric}`);
          console.log(`  Size: ${etf.fund_size_numeric}`);
          console.log(`  Return1Y: ${etf.return_1y}`);
        });
        
        // ODSTRANÍM VŠECHNO FILTROVÁNÍ - jen sortování
        console.log(`Sorting by ${filter.sortBy} (${filter.sortOrder}) - NO FILTERING`);
        
        result.sort((a, b) => {
          const aVal = a[filter.sortBy as keyof ETFListItem];
          const bVal = b[filter.sortBy as keyof ETFListItem];
          
          // Pro string hodnoty
          if (typeof aVal === "string" && typeof bVal === "string") {
            return filter.sortOrder === "asc"
              ? aVal.localeCompare(bVal)
              : bVal.localeCompare(aVal);
          }
          
          // Pro numerické hodnoty - nulls na konec
          const aNum = Number(aVal);
          const bNum = Number(bVal);
          
          // Handle NaN a null
          if (isNaN(aNum) && isNaN(bNum)) return 0;
          if (isNaN(aNum)) return 1;
          if (isNaN(bNum)) return -1;
          
          return filter.sortOrder === "asc" ? aNum - bNum : bNum - aNum;
        });
        
        console.log(`=== TOP 20 after sorting by ${filter.sortBy} ===`);
        result.slice(0, 20).forEach((etf, i) => {
          const value = etf[filter.sortBy as keyof ETFListItem];
          console.log(`${i+1}. ${etf.name}: ${value}`);
        });
        
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