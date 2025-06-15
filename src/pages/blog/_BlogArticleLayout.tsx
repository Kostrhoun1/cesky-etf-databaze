
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
              <div className="prose prose-lg prose-slate max-w-none p-8 lg:p-12 
                [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:pb-3 [&_h2]:border-b [&_h2]:border-gray-200
                [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-800 [&_h3]:mt-8 [&_h3]:mb-4
                [&_p]:text-gray-700 [&_p]:leading-relaxed [&_p]:mb-6
                [&_ul]:space-y-2 [&_ul]:mb-6
                [&_li]:text-gray-700
                [&_strong]:text-gray-900 [&_strong]:font-semibold
                [&_a]:text-violet-600 [&_a]:hover:text-violet-700 [&_a]:font-medium [&_a]:no-underline [&_a]:hover:underline [&_a]:transition-colors
                [&_blockquote]:border-l-4 [&_blockquote]:border-violet-200 [&_blockquote]:bg-violet-50 [&_blockquote]:p-4 [&_blockquote]:my-6 [&_blockquote]:italic [&_blockquote]:text-gray-800
                [&_code]:bg-gray-100 [&_code]:text-gray-800 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-sm"
              >
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
