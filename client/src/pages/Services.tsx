import { motion } from "framer-motion";
import { Link } from "wouter";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PieChart, Target, TrendingUp, Shield, Calculator, Globe, ChevronRight } from "lucide-react";

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
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 -z-10">
          <img 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=2000" 
            alt="Investment Services" 
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
              Our <span className="text-[#F9A825]">Services</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Comprehensive wealth management solutions tailored to help you achieve your financial goals through disciplined, structured investing.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 bg-[#1E40AF]/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] mix-blend-luminosity z-0">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=2000" 
            alt="Data Analytics" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group border border-white/10"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F9A825]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="w-7 h-7 text-[#F9A825]" />
                </div>
                <h3 className="text-xl font-display font-semibold mb-3 text-white">{service.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
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
                    <Target className="text-[#F9A825] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Expert Guidance</h4>
                    <p className="text-slate-400">AMFI-registered with deep expertise in structured mutual fund distribution and financial planning.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#F9A825]/20 flex items-center justify-center shrink-0">
                    <Shield className="text-[#F9A825] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Disciplined Approach</h4>
                    <p className="text-slate-400">Transparent, process-driven investment strategies focused on long-term wealth creation.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-[#F9A825]/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="text-[#F9A825] w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Proven Track Record</h4>
                    <p className="text-slate-400">Helping young and NRI investors build wealth while managing risk effectively.</p>
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
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F9A825]/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1E40AF]/30 rounded-full blur-[80px]" />
            
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 relative z-10 text-white">
              Ready to explore our services?
            </h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Let's discuss how our comprehensive wealth management services can help you build a stronger financial future.
            </p>
            <Link href="/contact">
              <Button className="h-14 px-10 text-lg bg-[#F9A825] text-black hover:bg-[#F7961A] rounded-full font-bold shadow-xl transition-all hover:scale-105 relative z-10">
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

const services = [
  {
    icon: PieChart,
    title: "Mutual Fund Advisory",
    description: "Expert guidance on selecting the right mutual funds aligned with your financial goals and risk profile."
  },
  {
    icon: TrendingUp,
    title: "SIP Planning",
    description: "Structured Systematic Investment Plans designed to build wealth consistently through disciplined investing."
  },
  {
    icon: Calculator,
    title: "Financial Planning",
    description: "Comprehensive financial planning services covering retirement, education, and life goals."
  },
  {
    icon: Shield,
    title: "Insurance Planning",
    description: "Integrated insurance solutions to protect your family and assets while building wealth."
  },
  {
    icon: Target,
    title: "Tax Planning",
    description: "Strategic tax optimization through tax-efficient investment and planning strategies."
  },
  {
    icon: Globe,
    title: "NRI Investment Assistance",
    description: "Specialized services for NRI investors focusing on regulatory compliance and growth opportunities."
  }
];
