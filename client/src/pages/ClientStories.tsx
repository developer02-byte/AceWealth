import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ClientStories() {
  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Finance Background Overlay */}
      <div className="absolute inset-0 -z-10">
        <img 
          src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=2000" 
          alt="Wealth Management Background" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B132B] via-transparent to-[#0B132B]" />
      </div>

      {/* Header */}
      <div className="container mx-auto px-4 md:px-6 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#F5A623] font-semibold tracking-wider uppercase text-sm mb-4 block">
            Investor Journeys
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">
            Client <span className="text-[#F5A623]">Stories</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Discover how a structured, disciplined approach to mutual fund investing has helped our young and NRI clients find alignment with their life goals.
          </p>
        </motion.div>
      </div>

      {/* Carousel Section */}
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {stories.map((story, index) => (
                <CarouselItem key={index} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/2">
                  <div className="h-full">
                    <div className="glass-card rounded-3xl p-8 md:p-10 h-full flex flex-col relative overflow-hidden group hover:border-[#F5A623]/30 transition-colors">
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Quote className="w-24 h-24 text-white" />
                      </div>
                      
                      <div className="relative z-10 flex-grow">
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1E40AF] to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                            {story.initials}
                          </div>
                          <div>
                            <h4 className="font-display font-semibold text-lg text-white">{story.name}</h4>
                            <p className="text-sm text-[#F5A623]">{story.role}</p>
                          </div>
                        </div>
                        
                        <p className="text-slate-300 leading-relaxed text-lg italic">
                          "{story.content}"
                        </p>
                      </div>
                      
                      <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                          Focus Area: {story.focus}
                        </span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="flex items-center justify-center gap-4 mt-12">
              <CarouselPrevious className="static transform-none bg-white/10 hover:bg-[#F5A623] hover:text-[#0B132B] border-none text-white w-12 h-12" />
              <CarouselNext className="static transform-none bg-white/10 hover:bg-[#F5A623] hover:text-[#0B132B] border-none text-white w-12 h-12" />
            </div>
          </Carousel>
        </motion.div>
      </div>

      {/* Trust Section */}
      <div className="container mx-auto px-4 md:px-6 mt-32">
        <div className="bg-[#1E40AF]/10 border border-[#1E40AF]/30 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-display font-semibold mb-4 text-white">A relationship built on trust and process</h3>
          <p className="text-slate-400">
            We focus on understanding your unique situation—whether you're a young professional or an NRI—rather than pushing generic products. No investment return claims are made, as we prioritize long-term wealth journeys.
          </p>
        </div>
      </div>
    </div>
  );
}

const stories = [
  {
    initials: "AK",
    name: "Arvind K.",
    role: "NRI Investor",
    content: "Parichay's approach is refreshingly process-driven. As an NRI, navigating Indian regulations was tough, but the focus has entirely been on aligning my portfolio with my retirement timeline back home.",
    focus: "NRI Wealth Planning"
  },
  {
    initials: "MR",
    name: "Meera R.",
    role: "IT Professional",
    content: "What stood out to me about Ace Wealth was their emphasis on risk management. They helped me understand my actual risk appetite and structured a mutual fund portfolio that lets me sleep peacefully at night.",
    focus: "Young Professional SIP"
  },
  {
    initials: "SD",
    name: "Sanjay D.",
    role: "Medical Practitioner",
    content: "My busy schedule left me with no time to manage finances systematically. Ace Wealth provided a disciplined framework that automated my investments towards my children's education goals.",
    focus: "Goal-based Investing"
  },
  {
    initials: "VT",
    name: "Vikram T.",
    role: "Corporate Executive",
    content: "The transparency is what I appreciate the most. Every scheme document is explained, the risks are highlighted upfront, and there are absolutely no false promises. It's proper, ethical wealth distribution.",
    focus: "Long-term Wealth Creation"
  }
];
