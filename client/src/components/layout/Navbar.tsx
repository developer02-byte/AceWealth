import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import logoPng from "@assets/Final_Logo__1772693718308.png";
import { useTheme, Theme } from "@/lib/themeContext";

const THEME_CYCLE: Theme[] = ["dark", "light", "yellow"];

const THEME_LABELS: Record<Theme, { icon: string; label: string }> = {
  dark:   { icon: "🌑", label: "Dark" },
  light:  { icon: "☀️", label: "Light" },
  yellow: { icon: "🟡", label: "Yellow" },
};

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About Us" },
    { href: "/stories", label: "Client Stories" },
    { href: "/blog", label: "Blog & Insights" },
    { href: "/contact", label: "Contact" },
  ];

  const cycleTheme = () => {
    const idx = THEME_CYCLE.indexOf(theme);
    const next = THEME_CYCLE[(idx + 1) % THEME_CYCLE.length];
    setTheme(next);
  };

  const nextTheme = THEME_CYCLE[(THEME_CYCLE.indexOf(theme) + 1) % THEME_CYCLE.length];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "glass-nav py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">

          {/* Logo Section – no text beside logo */}
          <Link href="/" className="flex items-center group cursor-pointer z-10">
            <img src={logoPng} alt="Ace Wealth Logo" className="h-10 md:h-12 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#F5A623] ${location === link.href ? "text-[#F5A623] active-nav-link" : "text-slate-300"}`}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/10">
              {/* 3-Theme Toggle */}
              <button
                onClick={cycleTheme}
                title={`Switch to ${THEME_LABELS[nextTheme].label} theme`}
                className="flex items-center gap-1.5 px-3 h-9 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-[#F5A623] hover:border-[#F5A623]/30 transition-all hover:scale-105 text-xs font-medium shrink-0"
                aria-label="Cycle theme"
              >
                <span className="text-base leading-none">{THEME_LABELS[theme].icon}</span>
                <span className="hidden lg:inline">{THEME_LABELS[theme].label}</span>
              </button>

              <a href="https://acewealth.midasx.in/pages/auth/login" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#F5A623] text-black hover:bg-yellow-500 rounded-full px-6 shadow-lg shadow-yellow-600/20 group font-bold">
                  Member Login
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </nav>

          {/* Mobile Right Section */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={cycleTheme}
              title={`Switch to ${THEME_LABELS[nextTheme].label} theme`}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-[#F5A623] transition-all text-base shrink-0"
              aria-label="Cycle theme"
            >
              {THEME_LABELS[theme].icon}
            </button>
            <button
              className="text-slate-300 hover:text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
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
                  className={`p-3 rounded-lg text-sm font-medium ${location === link.href ? "bg-[#1E40AF]/20 text-[#F5A623] active-nav-link" : "text-slate-300 hover:bg-white/5"}`}
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
