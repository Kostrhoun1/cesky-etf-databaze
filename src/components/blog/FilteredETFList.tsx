import React from "react";
import { useQuery } from "@tanstack/react-query";
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
  console.log("=== FilteredETFList RENDER ===", filter);
  
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["direct-etfs-v2", filter.sortBy, filter.sortOrder, filter.top, Math.random()],
    queryFn: async () => {
      console.log("=== DIRECT SUPABASE QUERY START ===");
      
      try {
        // Přímé volání Supabase bez hooků
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
          .limit(1000); // Omezím na 1000 pro rychlost
        
        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }
        
        if (!etfs || etfs.length === 0) {
          console.log("No ETFs returned from Supabase");
          return [];
        }
        
        console.log(`Loaded ${etfs.length} ETFs from Supabase`);
        
        let result = [...etfs];
        
        // Debug sample
        console.log("Sample ETFs from DB:");
        result.slice(0, 3).forEach((etf, i) => {
          console.log(`${i+1}. ${etf.name}:`);
          console.log(`  - ter_numeric: ${etf.ter_numeric}`);
          console.log(`  - fund_size_numeric: ${etf.fund_size_numeric}`);
          console.log(`  - return_1y: ${etf.return_1y}`);
        });
        
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
          
          console.log(`Top 5 after sorting by ${filter.sortBy}:`);
          result.slice(0, 5).forEach((etf, i) => {
            const value = etf[filter.sortBy as keyof ETFListItem];
            console.log(`${i+1}. ${etf.name}: ${value}`);
          });
        }
        
        // Take top N
        if (filter.top) {
          result = result.slice(0, filter.top);
          console.log(`Final result: ${result.length} ETFs`);
        }
        
        return result;
        
      } catch (error) {
        console.error("Query error:", error);
        throw error;
      }
    },
    staleTime: 60000, // Cache for 1 minute
  });

  console.log("Component render - loading:", isLoading, "error:", !!error, "data length:", data.length);

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
    console.error("Render error:", error);
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p>Chyba při načítání: {String(error)}</p>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p>Žádné fondy nenalezeny</p>
          <p className="text-sm text-gray-500">Filter: {filter.sortBy}</p>
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