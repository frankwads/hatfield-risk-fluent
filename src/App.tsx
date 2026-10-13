import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Signal from "./pages/Signal";
import Insights from "./pages/Insights";
import About from "./pages/About";
import Consulting from "./pages/Consulting";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ManagingThirdPartyRisks from "./pages/insights/ManagingThirdPartyRisks";
import RealTimeRiskMonitoring from "./pages/insights/RealTimeRiskMonitoring";
// 2026-10-13 (Frank, AI governance tranche): the new Insights article and
// the new AI Governance & Assurance page. Both files live in src/pages/.
import AIGovernanceArticle from "./pages/AIGovernanceArticle";
import AIGovernance from "./pages/AIGovernance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Index />} />

          {/* SIGNAL */}
          <Route path="/signal" element={<Signal />} />

          {/* Insights */}
          <Route path="/insights" element={<Insights />} />
          <Route
            path="/insights/managing-third-party-risks"
            element={<ManagingThirdPartyRisks />}
          />
          <Route
            path="/insights/real-time-risk-monitoring"
            element={<RealTimeRiskMonitoring />}
          />
          {/* 2026-10-13: "AI at the Crossroads" article. The address
              matches the card in src/pages/Insights.tsx and the links on
              the AI Governance page. */}
          <Route
            path="/insights/ai-intelligence-without-surrendering-control"
            element={<AIGovernanceArticle />}
          />

          {/* Corporate */}
          <Route path="/about" element={<About />} />
          {/* 2026-10-13: AI Governance & Assurance page, opened from the
              About page's third "What We Offer" card, the AI GOVERNANCE
              heading box in the homepage ticker and the article. */}
          <Route path="/about/ai-governance" element={<AIGovernance />} />
          <Route path="/consulting" element={<Consulting />} />
          <Route path="/contact" element={<Contact />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Analytics />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;