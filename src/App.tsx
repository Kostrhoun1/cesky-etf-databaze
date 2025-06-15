import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ETFComparison from "./pages/ETFComparison";
import WhatAreETFs from "./pages/WhatAreETFs";
import WhereToBuyETFs from "./pages/WhereToBuyETFs";
import DEGIROReview from "./pages/DEGIROReview";
import Tools from "./pages/Tools";
import ETFDetail from "./pages/ETFDetail";
import NotFound from "./pages/NotFound";
import BlogPage from "./pages/BlogPage";
import NejlepsiETF2025 from "./pages/blog/NejlepsiETF2025";
import NejlepsiETFNaAmerickeAkcie from "./pages/blog/NejlepsiETFNaAmerickeAkcie";
import NejlepsiETFNaNASDAQ from "./pages/blog/NejlepsiETFNaNASDAQ";
import NejlepsiDividendoveETF from "./pages/blog/NejlepsiDividendoveETF";
import NejlepsiETFNaEvropskeAkcie from "./pages/blog/NejlepsiETFNaEvropskeAkcie";
import AllWeatherPortfolio from "./pages/blog/AllWeatherPortfolio";
import NewsletterUnsubscribe from "./pages/NewsletterUnsubscribe";
import NewsletterAdminPage from "./pages/NewsletterAdminPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/srovnani-etf" element={<ETFComparison />} />
        <Route path="/co-jsou-etf" element={<WhatAreETFs />} />
        <Route path="/kde-koupit-etf" element={<WhereToBuyETFs />} />
        <Route path="/degiro-recenze" element={<DEGIROReview />} />
        <Route path="/nastroje" element={<Tools />} />
        <Route path="/etf/:isin" element={<ETFDetail />} />
        <Route path="/tipy" element={<BlogPage />} />
        <Route path="/tipy/nejlepsi-etf-2025" element={<NejlepsiETF2025 />} />
        <Route path="/tipy/nejlepsi-etf-na-americke-akcie" element={<NejlepsiETFNaAmerickeAkcie />} />
        <Route path="/tipy/nejlepsi-etf-na-nasdaq" element={<NejlepsiETFNaNASDAQ />} />
        <Route path="/tipy/nejlepsi-dividendove-etf" element={<NejlepsiDividendoveETF />} />
        <Route path="/tipy/nejlepsi-etf-na-evropske-akcie" element={<NejlepsiETFNaEvropskeAkcie />} />
        <Route path="/tipy/all-weather-portfolio" element={<AllWeatherPortfolio />} />
        <Route path="/newsletter/unsubscribe" element={<NewsletterUnsubscribe />} />
        <Route path="/admin/newsletter" element={<NewsletterAdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
