import { motion } from "framer-motion";

const pageT = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.25, ease: "easeOut" } };
const FONT = `'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif`;

export default function LumpSumVsMonthly({ t, navigate }) {
  const h2 = { fontSize:22, fontWeight:700, color:t.tx, marginTop:40, marginBottom:12, letterSpacing:"-0.01em" };
  const p = { fontSize:15, lineHeight:1.7, color:t.tx2, margin:"0 0 16px 0" };
  const b = { fontWeight:600, color:t.tx };
  const a = { color:t.ac, textDecoration:"underline" };
  const faqQ = { fontSize:16, fontWeight:600, color:t.tx, margin:"0 0 6px 0" };
  const tbl = { width:"100%", borderCollapse:"collapse", margin:"0 0 24px 0", fontSize:14 };
  const th = { padding:"10px 12px", border:`1px solid ${t.bd2}`, fontWeight:600, color:t.tx, background:t.sf2, textAlign:"left" };
  const td = { padding:"10px 12px", border:`1px solid ${t.bd2}`, color:t.tx2 };
  const tdB = { ...td, fontWeight:600, color:t.tx };

  return (
    <motion.div key="article:lump-sum-vs-monthly-investing" {...pageT} style={{ maxWidth:800, margin:"0 auto", padding:"48px 24px 60px" }}>
      <h1 style={{ fontSize:32, fontWeight:700, marginBottom:8, letterSpacing:"-0.02em" }}>Lump Sum vs. Monthly Investing: Which Builds More?</h1>
      <p style={{ fontSize:12, color:t.tx3, marginBottom:32 }}>Written by Zahid Rehman · Updated July 2026</p>

      <p style={p}>You have $12,000. Do you invest it today, or feed it in at $1,000 a month over a year?</p>
      <p style={p}>Measured in a steady-growth model, today wins: <strong style={b}>$220,085</strong> versus <strong style={b}>$210,517</strong> after thirty years — a gap of about <strong style={b}>$9,569, or 4.5%</strong>, from nothing but timing. But that measurement comes with a disclosure most articles skip: the model is structurally rigged in lump sum's favor, and the one scenario people actually fear is the one a smooth model can't show. This article gives you the honest version of both sides — and the third option that quietly loses to both.</p>

      <h2 style={h2}>The measured gap</h2>
      <p style={p}>Two paths for the same $12,000, same fund (3.5% yield, dividends growing 7% a year, prices appreciating 6%, everything reinvested), same 30-year horizon:</p>

      <table style={tbl}>
        <thead>
          <tr>
            <th style={th}>Strategy</th>
            <th style={th}>Value at year 30</th>
            <th style={th}>Income at year 30</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdB}>$12,000 invested today</td><td style={tdB}>$220,085</td><td style={td}>$10,209/yr</td></tr>
          <tr><td style={tdB}>$1,000/month over 12 months</td><td style={td}>$210,517</td><td style={td}>$9,765/yr</td></tr>
        </tbody>
      </table>

      <p style={p}>The mechanism is boring and real: in the spread-out version, the average dollar waits about six months before it starts working, and six months of missed compounding, compounded for three decades, is $9,569.</p>
      <p style={p}>Stretch the spreading and the cost multiplies. The same comparison with <strong style={b}>$60,000</strong> — invested today versus $1,000 a month over five years — ends at <strong style={b}>$1,100,426 versus $881,970</strong>: a gap of about <strong style={b}>$218,456, or 25%</strong>. Slow-rolling a large sum across years isn't caution; in a rising market it's a six-figure decision.</p>

      <h2 style={h2}>The disclosure: this model can't lose for lump sum</h2>
      <p style={p}>Here's what the table hides, and it matters. The projection assumes the market rises smoothly every single month. In a world like that, investing earlier <em>always</em> wins — the conclusion is baked into the assumption. The model can measure the <em>size</em> of lump sum's edge; it cannot tell you lump sum is always right, because it's incapable of showing the case where it's wrong.</p>
      <p style={p}>That case is simple: <strong style={b}>the crash right after you invest.</strong> Put $12,000 in today and watch the market fall 30% next quarter, and the monthly investor beats you — their remaining cash buys the dip automatically. This is the exact fear that makes people spread money out, and it's legitimate: markets do crash, sometimes right after you buy. (<a href="/learn/what-a-market-crash-does-to-dividends/" style={a}>What a crash actually does to a dividend plan.</a>)</p>
      <p style={p}>What tilts the long-run odds back toward lump sum is that markets rise more often than they fall — most of the time, there is no crash next quarter, and every month spent waiting costs more expected growth than it saves in crash protection. Lump sum is the <em>better bet</em>; monthly is the <em>smaller regret</em>. Those are different things, and which one you should optimize for is honestly a question about your stomach, not your spreadsheet.</p>

      <h2 style={h2}>The decision, without the false drama</h2>
      <p style={p}><strong style={b}>If a big sum is genuinely in hand</strong> — inheritance, bonus, sale proceeds — the math favors investing it now, and the psychology favors spreading it over a <em>short</em> window if a sudden 30% paper loss would make you sell everything. Both are defensible. What the numbers above rule out is the <em>long</em> spread: taking years to deploy a sum you already have costs real six figures in a rising market while protecting you from only the first stretch of it.</p>
      <p style={p}><strong style={b}>If you don't have a lump sum, this debate isn't about you</strong> — and that's most people. Investing $500 from every paycheck isn't "dollar-cost averaging as a strategy"; it's just investing money when you get it, which is a lump sum of your entire available amount, every month. The lump-vs-DCA argument only exists when cash is sitting idle by <em>choice</em>.</p>
      <p style={p}><strong style={b}>The strategy that loses to both: waiting for the right moment.</strong> Holding cash until the market "settles down" or "pulls back" is the expensive version of monthly investing — all of the missed growth, none of the automation, plus a decision to agonize over every day. The market rarely sends an invitation. Both lump sum and monthly investing share the trait that actually matters: the money gets invested on a schedule a human can't chicken out of.</p>

      <div style={{ background:t.sf, border:`1px solid ${t.bd2}`, borderRadius:16, padding:"24px 28px", margin:"28px 0" }}>
        <p style={{ ...p, margin:"0 0 16px 0" }}>Run your own version: enter your amount as a lump sum, note the 30-year result, then rerun it starting from zero with the equivalent monthly contribution and compare. Then drop the growth assumptions and watch the gap shrink — the calmer your expectations, the less timing matters.</p>
        <button onClick={() => navigate("calculator")} style={{ padding:"12px 24px", borderRadius:12, border:"none", background:t.ac, color:"#FFF", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>Open the Calculator</button>
      </div>

      <h2 style={h2}>The takeaway</h2>
      <p style={p}>In a rising model, money invested today beats money invested gradually — by about 4.5% over thirty years for a one-year spread, and by a quarter of the ending balance for a five-year spread. The model is honest about the size of the edge and structurally blind to the crash case that justifies spreading. So: invest sums you have promptly, spread over months not years if you must protect your nerve, and never confuse either with the genuinely losing move — waiting in cash for a signal that isn't coming.</p>

      <h2 style={h2}>Frequently asked questions</h2>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Is it better to invest all at once or monthly?</p>
        <p style={{ ...p, margin:0 }}>If the sum is already in hand, investing promptly wins in most historical stretches because markets rise more often than they fall. Spreading it over a short window is a reasonable price for sleeping well. Spreading it over years is expensive.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>How much does dollar-cost averaging cost?</p>
        <p style={{ ...p, margin:0 }}>In the modeled example: about 4.5% of the 30-year outcome for spreading $12,000 over one year, and about 25% for spreading $60,000 over five. The longer the spread, the higher the toll in a rising market.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>When does monthly investing beat a lump sum?</p>
        <p style={{ ...p, margin:0 }}>When the market falls shortly after the lump would have gone in — the monthly investor's remaining cash buys cheaper shares. It happens, it's just not the common case, and no model based on steady growth can show it.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Isn't my paycheck investing dollar-cost averaging?</p>
        <p style={{ ...p, margin:0 }}>Not in the debated sense. Investing money as you earn it is putting your full available sum to work immediately — which is the lump-sum principle applied monthly. The debate only concerns cash already saved and deliberately held back.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Does this change for dividend investors specifically?</p>
        <p style={{ ...p, margin:0 }}>The timing math is the same, with one addition: the sooner the money is in, the sooner its dividends start reinvesting, so the income line at year 30 gaps the same way the value line does — $10,209 versus $9,765 a year in the example.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>What if I'm convinced a crash is coming?</p>
        <p style={{ ...p, margin:0 }}>People are convinced of that in most years, including most of the years the market rose. If the conviction is unshakable, a short spreading schedule converts the fear into a plan with an end date — which beats indefinite waiting, the one approach with no winning scenario.</p>
      </div>

      <p style={{ fontSize:12, color:t.tx3, fontStyle:"italic", lineHeight:1.6, margin:"40px 0 0 0", paddingTop:20, borderTop:`1px solid ${t.bd2}` }}>Dividend Forecaster is for educational and informational purposes only and is not financial advice. All projections are hypothetical, assume constant rates, and will differ from real results — including the possibility that spreading out an investment outperforms when markets decline. Dividends are not guaranteed, and past performance does not guarantee future results. Consider speaking with a qualified financial advisor before investing.</p>
    </motion.div>
  );
}
