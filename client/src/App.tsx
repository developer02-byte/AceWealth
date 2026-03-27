import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { ThemeProvider } from "@/lib/themeContext";

// Components
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Pages
import Home from "@/pages/Home";
import ClientStories from "@/pages/ClientStories";
import Contact from "@/pages/Contact";
import Services from "@/pages/Services";
import About from "@/pages/About";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import BlogList from "@/pages/BlogList";
import BlogPostView from "@/pages/BlogPostView";
import CommissionDisclosure from "@/pages/CommissionDisclosure";
import Disclaimer from "@/pages/Disclaimer";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";

function Router() {
  return (
    <WouterRouter base="/acewealth/demo/3">
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/services" component={Services} />
            <Route path="/about" component={About} />
            <Route path="/stories" component={ClientStories} />
            <Route path="/contact" component={Contact} />
            <Route path="/login" component={AdminLogin} />
            <Route path="/admin" component={AdminDashboard} />
            <Route path="/blog" component={BlogList} />
            <Route path="/blog/:id" component={BlogPostView} />
            <Route path="/commission-disclosure" component={CommissionDisclosure} />
            <Route path="/disclaimer" component={Disclaimer} />
            <Route path="/privacy" component={PrivacyPolicy} />
            <Route path="/terms" component={TermsOfService} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <Footer />
      </div>
    </WouterRouter>
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
