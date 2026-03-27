/**
 * Database seed script — run ONCE after `npm run db:push`
 * Usage: npx tsx script/seed.ts
 */
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { adminUsers, reviews } from "../shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set.");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

async function seed() {
  console.log("🌱 Seeding database…");

  // Admin user
  await db.insert(adminUsers).values({
    username: "admin",
    password: "admin123",
  }).onConflictDoNothing();
  console.log("✅ Admin user inserted (admin / admin123)");

  // 5 Authentic reviews
  const initialReviews = [
    {
      name: "Krishna Gifts",
      role: "Verified Client",
      content: "Ace Wealth has very well trained team who ensures all your investments are done properly. The best thing is, they provide goal based financial advice. Ace Wealth manages our portfolio since last 14-15 years and we are highly satisfied with their services.",
      rating: 5,
    },
    {
      name: "Chintan Shah",
      role: "Verified Client",
      content: "Parichay Shah's team is capable to handle your investment, no matter the size is. They do different types of risk analysis while selecting schemes for the client. For senior citizens they keep investment in low risk schemes. Had a chance to get help of this team for a senior citizen's portfolio.",
      rating: 5,
    },
    {
      name: "Anushka Mistry",
      role: "Verified Client",
      content: "ACE Wealth definitely earns a 5-star rating! Parichay uncle offered incredibly valuable advice on savvy investment strategies. I wholeheartedly recommend ACE Wealth to all.",
      rating: 5,
    },
    {
      name: "Malhar Patel",
      role: "Verified Client",
      content: "One stop solution for your financial solutions. mutual fund or insurance!! Parichaybhai has a solution for all your worries. He give you time, understand your need and guide you way forward. Highly recommended.",
      rating: 5,
    },
    {
      name: "Vikash Goyal",
      role: "Verified Client",
      content: "Best service and professional advise. I am client of Ace Wealth since over a decade and will continue for life. This is the trust they gain through service and right advise.",
      rating: 5,
    },
  ];

  for (const review of initialReviews) {
    await db.insert(reviews).values(review).onConflictDoNothing();
  }
  console.log("✅ 5 client reviews inserted");

  console.log("\n🎉 Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
