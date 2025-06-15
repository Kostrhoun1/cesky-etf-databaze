
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, TrendingUp, PieChart, Target, Shield } from 'lucide-react';

const BlogPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Tipy pro ETF investory - ETF průvodce.cz';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      'Užitečné tipy, návody a strategie pro ETF investory. Naučte se správně investovat do ETF fondů.'
    );
  }, []);

  const articles = [
    {
      title: 'Nejlepší ETF fondy pro rok 2025',
      description: 'Komplexní přehled nejlepších ETF fondů pro investování v roce 2025 s důrazem na diverzifikaci a nízké poplatky.',
      slug: 'nejlepsi-etf-2025',
      category: 'Doporučení',
      readTime: '8 min',
      icon: <TrendingUp className="h-5 w-5" />
    },
    {
      title: 'Nejlepší ETF na americké akcie',
      description: 'Detailní srovnání ETF fondů zaměřených na americký akciový trh s analýzou výkonnosti a poplatků.',
      slug: 'nejlepsi-etf-na-americke-akcie',
      category: 'Srovnání',
      readTime: '6 min',
      icon: <PieChart className="h-5 w-5" />
    },
    {
      title: 'Nejlepší ETF na NASDAQ',
      description: 'Průvodce ETF fondy sledujícími index NASDAQ s focus na technologické společnosti.',
      slug: 'nejlepsi-etf-na-nasdaq',
      category: 'Analýza',
      readTime: '5 min',
      icon: <Target className="h-5 w-5" />
    },
    {
      title: 'Nejlepší dividendové ETF',
      description: 'Výběr nejlepších ETF fondů zaměřených na dividendové výnosy pro pasivní příjem.',
      slug: 'nejlepsi-dividendove-etf',
      category: 'Strategie',
      readTime: '7 min',
      icon: <Shield className="h-5 w-5" />
    },
    {
      title: 'Nejlepší ETF na evropské akcie',
      description: 'Analýza ETF fondů investujících do evropského akciového trhu včetně výhod a rizik.',
      slug: 'nejlepsi-etf-na-evropske-akcie',
      category: 'Regionální',
      readTime: '6 min',
      icon: <PieChart className="h-5 w-5" />
    },
    {
      title: 'All Weather Portfolio',
      description: 'Strategie Ray Dalia pro vytvoření odolného portfolia ve všech ekonomických podmínkách.',
      slug: 'all-weather-portfolio',
      category: 'Strategie',
      readTime: '10 min',
      icon: <Shield className="h-5 w-5" />
    }
  ];

  const categories = ['Všechny', 'Doporučení', 'Srovnání', 'Analýza', 'Strategie', 'Regionální'];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold mb-6">
            <Calendar className="h-4 w-4" />
            Aktuální tipy a návody
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tipy pro ETF investory
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Objevte nejlepší strategie, doporučení a analýzy pro úspěšné investování do ETF fondů. 
            Naše články vám pomohou udělat informovaná rozhodnutí.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === 'Všechny' ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-violet-100 hover:text-violet-700 transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {articles.map((article) => (
            <Card key={article.slug} className="hover:shadow-lg transition-shadow group">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {article.category}
                  </Badge>
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                </div>
                <CardTitle className="text-lg group-hover:text-violet-600 transition-colors flex items-center gap-2">
                  {article.icon}
                  {article.title}
                </CardTitle>
                <CardDescription>
                  {article.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full group">
                  <Link to={`/tipy/${article.slug}`}>
                    Číst více
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action Section */}
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">
              Hledáte konkrétní ETF fond?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Použijte naše srovnávací nástroje k nalezení nejlepších ETF fondů podle vašich kritérií 
              nebo si vypočítejte potenciální výnosy s našimi kalkulačkami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/srovnani-etf">
                  Srovnat ETF fondy
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/nastroje">
                  Investiční kalkulačky
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default BlogPage;
