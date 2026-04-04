import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Quote, Star } from "lucide-react";
import { reviewApi, Testimonial } from "@/lib/api";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ClientStories() {
  const [stories, setStories] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    reviewApi.getAll()
      .then(setStories)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Finance Background Overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=2000"
          alt="Wealth Solutions Background"
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
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-8 h-8 border-4 border-[#F5A623]/30 border-t-[#F5A623] rounded-full animate-spin" />
          </div>
        ) : stories.length === 0 ? (
          <p className="text-center text-slate-400 text-lg py-24">No client stories yet.</p>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <Carousel 
              opts={{ align: "start", loop: true }} 
              plugins={[
                Autoplay({
                  delay: 3000,
                  stopOnInteraction: false,
                  stopOnMouseEnter: true,
                }),
              ]}
              className="w-full relative"
            >
              <CarouselContent className="-ml-4 md:-ml-6">
                {stories.map((story, index) => (
                  <CarouselItem key={index} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/2">
                    <div className="h-full">
                      <div className="glass-card rounded-3xl p-8 md:p-10 h-full flex flex-col relative overflow-hidden group hover:border-[#F5A623]/30 transition-colors">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Quote className="w-24 h-24 text-white" />
                        </div>

                        <div className="relative z-10 flex-grow">
                          <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1E40AF] to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                              {story.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
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
                          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                            Rating:
                            <span className="flex text-[#F5A623]">
                              {[...Array(story.rating || 5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                              ))}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="flex items-center justify-center gap-4 mt-12">
                <CarouselPrevious className="static transform-none bg-white/10 hover:bg-primary hover:text-primary-foreground border-none text-white w-12 h-12" />
                <CarouselNext className="static transform-none bg-white/10 hover:bg-primary hover:text-primary-foreground border-none text-white w-12 h-12" />
              </div>
            </Carousel>
          </motion.div>
        )}
      </div>

      {/* Trust Section */}
      <div className="container mx-auto px-4 md:px-6 mt-32">
        <div className="bg-[#1E40AF]/10 border border-[#1E40AF]/30 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-display font-semibold mb-4 text-white">A relationship built on trust and process</h3>
          <p className="text-slate-400">
            We focus on understanding your unique situation — whether you're a young professional or an NRI — rather than pushing generic products. No investment return claims are made, as we prioritize long-term wealth journeys.
          </p>
        </div>
      </div>
    </div>
  );
}
