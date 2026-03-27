-- ─────────────────────────────────────────────────────────────────────────────
-- AceWealth Demo 3 — MySQL Database Setup
-- Run this entire script in phpMyAdmin → SQL tab
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS `blogs` (
  `id`         INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title`      VARCHAR(500) NOT NULL,
  `excerpt`    TEXT         NOT NULL,
  `content`    LONGTEXT     NOT NULL,
  `image`      TEXT         DEFAULT NULL COMMENT 'Relative URL: /acewealth/demo/3/uploads/filename.jpg',
  `date`       VARCHAR(100) NOT NULL DEFAULT '',
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `reviews` (
  `id`         INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name`       VARCHAR(255) NOT NULL,
  `role`       VARCHAR(255) NOT NULL DEFAULT 'Verified Client',
  `content`    TEXT         NOT NULL,
  `rating`     INT          NOT NULL DEFAULT 5 CHECK (`rating` BETWEEN 1 AND 5),
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `admin_users` (
  `id`         INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username`   VARCHAR(100) NOT NULL UNIQUE,
  `password`   VARCHAR(255) NOT NULL COMMENT 'Plain text for now; use bcrypt hash in production',
  `created_at` DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ─── Default Admin User ───────────────────────────────────────────────────────
-- Username: admin | Password: admin123
INSERT IGNORE INTO `admin_users` (`username`, `password`) VALUES ('admin', 'admin123');

-- ─── Seed Initial Blogs ─────────────────────────────────────────────────────────
INSERT INTO `blogs` (`title`, `excerpt`, `content`, `image`, `date`) VALUES
('Tax Loss Harvesting: Turn Market Losses into Tax Savings', 'Learn how to use tax loss harvesting to offset your capital gains and reduce your overall tax liability, maximizing your after-tax returns.', 'Tax loss harvesting is a strategy that involves selling an investment that is currently at a loss, to offset capital gains you have realized from other investments. This strategy can be particularly useful in volatile markets, allowing investors to minimize tax liabilities while keeping their overall investment strategy intact. By strategically timing your sales, you can maintain your portfolio''s target allocation while significantly reducing the taxes you owe at the end of the year.', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80', 'March 2026'),
('Why You Need a Goal-Oriented Investment Plan', 'Chasing returns without a specific goal is a recipe for disaster. Discover why goal-based investing is the foundation of true wealth creation.', 'Goal-oriented investing means aligning your investments with specific financial goals, such as buying a house, funding a child''s education, or building a retirement corpus. Instead of simply chasing the highest possible returns—which often leads to unnecessary risk-taking—a goal-based approach ensures your risk profile and investment horizon are perfectly aligned. This structured method provides peace of mind and keeps you disciplined during market downturns.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', 'March 2026'),
('The Power of Compounding in Mutual Funds', 'Albert Einstein allegedly called compounding the ''eighth wonder of the world''. Here''s how starting early can exponentially grow your portfolio.', 'The principle of compounding is simple: you earn returns not only on your principal investment but also on the returns you''ve previously generated. When applied to mutual funds over long periods, this creates a snowball effect that can drastically increase your wealth. An investor who starts a Systematic Investment Plan (SIP) at age 25 will have a significantly larger corpus at retirement than someone who starts at 35, even if the latter invests much more monthly. Time in the market is more important than timing the market.', 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80', 'February 2026'),
('Navigating Market Volatility as a New Investor', 'Market ups and downs are inevitable, but they shouldn''t derail your financial plan. Read our guide on surviving and thriving during volatility.', 'For new investors, a sudden stock market correction can be terrifying. However, volatility is a normal feature of the stock market, not a bug. Rapid price swings provide opportunities for disciplined investors to acquire quality units at lower NAVs through SIPs. The key is to avoid panic selling, stick to your asset allocation, and remember that historically, the market has recovered from every major downturn to reach new highs.', 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80', 'February 2026'),
('Best SIP Strategies for the Long Term', 'Not all SIPs are created equal. Discover advanced SIP strategies like step-up SIPs to accelerate your journey to financial freedom.', 'While a standard SIP is an excellent starting point, adding strategies like ''Step-Up SIPs'' can dramatically alter your trajectory. A step-up SIP means increasing your monthly contribution by a fixed percentage (say 10%) every year in line with your salary increments. This small adjustment combats inflation and accelerates compounding, helping you reach your financial milestones years ahead of schedule without feeling a pinch in your lifestyle.', 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80', 'January 2026'),
('Debt vs Equity: Finding Your Ideal Asset Allocation', 'The holy grail of investing isn''t finding the perfect stock, it''s finding the perfect balance between risk and safety.', 'Asset allocation is the process of deciding how to distribute your wealth across various asset classes like equity (stocks) and debt (bonds). Equity provides high growth potential but comes with volatility, while debt offers stability and regular income but lower long-term returns. The ideal allocation depends entirely on your age, risk tolerance, and time horizon. A well-diversified portfolio buffers against market shocks while still participating in economic growth.', 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80', 'January 2026');

-- ─── Seed Initial Reviews ─────────────────────────────────────────────────────
INSERT IGNORE INTO `reviews` (`id`, `name`, `role`, `content`, `rating`) VALUES
(1, 'Krishna Gifts',  'Verified Client', 'Ace Wealth has very well trained team who ensures all your investments are done properly. The best thing is, they provide goal based financial advice. Ace Wealth manages our portfolio since last 14-15 years and we are highly satisfied with their services.', 5),
(2, 'Chintan Shah',   'Verified Client', 'Parichay Shah''s team is capable to handle your investment, no matter the size is. They do different types of risk analysis while selecting schemes for the client. For senior citizens they keep investment in low risk schemes. Had a chance to get help of this team for a senior citizen''s portfolio.', 5),
(3, 'Anushka Mistry', 'Verified Client', 'ACE Wealth definitely earns a 5-star rating! Parichay uncle offered incredibly valuable advice on savvy investment strategies. I wholeheartedly recommend ACE Wealth to all.', 5),
(4, 'Malhar Patel',   'Verified Client', 'One stop solution for your financial solutions. mutual fund or insurance!! Parichaybhai has a solution for all your worries. He give you time, understand your need and guide you way forward. Highly recommended.', 5),
(5, 'Vikash Goyal',   'Verified Client', 'Best service and professional advise. I am client of Ace Wealth since over a decade and will continue for life. This is the trust they gain through service and right advise.', 5);
