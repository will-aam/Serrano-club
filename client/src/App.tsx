import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/lib/fake-data";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import RegistrarAbastecimento from "@/pages/RegistrarAbastecimento";
import MeusAbastecimentos from "@/pages/MeusAbastecimentos";
import ResgatarDescontos from "@/pages/ResgatarDescontos";
import Notificacoes from "@/pages/Notificacoes";
import Perfil from "@/pages/Perfil";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Home} />
      <Route path="/registrar" component={RegistrarAbastecimento} />
      <Route path="/abastecimentos" component={MeusAbastecimentos} />
      <Route path="/resgatar" component={ResgatarDescontos} />
      <Route path="/notificacoes" component={Notificacoes} />
      <Route path="/perfil" component={Perfil} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <Toaster />
          <Router />
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
