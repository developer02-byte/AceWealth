import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

import "dotenv/config";
import nodemailer from "nodemailer";

const mockPhpApiPlugin = () => ({
  name: 'mock-php-api',
  configureServer(server: any) {
    server.middlewares.use('/acewealth/demo/4/api/send_enquiry.php', async (req: any, res: any) => {
      if (req.method !== 'POST') return res.end();
      
      let body = '';
      req.on('data', (chunk: any) => { body += chunk.toString(); });
      req.on('end', async () => {
        try {
          const data = JSON.parse(body);
          
          // IMPLEMENTATION (NODEMAILER) strictly for testing purpose
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Same sender & receiver
            subject: "New Contact Form Submission",
            text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`
          });

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, message: "Testing email sent successfully" }));
        } catch (error) {
          console.error("Email Error:", error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, message: "Could not send email" }));
        }
      });
    });
  }
});

export default defineConfig({
  base: '/',
  plugins: [react(), mockPhpApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
});
