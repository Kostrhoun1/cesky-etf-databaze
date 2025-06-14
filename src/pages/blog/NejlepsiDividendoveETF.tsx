
import React from "react";
import BlogArticleLayout from "./_BlogArticleLayout";
import FilteredETFList from "../../components/blog/FilteredETFList";

// Dividendové ETF - upravíme kategorii
const filter = {
  category: "Dividend Equity", // zkusíme také "High Dividend Yield" nebo "Dividend"
  top: 10,
  sortBy: "return_5y" as const,
  sortOrder: "desc" as const,
};

const NejlepsiDividendoveETF: React.FC = () => (
  <BlogArticleLayout
    title="Nejlepší dividendové ETF"
    perex="Hledáte pravidelný příjem z investic? Tyto dividendové ETF pravidelně vyplácejí dividendy a patří mezi nejoblíbenější mezi investory."
    seoDescription="Srovnání dividendových ETF: Poplatky, výnos, objem.">
    <p>
      Dividendová ETF jsou vhodná pro investory, kteří chtějí budovat pasivní příjem. Ve výběru níže najdete populární varianty pro rok 2025.
    </p>
    <FilteredETFList filter={filter} />
  </BlogArticleLayout>
);

export default NejlepsiDividendoveETF;
