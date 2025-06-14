
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
