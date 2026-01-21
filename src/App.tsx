import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import Index from "./pages/Index";
import Log from "./pages/Log";
import Insights from "./pages/Insights";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import CoachSetup from "@/pages/CoachSetup.tsx";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/log" element={<Log />} />
                    <Route path="/insights" element={<Insights />} />
                    <Route path="/coach" element={<CoachSetup />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Navigation />
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
