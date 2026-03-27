import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { blogApi, reviewApi, authApi, uploadImage, BlogPost, Testimonial } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, ImageOff, X } from "lucide-react";

const MAX_FILE_SIZE_MB = 2;

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeTab, setActiveTab] = useState<"blogs" | "testimonials">("blogs");

  // Blog form
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [pendingImageFile, setPendingImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [blogLoading, setBlogLoading] = useState(false);

  // Testimonial form
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    if (!authApi.isLoggedIn()) {
      setLocation("/login");
      return;
    }
    loadData();
  }, [setLocation]);

  const loadData = async () => {
    try {
      const [b, r] = await Promise.all([blogApi.getAll(), reviewApi.getAll()]);
      setBlogs(b);
      setTestimonials(r);
    } catch (err) {
      console.error("Failed to load data:", err);
    }
  };

  const handleLogout = () => {
    authApi.logout();
    setLocation("/login");
  };

  // ── Image upload ─────────────────────────────────────────────────────────
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setImageError("Only JPG, PNG, or WebP images are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image must be under 5MB.");
      return;
    }

    setImageError(null);
    setPendingImageFile(file);

    // Show local preview immediately without waiting for upload
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImagePreview(null);
    setPendingImageFile(null);
    setEditingBlog(prev => ({ ...(prev || {}), imageUrl: "" } as BlogPost));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleEditBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setImagePreview(blog.imageUrl || null);
    setPendingImageFile(null);
    setImageError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCancelBlog = () => {
    setEditingBlog(null);
    setImagePreview(null);
    setPendingImageFile(null);
    setImageError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── Save / Delete Blog ───────────────────────────────────────────────────
  const saveBlog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingBlog) return;
    setBlogLoading(true);
    try {
      let imageUrl = editingBlog.imageUrl ?? "";

      // If a new image file was selected, upload it first
      if (pendingImageFile) {
        setImageUploading(true);
        try {
          imageUrl = await uploadImage(pendingImageFile);
        } catch (uploadErr: any) {
          setImageError(uploadErr.message || "Image upload failed");
          setBlogLoading(false);
          setImageUploading(false);
          return;
        }
        setImageUploading(false);
      }

      const blogWithImage = { ...editingBlog, imageUrl };

      if (editingBlog.id) {
        await blogApi.update(blogWithImage);
      } else {
        await blogApi.create({
          title:    blogWithImage.title,
          excerpt:  blogWithImage.excerpt,
          content:  blogWithImage.content,
          imageUrl: blogWithImage.imageUrl,
          date:     blogWithImage.date || new Date().toLocaleDateString("en-IN"),
        });
      }
      handleCancelBlog();
      await loadData();
    } catch (err) {
      alert("Failed to save blog. Please try again.");
    } finally {
      setBlogLoading(false);
    }
  };

  const deleteBlog = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await blogApi.delete(id);
      await loadData();
    } catch {
      alert("Failed to delete blog.");
    }
  };

  // ── Save / Delete Review ─────────────────────────────────────────────────
  const saveTestimonial = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingTestimonial) return;
    setReviewLoading(true);
    try {
      if (editingTestimonial.id) {
        await reviewApi.update(editingTestimonial);
      } else {
        await reviewApi.create({
          name: editingTestimonial.name,
          role: editingTestimonial.role ?? "Verified Client",
          content: editingTestimonial.content,
          rating: editingTestimonial.rating ?? 5,
        });
      }
      setEditingTestimonial(null);
      await loadData();
    } catch {
      alert("Failed to save review. Please try again.");
    } finally {
      setReviewLoading(false);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await reviewApi.delete(id);
      await loadData();
    } catch {
      alert("Failed to delete review.");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col items-center relative overflow-hidden">
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-800/10 blur-[150px] -z-10" />
      <div className="container max-w-6xl px-4 md:px-6 relative z-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-display font-bold text-foreground">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline" className="text-foreground">Logout</Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-border pb-4">
          <Button
            variant={activeTab === "blogs" ? "default" : "outline"}
            onClick={() => setActiveTab("blogs")}
            className={activeTab === "blogs" ? "bg-primary text-primary-foreground" : "text-foreground"}
          >
            Manage Blogs
          </Button>
          <Button
            variant={activeTab === "testimonials" ? "default" : "outline"}
            onClick={() => setActiveTab("testimonials")}
            className={activeTab === "testimonials" ? "bg-primary text-primary-foreground" : "text-foreground"}
          >
            Manage Reviews
          </Button>
        </div>

        {/* ── Blog Management ─────────────────────────────────────────────── */}
        {activeTab === "blogs" && (
          <div className="space-y-8">
            <div className="glass-card p-6 rounded-2xl w-full">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                {editingBlog?.id ? "Edit Blog" : "Create New Blog"}
              </h2>
              <form className="space-y-4" onSubmit={saveBlog}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Blog Title <span className="text-red-500">*</span></label>
                  <Input
                    placeholder="Enter a descriptive title for your blog post"
                    value={editingBlog?.title || ""}
                    onChange={e => setEditingBlog(prev => ({ ...(prev || {}), title: e.target.value } as BlogPost))}
                    required
                    className="bg-background/50 border-border text-foreground py-6 text-lg"
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Blog Image (JPG / PNG / WebP, max 2MB) <span className="text-red-500">*</span></label>
                  {imagePreview ? (
                    <div className="relative w-full h-44 rounded-xl overflow-hidden border border-border bg-black/20">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={clearImage}
                        className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="blog-image-upload"
                      className="flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed border-border hover:border-primary/60 cursor-pointer bg-transparent transition-colors group"
                    >
                      <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary mb-2 transition-colors" />
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Click to upload image</span>
                      <span className="text-xs text-muted-foreground mt-1">JPG, PNG, WebP — max 2MB</span>
                    </label>
                  )}
                  <input
                    id="blog-image-upload"
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  {imageError && <p className="text-red-500 text-sm font-medium">{imageError}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Short Excerpt <span className="text-red-500">*</span></label>
                  <Textarea
                    placeholder="Write a brief summary or introduction for the blog..."
                    value={editingBlog?.excerpt || ""}
                    onChange={e => setEditingBlog(prev => ({ ...(prev || {}), excerpt: e.target.value } as BlogPost))}
                    required
                    className="bg-background/50 border-border text-foreground resize-y text-base min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Full Content <span className="text-red-500">*</span></label>
                  <Textarea
                    placeholder="Write your complete blog post content here..."
                    value={editingBlog?.content || ""}
                    onChange={e => setEditingBlog(prev => ({ ...(prev || {}), content: e.target.value } as BlogPost))}
                    required
                    className="bg-background/50 border-border text-foreground resize-y text-base min-h-[200px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Date (Optional)</label>
                  <Input
                    type="text"
                    placeholder="e.g. March 25, 2026"
                    value={editingBlog?.date || ""}
                    onChange={e => setEditingBlog(prev => ({ ...(prev || {}), date: e.target.value } as BlogPost))}
                    className="bg-background/50 border-border text-foreground py-6 text-lg"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <Button type="submit" disabled={blogLoading} className="bg-primary text-primary-foreground">
                    {blogLoading ? "Saving…" : "Save Blog"}
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancelBlog} className="text-foreground">
                    Clear / Cancel
                  </Button>
                </div>
              </form>
            </div>

            <div className={`grid gap-6 ${
              blogs.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
              blogs.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' :
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {blogs.map(blog => (
                <div key={blog.id} className="glass-card p-6 rounded-2xl flex flex-col shadow-lg border border-border">
                  <div className="mb-4 h-40 rounded-xl overflow-hidden bg-slate-900 border border-white/10 flex items-center justify-center">
                    {blog.imageUrl ? (
                      <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
                    ) : (
                      <ImageOff className="w-10 h-10 text-slate-600" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">{blog.title}</h3>
                  <p className="text-sm text-foreground mb-4 line-clamp-3">{blog.excerpt}</p>
                  <div className="mt-auto flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditBlog(blog)} className="text-foreground border-border w-1/2">Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteBlog(blog.id)} className="w-1/2">Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Testimonials Management ──────────────────────────────────────── */}
        {activeTab === "testimonials" && (
          <div className="space-y-8">
            <div className="glass-card p-6 rounded-2xl w-full">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                {editingTestimonial?.id ? "Edit Review" : "Add Review"}
              </h2>
              <form className="space-y-4" onSubmit={saveTestimonial}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Client Name <span className="text-red-500">*</span></label>
                  <Input
                    placeholder="Enter the client's full name"
                    value={editingTestimonial?.name || ""}
                    onChange={e => setEditingTestimonial(prev => ({ ...(prev || {}), name: e.target.value } as Testimonial))}
                    required
                    className="bg-background/50 border-border text-foreground py-6 text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Role / Title</label>
                  <Input
                    placeholder="e.g. CEO of TechCorp or Verified Client"
                    value={editingTestimonial?.role || ""}
                    onChange={e => setEditingTestimonial(prev => ({ ...(prev || {}), role: e.target.value } as Testimonial))}
                    className="bg-background/50 border-border text-foreground py-6 text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Rating (1 to 5) <span className="text-red-500">*</span></label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    placeholder="Enter rating (1-5)"
                    value={editingTestimonial?.rating || 5}
                    onChange={e => setEditingTestimonial(prev => ({ ...(prev || {}), rating: parseInt(e.target.value) } as Testimonial))}
                    className="bg-background/50 border-border text-foreground py-6 text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Review Content <span className="text-red-500">*</span></label>
                  <Textarea
                    placeholder="Enter the client's full review or testimonial here..."
                    value={editingTestimonial?.content || ""}
                    onChange={e => setEditingTestimonial(prev => ({ ...(prev || {}), content: e.target.value } as Testimonial))}
                    required
                    className="bg-background/50 border-border text-foreground resize-y text-base min-h-[150px]"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <Button type="submit" disabled={reviewLoading} className="bg-primary text-primary-foreground">
                    {reviewLoading ? "Saving…" : "Save Review"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setEditingTestimonial(null)} className="text-foreground">
                    Clear / Cancel
                  </Button>
                </div>
              </form>
            </div>

            <div className={`grid gap-6 ${
              testimonials.length === 1 ? 'grid-cols-1 max-w-md mx-auto' :
              testimonials.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' :
              'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {testimonials.map(t => (
                <div key={t.id} className="glass-card p-6 rounded-2xl flex flex-col shadow-lg border border-border">
                  <h3 className="text-lg font-bold text-foreground">{t.name} <span className="text-sm font-normal text-muted-foreground ml-2">({t.role})</span></h3>
                  <div className="text-primary mb-2">{"★".repeat(t.rating) + "☆".repeat(5 - t.rating)}</div>
                  <p className="text-sm text-foreground mb-4 italic">"{t.content}"</p>
                  <div className="mt-auto flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingTestimonial(t)} className="text-foreground border-border w-1/2">Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteTestimonial(t.id)} className="w-1/2">Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
