import { Link } from "wouter";
import { Mail, Phone, MapPin, Linkedin, Twitter, Youtube, Facebook, Instagram, ShieldAlert } from "lucide-react";
import logoPng from "@assets/Final_Logo__1772693718308.png";

export function Footer() {
  return (
    <footer className="bg-[#050914] pt-20 pb-10 border-t border-white/5 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Disclaimer */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="flex flex-col group cursor-pointer inline-block">
              <div className="flex items-center gap-3">
                <img src={logoPng} alt="Ace Wealth Logo" className="h-10 w-auto" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold font-display text-white tracking-wide leading-none">
                    ACE <span className="text-[#F5A623]">WEALTH</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-medium leading-none">
                    AMFI – Registered Mutual Fund Distributor
                  </span>
                </div>
              </div>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Empowering your financial journey with strategic insights and disciplined wealth management. Let us guide you towards your financial aspirations.
            </p>

            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#F5A623] hover:text-[#0B132B] transition-all hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#F5A623] hover:text-[#0B132B] transition-all hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#F5A623] hover:text-[#0B132B] transition-all hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#F5A623] hover:text-[#0B132B] transition-all hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#F5A623] hover:text-[#0B132B] transition-all hover:scale-110">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h4 className="text-white font-display font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-[#F5A623] transition-colors">Home</Link></li>
              <li><Link href="/stories" className="hover:text-[#F5A623] transition-colors">Client Stories</Link></li>
              <li><Link href="/contact" className="hover:text-[#F5A623] transition-colors">Contact Us</Link></li>
              <li><a href="https://acewealth.midasx.in/pages/auth/login" target="_blank" rel="noopener noreferrer" className="hover:text-[#F5A623] transition-colors">Member Login</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-4">
            <h4 className="text-white font-display font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#F5A623] shrink-0 mt-0.5" />
                <span>Parichay Shah<br/>Ace Wealth Advisory</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#F5A623] shrink-0" />
                <a href="tel:+919825071613" className="hover:text-[#F5A623] transition-colors">+91 98250 71613</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#F5A623] shrink-0" />
                <a href="mailto:parichay@acewealth.co.in" className="hover:text-[#F5A623] transition-colors">parichay@acewealth.co.in</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory AMFI Disclaimer */}
        <div className="bg-[#1E40AF]/10 border border-[#1E40AF]/20 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <ShieldAlert className="w-8 h-8 text-[#F5A623] shrink-0" />
          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            <span className="text-white font-bold">Important Disclaimer:</span> Mutual Fund investments are subject to market risks. Read all scheme related documents carefully. Past performance is not indicative of future returns. Ace Wealth does not guarantee any assured returns.
          </p>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Ace Wealth. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
