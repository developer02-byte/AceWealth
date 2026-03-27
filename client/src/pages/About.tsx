import { motion } from "framer-motion";
import { Link } from "wouter";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Target, Heart, TrendingUp, Users, ChevronRight } from "lucide-react";

export default function About() {
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
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 -z-10">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000" 
            alt="About ACE Wealth" 
            className="w-full h-full object-cover opacity-20 blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B132B] via-[#0B132B]/80 to-[#0B132B]" />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.1] mb-6 text-white">
              About <span className="text-[#FBAB1C]">ACE WEALTH</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              AMFI-Registered Mutual Fund Distributor dedicated to empowering investors through disciplined financial planning and wealth management.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Company Introduction Section */}
      <section className="py-24 bg-[#1E40AF]/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] mix-blend-luminosity z-0">
          <img 
            src="https://images.unsplash.com/photo-1579027989536-b7b38f175db7?auto=format&fit=crop&q=80&w=2000" 
            alt="Company Culture" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 md:p-14 rounded-3xl border border-white/10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-white">
                    Who We Are
                  </h2>
                  <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                    <p>
                      ACE Wealth is an AMFI-Registered Mutual Fund Distributor committed to helping young investors and NRIs build long-term wealth through structured, disciplined financial planning.
                    </p>
                    <p>
                      We believe that wealth creation isn't about chasing short-term returns or complex products. Instead, it's about understanding your unique life goals and creating a tailored investment strategy that aligns with them.
                    </p>
                    <p>
                      Our approach is rooted in transparency, process discipline, and genuine client commitment. We partner with you on your financial journey, helping you navigate market cycles and stay focused on what matters most.
                    </p>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] md:aspect-auto md:h-full max-h-[600px] border border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800" 
                    alt="Parichay Shah" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/80 to-transparent">
                    <h3 className="text-3xl font-display font-bold text-white mb-2">Parichay Shah</h3>
                    <p className="text-[#FBAB1C] font-semibold text-lg">Founder, ACE WEALTH</p>
                    <p className="text-slate-400 mt-2 text-sm">AMFI-Registered Mutual Fund Distributor</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 bg-[#0B132B] relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 rounded-3xl border border-white/10"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#FBAB1C]/20 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-[#FBAB1C]" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-white">Our Vision</h3>
              <p className="text-slate-300 leading-relaxed">
                To empower every investor with clear, structured financial guidance that transforms them into confident, long-term wealth builders aligned with their life's aspirations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 rounded-3xl border border-white/10"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#FBAB1C]/20 flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-[#FBAB1C]" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-white">Our Mission</h3>
              <p className="text-slate-300 leading-relaxed">
                To deliver disciplined, transparent, and personalized wealth management solutions that bridge the gap between financial dreams and reality through structured investing.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-24 bg-[#1E40AF]/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] mix-blend-luminosity z-0">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=2000" 
            alt="Data Analytics" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">
              Our <span className="text-[#FBAB1C]">Approach</span>
            </h2>
            <p className="text-slate-400 text-lg">
              We follow a disciplined, process-driven methodology rooted in proven investment principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {approaches.map((approach, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group"
              >
                <div className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 h-full border border-white/10">
                  <div className="text-5xl font-bold text-[#FBAB1C]/20 mb-4">{String(idx + 1).padStart(2, '0')}</div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-white">{approach.title}</h3>
                  <p className="text-slate-400 leading-relaxed">
                    {approach.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-[#0B132B] relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">
              Our Core <span className="text-[#FBAB1C]">Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-6"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FBAB1C]/20 flex items-center justify-center shrink-0">
                <TrendingUp className="text-[#FBAB1C] w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Discipline</h4>
                <p className="text-slate-400">Consistent, systematic approach to wealth building without deviating from the plan.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-6"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FBAB1C]/20 flex items-center justify-center shrink-0">
                <Users className="text-[#FBAB1C] w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Transparency</h4>
                <p className="text-slate-400">Open communication about strategies, fees, risks, and performance metrics.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex gap-6"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FBAB1C]/20 flex items-center justify-center shrink-0">
                <Heart className="text-[#FBAB1C] w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Client Focus</h4>
                <p className="text-slate-400">Your goals and interests are at the center of every decision we make.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex gap-6"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FBAB1C]/20 flex items-center justify-center shrink-0">
                <Target className="text-[#FBAB1C] w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Expertise</h4>
                <p className="text-slate-400">Deep knowledge and continuous learning to provide the best guidance.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FBAB1C]/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1E40AF]/30 rounded-full blur-[80px]" />
            
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 relative z-10 text-white">
              Let's build your financial future together
            </h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Join hundreds of satisfied investors who have aligned their wealth with their life goals.
            </p>
            <Link href="/contact">
              <Button className="h-14 px-10 text-lg bg-[#FBAB1C] text-black hover:bg-amber-500 rounded-full font-bold shadow-xl transition-all hover:scale-105 relative z-10">
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

const approaches = [
  {
    title: "Goal Alignment",
    description: "We start by understanding your unique life goals and financial aspirations before recommending any investment."
  },
  {
    title: "Risk Assessment",
    description: "We evaluate your risk tolerance and create strategies that balance growth with protection."
  },
  {
    title: "Structured Planning",
    description: "We develop comprehensive financial plans with clear milestones and regular review cycles."
  },
  {
    title: "Disciplined Execution",
    description: "We execute strategies systematically, staying focused on long-term objectives regardless of market noise."
  },
  {
    title: "Transparent Communication",
    description: "We keep you informed with regular updates and clear explanations of your portfolio performance."
  },
  {
    title: "Continuous Support",
    description: "We provide ongoing guidance and adjust strategies as your life circumstances and goals evolve."
  }
];
