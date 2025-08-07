import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          } />
          <Route path="/disparar" element={
            <AppLayout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Disparar - Em desenvolvimento</h1>
                <p className="text-muted-foreground mt-2">Esta funcionalidade está sendo desenvolvida...</p>
              </div>
            </AppLayout>
          } />
          <Route path="/contatos" element={
            <AppLayout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Contatos - Em desenvolvimento</h1>
                <p className="text-muted-foreground mt-2">Esta funcionalidade está sendo desenvolvida...</p>
              </div>
            </AppLayout>
          } />
          <Route path="/plano" element={
            <AppLayout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Meu Plano - Em desenvolvimento</h1>
                <p className="text-muted-foreground mt-2">Esta funcionalidade está sendo desenvolvida...</p>
              </div>
            </AppLayout>
          } />
          <Route path="/tutoriais" element={
            <AppLayout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Tutoriais - Em desenvolvimento</h1>
                <p className="text-muted-foreground mt-2">Esta funcionalidade está sendo desenvolvida...</p>
              </div>
            </AppLayout>
          } />
          <Route path="/configuracoes" element={
            <AppLayout>
              <div className="p-6">
                <h1 className="text-2xl font-bold">Configurações - Em desenvolvimento</h1>
                <p className="text-muted-foreground mt-2">Esta funcionalidade está sendo desenvolvida...</p>
              </div>
            </AppLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
