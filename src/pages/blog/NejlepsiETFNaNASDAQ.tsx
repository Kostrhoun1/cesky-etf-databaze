
import React from "react";
import BlogArticleLayout from "./_BlogArticleLayout";
import FilteredETFList from "../../components/blog/FilteredETFList";

// ETF zaměřené na NASDAQ - upravíme filtr na širší technologické kategorie
const filter = {
  category: "Technology Equity", // nebo zkusíme "Technology" nebo "Tech"
  top: 10,
  sortBy: "return_5y" as const,
  sortOrder: "desc" as const,
};

const NejlepsiETFNaNASDAQ: React.FC = () => (
  <BlogArticleLayout
    title="Nejlepší ETF na NASDAQ"
    perex="Přehled ETF fondů zaměřených na technologický index NASDAQ. Výběr podle pětiletého výnosu i velikosti fondu."
    seoDescription="Srovnání nejlepších ETF na NASDAQ: poplatky, fondy, výnosy.">
    <p>
      NASDAQ ETF jsou zaměřené na technologické lídry. Podívejte se na fondy s největším potenciálem růstu i historickým výnosem.
    </p>
    <FilteredETFList filter={filter} />
  </BlogArticleLayout>
);

export default NejlepsiETFNaNASDAQ;
