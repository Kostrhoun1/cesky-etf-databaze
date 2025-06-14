
import React from "react";
import BlogArticleLayout from "./_BlogArticleLayout";
import FilteredETFList from "../../components/blog/FilteredETFList";

// Americké akcie - upravíme na kategorie, které skutečně existují
const filter = {
  category: "US Equity", // nebo "North America Equity"
  top: 10,
  sortBy: "return_5y" as const,
  sortOrder: "desc" as const,
};

const NejlepsiETFNaAmerickeAkcie: React.FC = () => (
  <BlogArticleLayout
    title="Nejlepší ETF na americké akcie"
    perex="Hledáte nejlepší ETF zaměřené na americké akciové indexy? Zjistěte, které fondy jsou nejvýkonnější a nejpopulárnější."
    seoDescription="Přehled nejlepších ETF na americké akcie podle výnosu i velikosti fondu. Investování do USA.">
    <p>
      Investice do amerických akcií jsou populární strategií dlouhodobého růstu. Vybrané ETF poskytují diverzifikaci a jsou snadno dostupné pro české investory.
    </p>
    <FilteredETFList filter={filter} />
  </BlogArticleLayout>
);

export default NejlepsiETFNaAmerickeAkcie;
