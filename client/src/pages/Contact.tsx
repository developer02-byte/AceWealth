import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { useCreateContactMessage } from "@/hooks/use-contact";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const { mutate: sendMessage, isPending } = useCreateContactMessage();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(data: InsertContactMessage) {
    sendMessage(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  }

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#F5A623]/5 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#1E40AF]/10 blur-[150px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex flex-col justify-center"
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Get in <span className="text-[#F5A623]">Touch</span>
              </h1>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                Whether you're looking to start your investment journey or need a second opinion on your current portfolio, we're here to help structure your wealth correctly.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <MapPin className="text-[#F5A623] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Office Location</h4>
                    <p className="text-slate-400">Ace Wealth Advisory<br/>Contact for appointment</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <Phone className="text-[#F5A623] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Phone</h4>
                    <p className="text-slate-400">Parichay Shah<br/>
                      <a href="tel:+919825071613" className="hover:text-[#F5A623] transition-colors">+91 98250 71613</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <Mail className="text-[#F5A623] w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <a href="mailto:parichay@acewealth.co.in" className="text-slate-400 hover:text-[#F5A623] transition-colors">
                      parichay@acewealth.co.in
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="glass-card rounded-3xl p-8 md:p-10 border-t-white/20 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F5A623]/10 rounded-full blur-[40px]" />
                
                <h3 className="text-2xl font-display font-semibold mb-6">Send us a message</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John Doe" 
                                className="bg-black/20 border-white/10 focus:border-[#F5A623]/50 focus:ring-[#F5A623]/20 text-white rounded-xl h-12"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Phone Number</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="+91 98765 43210" 
                                className="bg-black/20 border-white/10 focus:border-[#F5A623]/50 focus:ring-[#F5A623]/20 text-white rounded-xl h-12"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-red-400" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="john@example.com" 
                              type="email"
                              className="bg-black/20 border-white/10 focus:border-[#F5A623]/50 focus:ring-[#F5A623]/20 text-white rounded-xl h-12"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">How can we help you?</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="I would like to discuss..." 
                              className="bg-black/20 border-white/10 focus:border-[#F5A623]/50 focus:ring-[#F5A623]/20 text-white rounded-xl min-h-[120px] resize-y"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      disabled={isPending}
                      className="w-full h-14 bg-[#F5A623] hover:bg-yellow-500 text-black font-bold text-lg rounded-xl shadow-[0_0_15px_rgba(245,166,35,0.2)] transition-all"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}
