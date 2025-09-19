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
import Tools from "./pages/Tools";
import InvestmentCalculatorPage from "./pages/calculators/InvestmentCalculatorPage";
import FeeCalculatorPage from "./pages/calculators/FeeCalculatorPage";
import ETFPoplatky from "./pages/ETFPoplatky";
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
import NejlepsiETF2025 from "./pages/blog/NejlepsiETF2025";
import NejlepsiETFNaAmerickeAkcie from "./pages/blog/NejlepsiETFNaAmerickeAkcie";
import NejlepsiETFNaNASDAQ from "./pages/blog/NejlepsiETFNaNASDAQ";
import NejlepsiDividendoveETF from "./pages/blog/NejlepsiDividendoveETF";
import NejlepsiETFNaEvropskeAkcie from "./pages/blog/NejlepsiETFNaEvropskeAkcie";
import AllWeatherPortfolio from "./pages/blog/AllWeatherPortfolio";
import JakZacitInvestovatDoETF from "./pages/blog/JakZacitInvestovatDoETF";
import ETFVsAktivniFondy from "./pages/blog/ETFVsAktivniFondy";
import RebalancingPortfolia from "./pages/blog/RebalancingPortfolia";
import ETFProDuchod from "./pages/blog/ETFProDuchod";
import NejlevnejsiETFFondy from "./pages/blog/NejlevnejsiETFFondy";
import ESGUdrzitelneETF from "./pages/blog/ESGUdrzitelneETF";
import ETFGuideDownload from "./pages/ETFGuideDownload";
import PortfolioStrategiesPage from "./pages/PortfolioStrategies";
import BoglheadsThreeFundPage from "./pages/portfolio/BoglheadsThreeFund";
import AkciovePage from "./pages/portfolio/AkciovePage";
import RayDalioAllWeatherPage from "./pages/portfolio/RayDalioAllWeatherPage";
import PermanentniPortfolioPage from "./pages/portfolio/PermanentniPortfolioPage";
import NobelPortfolioPage from "./pages/portfolio/NobelPortfolioPage";
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
            <Route path="/etf-poplatky-srovnani" element={<ETFPoplatky />} />
            <Route path="/degiro-recenze" element={<DEGIROReview />} />
            <Route path="/xtb-recenze" element={<XTBReview />} />
            <Route path="/interactive-brokers-recenze" element={<InteractiveBrokersReview />} />
            <Route path="/fio-ebroker-recenze" element={<FioReview />} />
            <Route path="/trading212-recenze" element={<Trading212Review />} />
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
            <Route path="/tipy/rebalancing-portfolia" element={<RebalancingPortfolia />} />
            <Route path="/tipy/etf-pro-duchod" element={<ETFProDuchod />} />
            <Route path="/tipy/nejlevnejsi-etf-fondy" element={<NejlevnejsiETFFondy />} />
            <Route path="/tipy/esg-udrzitelne-etf" element={<ESGUdrzitelneETF />} />
            <Route path="/navod-pro-zacatecniky" element={<ETFGuideDownload />} />
            <Route path="/portfolio-strategie" element={<PortfolioStrategiesPage />} />
            <Route path="/portfolio-strategie/bogleheads-three-fund" element={<BoglheadsThreeFundPage />} />
            <Route path="/portfolio-strategie/akciove-portfolio" element={<AkciovePage />} />
            <Route path="/portfolio-strategie/ray-dalio-all-weather" element={<RayDalioAllWeatherPage />} />
            <Route path="/portfolio-strategie/permanentni-portfolio" element={<PermanentniPortfolioPage />} />
            <Route path="/portfolio-strategie/nobel-portfolio" element={<NobelPortfolioPage />} />
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