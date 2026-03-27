import { Link } from "wouter";
import { Mail, Phone, MapPin, Linkedin, Youtube, Facebook, Instagram, ShieldAlert } from "lucide-react";
import logoPng from "@assets/Final_Logo__1772693718308.png";

export function Footer() {
  return (
    <footer className="bg-[#1E40AF]/10 pt-20 pb-10 border-t border-white/5 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">

          {/* Column 1: Brand & Socials */}
          <div className="space-y-8 lg:col-span-4 lg:pr-8">
            <Link href="/" className="flex flex-col group cursor-pointer inline-block">
              <div className="flex items-center gap-3">
                <img src={logoPng} alt="Ace Wealth Logo" className="h-10 w-auto" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold font-display text-white tracking-wide leading-none">
                    ACE <span className="text-[#FBAB1C]">WEALTH</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-medium leading-none">
                    AMFI – Registered Mutual Fund Distributor
                  </span>
                </div>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Empowering your financial journey with strategic insights and disciplined wealth management. Let us guide you towards your financial aspirations.
            </p>

            <div className="flex gap-4">
              <a href="https://www.linkedin.com/in/parichay-shah-18721439" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#F5A623] hover:text-[#0B132B] transition-all hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#F5A623] hover:text-[#0B132B] transition-all hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://www.instagram.com/parichay.shah?igsh=MTdqODV6a2RsamxqdQ==" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#F5A623] hover:text-[#0B132B] transition-all hover:scale-110">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#F5A623] hover:text-[#0B132B] transition-all hover:scale-110">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#F5A623] hover:text-[#0B132B] transition-all hover:scale-110">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.google.com/maps/place/Ace+Wealth/@23.0108471,72.5284587,17z/data=!3m1!4b1!4m6!3m5!1s0x395e84dc3fffffff:0xe97e3dc978557a7a!8m2!3d23.0108422!4d72.5310336!16s%2Fg%2F1tdr6l3c?entry=ttu&g_ep=EgoyMDI2MDMyMy4xIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#F5A623] hover:text-[#0B132B] transition-all hover:scale-110" title="Office Location">
                <MapPin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-display font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-[#FBAB1C] transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-[#FBAB1C] transition-colors">Services</Link></li>
              <li><Link href="/about" className="hover:text-[#FBAB1C] transition-colors">About Us</Link></li>
              <li><Link href="/stories" className="hover:text-[#FBAB1C] transition-colors">Client Stories</Link></li>
              <li><Link href="/blog" className="hover:text-[#FBAB1C] transition-colors">Blog & Insights</Link></li>
              <li><Link href="/contact" className="hover:text-[#FBAB1C] transition-colors">Contact Us</Link></li>
              <li><a href="https://acewealth.midasx.in/pages/auth/login" target="_blank" rel="noopener noreferrer" className="hover:text-[#FBAB1C] transition-colors">Member Login</a></li>
            </ul>
          </div>

          {/* Column 3: Legal & Disclosure */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-display font-semibold mb-6">Legal & Disclosure</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link href="/commission-disclosure" className="hover:text-[#FBAB1C] transition-colors">Commission Disclosure</Link></li>
              <li><Link href="/disclaimer" className="hover:text-[#FBAB1C] transition-colors">Disclaimer</Link></li>
              <li><Link href="/privacy" className="hover:text-[#FBAB1C] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#FBAB1C] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-display font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-6 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#FBAB1C] shrink-0 mt-0.5" />
                <a href="https://www.google.com/maps/place/Ace+Wealth/@23.0108471,72.5284587,17z/data=!3m1!4b1!4m6!3m5!1s0x395e84dc3fffffff:0xe97e3dc978557a7a!8m2!3d23.0108422!4d72.5310336!16s%2Fg%2F1tdr6l3c?entry=ttu&g_ep=EgoyMDI2MDMyMy4xIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-[#FBAB1C] transition-colors text-left block leading-relaxed">
                  10th Floor, AceWealth, 1031-33<br />
                  Mirchi Road, nr. Shyamal Cross Road<br />
                  Rajmani Society, Satellite<br />
                  Ahmedabad, Gujarat 380015
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#FBAB1C] shrink-0" />
                <a href="tel:+917574871613" className="hover:text-[#FBAB1C] transition-colors">+91 75748 71613</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#FBAB1C] shrink-0" />
                <a href="mailto:info@acewealth.co.in" className="hover:text-[#FBAB1C] transition-colors">info@acewealth.co.in</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Mandatory AMFI Disclaimer */}
        <div className="bg-[#050914] border border-[#1E40AF]/20 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <ShieldAlert className="w-8 h-8 text-[#FBAB1C] shrink-0" />
          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            <span className="text-white font-bold">Important Disclaimer:</span> Investment in Mutual Funds and Securities are subject to market risk associated with investment capital and Debt market instruments. The data and information herein provided is believed to be reliable but ACE WEALTH ('The Company') does not warrant for its accuracy and completeness. The company is not guaranteeing or assuring the performance of Mutual Funds or other securities about which the report is presented. Further ACE WEALTH shall not be liable for any loss to investors from the investments made on the basis of proposal (s) given by it. [E & O E].
          </p>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Ace Wealth. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
