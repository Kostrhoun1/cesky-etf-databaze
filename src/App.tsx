
import React from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import ETFComparison from "./pages/ETFComparison";
import ETFDetail from "./pages/ETFDetail";
import WhatAreETFs from "./pages/WhatAreETFs";
import WhereToBuyETFs from "./pages/WhereToBuyETFs";
import DEGIROReview from "./pages/DEGIROReview";
import BeginnerGuide from "./pages/BeginnerGuide";
import Tools from "./pages/Tools";
import BlogPage from "./pages/BlogPage";
import NejlepsiETF2025 from "./pages/blog/NejlepsiETF2025";
import NejlepsiETFNaAmerickeAkcie from "./pages/blog/NejlepsiETFNaAmerickeAkcie";
import NejlepsiETFNaEvropskeAkcie from "./pages/blog/NejlepsiETFNaEvropskeAkcie";
import NejlepsiETFNaNASDAQ from "./pages/blog/NejlepsiETFNaNASDAQ";
import NejlepsiDividendoveETF from "./pages/blog/NejlepsiDividendoveETF";
import AllWeatherPortfolio from "./pages/blog/AllWeatherPortfolio";
import HomePage from "./pages/HomePage";
import NewsletterAdminPage from "./pages/NewsletterAdminPage";
import NewsletterUnsubscribe from "./pages/NewsletterUnsubscribe";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Index />} />
                <Route path="home" element={<HomePage />} />
                <Route path="auth" element={<AuthPage />} />
                <Route path="srovnani-etf" element={<ETFComparison />} />
                <Route path="porovnani-etf" element={<ETFComparison />} />
                <Route path="etf/:isin" element={<ETFDetail />} />
                <Route path="co-jsou-etf" element={<WhatAreETFs />} />
                <Route path="kde-koupit-etf" element={<WhereToBuyETFs />} />
                <Route path="degiro-recenze" element={<DEGIROReview />} />
                <Route path="pruvodce-pro-zacatecniky" element={<BeginnerGuide />} />
                <Route path="nastroje" element={<Tools />} />
                <Route path="kalkulacky" element={<Tools />} />
                <Route path="tipy" element={<BlogPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="tipy/nejlepsi-etf-2025" element={<NejlepsiETF2025 />} />
                <Route path="blog/nejlepsi-etf-2025" element={<NejlepsiETF2025 />} />
                <Route path="tipy/nejlepsi-etf-na-americke-akcie" element={<NejlepsiETFNaAmerickeAkcie />} />
                <Route path="blog/nejlepsi-etf-na-americke-akcie" element={<NejlepsiETFNaAmerickeAkcie />} />
                <Route path="tipy/nejlepsi-etf-na-evropske-akcie" element={<NejlepsiETFNaEvropskeAkcie />} />
                <Route path="blog/nejlepsi-etf-na-evropske-akcie" element={<NejlepsiETFNaEvropskeAkcie />} />
                <Route path="tipy/nejlepsi-etf-na-nasdaq" element={<NejlepsiETFNaNASDAQ />} />
                <Route path="blog/nejlepsi-etf-na-nasdaq" element={<NejlepsiETFNaNASDAQ />} />
                <Route path="tipy/nejlepsi-dividendove-etf" element={<NejlepsiDividendoveETF />} />
                <Route path="blog/nejlepsi-dividendove-etf" element={<NejlepsiDividendoveETF />} />
                <Route path="tipy/all-weather-portfolio" element={<AllWeatherPortfolio />} />
                <Route path="blog/all-weather-portfolio" element={<AllWeatherPortfolio />} />
                <Route path="newsletter/unsubscribe" element={<NewsletterUnsubscribe />} />
                <Route 
                  path="admin/newsletter" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <NewsletterAdminPage />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
