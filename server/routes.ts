import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { db } from "./db";
import { blogs, reviews, adminUsers, insertBlogSchema, insertReviewSchema } from "@shared/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ── Contact ───────────────────────────────────────────────────────────────
  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  // ── Blogs ─────────────────────────────────────────────────────────────────
  app.get("/api/blogs", async (_req, res) => {
    try {
      const all = await db.select().from(blogs).orderBy(blogs.createdAt);
      res.json(all);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch blogs" });
    }
  });

  app.post("/api/blogs", async (req, res) => {
    try {
      const data = insertBlogSchema.parse(req.body);
      const [created] = await db.insert(blogs).values(data).returning();
      res.status(201).json(created);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      console.error(err);
      res.status(500).json({ message: "Failed to create blog" });
    }
  });

  app.put("/api/blogs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = insertBlogSchema.partial().parse(req.body);
      const [updated] = await db.update(blogs).set({ ...data, updatedAt: new Date() }).where(eq(blogs.id, id)).returning();
      if (!updated) return res.status(404).json({ message: "Blog not found" });
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      console.error(err);
      res.status(500).json({ message: "Failed to update blog" });
    }
  });

  app.delete("/api/blogs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await db.delete(blogs).where(eq(blogs.id, id));
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to delete blog" });
    }
  });

  // ── Reviews ───────────────────────────────────────────────────────────────
  app.get("/api/reviews", async (_req, res) => {
    try {
      const all = await db.select().from(reviews).orderBy(reviews.createdAt);
      res.json(all);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const data = insertReviewSchema.parse(req.body);
      const [created] = await db.insert(reviews).values(data).returning();
      res.status(201).json(created);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      console.error(err);
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  app.put("/api/reviews/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const data = insertReviewSchema.partial().parse(req.body);
      const [updated] = await db.update(reviews).set(data).where(eq(reviews.id, id)).returning();
      if (!updated) return res.status(404).json({ message: "Review not found" });
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      console.error(err);
      res.status(500).json({ message: "Failed to update review" });
    }
  });

  app.delete("/api/reviews/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await db.delete(reviews).where(eq(reviews.id, id));
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to delete review" });
    }
  });

  // ── Admin Auth ────────────────────────────────────────────────────────────
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body as { username: string; password: string };
      if (!username || !password) return res.status(400).json({ message: "Username and password required" });

      const [admin] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
      if (!admin || admin.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      res.json({ success: true, message: "Login successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Login failed" });
    }
  });

  return httpServer;
}