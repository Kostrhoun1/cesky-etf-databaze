
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, Target, Users, Lightbulb, Video } from 'lucide-react';
import YouTubeVideosSection from '@/components/YouTubeVideosSection';

const TipsPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Tipy pro investory - ETF průvodce.cz';
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      'Praktické tipy a rady pro investování do ETF fondů. Vzdělávací obsah, články a videa pro začátečníky i pokročilé investory.'
    );
  }, []);

  const tipArticles = [
    {
      title: "Nejlepší ETF fondy v roce 2025",
      description: "Aktuální přehled nejlepších ETF fondů podle různých kritérií",
      link: "/tipy/nejlepsi-etf-2025",
      icon: TrendingUp,
      color: "bg-green-500"
    },
    {
      title: "Nejlepší ETF na americké akcie",
      description: "Jak investovat do amerického akciového trhu pomocí ETF",
      link: "/tipy/nejlepsi-etf-na-americke-akcie",
      icon: Target,
      color: "bg-blue-500"
    },
    {
      title: "Nejlepší ETF na evropské akcie",
      description: "Průvodce evropskými akciovými ETF fondy",
      link: "/tipy/nejlepsi-etf-na-evropske-akcie",
      icon: Users,
      color: "bg-purple-500"
    },
    {
      title: "Dividendové ETF fondy",
      description: "Jak investovat do dividend pomocí ETF fondů",
      link: "/tipy/nejlepsi-dividendove-etf",
      icon: BookOpen,
      color: "bg-orange-500"
    },
    {
      title: "All Weather Portfolio",
      description: "Jak sestavit portfolio pro všechna období",
      link: "/tipy/all-weather-portfolio",
      icon: Lightbulb,
      color: "bg-red-500"
    }
  ];

  const educationalVideos = [
    {
      title: "Warren Buffett vysvětluje indexové fondy",
      description: "Legendární investor Warren Buffett vysvětluje, proč doporučuje indexové fondy běžným investorům a jak mohou být lepší volbou než aktivně spravované fondy.",
      videoUrl: "https://youtu.be/ZXISzZlVeLg",
      author: "Warren Buffett"
    },
    {
      title: "Buffettova rada pro začínající investory",
      description: "Warren Buffett sdílí své nejlepší rady pro začínající investory, včetně důležitosti dlouhodobého investování a diverzifikace prostřednictvím indexových fondů.",
      videoUrl: "https://youtu.be/paruIsAkK-0",
      author: "Warren Buffett"
    }
  ];

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4YjVjZjYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxLjUiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
          <div className="relative text-center py-24 px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Lightbulb className="w-4 h-4 mr-2" />
              Vzdělávací obsah pro investory
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight animate-fade-in">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Tipy</span> pro investory
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Praktické rady, návody a vzdělávací obsah pro úspěšné investování do ETF fondů.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-50/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-24">
            
            {/* Articles Section */}
            <div className="animate-fade-in">
              <div className="text-center mb-16">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl mb-6 shadow-lg">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Nejčtenější články</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Praktické návody a analýzy pro vaše investiční rozhodnutí</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tipArticles.map((article, index) => (
                  <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all h-full">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="flex items-center mb-6">
                        <div className={`w-12 h-12 ${article.color} text-white rounded-xl flex items-center justify-center mr-4`}>
                          <article.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{article.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-6 flex-grow">{article.description}</p>
                      <Button asChild className="w-full">
                        <Link to={article.link}>Číst článek</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Videos Section */}
            <YouTubeVideosSection
              title="Vzdělávací videa"
              description="Nejlepší rady od uznávaných investorů a odborníků"
              videos={educationalVideos}
            />

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white shadow-2xl animate-fade-in overflow-hidden relative">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative p-12 text-center">
                <div className="inline-flex items-center bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Začněte investovat ještě dnes
                </div>
                <h3 className="text-4xl font-bold mb-6">
                  Připraveni začít s ETF?
                </h3>
                <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                  Použijte náš srovnávač ETF fondů a najděte ty nejlepší možnosti pro vaši investiční strategii.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
                    <Link to="/srovnani-etf">Porovnat ETF fondy</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 hover:text-white font-bold px-8 py-4 text-lg transition-all hover:scale-105">
                    <Link to="/co-jsou-etf">Více o ETF</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TipsPage;
