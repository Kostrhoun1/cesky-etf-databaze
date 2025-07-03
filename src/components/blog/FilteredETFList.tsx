
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
    queryKey: ["etfs", filter],
    queryFn: async () => {
      let etfs = await fetchETFs();
      
      console.log(`Total ETFs loaded: ${etfs.length}`);
      
      // Filtrování kategorie pokud je definována
      if (filter.category) {
        console.log(`Filter category: ${filter.category}`);
        etfs = etfs.filter((etf) => 
          etf.category?.toLowerCase().includes(filter.category?.toLowerCase() || "")
        );
        console.log(`ETFs after category filter (${filter.category}): ${etfs.length}`);
      }
      
      // Filtrování podle platných dat - ale méně přísné
      if (filter.sortBy) {
        console.log(`Filtering by ${filter.sortBy}`);
        
        etfs = etfs.filter((etf) => {
          const value = etf[filter.sortBy as keyof ETFListItem];
          
          // Pro všechny numerické hodnoty - pouze vyfiltruj null/undefined/NaN
          // Nefiltruj nuly nebo záporné hodnoty
          if (filter.sortBy === 'ter_numeric' || filter.sortBy === 'fund_size_numeric' || 
              filter.sortBy === 'return_1y' || filter.sortBy === 'return_3y' || 
              filter.sortBy === 'return_5y' || filter.sortBy === 'return_ytd') {
            const isValid = value != null && value !== '' && !isNaN(Number(value));
            if (!isValid) {
              console.log(`Filtered out ${etf.name}: ${filter.sortBy} = ${value}`);
            }
            return isValid;
          }
          
          // Pro string hodnoty
          return value != null && value !== '' && value !== 'N/A';
        });
        
        console.log(`ETFs after validation filter: ${etfs.length}`);
        
        // Výpis prvních pár hodnot pro debugging
        etfs.slice(0, 5).forEach(etf => {
          console.log(`${etf.name}: ${filter.sortBy} = ${etf[filter.sortBy as keyof ETFListItem]}`);
        });
        
        console.log(`ETFs after valid data filter: ${etfs.length}`);
        
        // Sortování
        etfs = etfs.sort((a, b) => {
          const aVal = a[filter.sortBy as keyof ETFListItem];
          const bVal = b[filter.sortBy as keyof ETFListItem];
          
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
      }
      
      // Omezení na top N
      if (filter.top) {
        etfs = etfs.slice(0, filter.top);
      }
      
      console.log(`Final ETFs count: ${etfs.length}`);
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
