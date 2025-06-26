
import { Suspense, lazy } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

const queryClient = new QueryClient();

// Lazy load pages for better performance
const ETFComparison = lazy(() => import("./pages/ETFComparison"));
const ETFDetail = lazy(() => import("./pages/ETFDetail"));
const WhatAreETFs = lazy(() => import("./pages/WhatAreETFs"));
const WhereToBuyETFs = lazy(() => import("./pages/WhereToBuyETFs"));
const TipsPage = lazy(() => import("./pages/TipsPage"));
const BeginnerGuide = lazy(() => import("./pages/BeginnerGuide"));
const PublicETFAdminPage = lazy(() => import("./pages/PublicETFAdminPage"));
const Tools = lazy(() => import("./pages/Tools"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const NewsletterAdminPage = lazy(() => import("./pages/NewsletterAdminPage"));
const NewsletterUnsubscribe = lazy(() => import("./pages/NewsletterUnsubscribe"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Blog articles
const NejlepsiETF2025 = lazy(() => import("./pages/blog/NejlepsiETF2025"));
const NejlepsiETFNaAmerickeAkcie = lazy(() => import("./pages/blog/NejlepsiETFNaAmerickeAkcie"));
const NejlepsiETFNaEvropskeAkcie = lazy(() => import("./pages/blog/NejlepsiETFNaEvropskeAkcie"));
const NejlepsiETFNaNASDAQ = lazy(() => import("./pages/blog/NejlepsiETFNaNASDAQ"));
const NejlepsiDividendoveETF = lazy(() => import("./pages/blog/NejlepsiDividendoveETF"));
const AllWeatherPortfolio = lazy(() => import("./pages/blog/AllWeatherPortfolio"));
const DEGIROReview = lazy(() => import("./pages/DEGIROReview"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/srovnani-etf" element={<ETFComparison />} />
              <Route path="/etf/:symbol" element={<ETFDetail />} />
              <Route path="/co-jsou-etf" element={<WhatAreETFs />} />
              <Route path="/kde-koupit-etf" element={<WhereToBuyETFs />} />
              <Route path="/tipy" element={<TipsPage />} />
              <Route path="/navod-pro-zacatecniky" element={<BeginnerGuide />} />
              <Route path="/admin/etf" element={<PublicETFAdminPage />} />
              <Route path="/nastroje" element={<Tools />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/admin/newsletter" element={<NewsletterAdminPage />} />
              <Route path="/newsletter/unsubscribe" element={<NewsletterUnsubscribe />} />
              
              {/* Blog articles */}
              <Route path="/tipy/nejlepsi-etf-2025" element={<NejlepsiETF2025 />} />
              <Route path="/tipy/nejlepsi-etf-na-americke-akcie" element={<NejlepsiETFNaAmerickeAkcie />} />
              <Route path="/tipy/nejlepsi-etf-na-evropske-akcie" element={<NejlepsiETFNaEvropskeAkcie />} />
              <Route path="/tipy/nejlepsi-etf-na-nasdaq" element={<NejlepsiETFNaNASDAQ />} />
              <Route path="/tipy/nejlepsi-dividendove-etf" element={<NejlepsiDividendoveETF />} />
              <Route path="/tipy/all-weather-portfolio" element={<AllWeatherPortfolio />} />
              <Route path="/tipy/degiro-recenze" element={<DEGIROReview />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
