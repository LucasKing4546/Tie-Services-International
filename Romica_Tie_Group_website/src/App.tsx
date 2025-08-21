import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Solutions from "./pages/Solutions";
import QualityCompliance from "./pages/QualityCompliance";
import Projects from "./pages/Projects";
import GSIVesselProgram from "./pages/projects/GSIVesselProgram";
import DSVNewbuild from "./pages/projects/DSVNewbuild";
import FugroGeophysical from "./pages/projects/FugroGeophysical";
import GlobalNetwork from "./pages/GlobalNetwork";
import BecomePartner from "./components/network/BecomePartner";
import SupportService from "./pages/SupportService";
import Resources from "./pages/Resources";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/quality-compliance" element={<QualityCompliance />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/gsi-vessel-program" element={<GSIVesselProgram />} />
          <Route path="/projects/dsv-newbuild" element={<DSVNewbuild />} />
          <Route path="/projects/fugro-geophysical" element={<FugroGeophysical />} />
          <Route path="/global-network" element={<GlobalNetwork />} />
          <Route path="/global-network/become-partner" element={<BecomePartner />} />
          <Route path="/support-service" element={<SupportService />} />
          <Route path="/resources" element={<Resources/>} />
          <Route path="/about-us" element={<AboutUs />} />
          {/* Catch-all route for 404 Not Found */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
