import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Pathfinding from "@/pages/Pathfinding";
import Sorting from "@/pages/Sorting";
import About from "@/pages/About";
import { ThemeProvider } from "./hooks/useTheme";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/sorting" component={Sorting} />
        <Route path="/pathfinding" component={Pathfinding} />
        <Route path="/about" component={About} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
