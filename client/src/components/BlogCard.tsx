import { BlogPost } from "@/lib/api";
import { Link } from "wouter";
import { ArrowRight, ImageOff } from "lucide-react";
import { useState } from "react";

export function BlogCard({ blog }: { blog: BlogPost }) {
  const [imgError, setImgError] = useState(false);

  const fallbackImage = "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800";
  const validImageUrl = blog.imageUrl && blog.imageUrl.trim() !== "" ? blog.imageUrl : fallbackImage;

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col h-full transition-all hover:-translate-y-2 hover:shadow-xl group">
      <div className="relative h-48 overflow-hidden bg-slate-900 border-b border-white/10 flex items-center justify-center">
        {!imgError ? (
          <img 
            src={validImageUrl} 
            alt={blog.title} 
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 rounded-none bg-black/40">
            <ImageOff className="w-12 h-12 text-slate-500" />
          </div>
        )}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-medium">
          {blog.date}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-display font-bold text-foreground mb-3">{blog.title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
          {blog.excerpt}
        </p>
        <Link href={`/blog/${blog.id}`} className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors mt-auto">
          Read Article <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
