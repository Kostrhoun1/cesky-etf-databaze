import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, TrendingUp, Clock, Star } from 'lucide-react';

interface SmartSearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SmartSearchBox: React.FC<SmartSearchBoxProps> = ({
  value,
  onChange,
  placeholder = "Hledat ETF podle názvu, ISIN nebo kategorie...",
  className = ""
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Popular search suggestions
  const popularSearches = [
    "S&P 500",
    "Americké akcie", 
    "Evropské akcie",
    "Technologie",
    "Dividendové ETF",
    "Emerging markets"
  ];

  // Quick filter tags
  const quickTags = [
    { label: "Nízké poplatky", value: "ter:<0.2", icon: TrendingUp },
    { label: "DEGIRO zdarma", value: "degiro:true", icon: Star },
    { label: "Americké", value: "region:North America", icon: TrendingUp },
    { label: "Dividendové", value: "dividend:>2", icon: TrendingUp }
  ];

  // Recent searches (mock data - in real app would come from localStorage)
  const recentSearches = [
    "VWCE",
    "CSPX", 
    "EUNL"
  ];

  const handleTagClick = (tagValue: string) => {
    onChange(tagValue);
    setIsFocused(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    setIsFocused(false);
  };

  const generateSuggestions = (query: string) => {
    if (!query) return [];
    
    const allSuggestions = [
      ...popularSearches,
      ...recentSearches,
      // ETF specific suggestions
      "VWCE - Vanguard FTSE All-World",
      "CSPX - iShares Core S&P 500",
      "EUNL - iShares Core MSCI Europe",
      "VFEM - Vanguard FTSE Emerging Markets"
    ];

    return allSuggestions
      .filter(item => item.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  };

  useEffect(() => {
    if (value && value.length > 0) {
      setSuggestions(generateSuggestions(value));
    } else {
      setSuggestions([]);
    }
  }, [value]);

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          className="pl-10 pr-4 py-3 text-base border-2 focus:border-violet-500 focus:ring-0"
        />
      </div>

      {/* Dropdown with suggestions and quick actions */}
      {isFocused && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 border-2 border-gray-100 shadow-lg">
          <CardContent className="p-0">
            {/* Quick Tags */}
            {!value && (
              <div className="p-4 border-b">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Rychlé filtry</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickTags.map((tag) => (
                    <Badge
                      key={tag.value}
                      variant="secondary"
                      className="cursor-pointer hover:bg-violet-100 hover:text-violet-700 transition-colors"
                      onClick={() => handleTagClick(tag.value)}
                    >
                      <tag.icon className="w-3 h-3 mr-1" />
                      {tag.label}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Search Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-2">
                <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-1">
                  Návrhy
                </div>
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer rounded text-sm flex items-center gap-2"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <Search className="w-3 h-3 text-gray-400" />
                    <span>{suggestion}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Popular Searches */}
            {!value && (
              <div className="p-2 border-t">
                <div className="flex items-center gap-2 mb-2 px-2">
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-medium text-gray-500">Populární hledání</span>
                </div>
                {popularSearches.slice(0, 4).map((search) => (
                  <div
                    key={search}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer rounded text-sm flex items-center gap-2"
                    onClick={() => handleSuggestionClick(search)}
                  >
                    <TrendingUp className="w-3 h-3 text-gray-400" />
                    <span>{search}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Recent Searches */}
            {!value && recentSearches.length > 0 && (
              <div className="p-2 border-t">
                <div className="flex items-center gap-2 mb-2 px-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-medium text-gray-500">Nedávné hledání</span>
                </div>
                {recentSearches.map((search) => (
                  <div
                    key={search}
                    className="px-3 py-2 hover:bg-gray-50 cursor-pointer rounded text-sm flex items-center gap-2"
                    onClick={() => handleSuggestionClick(search)}
                  >
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span>{search}</span>
                  </div>
                ))}
              </div>
            )}

            {/* No results */}
            {value && suggestions.length === 0 && (
              <div className="p-4 text-center text-gray-500 text-sm">
                Žádné návrhy pro "{value}"
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SmartSearchBox;