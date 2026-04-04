// Central API client — PHP + MySQL backend
// All endpoints resolve to /acewealth/demo/4/api/*.php

const API_BASE = '/acewealth/demo/4/api';

// ─── Internal Request Helper ──────────────────────────────────────────────────
async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  requiresAuth = false
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (requiresAuth) {
    const token = localStorage.getItem('ace_admin_token');
    if (token) headers['X-Admin-Token'] = token;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || err.message || 'Request failed');
  }
  return res.json() as Promise<T>;
}

// ─── Types ────────────────────────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;   // Maps from `image` column
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

// ─── Raw DB row mappers ───────────────────────────────────────────────────────
function mapBlog(raw: any): BlogPost {
  return {
    id:       String(raw.id),
    title:    raw.title,
    excerpt:  raw.excerpt,
    content:  raw.content,
    imageUrl: raw.image ?? '',
    date:     raw.date ?? '',
  };
}

function mapReview(raw: any): Testimonial {
  return {
    id:      String(raw.id),
    name:    raw.name,
    role:    raw.role ?? 'Verified Client',
    content: raw.content,
    rating:  Number(raw.rating) ?? 5,
  };
}

// ─── Image Upload ─────────────────────────────────────────────────────────────
export const uploadImage = async (file: File): Promise<string> => {
  const token = localStorage.getItem('ace_admin_token') ?? '';
  const form  = new FormData();
  form.append('image', file);

  const res = await fetch(`${API_BASE}/upload.php`, {
    method:  'POST',
    headers: { 'X-Admin-Token': token },
    body:    form,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Upload failed' }));
    throw new Error(err.error || 'Image upload failed');
  }

  const data = await res.json();
  return data.url as string;   // e.g. /acewealth/demo/4/uploads/img_xxx.jpg
};

// ─── Blog API ─────────────────────────────────────────────────────────────────
export const blogApi = {
  getAll: async (): Promise<BlogPost[]> => {
    const data = await request<any[]>('/blogs.php');
    return data.map(mapBlog);
  },

  getById: async (id: string): Promise<BlogPost | null> => {
    try {
      const raw = await request<any>(`/blogs.php?id=${id}`);
      return mapBlog(raw);
    } catch {
      return null;
    }
  },

  create: async (blog: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
    const raw = await request<any>('/blogs.php', {
      method: 'POST',
      body: JSON.stringify({
        title:   blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        image:   blog.imageUrl,
        date:    blog.date || new Date().toLocaleDateString('en-IN'),
      }),
    }, true);
    return mapBlog(raw);
  },

  update: async (blog: BlogPost): Promise<BlogPost> => {
    const raw = await request<any>(`/blogs.php?id=${blog.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title:   blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        image:   blog.imageUrl,
        date:    blog.date,
      }),
    }, true);
    return mapBlog(raw);
  },

  delete: async (id: string): Promise<void> => {
    await request(`/blogs.php?id=${id}`, { method: 'DELETE' }, true);
  },
};

// ─── Review API ───────────────────────────────────────────────────────────────
export const reviewApi = {
  getAll: async (): Promise<Testimonial[]> => {
    const data = await request<any[]>('/reviews.php');
    return data.map(mapReview);
  },

  create: async (review: Omit<Testimonial, 'id'>): Promise<Testimonial> => {
    const raw = await request<any>('/reviews.php', {
      method: 'POST',
      body: JSON.stringify({
        name:    review.name,
        role:    review.role,
        content: review.content,
        rating:  review.rating,
      }),
    }, true);
    return mapReview(raw);
  },

  update: async (review: Testimonial): Promise<Testimonial> => {
    const raw = await request<any>(`/reviews.php?id=${review.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name:    review.name,
        role:    review.role,
        content: review.content,
        rating:  review.rating,
      }),
    }, true);
    return mapReview(raw);
  },

  delete: async (id: string): Promise<void> => {
    await request(`/reviews.php?id=${id}`, { method: 'DELETE' }, true);
  },
};

// ─── Auth API ─────────────────────────────────────────────────────────────────
export const authApi = {
  login: async (username: string, password: string): Promise<void> => {
    const data = await request<{ token: string }>('/login.php', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    localStorage.setItem('ace_admin_token', data.token);
    localStorage.setItem('ace_admin_logged_in', 'true');
  },

  logout: () => {
    localStorage.removeItem('ace_admin_token');
    localStorage.removeItem('ace_admin_logged_in');
  },

  isLoggedIn: () => {
    return localStorage.getItem('ace_admin_logged_in') === 'true';
  },
};
