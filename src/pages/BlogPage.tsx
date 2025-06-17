
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

const PLACEHOLDER_IMAGE = "/placeholder.svg"; // existuje v public složce

const ARTICLE_IMAGES: Record<string, string> = {
  "nejlepsi-etf-2025": "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
  "nejlepsi-etf-na-americke-akcie": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
  "nejlepsi-etf-na-nasdaq": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
  "nejlepsi-dividendove-etf": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
  "nejlepsi-etf-na-evropske-akcie": "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
  "all-weather-portfolio": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
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
  {
    slug: "all-weather-portfolio",
    title: "All-Weather Portfolio podle Raya Dalia",
    perex:
      "Jak sestavit robustní portfolio, které funguje v každém ekonomickém prostředí? Průvodce legendární strategií Ray Dalia s ETF.",
  },
];

const BlogPage: React.FC = () => (
  <Layout>
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero sekce */}
      <section className="relative flex flex-col items-center justify-center px-4 py-12 md:py-20 mb-6 bg-gradient-to-br from-violet-600 to-violet-800">
        <div className="relative z-10 max-w-2xl text-center">
          <span className="uppercase text-xs font-bold text-violet-200 tracking-widest">TIPY PRO INVESTORY</span>
          <h1 className="font-extrabold text-4xl md:text-5xl text-white mt-3 mb-4">
            Chytré tipy a srovnání ETF fondů
          </h1>
          <p className="text-violet-100 text-lg md:text-xl mb-6">
            Nejlepší ETF pro vaše portfolio, aktuální doporučení a inspirace – vše na jednom místě s expertní analýzou. Klikněte na článek a dozvíte se detaily, které vám usnadní investiční rozhodování.
          </p>
        </div>
      </section>

      {/* Výpis článků */}
      <section className="max-w-6xl mx-auto px-2 md:px-6 py-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-7">
          {ARTICLES.map((article, idx) => (
            <Card
              key={article.slug}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-200 animate-fade-in flex flex-col h-full"
            >
              <Link to={`/tipy/${article.slug}`} className="block h-full focus:outline-none group flex flex-col">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                  <img
                    src={ARTICLE_IMAGES[article.slug] || PLACEHOLDER_IMAGE}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== PLACEHOLDER_IMAGE) {
                        target.src = PLACEHOLDER_IMAGE;
                      }
                    }}
                  />
                  <span className="absolute left-3 top-3 bg-violet-600 text-white text-xs px-3 py-1 rounded-full">
                    TIP #{idx + 1}
                  </span>
                </div>
                <CardContent className="flex flex-col h-full justify-between p-5 flex-1">
                  <div className="flex-1">
                    <h2 className="font-bold text-lg leading-tight mb-3 text-gray-900 group-hover:text-violet-700 transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{article.perex}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-auto">
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
  </Layout>
);

export default BlogPage;
