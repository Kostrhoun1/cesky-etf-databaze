
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  perex: string;
  seoDescription?: string;
  children?: React.ReactNode;
}
const BlogArticleLayout: React.FC<Props> = ({ title, perex, children }) => (
  <div className="max-w-3xl mx-auto px-4 py-8 ">
    <nav className="mb-8">
      <Link to="/tipy" className="text-violet-600 font-semibold hover:underline">&larr; Zpět do sekce Tipy</Link>
    </nav>
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <p className="mt-2 text-gray-500">{perex}</p>
      </CardHeader>
      <CardContent>
        <div className="prose max-w-full prose-violet">
          {children}
        </div>
      </CardContent>
    </Card>
  </div>
);
export default BlogArticleLayout;
