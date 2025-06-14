
import React from "react";
import BlogArticleLayout from "./_BlogArticleLayout";
import FilteredETFList from "../../components/blog/FilteredETFList";

// Evropské akcie - použijeme filtr podle TER (nejlevnější fondy)
const filter = {
  top: 10,
  sortBy: "ter_numeric" as const,
  sortOrder: "asc" as const,
};

const NejlepsiETFNaEvropskeAkcie: React.FC = () => (
  <BlogArticleLayout
    title="Nejlepší ETF na evropské akcie"
    perex="Evropské akcie nabízejí zajímavou možnost diverzifikace portfolia. Zde je přehled oblíbených ETF s expozicí na Evropu."
    seoDescription="Srovnání nejlepších ETF na evropské akcie, jejich výkonnost a velikost.">
    <p>
      Chcete diverzifikovat své portfolio mimo USA? Evropská ETF jsou optimální volba — najdete zde výběr těch nejvýhodnějších.
    </p>
    <FilteredETFList filter={filter} />
  </BlogArticleLayout>
);

export default NejlepsiETFNaEvropskeAkcie;
