import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import logoPng from "@assets/Final_Logo__1772693718308.png";

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
            <div className="flex items-center gap-3">
              <img src={logoPng} alt="Ace Wealth Logo" className="h-10 md:h-12 w-auto" />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold font-display text-white tracking-wide leading-none">
                  ACE <span className="text-[#F5A623]">WEALTH</span>
                </span>
                <span className="text-[8px] md:text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-medium leading-none">
                  AMFI – Registered Mutual Fund Distributor
                </span>
              </div>
            </div>
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
              <Button className="bg-[#F5A623] text-black hover:bg-yellow-500 rounded-full px-6 shadow-lg shadow-yellow-600/20 group font-bold">
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
                <Button className="w-full bg-[#F5A623] text-black hover:bg-yellow-500 rounded-lg py-6 mt-2 font-bold">
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
