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
  const { fetchETFs } = useETFData();
  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["etfs-filtered", JSON.stringify(filter)],
    queryFn: async () => {
      let etfs = await fetchETFs();
      
      console.log(`=== DEBUG FilteredETFList ===`);
      console.log(`Total ETFs loaded: ${etfs.length}`);
      console.log(`Filter:`, filter);
      
      // Filtrování kategorie pokud je definována
      if (filter.category) {
        console.log(`Filter category: ${filter.category}`);
        etfs = etfs.filter((etf) => 
          etf.category?.toLowerCase().includes(filter.category?.toLowerCase() || "")
        );
        console.log(`ETFs after category filter: ${etfs.length}`);
      }
      
      // BEZ JAKÉHOKOLIV FILTROVÁNÍ - jen sortování
      if (filter.sortBy) {
        console.log(`\n=== Sortování podle ${filter.sortBy} ===`);
        console.log(`ETFs před sortováním: ${etfs.length}`);
        
        // Ukaž prvních 5 hodnot před sortováním
        etfs.slice(0, 5).forEach((etf, i) => {
          const value = etf[filter.sortBy as keyof ETFListItem];
          console.log(`${i+1}. ${etf.name}: ${filter.sortBy} = ${value}`);
        });
        
        // Pouze sortování - ŽÁDNÉ filtrování
        etfs = etfs.sort((a, b) => {
          const aVal = a[filter.sortBy as keyof ETFListItem];
          const bVal = b[filter.sortBy as keyof ETFListItem];
          
          // Handle null/undefined values by putting them at the end
          if (aVal == null && bVal == null) return 0;
          if (aVal == null) return 1;
          if (bVal == null) return -1;
          
          if (typeof aVal === "string" && typeof bVal === "string") {
            return filter.sortOrder === "asc"
              ? aVal.localeCompare(bVal)
              : bVal.localeCompare(aVal);
          }
          
          const aNum = Number(aVal) || 0;
          const bNum = Number(bVal) || 0;
          
          return filter.sortOrder === "asc"
            ? aNum - bNum
            : bNum - aNum;
        });
        
        console.log(`\n=== Top 10 po sortování ===`);
        etfs.slice(0, 10).forEach((etf, i) => {
          const value = etf[filter.sortBy as keyof ETFListItem];
          console.log(`${i+1}. ${etf.name}: ${value}`);
        });
      }
      
      // Omezení na top N
      if (filter.top) {
        etfs = etfs.slice(0, filter.top);
      }
      
      console.log(`Final ETFs count: ${etfs.length}`);
      console.log(`=== END DEBUG ===\n`);
      return etfs;
    },
  });

  if (isLoading)
    return (
      <Card className="mt-6">
        <CardContent>Načítání ETF fondů...</CardContent>
      </Card>
    );

  if (error)
    return (
      <Card className="mt-6">
        <CardContent>Chyba při načítání ETF fondů.</CardContent>
      </Card>
    );

  if (data.length === 0)
    return (
      <Card className="mt-6">
        <CardContent>
          <p>Žádné ETF fondy nesplňují podmínky filtru tohoto článku.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Filtr kategorie: {filter.category || "Žádný"}
          </p>
        </CardContent>
      </Card>
    );

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Výběr ETF k této kategorii</CardTitle>
        <p className="text-sm text-muted-foreground">
          {filter.category 
            ? `Nalezeno ${data.length} fondů v kategorii "${filter.category}"`
            : `Nalezeno ${data.length} nejlepších fondů`
          }
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