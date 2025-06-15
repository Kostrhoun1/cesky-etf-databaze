
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

// Obrázky k článkům – jméno placeholderu viz nápověda
const ARTICLE_IMAGES: Record<string, string> = {
  "nejlepsi-etf-2025": "/public/lovable-uploads/photo-1488590528505-98d2b5aba04b.jpg",
  "nejlepsi-etf-na-americke-akcie": "/public/lovable-uploads/photo-1581091226825-a6a2a5aee158.jpg",
  "nejlepsi-etf-na-nasdaq": "/public/lovable-uploads/photo-1498050108023-c5249f4df085.jpg",
  "nejlepsi-dividendove-etf": "/public/lovable-uploads/photo-1486312338219-ce68d2c6f44d.jpg",
  "nejlepsi-etf-na-evropske-akcie": "/public/lovable-uploads/photo-1501854140801-50d01698950b.jpg",
};

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
  <div className="w-full min-h-screen bg-gradient-to-t from-violet-50 to-white">
    {/* Hero sekce */}
    <section className="relative flex flex-col items-center justify-center px-4 py-12 md:py-20 mb-6">
      <img
        src="/public/lovable-uploads/photo-1649972904349-6e44c42644a7.jpg"
        alt="Investování – tipy"
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none rounded-xl"
        loading="lazy"
        style={{ zIndex: 0 }}
      />
      <div className="relative z-10 max-w-2xl text-center">
        <span className="uppercase text-xs font-bold text-violet-700 tracking-widest">TIPY PRO INVESTORY</span>
        <h1 className="font-extrabold text-4xl md:text-5xl text-gray-900 mt-3 mb-4 drop-shadow-xl">
          Chytré tipy a srovnání ETF fondů
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-6">
          Nejlepší ETF pro vaše portfolio, aktuální doporučení a inspirace – vše na jednom místě s expertní analýzou. Klikněte na článek a dozvíte se detaily, které vám usnadní investiční rozhodování.
        </p>
      </div>
    </section>

    {/* Výpis článků */}
    <section className="max-w-6xl mx-auto px-2 md:px-6 py-5">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-7">
        {ARTICLES.map((article, idx) => (
          <Card
            key={article.slug}
            className="group bg-white/90 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-200 animate-fade-in"
          >
            <Link to={`/blog/${article.slug}`} className="block h-full focus:outline-none group">
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src={ARTICLE_IMAGES[article.slug]}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute left-3 top-3 bg-violet-600 text-white text-xs px-3 py-1 rounded-full">
                  TIP #{idx + 1}
                </span>
              </div>
              <CardContent className="flex flex-col h-full justify-between p-5">
                <h2 className="font-bold text-lg leading-tight mb-2 text-gray-900 group-hover:text-violet-700 transition-colors">
                  {article.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3 min-h-[60px]">{article.perex}</p>
                <div className="flex mt-4 items-center gap-1">
                  <span className="text-violet-700 font-medium text-sm group-hover:underline underline-offset-2 transition-colors">
                    Číst více
                  </span>
                  <ArrowRight className="w-4 h-4 text-violet-700 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  </div>
);

export default BlogPage;
