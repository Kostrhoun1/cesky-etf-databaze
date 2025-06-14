
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
      if (filter.category) {
        etfs = etfs.filter((etf) => etf.category?.toLowerCase() === filter.category?.toLowerCase());
      }
      if (filter.sortBy) {
        etfs = etfs.sort((a, b) => {
          const aVal = a[filter.sortBy as keyof ETFListItem];
          const bVal = b[filter.sortBy as keyof ETFListItem];
          if (typeof aVal === "string" && typeof bVal === "string") {
            return filter.sortOrder === "asc"
              ? aVal.localeCompare(bVal)
              : bVal.localeCompare(aVal);
          }
          return filter.sortOrder === "asc"
            ? (Number(aVal) || 0) - (Number(bVal) || 0)
            : (Number(bVal) || 0) - (Number(aVal) || 0);
        });
      }
      if (filter.top) {
        etfs = etfs.slice(0, filter.top);
      }
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
        <CardContent>Žádné ETF fondy nesplňují podmínky filtru tohoto článku.</CardContent>
      </Card>
    );

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Výběr ETF k této kategorii</CardTitle>
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
