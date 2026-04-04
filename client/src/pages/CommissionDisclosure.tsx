import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const tableData = [
  {
    category: "Equity Schemes",
    rows: [
      { scheme: "Large Cap", trail: "0.20% - 1.90%", upfront: "Nil", total: "0.20% - 1.90%" },
      { scheme: "Flexi Cap", trail: "0.20% - 1.90%", upfront: "Nil", total: "0.20% - 1.90%" },
      { scheme: "Large & Mid Cap", trail: "0.20% - 1.90%", upfront: "Nil", total: "0.20% - 1.90%" },
      { scheme: "Multi cap", trail: "0.20% - 1.90%", upfront: "Nil", total: "0.20% - 1.90%" },
      { scheme: "Mid Cap", trail: "0.20% - 1.90%", upfront: "Nil", total: "0.20% - 1.90%" },
      { scheme: "Small Cap", trail: "0.20% - 1.90%", upfront: "Nil", total: "0.20% - 1.90%" },
      { scheme: "Dividend Yield", trail: "0.20% - 1.90%", upfront: "Nil", total: "0.20% - 1.90%" },
      { scheme: "Value Fund", trail: "0.20% - 1.90%", upfront: "Nil", total: "0.20% - 1.90%" },
      { scheme: "Contra Fund", trail: "0.20% - 1.90%", upfront: "Nil", total: "0.20% - 1.90%" },
      { scheme: "Focused Fund", trail: "0.20% - 1.90%", upfront: "Nil", total: "0.20% - 1.90%" },
      { scheme: "Sectoral / Thematic Fund", trail: "0.20% - 1.90%", upfront: "Nil", total: "0.20% - 1.90%" },
      { scheme: "ELSS", trail: "0.20% - 1.90%", upfront: "Nil", total: "0.20% - 1.90%" },
    ],
  },
  {
    category: "Hybrid Schemes",
    rows: [
      { scheme: "Conservative Hybrid Fund", trail: "0.15% - 1.20%", upfront: "Nil", total: "0.15% - 1.20%" },
      { scheme: "Balanced Hybrid Fund", trail: "0.15% - 1.20%", upfront: "Nil", total: "0.15% - 1.20%" },
      { scheme: "Aggressive Hybrid Fund", trail: "0.15% - 1.80%", upfront: "Nil", total: "0.15% - 1.80%" },
      { scheme: "Dynamic Asset Allocation Fund", trail: "0.15% - 1.80%", upfront: "Nil", total: "0.15% - 1.80%" },
      { scheme: "Multi Asset Allocation Fund", trail: "0.15% - 1.80%", upfront: "Nil", total: "0.15% - 1.80%" },
      { scheme: "Arbitrage Fund", trail: "0.10% - 0.90%", upfront: "Nil", total: "0.10% - 0.90%" },
      { scheme: "Equity Savings Fund", trail: "0.15% - 1.40%", upfront: "Nil", total: "0.15% - 1.40%" },
    ],
  },
  {
    category: "Debt Schemes",
    rows: [
      { scheme: "Overnight Fund", trail: "0.02% - 0.15%", upfront: "Nil", total: "0.02% - 0.15%" },
      { scheme: "Liquid Fund", trail: "0.02% - 0.15%", upfront: "Nil", total: "0.02% - 0.15%" },
      { scheme: "Ultra Short Duration Fund", trail: "0.10% - 1.00%", upfront: "Nil", total: "0.10% - 1.00%" },
      { scheme: "Low Duration Fund", trail: "0.10% - 1.00%", upfront: "Nil", total: "0.10% - 1.00%" },
      { scheme: "Money Market Fund", trail: "0.10% - 1.00%", upfront: "Nil", total: "0.10% - 1.00%" },
      { scheme: "Short Duration Fund", trail: "0.15% - 1.30%", upfront: "Nil", total: "0.15% - 1.30%" },
      { scheme: "Medium Duration Fund", trail: "0.15% - 1.30%", upfront: "Nil", total: "0.15% - 1.30%" },
      { scheme: "Medium to Long Duration Fund", trail: "0.15% - 1.30%", upfront: "Nil", total: "0.15% - 1.30%" },
      { scheme: "Long Duration Fund", trail: "0.15% - 1.30%", upfront: "Nil", total: "0.15% - 1.30%" },
      { scheme: "Dynamic Bond Fund", trail: "0.15% - 1.30%", upfront: "Nil", total: "0.15% - 1.30%" },
      { scheme: "Corporate Bond Fund", trail: "0.15% - 1.30%", upfront: "Nil", total: "0.15% - 1.30%" },
      { scheme: "Credit Risk Fund", trail: "0.15% - 1.30%", upfront: "Nil", total: "0.15% - 1.30%" },
      { scheme: "Banking & PSU Fund", trail: "0.15% - 1.30%", upfront: "Nil", total: "0.15% - 1.30%" },
      { scheme: "Gilt Fund", trail: "0.15% - 1.30%", upfront: "Nil", total: "0.15% - 1.30%" },
      { scheme: "Gilt Fund with 10 Year Constant Duration", trail: "0.15% - 1.30%", upfront: "Nil", total: "0.15% - 1.30%" },
      { scheme: "Floater Fund", trail: "0.10% - 1.00%", upfront: "Nil", total: "0.10% - 1.00%" },
    ],
  },
  {
    category: "Other Schemes",
    rows: [
      { scheme: "Retirement Fund", trail: "0.25% - 1.80%", upfront: "Nil", total: "0.25% - 1.80%" },
      { scheme: "Children’s Fund", trail: "0.25% - 1.80%", upfront: "Nil", total: "0.25% - 1.80%" },
      { scheme: "Index Funds / ETFs", trail: "0.05% - 0.90%", upfront: "Nil", total: "0.05% - 0.90%" },
      { scheme: "Fund of Funds (Overseas / Domestic)", trail: "0.25% - 1.65%", upfront: "Nil", total: "0.25% - 1.65%" },
    ],
  },
];

function downloadCSV() {
  const headers = ["Category", "Scheme Type", "Trail Commission (p.a.)", "Upfront Commission", "Total Commission"];
  const rows: string[][] = [headers];
  tableData.forEach((section) => {
    section.rows.forEach((row) => {
      rows.push([section.category, row.scheme, row.trail, row.upfront, row.total]);
    });
  });
  const csv = rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "AceWealth_Commission_Disclosure.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function downloadPDF() {
  // Generate printable HTML and trigger browser print → save as PDF
  const rows = tableData
    .map(
      (section) => `
    <tr style="background:#1E3A5F; color:#F9A825;">
      <td colspan="4" style="padding:10px 14px; font-weight:bold; font-size:14px;">${section.category}</td>
    </tr>
    ${section.rows
      .map(
        (row, i) => `
      <tr style="background: ${i % 2 === 0 ? "#0d1f3c" : "#0B132B"}; color:#e2e8f0;">
        <td style="padding:9px 14px; border-bottom:1px solid #1e3a5f;">${row.scheme}</td>
        <td style="padding:9px 14px; border-bottom:1px solid #1e3a5f; text-align:center;">${row.trail}</td>
        <td style="padding:9px 14px; border-bottom:1px solid #1e3a5f; text-align:center;">${row.upfront}</td>
        <td style="padding:9px 14px; border-bottom:1px solid #1e3a5f; text-align:center;">${row.total}</td>
      </tr>`
      )
      .join("")}`
    )
    .join("");

  const html = `<!DOCTYPE html><html><head><title>Commission Disclosure – ACE WEALTH</title>
  <style>body{font-family:sans-serif;background:#0B132B;color:#e2e8f0;padding:30px;}h1{color:#F9A825;font-size:22px;margin-bottom:4px;}p{color:#94a3b8;font-size:12px;margin-bottom:20px;}table{width:100%;border-collapse:collapse;font-size:13px;}th{background:#1E40AF;color:#fff;padding:10px 14px;text-align:left;}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}</style>
  </head><body>
  <h1>Commission Disclosure – ACE WEALTH</h1>
  <p>AMFI – Registered Mutual Fund Distributor | As per SEBI / AMFI Circular. Subject to change without notice.</p>
  <table>
    <thead><tr><th>Scheme Type</th><th>Trail Commission (p.a.)</th><th>Upfront Commission</th><th>Total Commission</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <p style="margin-top:20px;font-size:11px;">* All commissions are indicative and subject to change per AMC guidelines. Past earnings are not indicative of future commissions.</p>
  </body></html>`;

  const win = window.open("", "_blank");
  if (win) {
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 400);
  }
}

export default function CommissionDisclosure() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">
                Commission <span className="text-primary">Disclosure</span>
              </h1>
              <p className="text-muted-foreground text-base max-w-2xl">
                As per SEBI / AMFI Circular, ACE WEALTH is required to disclose commissions received from Asset Management Companies (AMCs). The following table lists indicative commission rates for various mutual fund categories.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Button
                onClick={downloadCSV}
                variant="outline"
                className="gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
              >
                <Download className="w-4 h-4" /> Download CSV
              </Button>
              <Button
                onClick={downloadPDF}
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              >
                <Download className="w-4 h-4" /> Download PDF
              </Button>
            </div>
          </div>

          {/* Note Banner */}
          <div className="glass-card rounded-xl px-6 py-4 mb-8 border-l-4 border-primary">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">Note:</span> All commission rates are indicative and subject to change based on AMC policies and SEBI/AMFI guidelines. Upfront commissions are <strong className="text-foreground">Nil</strong> across all categories in compliance with AMFI directive.
            </p>
          </div>

          {/* Tables */}
          <div className="space-y-8">
            {tableData.map((section, i) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                {/* Category Header */}
                <div className="bg-primary/10 border-b border-primary/20 px-6 py-4">
                  <h2 className="text-lg font-display font-bold text-primary">{section.category}</h2>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-white/3">
                        <th className="text-left px-6 py-3 font-semibold text-foreground">Scheme Type</th>
                        <th className="text-center px-6 py-3 font-semibold text-foreground">Trail Commission (p.a.)</th>
                        <th className="text-center px-6 py-3 font-semibold text-foreground">Upfront Commission</th>
                        <th className="text-center px-6 py-3 font-semibold text-foreground">Total Commission</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.rows.map((row, idx) => (
                        <tr
                          key={row.scheme}
                          className={`border-b border-border last:border-0 transition-colors hover:bg-primary/5 ${idx % 2 === 0 ? "" : "bg-white/[0.02]"}`}
                        >
                          <td className="px-6 py-4 text-foreground font-medium">{row.scheme}</td>
                          <td className="px-6 py-4 text-center text-muted-foreground">{row.trail}</td>
                          <td className="px-6 py-4 text-center text-muted-foreground">{row.upfront}</td>
                          <td className="px-6 py-4 text-center font-semibold text-primary">{row.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Note */}
          <p className="text-xs text-muted-foreground mt-8 leading-relaxed border-t border-border pt-6">
            * This disclosure is provided in compliance with SEBI Circular no. SEBI/HO/IMD/DF2/CIR/P/2018/137 dated November 06, 2018 and subsequent AMFI circulars. Commission rates may vary across AMCs and are subject to revision. For exact commission earned on your investments, please reach out to us directly.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
