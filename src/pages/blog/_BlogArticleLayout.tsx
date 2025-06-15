
import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  perex: string;
  seoDescription?: string;
  readTime?: string;
  children?: React.ReactNode;
}

const BlogArticleLayout: React.FC<Props> = ({ title, perex, seoDescription, readTime = "5 min", children }) => {
  useEffect(() => {
    if (seoDescription) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', seoDescription);
    }
  }, [seoDescription]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50">
        {/* Hero Section with Background */}
        <div className="relative bg-gradient-to-r from-violet-600 to-blue-600 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Breadcrumb Navigation */}
            <nav className="mb-8">
              <Link 
                to="/tipy" 
                className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium transition-colors group bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Zpět do sekce Tipy
              </Link>
            </nav>

            {/* Article Header */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
                <Calendar className="h-4 w-4" />
                Tip pro investory
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">{readTime} čtení</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">ETF průvodce.cz</span>
                </div>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 ml-auto">
                  <Share2 className="h-4 w-4 mr-2" />
                  Sdílet
                </Button>
              </div>
              
              <p className="text-xl leading-relaxed text-white/95 max-w-3xl">
                {perex}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Article Content Card */}
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm mb-12">
            <CardContent className="p-0">
              <div className="prose prose-lg prose-slate max-w-none p-8 lg:p-12">
                <style jsx>{`
                  .prose h2 {
                    @apply text-2xl font-bold text-gray-900 mt-12 mb-6 pb-3 border-b border-gray-200;
                  }
                  .prose h3 {
                    @apply text-xl font-semibold text-gray-800 mt-8 mb-4;
                  }
                  .prose p {
                    @apply text-gray-700 leading-relaxed mb-6;
                  }
                  .prose ul {
                    @apply space-y-2 mb-6;
                  }
                  .prose li {
                    @apply text-gray-700;
                  }
                  .prose strong {
                    @apply text-gray-900 font-semibold;
                  }
                  .prose a {
                    @apply text-violet-600 hover:text-violet-700 font-medium no-underline hover:underline transition-colors;
                  }
                  .prose blockquote {
                    @apply border-l-4 border-violet-200 bg-violet-50 p-4 my-6 italic text-gray-800;
                  }
                  .prose code {
                    @apply bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm;
                  }
                `}</style>
                {children}
              </div>
            </CardContent>
          </Card>

          {/* Navigation Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Previous Article */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 text-gray-600 mb-3">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="text-sm font-medium">Předchozí článek</span>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">
                  Jak začít investovat do ETF
                </h3>
              </CardContent>
            </Card>

            {/* Next Article */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-end gap-3 text-gray-600 mb-3">
                  <span className="text-sm font-medium">Další článek</span>
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-violet-600 transition-colors text-right">
                  Diverzifikace portfolia
                </h3>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-violet-600 to-blue-600 text-white border-0 shadow-2xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">
                Hledáte další tipy pro investování?
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto text-lg">
                Prozkoumejte naše další články a návody pro úspěšné investování do ETF fondů.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="bg-white text-violet-600 hover:bg-white/90">
                  <Link to="/tipy">
                    Další tipy
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  <Link to="/srovnani-etf">
                    Srovnat ETF fondy
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BlogArticleLayout;
