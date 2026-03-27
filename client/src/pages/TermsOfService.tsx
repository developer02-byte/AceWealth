import { useEffect } from "react";

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#FBAB1C]/5 blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#1E40AF]/10 blur-[150px] -z-10" />
      
      <div className="container max-w-4xl mx-auto px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-8">
          Terms of <span className="text-primary">Service</span>
        </h1>
        
        <div className="glass-card p-8 md:p-12 rounded-3xl space-y-8 text-muted-foreground leading-relaxed relative z-10">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p>
              These Terms of Service ("Terms", "Terms of Service") govern your relationship with the Ace Wealth website (the "Service") operated by Ace Wealth ("us", "we", or "our").
            </p>
            <p className="mt-4">
              Please read these Terms of Service carefully before using the Service. Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of Ace Wealth and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Links To Other Web Sites</h2>
            <p>
              Our Service may contain links to third-party web sites or services that are not owned or controlled by Ace Wealth.
            </p>
            <p className="mt-4">
              Ace Wealth has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that Ace Wealth shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Limitation of Liability</h2>
            <p>
              In no event shall Ace Wealth, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Disclaimer</h2>
            <p>
              Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis.
            </p>
            <p className="mt-4">
              Investment in Mutual Funds and Securities are subject to market risk associated with investment capital and Debt market instruments. 
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion. We will try to provide at least 30 days notice prior to any new terms taking effect.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
