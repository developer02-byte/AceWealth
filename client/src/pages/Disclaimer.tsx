import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Disclaimer() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">
            Legal Information
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-foreground">
            Disclaimer
          </h1>
          
          <div className="glass-card p-8 md:p-12 rounded-3xl space-y-8 text-slate-300">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Mutual Fund Investments are Subject to Market Risks</h2>
              <p className="leading-relaxed">
                Please read all scheme related documents carefully before investing. Past performance of the schemes is neither an indicator nor a guarantee of future performance. Ace Wealth is an AMFI-Registered Mutual Fund Distributor and does not guarantee any returns on investments.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">No Financial Advice</h2>
              <p className="leading-relaxed">
                The information provided on this website is for general informational purposes only and does not constitute financial, investment, or tax advice. Investors should consult their financial advisors before making any investment decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Accuracy of Information</h2>
              <p className="leading-relaxed">
                While we strive to provide accurate and up-to-date information, Ace Wealth makes no warranties or representations as to the accuracy, completeness, or reliability of any information found on this website or any linked pages. We are not liable for any losses or damages arising from the use of this information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Third-Party Links</h2>
              <p className="leading-relaxed">
                This website may contain links to third-party websites or services that are not owned or controlled by Ace Wealth. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party websites or services.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
