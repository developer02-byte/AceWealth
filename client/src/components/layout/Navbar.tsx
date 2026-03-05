import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/stories", label: "Client Stories" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass-nav py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <Link href="/" className="flex flex-col group cursor-pointer">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F5A623] to-orange-400 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow">
                <TrendingUp className="text-[#0B132B] w-5 h-5" />
              </div>
              <span className="text-2xl font-bold font-display text-white tracking-wide">
                Ace<span className="text-[#F5A623]">Wealth</span>
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-medium">
              AMFI – Registered Mutual Fund Distributor
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#F5A623] ${
                  location === link.href ? "text-[#F5A623]" : "text-slate-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <a 
              href="https://acewealth.midasx.in/pages/auth/login" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button className="bg-[#1E40AF] text-white hover:bg-blue-800 rounded-full px-6 shadow-lg shadow-blue-900/20 group">
                Member Login
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-nav border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-3 rounded-lg text-sm font-medium ${
                    location === link.href ? "bg-[#1E40AF]/20 text-[#F5A623]" : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a 
                href="https://acewealth.midasx.in/pages/auth/login" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full bg-[#1E40AF] text-white hover:bg-blue-800 rounded-lg py-6 mt-2">
                  Member Login
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
