import { Testimonial } from "@/lib/api";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="glass-card p-8 rounded-3xl relative h-full flex flex-col">
      <div className="text-primary text-5xl font-display font-bold leading-none mb-4 absolute top-6 left-6 opacity-30">"</div>
      
      <div className="relative z-10 pt-6 flex flex-col flex-grow">
        <p className="text-foreground text-lg italic mb-6 flex-grow">"{testimonial.content}"</p>
        
        <div className="mt-auto">
          <div className="flex items-center gap-4 border-t border-border pt-6">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl shrink-0 border border-primary/30 shadow-inner">
              {testimonial.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="font-bold text-foreground font-display line-clamp-1">{testimonial.name}</h4>
              <span className="text-sm text-muted-foreground line-clamp-1">{testimonial.role}</span>
            </div>
          </div>
          <div className="flex gap-1 mt-4 pl-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-base leading-none ${i < testimonial.rating ? "text-primary drop-shadow-[0_0_8px_rgba(249,168,37,0.5)]" : "text-muted-foreground/30"}`}>
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
