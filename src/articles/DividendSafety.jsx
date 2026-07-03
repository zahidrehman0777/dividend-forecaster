import { motion } from "framer-motion";

const pageT = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.25, ease: "easeOut" } };
const FONT = `'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif`;

export default function DividendSafety({ t, navigate }) {
  const h2 = { fontSize:22, fontWeight:700, color:t.tx, marginTop:40, marginBottom:12, letterSpacing:"-0.01em" };
  const p = { fontSize:15, lineHeight:1.7, color:t.tx2, margin:"0 0 16px 0" };
  const b = { fontWeight:600, color:t.tx };
  const a = { color:t.ac, textDecoration:"underline" };
  const faqQ = { fontSize:16, fontWeight:600, color:t.tx, margin:"0 0 6px 0" };

  return (
    <motion.div key="article:how-to-tell-if-a-dividend-is-safe" {...pageT} style={{ maxWidth:800, margin:"0 auto", padding:"48px 24px 60px" }}>
      <h1 style={{ fontSize:32, fontWeight:700, marginBottom:8, letterSpacing:"-0.02em" }}>How to Tell If a Dividend Is Safe</h1>
      <p style={{ fontSize:12, color:t.tx3, marginBottom:32 }}>Written by Zahid Rehman · Updated July 2026</p>

      <p style={p}>No dividend is guaranteed — companies with fifty-year streaks have cut. But most cuts announce themselves years in advance to anyone checking a handful of numbers. This is the checklist: five checks, each one catching a different way a dividend goes bad, ordered from fastest to deepest. None requires a finance degree; all of them together take about fifteen minutes per holding.</p>

      <h2 style={h2}>Check 1: The payout ratio — is the dividend actually funded?</h2>
      <p style={p}>The payout ratio is the share of a company's earnings being paid out as dividends. It's the single fastest read on sustainability, and it comes in rough bands:</p>
      <p style={p}><strong style={b}>Under 60%</strong> — comfortable. The company earns substantially more than it pays, leaving a cushion for bad years and room for raises.</p>
      <p style={p}><strong style={b}>60–75%</strong> — normal for mature, slow-growth businesses, but watch the trend. A ratio drifting upward means earnings aren't keeping up with the dividend.</p>
      <p style={p}><strong style={b}>75–100%</strong> — stretched. One bad year forces a choice between the dividend and the business.</p>
      <p style={p}><strong style={b}>Over 100%</strong> — the company is paying out more than it earns. That's borrowed time by definition; the money is coming from debt, reserves, or asset sales.</p>
      <p style={p}>One structural exception before you panic-sell anything: <strong style={b}>REITs</strong> are legally required to distribute most of their taxable income, so ratios that look alarming elsewhere are normal for them — REITs get judged against other REITs, and against their cash-flow measures rather than accounting earnings.</p>

      <h2 style={h2}>Check 2: The price chart next to the payout — what does the market know?</h2>
      <p style={p}>A dividend that looks stable while the share price has fallen 40–50% is the single most reliable pre-cut silhouette. The yield looks better every week — because the market is pricing in the cut before management admits it. When price and payout tell opposite stories, believe the price first and investigate. (This is the anatomy of a yield trap, and <a href="/learn/dividend-yield-traps/" style={a}>it has its own article with the 15-year cost worked out</a>.)</p>

      <h2 style={h2}>Check 3: The growth history — is the payment alive?</h2>
      <p style={p}>Pull up five to ten years of dividend history and ask one question: is the payment <em>growing</em>? A healthy dividend rises most years, because it's funded by rising earnings. A payment that's been frozen for years is a payment management is nursing. A payment that's already been trimmed once is a warning siren — the taboo is broken, and the second cut is easier than the first.</p>
      <p style={p}>Long unbroken raise streaks are the strong version of this signal: 25- and 50-year streaks are rare and unfakeable evidence of durability. They are also not immunity — Walgreens and 3M were decades-long raisers whose streaks ended in cuts when the underlying businesses eroded. <a href="/learn/dividend-aristocrats-and-kings/" style={a}>What those streaks prove and don't prove is its own subject.</a></p>

      <h2 style={h2}>Check 4: The yield against its neighborhood — is the number normal?</h2>
      <p style={p}>Every category has a normal yield range. When one fund or stock advertises double or triple its peers, the market is expressing doubt about the payout, not generosity. Broad index funds pay low single digits; dividend-focused funds a bit more; REITs and utilities structurally higher. The check isn't "is the yield high" — it's "is the yield high <em>for what this is</em>." An 8% yield from a covered-call fund built to distribute 8% is a design choice. An 8% yield from an ordinary company whose peers pay 3% is a distress signal.</p>

      <h2 style={h2}>Check 5: The debt — who gets paid first?</h2>
      <p style={p}>Dividends are paid from what's left after interest. A company carrying heavy debt into a downturn faces a fixed interest bill and a discretionary dividend — and only one of those can legally be skipped. You don't need to read a balance sheet like an analyst; a glance at whether debt has been climbing while earnings flatten tells you if the dividend is competing with creditors for the same shrinking pot.</p>

      <h2 style={h2}>What passing all five buys you — and what it doesn't</h2>
      <p style={p}>A holding that clears every check — funded payout, price and payout telling the same story, a growing payment, a normal yield for its category, manageable debt — is about as safe as dividends get. It is still not guaranteed. Deep recessions cut even well-covered dividends, which is why the last layer of safety isn't a metric at all: it's <strong style={b}>diversification</strong>. Own enough payers that any single cut is an annoyance, not a plan-breaker. A portfolio where one holding's dividend decides whether you make rent has failed the safety test before any ratio gets checked.</p>

      <div style={{ background:t.sf, border:`1px solid ${t.bd2}`, borderRadius:16, padding:"24px 28px", margin:"28px 0" }}>
        <p style={{ ...p, margin:"0 0 16px 0" }}>Stress-test your own plan: take a holding's real yield and growth, project the income you're counting on, then rerun it assuming the dividend grows at zero — or model the position at half its income. If the plan survives the pessimistic run, it's a plan. If it only works in the optimistic one, it's a hope.</p>
        <button onClick={() => navigate("calculator")} style={{ padding:"12px 24px", borderRadius:12, border:"none", background:t.ac, color:"#FFF", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>Open the Calculator</button>
      </div>

      <h2 style={h2}>The takeaway</h2>
      <p style={p}>Most dividend cuts are visible in advance: a payout ratio creeping past 75%, a price collapsing under a "stable" payment, a growth history gone flat, a yield out of line with its peers, debt crowding the payout. Fifteen minutes of checking catches most of them — and diversification handles the ones nothing catches.</p>

      <h2 style={h2}>Frequently asked questions</h2>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>What payout ratio is safe?</p>
        <p style={{ ...p, margin:0 }}>Under 60% is comfortable for most companies; 60–75% is normal for mature businesses; above 75% deserves scrutiny; above 100% is unsustainable by definition. REITs run structurally higher and are judged separately.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Can a Dividend Aristocrat cut its dividend?</p>
        <p style={{ ...p, margin:0 }}>Yes — the streak ends the moment it happens. Walgreens and 3M were both long-streak raisers that ultimately cut. Streaks are strong evidence, not immunity.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>What's the fastest single check?</p>
        <p style={{ ...p, margin:0 }}>Price history next to payout history. A falling price under a stable dividend means the market expects a cut — that one look catches more future cuts than any ratio.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Is a frozen dividend a sell signal?</p>
        <p style={{ ...p, margin:0 }}>It's a caution signal. A freeze means management chose not to raise — sometimes prudence, sometimes the first stage of trouble. Check the payout ratio and debt to tell which.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Do ETFs cut dividends too?</p>
        <p style={{ ...p, margin:0 }}>Fund distributions fall when the underlying companies cut, so broad funds see income dips in bad recessions — but a diversified fund's income declines gradually rather than getting halved by one announcement. That's a real advantage of funds over single stocks for income.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>How many holdings make dividend income "diversified"?</p>
        <p style={{ ...p, margin:0 }}>There's no magic number, but the test is simple: if any single holding's cut would break your budget, you're concentrated, whatever the count says. Broad funds get you there in one purchase.</p>
      </div>

      <p style={{ fontSize:12, color:t.tx3, fontStyle:"italic", lineHeight:1.6, margin:"40px 0 0 0", paddingTop:20, borderTop:`1px solid ${t.bd2}` }}>Dividend Forecaster is for educational and informational purposes only and is not financial advice. All projections are hypothetical, assume constant rates, and will differ from real results. Dividends are not guaranteed and can be cut, and past performance does not guarantee future results. Consider speaking with a qualified financial advisor before investing.</p>
    </motion.div>
  );
}
