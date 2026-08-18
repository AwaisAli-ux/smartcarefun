import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index.tsx";
import Advertisement from "./pages/Advertisement.tsx";
import Streaming from "./pages/Streaming.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import RefundPolicy from "./pages/RefundPolicy.tsx";
import FAQ from "./pages/FAQ.tsx";
import FreeTrial from "./pages/FreeTrial.tsx";
import NotFound from "./pages/NotFound.tsx";
import LiveChat from "./components/LiveChat.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LiveChat />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ad" element={<Advertisement />} />
            <Route path="/streaming" element={<Streaming />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/free-trial" element={<FreeTrial />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
