import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Admin from "./pages/Admin.tsx";
import NotFound from "./pages/NotFound.tsx";
import ToolsHub from "./pages/ToolsHub.tsx";
import ShippingCost from "./pages/tools/ShippingCost.tsx";
import ReturnsAnalyzer from "./pages/tools/ReturnsAnalyzer.tsx";
import ShippingCompare from "./pages/tools/ShippingCompare.tsx";
import ProfitCalc from "./pages/tools/ProfitCalc.tsx";
import PeakTime from "./pages/tools/PeakTime.tsx";
import WhatsAppGen from "./pages/tools/WhatsAppGen.tsx";
import AdBudget from "./pages/tools/AdBudget.tsx";
import Pricing from "./pages/tools/Pricing.tsx";
import ProductDesc from "./pages/tools/ProductDesc.tsx";
import Conversion from "./pages/tools/Conversion.tsx";
import Breakeven from "./pages/tools/Breakeven.tsx";
import ReturnPolicy from "./pages/tools/ReturnPolicy.tsx";
import Competitor from "./pages/tools/Competitor.tsx";
import Discount from "./pages/tools/Discount.tsx";
import MarketingPlan from "./pages/tools/MarketingPlan.tsx";
import RepeatCustomers from "./pages/tools/RepeatCustomers.tsx";
import MarketSize from "./pages/tools/MarketSize.tsx";
import CsReplies from "./pages/tools/CsReplies.tsx";
import EmployeeCost from "./pages/tools/EmployeeCost.tsx";
import BusinessHealth from "./pages/tools/BusinessHealth.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/lost-orders" element={<Index />} />
          <Route path="/tools" element={<ToolsHub />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/shipping-cost" element={<ShippingCost />} />
          <Route path="/returns-analyzer" element={<ReturnsAnalyzer />} />
          <Route path="/shipping-compare" element={<ShippingCompare />} />
          <Route path="/profit-calc" element={<ProfitCalc />} />
          <Route path="/peak-time" element={<PeakTime />} />
          <Route path="/whatsapp-gen" element={<WhatsAppGen />} />
          <Route path="/ad-budget" element={<AdBudget />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/product-desc" element={<ProductDesc />} />
          <Route path="/conversion" element={<Conversion />} />
          <Route path="/breakeven" element={<Breakeven />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/competitor" element={<Competitor />} />
          <Route path="/discount" element={<Discount />} />
          <Route path="/marketing-plan" element={<MarketingPlan />} />
          <Route path="/repeat-customers" element={<RepeatCustomers />} />
          <Route path="/market-size" element={<MarketSize />} />
          <Route path="/cs-replies" element={<CsReplies />} />
          <Route path="/employee-cost" element={<EmployeeCost />} />
          <Route path="/business-health" element={<BusinessHealth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
