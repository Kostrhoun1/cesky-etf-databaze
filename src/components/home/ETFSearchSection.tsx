import React from 'react';
import { useETFSearchData } from '@/hooks/useETFSearchData';
import { useETFTableLogic } from '@/hooks/useETFTableLogic';
import { useETFComparison } from '@/hooks/useETFComparison';
import ETFSimpleTable from '@/components/ETFSimpleTable';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const ETFSearchSection: React.FC = () => {
  const { etfs, categories, totalETFCount, isLoading, isLoadingComplete } = useETFSearchData();
  const {
    searchTerm,
    paginatedETFs,
    filteredETFs,
    totalPages,
    currentPage,
    activeCategory,
    sortBy,
    sortOrder,
    advancedFilters,
    ranges,
    handleSearch,
    handleCategoryChange,
    handleSort,
    setCurrentPage,
    handleAdvancedFilterChange,
  } = useETFTableLogic(etfs);

  const {
    selectedETFs,
    addETFToComparison,
    removeETFFromComparison,
    clearComparison,
    isETFSelected,
    canAddMore,
  } = useETFComparison();

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
            <Search className="w-4 h-4" />
            Interaktivní vyhledávání
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Najděte perfektní ETF pro vaše portfolio
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            Prohledejte databázi {totalETFCount.toLocaleString()} ETF fondů
          </p>
        </div>

        {/* Vyhledávací pole */}
        <div className="mb-6">
          <div className="max-w-2xl mx-auto">
            <Input
              placeholder="Vyhledejte podle názvu, ISIN nebo poskytovatele..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="h-12 text-base px-4"
            />
          </div>
        </div>

        {/* Layout s taby */}
        <div className="w-full">
          {/* Hlavní obsah */}
          <div>
            <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
              {/* Taby pro kategorie */}
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-4">
                {categories.map(category => (
                  <TabsTrigger key={category} value={category} className="text-xs md:text-sm px-2 py-1">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Obsah tabů */}
              {categories.map(category => (
                <TabsContent key={category} value={category}>
                  {/* Statistiky */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="inline-flex items-center gap-1 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 px-3 py-1 rounded-full text-sm font-medium">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        TOP {Math.min(10, filteredETFs.length)}
                      </span>
                      <span>nejlepších ETF fondů v kategorii <strong>{category}</strong></span>
                      <span className="text-sm text-gray-500">({filteredETFs.length} celkem)</span>
                    </div>
                  </div>


                  {/* Tabulka ETF */}
                  <ETFSimpleTable
                    etfs={filteredETFs.slice(0, 10)}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                    selectedETFs={selectedETFs}
                    onAddETF={addETFToComparison}
                    onRemoveETF={removeETFFromComparison}
                    isETFSelected={isETFSelected}
                    canAddMore={canAddMore}
                    showPagination={false}
                    isHomepage={true}
                  />

                  {/* Vylepšené CTA */}
                  <div className="mt-4 bg-gradient-to-br from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-100">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="text-center md:text-left">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {selectedETFs.length > 0 
                            ? `Máte vybráno ${selectedETFs.length} ETF fondů k porovnání` 
                            : `Chcete vidět více než TOP ${Math.min(10, filteredETFs.length)}?`
                          }
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {selectedETFs.length > 0
                            ? "Porovnejte je detailně nebo pokračujte v procházení všech fondů"
                            : `V kategorii ${category} máme celkem ${filteredETFs.length} ETF fondů s pokročilými filtry`
                          }
                        </p>
                      </div>
                      <div className="flex gap-3">
                        {selectedETFs.length > 0 && (
                          <Button
                            onClick={() => {
                              // Navigate to comparison with selected ETFs
                              window.location.href = '/srovnani-etf';
                            }}
                            className="bg-violet-600 hover:bg-violet-700 text-white px-6"
                          >
                            Porovnat vybrané ({selectedETFs.length})
                          </Button>
                        )}
                        <Button
                          onClick={() => window.location.href = '/srovnani-etf'}
                          variant={selectedETFs.length > 0 ? "outline" : "default"}
                          className={selectedETFs.length > 0 ? "border-violet-200 text-violet-700 hover:bg-violet-50" : "bg-violet-600 hover:bg-violet-700 text-white px-6"}
                        >
                          {filteredETFs.length > 10 ? `Zobrazit všech ${filteredETFs.length} fondů` : "Pokročilé vyhledávání"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ETFSearchSection;