
import React from "react";
import BlogArticleLayout from "./_BlogArticleLayout";
import FilteredETFList from "../../components/blog/FilteredETFList";

// Zde definuji filtr třeba podle velikosti fondu, výkonnosti, apod.
const filter = {
  top: 10, // počet fondů
  // žádný speciální filtr, zobrazíme největší ETFka dle velikosti fondu
  category: undefined,
  sortBy: "fund_size_numeric", // největší fondy
  sortOrder: "desc",
};

const NejlepsiETF2025: React.FC = () => (
  <BlogArticleLayout
    title="Nejlepší ETF 2025"
    perex="Výběr nejlepších ETF fondů aktuálně dostupných pro české investory. Přehled zahrnuje největší a nejvýkonnější ETF."
    seoDescription="Výběr kvalitních ETF pro rok 2025. Srovnání podle velikosti, poplatků a pětileté výkonnosti.">
    <p>
      Chcete-li v roce 2025 investovat do akciových indexových fondů (ETF), zaměřte se na<br />
      fondy s nízkými náklady (TER), vyšším objemem spravovaných prostředků a silnou historií výnosů.
    </p>
    <FilteredETFList filter={filter} />
  </BlogArticleLayout>
);

export default NejlepsiETF2025;
