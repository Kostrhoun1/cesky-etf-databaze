
import React, { useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8">
          <Link 
            to="/tipy" 
            className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-semibold transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Zpět do sekce Tipy
          </Link>
        </nav>

        {/* Article Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold mb-6">
            <Calendar className="h-4 w-4" />
            Tip pro investory
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {title}
          </h1>
          
          <div className="flex items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span className="text-sm">{readTime} čtení</span>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            {perex}
          </p>
        </div>

        {/* Article Content */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-8 lg:p-12">
            <div className="prose prose-lg prose-violet max-w-none">
              {children}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="mt-12 bg-violet-50 border-violet-200">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">
              Hledáte další tipy pro investování?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Prozkoumejte naše další články a návody pro úspěšné investování do ETF fondů.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/tipy"
                className="inline-flex items-center justify-center px-6 py-3 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition-colors font-semibold"
              >
                Další tipy
              </Link>
              <Link 
                to="/srovnani-etf"
                className="inline-flex items-center justify-center px-6 py-3 border border-violet-300 text-violet-700 rounded-md hover:bg-violet-50 transition-colors font-semibold"
              >
                Srovnat ETF fondy
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default BlogArticleLayout;
