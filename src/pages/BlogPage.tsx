
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ARTICLES = [
  {
    slug: "nejlepsi-etf-2025",
    title: "Nejlepší ETF 2025",
    perex:
      "Výběr nejlepších ETF fondů pro rok 2025. Přehled podle správcovských poplatků, velikosti fondu i výkonnosti.",
  },
  {
    slug: "nejlepsi-etf-na-americke-akcie",
    title: "Nejlepší ETF na americké akcie",
    perex:
      "Chcete investovat do akcií v USA? Vyberte si z nejlepších ETF na americký akciový trh.",
  },
  {
    slug: "nejlepsi-etf-na-nasdaq",
    title: "Nejlepší ETF na NASDAQ",
    perex:
      "ETF fondy zaměřené na technologický index NASDAQ. Srovnání podle výnosu, poplatků i velikosti.",
  },
  {
    slug: "nejlepsi-dividendove-etf",
    title: "Nejlepší dividendové ETF",
    perex:
      "Seznam nejlepších ETF fondů s pravidelnou dividendou pro budování pasivního příjmu.",
  },
  {
    slug: "nejlepsi-etf-na-evropske-akcie",
    title: "Nejlepší ETF na evropské akcie",
    perex:
      "ETF fondy zaměřené na evropské společnosti. Inspirace pro diverzifikaci portfolia v rámci Evropy.",
  },
];

const BlogPage: React.FC = () => (
  <div className="max-w-3xl mx-auto p-4 py-8">
    <h1 className="font-bold text-3xl mb-8 text-center">Blog: Tipy & Srovnání ETF</h1>
    <div className="space-y-8">
      {ARTICLES.map((article) => (
        <Card key={article.slug} className="shadow hover:shadow-lg transition">
          <Link to={`/blog/${article.slug}`}>
            <CardHeader>
              <CardTitle className="mb-1 text-xl">{article.title}</CardTitle>
              <p className="text-gray-500">{article.perex}</p>
            </CardHeader>
            <CardContent>
              <span className="text-violet-600 font-semibold text-sm">Číst více &rarr;</span>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  </div>
);

export default BlogPage;
