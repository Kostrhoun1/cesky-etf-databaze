import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useETFData } from "@/hooks/useETFData";
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
  console.log("=== FilteredETFList RENDER START ===");
  console.log("Filter props:", filter);
  
  const { fetchETFs } = useETFData();
  
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["filtered-etfs", filter.sortBy, filter.sortOrder, filter.top],
    queryFn: async () => {
      console.log("=== QUERY FUNCTION START ===");
      
      try {
        const allETFs = await fetchETFs();
        console.log("Raw ETFs count:", allETFs.length);
        
        if (allETFs.length === 0) {
          console.log("ERROR: No ETFs loaded from database!");
          return [];
        }
        
        let etfs = [...allETFs]; // Copy array
        
        // Debug first few ETFs
        console.log("Sample ETFs:");
        etfs.slice(0, 3).forEach((etf, i) => {
          console.log(`${i+1}. ${etf.name} - TER: ${etf.ter_numeric} - Size: ${etf.fund_size_numeric} - Return1Y: ${etf.return_1y}`);
        });
        
        // Simple sorting without any filtering
        if (filter.sortBy) {
          console.log(`Sorting by: ${filter.sortBy} (${filter.sortOrder})`);
          
          etfs.sort((a, b) => {
            const aVal = a[filter.sortBy as keyof ETFListItem];
            const bVal = b[filter.sortBy as keyof ETFListItem];
            
            // Handle nulls
            if (aVal == null && bVal == null) return 0;
            if (aVal == null) return 1;
            if (bVal == null) return -1;
            
            const aNum = Number(aVal) || 0;
            const bNum = Number(bVal) || 0;
            
            return filter.sortOrder === "asc" ? aNum - bNum : bNum - aNum;
          });
          
          console.log("After sorting - Top 5:");
          etfs.slice(0, 5).forEach((etf, i) => {
            const value = etf[filter.sortBy as keyof ETFListItem];
            console.log(`${i+1}. ${etf.name}: ${value}`);
          });
        }
        
        // Take top N
        if (filter.top) {
          etfs = etfs.slice(0, filter.top);
          console.log(`Taking top ${filter.top}, final count: ${etfs.length}`);
        }
        
        console.log("=== QUERY FUNCTION END ===");
        return etfs;
        
      } catch (error) {
        console.error("Error in query function:", error);
        throw error;
      }
    },
    staleTime: 0, // Force fresh data
    gcTime: 0, // Don't cache
  });

  console.log("Component state - isLoading:", isLoading, "error:", error, "data length:", data.length);

  if (isLoading) {
    console.log("Showing loading state");
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p>Načítání ETF fondů...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    console.log("Showing error state:", error);
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p>Chyba při načítání ETF fondů: {String(error)}</p>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    console.log("Showing empty state");
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <p>Žádné ETF fondy nenalezeny.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Filter: {filter.sortBy} ({filter.sortOrder})
          </p>
        </CardContent>
      </Card>
    );
  }

  console.log("Showing table with", data.length, "ETFs");

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