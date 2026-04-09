import { Link, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight, ChevronDown, Download, FileText, ClipboardList } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import logoPng from "@assets/Logo.png";
import { useTheme, Theme } from "@/lib/themeContext";

const BASE = "";

const kycForms = [
  { name: "CKYC Form - Individual", file: "ckyc-individual-form.pdf" },
  { name: "CKYC Form - Non-Individual", file: "ckyc-non-individual-form.pdf" },
  { name: "KYC FATCA Form (CAMS)", file: "kyc-fatca-form-cams.pdf" },
  { name: "KYC FATCA Form (KFintech)", file: "kyc-fatca-form-kfintech.pdf" },
  { name: "Transaction Slip - ARN 51565", file: "transaction-slip-arn-51565.pdf" },
];

const THEME_CYCLE: Theme[] = ["dark", "light"];

const THEME_LABELS: Record<Theme, { icon: string; label: string }> = {
  dark:   { icon: "🌑", label: "Dark" },
  light:  { icon: "☀️", label: "Light" },
};

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloadsOpen, setDownloadsOpen] = useState(false);
  const [kycSubOpen, setKycSubOpen] = useState(false);
  const [mobileDownloadsOpen, setMobileDownloadsOpen] = useState(false);
  const [mobileKycOpen, setMobileKycOpen] = useState(false);
  const downloadsRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (downloadsRef.current && !downloadsRef.current.contains(e.target as Node)) {
        setDownloadsOpen(false);
        setKycSubOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

            {/* Downloads Dropdown */}
            <div className="relative" ref={downloadsRef}>
              <button
                onClick={() => { setDownloadsOpen(!downloadsOpen); setKycSubOpen(false); }}
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#F5A623] ${downloadsOpen ? "text-[#F5A623]" : "text-slate-300"}`}
              >
                Downloads
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${downloadsOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {downloadsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-3 w-64 rounded-xl glass-dropdown overflow-hidden"
                  >
                    <Link
                      href="/commission-disclosure"
                      onClick={() => { setDownloadsOpen(false); setKycSubOpen(false); }}
                      className="dropdown-item flex items-center gap-3 px-4 py-3 text-sm transition-colors"
                    >
                      <ClipboardList className="w-4 h-4 dropdown-icon" />
                      Commission Disclosure
                    </Link>

                    <div className="h-px dropdown-divider" />

                    <div className="relative">
                      <button
                        onClick={() => setKycSubOpen(!kycSubOpen)}
                        className="dropdown-item flex items-center justify-between w-full px-4 py-3 text-sm transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          <FileText className="w-4 h-4 dropdown-icon" />
                          KYC Forms
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${kycSubOpen ? "rotate-180" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {kycSubOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden border-t dropdown-sub-bg"
                          >
                            {kycForms.map((form) => (
                              <a
                                key={form.file}
                                href={`${BASE}/downloads/${form.file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="dropdown-muted flex items-center gap-3 px-4 pl-11 py-2.5 text-xs transition-colors"
                              >
                                <Download className="w-3.5 h-3.5 shrink-0" />
                                {form.name}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 shadow-lg group font-bold">
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

              {/* Mobile Downloads */}
              <div className="rounded-lg overflow-hidden">
                <button
                  onClick={() => setMobileDownloadsOpen(!mobileDownloadsOpen)}
                  className="flex items-center justify-between w-full p-3 text-sm font-medium text-slate-300 hover:bg-white/5 rounded-lg"
                >
                  <span className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Downloads
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileDownloadsOpen ? "rotate-180" : ""}`} />
                </button>

                {mobileDownloadsOpen && (
                  <div className="ml-4 border-l border-white/10 pl-3 space-y-1 pb-2">
                    <Link
                      href="/commission-disclosure"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 p-2 text-sm text-slate-400 hover:text-[#F5A623] rounded-lg"
                    >
                      <ClipboardList className="w-4 h-4" />
                      Commission Disclosure
                    </Link>

                    <button
                      onClick={() => setMobileKycOpen(!mobileKycOpen)}
                      className="flex items-center justify-between w-full p-2 text-sm text-slate-400 hover:text-[#F5A623] rounded-lg"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        KYC Forms
                      </span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileKycOpen ? "rotate-180" : ""}`} />
                    </button>

                    {mobileKycOpen && (
                      <div className="ml-4 border-l border-white/10 pl-3 space-y-1">
                        {kycForms.map((form) => (
                          <a
                            key={form.file}
                            href={`${BASE}/downloads/${form.file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-2 text-xs text-slate-500 hover:text-[#F5A623]"
                          >
                            <Download className="w-3.5 h-3.5 shrink-0" />
                            {form.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <a
                href="https://acewealth.midasx.in/pages/auth/login"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg py-6 mt-2 font-bold">
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
