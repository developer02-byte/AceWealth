import { motion } from "framer-motion";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PieChart, TrendingUp, Shield, Landmark, Globe, Building2, BarChart3, Heart, ChevronRight, ChevronDown } from "lucide-react";

interface Product {
  icon: typeof PieChart;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

const products: Product[] = [
  {
    icon: PieChart,
    title: "Mutual Funds",
    subtitle: "Diversified, professionally managed investments",
    description: "A mutual fund is a collective investment vehicle that pools money from different investors and invests it in a diversified portfolio of securities like stocks, bonds and commodities. Through investment in a mutual fund, an investor can get access to equities, bonds, money market instruments and other securities that may otherwise be unavailable to them.",
    highlights: [
      "Diversification — reduces risk by spreading investments across various asset classes",
      "Professional Management — expert fund managers handle investments at reasonable cost",
      "Affordability — accessible to very small investors with relatively small sums",
      "Liquidity — recover the market value of investments from the mutual fund itself",
      "Strong Regulatory Framework — SEBI has laid down strict checks and balances",
    ],
  },
  {
    icon: BarChart3,
    title: "Specialized Investment Funds (SIF)",
    subtitle: "Bridging mutual funds and PMS/AIF",
    description: "A Specialized Investment Fund (SIF) is a novel financial product introduced by SEBI to bridge the gap between simpler options like mutual funds, and more complex products like PMS and AIFs. SIFs offer investors a regulated way to access professionally managed, strategy-driven investments with greater freedom than conventional mutual funds.",
    highlights: [
      "Sophisticated strategies — including naked short positions and dynamic asset allocation",
      "Target Investors — designed for high net-worth individuals (HNIs)",
      "Minimum Investment — ₹10 Lakh",
      "SEBI Regulated — under Mutual Fund Regulations with special provisions",
    ],
  },
  {
    icon: Landmark,
    title: "Portfolio Management Services (PMS)",
    subtitle: "Customized, personalized investment management",
    description: "Portfolio Management Services (PMS) is a customized and personalized investment approach tailored to meet an individual's financial objectives while considering the risk profile and investment horizon. It is primarily designed for High Net-Worth Individuals (HNIs). Securities are held directly in your name in a separate Demat account.",
    highlights: [
      "Customized Strategy — personalized solutions for your specific goals and risk tolerance",
      "Direct Ownership — securities held in your name with complete transparency",
      "Minimum Investment — ₹50 Lakhs as per SEBI regulations",
      "Three Types — Discretionary, Non-Discretionary, and Advisory PMS",
    ],
  },
  {
    icon: TrendingUp,
    title: "Alternative Investment Funds (AIF)",
    subtitle: "Sophisticated, high-value investment pools",
    description: "An Alternative Investment Fund (AIF) in India is a privately managed investment pool that deploys capital into a range of conventional and non-conventional assets. AIFs are regulated by SEBI under the SEBI (Alternative Investment Funds) Regulations, 2012, and are targeted at High Net-worth Individuals (HNIs) and institutional investors.",
    highlights: [
      "Category I — Venture Capital, Angel Funds, Infrastructure & Social Venture Funds",
      "Category II — Private Equity, Debt Funds, Real Estate Funds",
      "Category III — Hedge Funds, PIPE Funds",
      "Minimum Investment — ₹1 Crore",
    ],
  },
  {
    icon: Globe,
    title: "GIFT City Funds",
    subtitle: "International financial hub investments",
    description: "GIFT City funds operate under the International Financial Services Centres Authority (IFSCA), not SEBI. The regulatory framework mirrors global financial hubs like Singapore and Dubai. Three things make GIFT City funds different: they are USD-denominated, there is no TDS on most transactions, and repatriation of capital and returns is fully simplified without standard FEMA complications.",
    highlights: [
      "USD-denominated investments",
      "No TDS on most transactions",
      "Simplified repatriation without FEMA complications",
      "Options include Mutual Funds, AIFs, PMS, REITs, and offshore fixed deposits",
    ],
  },
  {
    icon: Building2,
    title: "Corporate Fixed Deposits",
    subtitle: "Fixed-return term deposits from companies",
    description: "A Corporate Fixed Deposit (FD) is an investment instrument offered by companies, including Non-Banking Financial Companies (NBFCs), to borrow directly from the public. It is a term deposit where you lend a sum of money to a company for a fixed period at a predetermined, fixed rate of interest.",
    highlights: [
      "Higher interest rates compared to bank FDs",
      "Fixed tenure and predetermined returns",
      "Available from reputed NBFCs and corporates",
    ],
  },
  {
    icon: Shield,
    title: "Capital Gain Bonds (54EC)",
    subtitle: "Tax-saving bonds for long-term capital gains",
    description: "Capital Gain Bonds, officially known as Section 54EC Bonds, are issued by Public Sector Undertakings (PSUs) in India, designed to help taxpayers save on long-term capital gains tax. They function as a tax-saving mechanism under Section 54EC of the Income Tax Act, 1961.",
    highlights: [
      "Tax exemption on Long-Term Capital Gains from sale of land or building",
      "Mandatory 5-year lock-in period — non-transferable and non-negotiable",
      "Maximum investment of ₹50 Lakhs across all eligible bonds",
      "Issued by REC, IRFC, and PFC",
    ],
  },
  {
    icon: Heart,
    title: "Life Insurance",
    subtitle: "Secure what matters most",
    description: "Life is full of uncertainties. While we cannot predict the future, we can certainly prepare for it. Life Insurance is your family's financial safety net — a promise that the people you love will be taken care of, even in your absence. When you invest in a Life Insurance policy, you pay a regular premium and in return, the company guarantees a sum assured to your family.",
    highlights: [
      "Provide security to your family in your absence",
      "Protect home mortgage, loans, and credit card borrowings",
      "Finance your loved ones to achieve their goals",
      "Ensure your family can maintain their lifestyle, no matter what happens",
    ],
  },
];

function ProductCard({ product, idx }: { product: Product; idx: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = product.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: idx * 0.05 }}
      className="glass-card rounded-3xl border border-white/10 overflow-hidden"
    >
      <div className="p-8">
        <div className="flex items-start gap-5 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-[#F9A825]/20 flex items-center justify-center shrink-0">
            <Icon className="w-7 h-7 text-[#F9A825]" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-display font-semibold text-white">{product.title}</h3>
            <p className="text-[#F9A825]/80 text-sm font-medium mt-1">{product.subtitle}</p>
          </div>
        </div>

        <p className="text-slate-400 leading-relaxed mb-4">
          {expanded ? product.description : product.description.slice(0, 160) + "..."}
        </p>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4"
          >
            <h4 className="text-sm font-semibold text-white mb-3">Key Highlights</h4>
            <ul className="space-y-2">
              {product.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                  <ChevronRight className="w-4 h-4 text-[#F9A825] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 mt-4 text-sm font-medium text-[#F9A825] hover:text-[#FBAB1C] transition-colors"
        >
          {expanded ? "Show less" : "Learn more"}
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>
    </motion.div>
  );
}

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000"
            alt="Investment Services"
            className="w-full h-full object-cover opacity-20 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B132B] via-[#0B132B]/80 to-[#0B132B]" />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl mx-auto text-center">
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.1] mb-6 text-white">
              Our <span className="text-[#F9A825]">Products</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Comprehensive wealth management solutions across mutual funds, PMS, AIFs, GIFT City, insurance, and more — tailored to every investor's goals.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-[#1E40AF]/10 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, idx) => (
              <ProductCard key={idx} product={product} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#0B132B] relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
                Why Choose <span className="text-[#F9A825]">ACE WEALTH</span>
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#F9A825]/20 flex items-center justify-center shrink-0">
                    <Landmark className="text-[#F9A825] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Since 2007</h4>
                    <p className="text-slate-400">Navigating both bullish and bearish markets for over two decades, evolving into a stronger, more mature organization.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#F9A825]/20 flex items-center justify-center shrink-0">
                    <Globe className="text-[#F9A825] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">All Major AMCs & Beyond</h4>
                    <p className="text-slate-400">Distributors for all major Mutual Fund AMCs, leading AIF firms, PMS providers, and GIFT City products.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#F9A825]/20 flex items-center justify-center shrink-0">
                    <Shield className="text-[#F9A825] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Optimal Asset Allocation</h4>
                    <p className="text-slate-400">Our expertise builds portfolios aligned with your preferences, striking the ideal balance between risk and return.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000"
                alt="Expert Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] to-transparent opacity-60" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=2000"
            alt="Stock Market"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[#0B132B]/90" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="glass-card rounded-[3rem] p-10 md:p-16 text-center max-w-5xl mx-auto border-t-white/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F9A825]/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1E40AF]/30 rounded-full blur-[80px]" />

            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 relative z-10 text-white">
              Ready to explore the right product for you?
            </h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Whether you are in India or abroad, let's discuss how our comprehensive product range can help you build lasting wealth.
            </p>
            <Link href="/contact">
              <Button className="h-14 px-10 text-lg bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-bold shadow-xl transition-all hover:scale-105 relative z-10">
                Contact Us
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
