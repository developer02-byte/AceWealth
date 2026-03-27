export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

// Initial mock data
const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "1",
    title: "Tax Loss Harvesting: Turn Market Losses into Tax Savings",
    excerpt: "Learn how to use tax loss harvesting to offset your capital gains and reduce your overall tax liability, maximizing your after-tax returns.",
    content: "Tax loss harvesting is a strategy that involves selling an investment that is currently at a loss, to offset capital gains you have realized from other investments. This strategy can be particularly useful in volatile markets, allowing investors to minimize tax liabilities while keeping their overall investment strategy intact. By strategically timing your sales, you can maintain your portfolio's target allocation while significantly reducing the taxes you owe at the end of the year.",
    date: "March 2026",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80"
  },
  {
    id: "2",
    title: "Why You Need a Goal-Oriented Investment Plan",
    excerpt: "Chasing returns without a specific goal is a recipe for disaster. Discover why goal-based investing is the foundation of true wealth creation.",
    content: "Goal-oriented investing means aligning your investments with specific financial goals, such as buying a house, funding a child's education, or building a retirement corpus. Instead of simply chasing the highest possible returns—which often leads to unnecessary risk-taking—a goal-based approach ensures your risk profile and investment horizon are perfectly aligned. This structured method provides peace of mind and keeps you disciplined during market downturns.",
    date: "March 2026",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
  },
  {
    id: "3",
    title: "The Power of Compounding in Mutual Funds",
    excerpt: "Albert Einstein allegedly called compounding the 'eighth wonder of the world'. Here's how starting early can exponentially grow your portfolio.",
    content: "The principle of compounding is simple: you earn returns not only on your principal investment but also on the returns you've previously generated. When applied to mutual funds over long periods, this creates a snowball effect that can drastically increase your wealth. An investor who starts a Systematic Investment Plan (SIP) at age 25 will have a significantly larger corpus at retirement than someone who starts at 35, even if the latter invests much more monthly. Time in the market is more important than timing the market.",
    date: "February 2026",
    imageUrl: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80"
  },
  {
    id: "4",
    title: "Navigating Market Volatility as a New Investor",
    excerpt: "Market ups and downs are inevitable, but they shouldn't derail your financial plan. Read our guide on surviving and thriving during volatility.",
    content: "For new investors, a sudden stock market correction can be terrifying. However, volatility is a normal feature of the stock market, not a bug. Rapid price swings provide opportunities for disciplined investors to acquire quality units at lower NAVs through SIPs. The key is to avoid panic selling, stick to your asset allocation, and remember that historically, the market has recovered from every major downturn to reach new highs.",
    date: "February 2026",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80"
  },
  {
    id: "5",
    title: "Best SIP Strategies for the Long Term",
    excerpt: "Not all SIPs are created equal. Discover advanced SIP strategies like step-up SIPs to accelerate your journey to financial freedom.",
    content: "While a standard SIP is an excellent starting point, adding strategies like 'Step-Up SIPs' can dramatically alter your trajectory. A step-up SIP means increasing your monthly contribution by a fixed percentage (say 10%) every year in line with your salary increments. This small adjustment combats inflation and accelerates compounding, helping you reach your financial milestones years ahead of schedule without feeling a pinch in your lifestyle.",
    date: "January 2026",
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80"
  },
  {
    id: "6",
    title: "Debt vs Equity: Finding Your Ideal Asset Allocation",
    excerpt: "The holy grail of investing isn't finding the perfect stock, it's finding the perfect balance between risk and safety.",
    content: "Asset allocation is the process of deciding how to distribute your wealth across various asset classes like equity (stocks) and debt (bonds). Equity provides high growth potential but comes with volatility, while debt offers stability and regular income but lower long-term returns. The ideal allocation depends entirely on your age, risk tolerance, and time horizon. A well-diversified portfolio buffers against market shocks while still participating in economic growth.",
    date: "January 2026",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80"
  }
];

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Krishna Gifts",
    role: "Verified Client",
    content: "Ace Wealth has very well trained team who ensures all your investments are done properly. The best thing is, they provide goal based financial advice. Ace Wealth manages our portfolio since last 14-15 years and we are highly satisfied with their services.",
    rating: 5
  },
  {
    id: "2",
    name: "Chintan Shah",
    role: "Verified Client",
    content: "Parichay Shah's team is capable to handle your investment, no matter the size is. They do different types of risk analysis while selecting schemes for the client. For senior citizens they keep investment in low risk schemes. Had a chance to get help of this team for a senior citizen's portfolio.",
    rating: 5
  },
  {
    id: "3",
    name: "Anushka Mistry",
    role: "Verified Client",
    content: "ACE Wealth definitely earns a 5-star rating! Parichay uncle offered incredibly valuable advice on savvy investment strategies. I wholeheartedly recommend ACE Wealth to all.",
    rating: 5
  },
  {
    id: "4",
    name: "Malhar Patel",
    role: "Verified Client",
    content: "One stop solution for your financial solutions. mutual fund or insurance!! Parichaybhai has a solution for all your worries. He give you time, understand your need and guide you way forward. Highly recommended.",
    rating: 5
  },
  {
    id: "5",
    name: "Vikash Goyal",
    role: "Verified Client",
    content: "Best service and professional advise. I am client of Ace Wealth since over a decade and will continue for life. This is the trust they gain through service and right advise.",
    rating: 5
  }
];

export const mockDb = {
  // Blog operations
  getBlogs: (): BlogPost[] => {
    const data = localStorage.getItem("mock_blogs");
    if (!data || JSON.parse(data).length === 0) {
      if (INITIAL_BLOGS.length > 0) {
        localStorage.setItem("mock_blogs", JSON.stringify(INITIAL_BLOGS));
        return INITIAL_BLOGS;
      }
      return data ? JSON.parse(data) : [];
    }
    return JSON.parse(data);
  },
  getBlogById: (id: string): BlogPost | undefined => {
    return mockDb.getBlogs().find(b => b.id === id);
  },
  saveBlog: (blog: BlogPost) => {
    const blogs = mockDb.getBlogs();
    const index = blogs.findIndex(b => b.id === blog.id);
    if (index >= 0) {
      blogs[index] = blog;
    } else {
      blogs.push(blog);
    }
    localStorage.setItem("mock_blogs", JSON.stringify(blogs));
  },
  deleteBlog: (id: string) => {
    const blogs = mockDb.getBlogs().filter(b => b.id !== id);
    localStorage.setItem("mock_blogs", JSON.stringify(blogs));
  },

  // Testimonial operations
  getTestimonials: (): Testimonial[] => {
    const data = localStorage.getItem("mock_testimonials_v2");
    if (!data || JSON.parse(data).length === 0) {
      if (INITIAL_TESTIMONIALS.length > 0) {
        localStorage.setItem("mock_testimonials_v2", JSON.stringify(INITIAL_TESTIMONIALS));
        return INITIAL_TESTIMONIALS;
      }
      return data ? JSON.parse(data) : [];
    }
    return JSON.parse(data);
  },
  saveTestimonial: (testimonial: Testimonial) => {
    const items = mockDb.getTestimonials();
    const index = items.findIndex(t => t.id === testimonial.id);
    if (index >= 0) {
      items[index] = testimonial;
    } else {
      items.push(testimonial);
    }
    localStorage.setItem("mock_testimonials_v2", JSON.stringify(items));
  },
  deleteTestimonial: (id: string) => {
    const items = mockDb.getTestimonials().filter(t => t.id !== id);
    localStorage.setItem("mock_testimonials_v2", JSON.stringify(items));
  },

  // Auth Operations
  isAdminLoggedIn: () => {
    return localStorage.getItem("mock_admin_logged_in") === "true";
  },
  setAdminLoggedIn: (status: boolean) => {
    localStorage.setItem("mock_admin_logged_in", status ? "true" : "false");
  }
};
