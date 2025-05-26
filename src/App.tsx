import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import TokenDetailPage from "./pages/TokenDetailPage";
import Header from "./components/layout/Header";
import MyWalletPage from "./pages/MyWalletPage";
import TrendsPage from "./pages/TrendsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="bg-gmgn-bg min-h-screen">
        <Toaster />
        <Sonner />
        <Header />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/trending" element={<Index />} />
            <Route path="/trenches" element={<TrendsPage />} />
            <Route path="/new" element={<Index />} />
            <Route path="/copytrade" element={<Index />} />
            <Route path="/wallet" element={<MyWalletPage />} />
            <Route path="/snipex" element={<Index />} />
            <Route path="/monitor" element={<Index />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/token/:slug" element={<TokenDetailPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
