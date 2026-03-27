import { useState, useEffect } from "react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { blogApi, BlogPost } from "@/lib/api";
import { ArrowLeft, Calendar, ImageOff } from "lucide-react";

export default function BlogPostView() {
  const [, params] = useRoute("/blog/:id");
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (params?.id) {
      blogApi.getById(params.id)
        .then(setBlog)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center bg-background">
        <h1 className="text-3xl font-display font-bold text-foreground mb-4">Blog Not Found</h1>
        <Link href="/blog" className="text-primary hover:underline flex items-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blogs
        </Link>
      </div>
    );
  }

  const validImageUrl = blog.imageUrl && blog.imageUrl.trim() !== "" ? blog.imageUrl : null;

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-800/10 blur-[150px] -z-10" />
      <article className="container max-w-4xl mx-auto px-4 md:px-6">
        <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 text-sm font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to all articles
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center text-primary text-sm font-medium mb-4">
            <Calendar className="w-4 h-4 mr-2" /> {blog.date}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-8 leading-tight">
            {blog.title}
          </h1>

          <div className="rounded-3xl overflow-hidden mb-12 aspect-[21/9] shadow-2xl relative flex items-center justify-center bg-slate-900 border border-white/10">
            {validImageUrl && !imgError ? (
              <img
                src={validImageUrl}
                alt={blog.title}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-black/40">
                <ImageOff className="w-20 h-20 text-slate-500" />
              </div>
            )}
          </div>

          <div className="prose prose-lg dark:prose-invert prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground mx-auto">
            <p className="text-xl md:text-2xl font-medium text-foreground mb-8 italic border-l-4 border-primary pl-6">
              {blog.excerpt}
            </p>
            <div className="whitespace-pre-line text-lg leading-relaxed text-muted-foreground">
              {blog.content}
            </div>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
