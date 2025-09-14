import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import HomePage from "./pages/HomePage";
import ETFComparison from "./pages/ETFComparison";
import WhatAreETFs from "./pages/WhatAreETFs";
import WhereToBuyETFs from "./pages/WhereToBuyETFs";
import DEGIROReview from "./pages/DEGIROReview";
import XTBReview from "./pages/XTBReview";
import InteractiveBrokersReview from "./pages/InteractiveBrokersReview";
import FioReview from "./pages/FioReview";
import Trading212Review from "./pages/Trading212Review";
import BrokerComparison2025 from "./pages/BrokerComparison2025";
import Tools from "./pages/Tools";
import InvestmentCalculatorPage from "./pages/calculators/InvestmentCalculatorPage";
import FeeCalculatorPage from "./pages/calculators/FeeCalculatorPage";
import MonteCarloSimulatorPage from "./pages/calculators/MonteCarloSimulatorPage";
import RetirementPlannerPage from "./pages/calculators/RetirementPlannerPage";
import EmergencyFundCalculatorPage from "./pages/calculators/EmergencyFundCalculatorPage";
import CurrencyImpactAnalyzerPage from "./pages/calculators/CurrencyImpactAnalyzerPage";
import NetSalaryCalculatorPage from "./pages/calculators/NetSalaryCalculatorPage";
import ConsumerLoanCalculatorPage from "./pages/calculators/ConsumerLoanCalculatorPage";
import MortgageCalculatorPage from "./pages/calculators/MortgageCalculatorPage";
import CalculatorSitemapPage from "./pages/CalculatorSitemapPage";
import ETFDetail from "./pages/ETFDetail";
import NotFound from "./pages/NotFound";
import BlogPage from "./pages/BlogPage";
import BeginnerGuide from "./pages/BeginnerGuide";
import NejlepsiETF2025 from "./pages/blog/NejlepsiETF2025";
import NejlepsiETFNaAmerickeAkcie from "./pages/blog/NejlepsiETFNaAmerickeAkcie";
import NejlepsiETFNaNASDAQ from "./pages/blog/NejlepsiETFNaNASDAQ";
import NejlepsiDividendoveETF from "./pages/blog/NejlepsiDividendoveETF";
import NejlepsiETFNaEvropskeAkcie from "./pages/blog/NejlepsiETFNaEvropskeAkcie";
import AllWeatherPortfolio from "./pages/blog/AllWeatherPortfolio";
import JakZacitInvestovatDoETF from "./pages/blog/JakZacitInvestovatDoETF";
import ETFVsAktivniFondy from "./pages/blog/ETFVsAktivniFondy";
import NewsletterUnsubscribe from "./pages/NewsletterUnsubscribe";
import NewsletterAdminPage from "./pages/NewsletterAdminPage";
import PublicETFAdminPage from "./pages/PublicETFAdminPage";
import SitemapXML from "./pages/SitemapXML";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/srovnani-etf" element={<ETFComparison />} />
            <Route path="/co-jsou-etf" element={<WhatAreETFs />} />
            <Route path="/kde-koupit-etf" element={<WhereToBuyETFs />} />
            <Route path="/degiro-recenze" element={<DEGIROReview />} />
            <Route path="/xtb-recenze" element={<XTBReview />} />
            <Route path="/interactive-brokers-recenze" element={<InteractiveBrokersReview />} />
            <Route path="/fio-ebroker-recenze" element={<FioReview />} />
            <Route path="/trading212-recenze" element={<Trading212Review />} />
            <Route path="/srovnani-brokeru" element={<BrokerComparison2025 />} />
            <Route path="/nastroje" element={<Tools />} />
            <Route path="/kalkulacky" element={<CalculatorSitemapPage />} />
            <Route path="/kalkulacky/investicni-kalkulacka" element={<InvestmentCalculatorPage />} />
            <Route path="/kalkulacky/kalkulacka-poplatku-etf" element={<FeeCalculatorPage />} />
            <Route path="/kalkulacky/monte-carlo-simulator" element={<MonteCarloSimulatorPage />} />
            <Route path="/kalkulacky/penzijni-planovac" element={<RetirementPlannerPage />} />
            <Route path="/kalkulacky/nouzova-rezerva" element={<EmergencyFundCalculatorPage />} />
            <Route path="/kalkulacky/kurzovy-dopad-etf" element={<CurrencyImpactAnalyzerPage />} />
            <Route path="/kalkulacky/cisty-plat-2025" element={<NetSalaryCalculatorPage />} />
            <Route path="/kalkulacky/uverova-kalkulacka" element={<ConsumerLoanCalculatorPage />} />
            <Route path="/kalkulacky/hypotecni-kalkulacka" element={<MortgageCalculatorPage />} />
            <Route path="/navod-pro-zacatecniky" element={<BeginnerGuide />} />
            <Route path="/etf/:isin" element={<ETFDetail />} />
            <Route path="/tipy" element={<BlogPage />} />
            <Route path="/tipy/nejlepsi-etf-2025" element={<NejlepsiETF2025 />} />
            <Route path="/tipy/nejlepsi-etf-na-americke-akcie" element={<NejlepsiETFNaAmerickeAkcie />} />
            <Route path="/tipy/nejlepsi-etf-na-nasdaq" element={<NejlepsiETFNaNASDAQ />} />
            <Route path="/tipy/nejlepsi-dividendove-etf" element={<NejlepsiDividendoveETF />} />
            <Route path="/tipy/nejlepsi-etf-na-evropske-akcie" element={<NejlepsiETFNaEvropskeAkcie />} />
            <Route path="/tipy/all-weather-portfolio" element={<AllWeatherPortfolio />} />
            <Route path="/tipy/jak-zacit-investovat-do-etf" element={<JakZacitInvestovatDoETF />} />
            <Route path="/tipy/etf-vs-aktivni-fondy" element={<ETFVsAktivniFondy />} />
            <Route path="/newsletter/unsubscribe" element={<NewsletterUnsubscribe />} />
            <Route path="/admin/newsletter" element={<NewsletterAdminPage />} />
            <Route path="/database-management-secure-2024" element={<PublicETFAdminPage />} />
            <Route path="/sitemap.xml" element={<SitemapXML />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;