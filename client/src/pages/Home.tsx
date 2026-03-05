import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, ShieldCheck, Target, ChevronRight } from "lucide-react";
import logoPng from "@assets/Final_Logo__1772693718308.png";

export default function Home() {
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
        {/* Finance Background Image with Overlay */}
        <div className="absolute inset-0 -z-10">
          <img 
            src="https://images.unsplash.com/photo-1611974717483-36319d69068b?auto=format&fit=crop&q=80&w=2000" 
            alt="Financial Charts" 
            className="w-full h-full object-cover opacity-20 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B132B] via-[#0B132B]/80 to-[#0B132B]" />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-2xl"
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-8">
                <img src={logoPng} alt="Ace Wealth Logo" className="h-16 md:h-20 w-auto" />
                <div className="flex flex-col">
                  <span className="text-3xl md:text-4xl font-bold font-display text-white tracking-wide leading-none">
                    ACE <span className="text-[#F5A623]">WEALTH</span>
                  </span>
                  <span className="text-[10px] md:text-[12px] text-muted-foreground uppercase tracking-widest mt-2 font-medium leading-none">
                    AMFI – Registered Mutual Fund Distributor
                  </span>
                </div>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.1] mb-6 text-white">
                Helping You Build <br />
                <span className="text-[#F5A623]">Long Term Wealth</span> <br />
                Through Mutual Funds.
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl leading-relaxed">
                As an AMFI-Registered Mutual Fund Distributor, we provide disciplined guidance to help align your investments with your long-term life goals.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button className="h-14 px-8 text-base bg-[#F5A623] text-black hover:bg-yellow-500 rounded-full font-semibold shadow-[0_0_20px_rgba(245,166,35,0.3)] hover:shadow-[0_0_30px_rgba(245,166,35,0.5)] transition-all">
                    Start Your Journey
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/stories">
                  <Button variant="outline" className="h-14 px-8 text-base bg-white/5 border-white/10 hover:bg-white/10 rounded-full font-semibold text-white backdrop-blur-md">
                    Read Client Stories
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:h-[600px] flex items-center justify-center"
            >
              {/* Premium fintech abstract representation */}
              <div className="relative w-full max-w-lg aspect-square">
                {/* 3D Glass Card 1 */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="absolute top-10 right-10 w-64 h-40 glass-card rounded-2xl p-6 z-20 flex flex-col justify-between border-t-white/20 border-l-white/20"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full bg-[#1E40AF]/40 flex items-center justify-center">
                      <BarChart3 className="text-blue-400 w-5 h-5" />
                    </div>
                    <span className="text-xs text-emerald-400 font-medium bg-emerald-400/10 px-2 py-1 rounded">Disciplined</span>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Approach</p>
                    <p className="text-xl font-display font-semibold text-white">Process Driven</p>
                  </div>
                </motion.div>

                {/* 3D Glass Card 2 */}
                <motion.div 
                  animate={{ y: [0, 20, 0] }}
                  transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-20 left-0 w-72 h-48 glass-card rounded-2xl p-6 z-30 flex flex-col justify-between border-t-white/20 border-l-white/20"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full bg-[#F5A623]/20 flex items-center justify-center">
                      <Target className="text-[#F5A623] w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Focus</p>
                    <p className="text-2xl font-display font-semibold text-white">Goal Alignment</p>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden">
                      <div className="w-3/4 h-full bg-gradient-to-r from-[#F5A623] to-yellow-300 rounded-full"></div>
                    </div>
                  </div>
                </motion.div>

                {/* Background decorative image */}
                <img 
                  src="https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&q=80" 
                  alt="Abstract Data Concept" 
                  className="absolute inset-0 w-full h-full object-cover rounded-full opacity-40 mix-blend-screen mask-image-radial blur-[2px]"
                  style={{ maskImage: 'radial-gradient(circle, black 40%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 70%)' }}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* About Section with Background Image */}
      <section className="py-24 bg-[#080E20] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 blur-sm -z-10">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=2000" 
            alt="Data Analytics" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              About <span className="text-[#F5A623]">ACE WEALTH</span>
            </h2>
            <p className="text-slate-400 text-lg">
              We believe in creating enduring value through structural processes, distinct risk management, and long-term vision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#1E40AF]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-[#F5A623]" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Background Image */}
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
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5A623]/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1E40AF]/30 rounded-full blur-[80px]" />
            
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 relative z-10">
              Ready to take control of your financial journey?
            </h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Connect with Parichay Shah today to discuss how structured mutual fund distribution can align with your life goals.
            </p>
            <Link href="/contact">
              <Button className="h-14 px-10 text-lg bg-[#F5A623] text-black hover:bg-yellow-500 rounded-full font-bold shadow-xl transition-all hover:scale-105 relative z-10">
                Contact Parichay
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: Target,
    title: "Goal-Oriented Approach",
    description: "We don't chase arbitrary returns. We map distinct financial strategies to your specific life milestones and aspirations."
  },
  {
    icon: ShieldCheck,
    title: "Risk-Aware Structuring",
    description: "Understanding that all investments carry risk, we focus on appropriate asset allocation that matches your distinct risk appetite."
  },
  {
    icon: BarChart3,
    title: "Long-Term Discipline",
    description: "Wealth is rarely built overnight. We encourage patient, disciplined investing to navigate through market cycles effectively."
  }
];
