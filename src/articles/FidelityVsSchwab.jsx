import { motion } from "framer-motion";

const pageT = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.25, ease: "easeOut" } };
const FONT = `'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif`;

export default function FidelityVsSchwab({ t, navigate }) {
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
    <motion.div key="article:fidelity-vs-schwab-index-funds" {...pageT} style={{ maxWidth:800, margin:"0 auto", padding:"48px 24px 60px" }}>
      <h1 style={{ fontSize:32, fontWeight:700, marginBottom:8, letterSpacing:"-0.02em" }}>Fidelity vs. Schwab Index Funds: Which Is Actually Better?</h1>
      <p style={{ fontSize:12, color:t.tx3, marginBottom:32 }}>Written by Zahid Rehman · Updated July 2026</p>

      <p style={p}>Here's the answer most comparisons bury: when a Fidelity fund and a Schwab fund track the same index, they are nearly the same investment. Same stocks, same weightings, returns that move in lockstep. The "winner" usually comes down to a difference so small it's almost a rounding error.</p>
      <p style={p}>So the real question isn't which company wins. It's what actually separates two funds that hold the same thing — and that turns out to be the expense ratio, one structural catch worth knowing about, and honestly, which brokerage you already use. This article walks all five fund categories, shows exactly what the fee difference costs over thirty years, and gives you a clean way to decide.</p>

      <h2 style={h2}>The short version</h2>
      <p style={p}>Both Fidelity and Schwab are top-tier, low-cost places to buy index funds. For any given index, their funds perform almost identically. The things that genuinely differ:</p>
      <p style={p}><strong style={b}>Fees.</strong> Fidelity's funds are a touch cheaper in every category, and a few Fidelity funds charge <strong style={b}>0%</strong>. The gap is real but small.</p>
      <p style={p}><strong style={b}>The Fidelity ZERO catch.</strong> Those 0% funds can't be moved to another brokerage — a tradeoff that matters in a taxable account.</p>
      <p style={p}><strong style={b}>Where you already bank.</strong> If you've got a Schwab account, the Schwab fund is the obvious pick, and vice versa. Both are excellent, so convenience wins.</p>
      <p style={p}>That's the whole decision. The rest of this explains why, with real numbers.</p>

      <h2 style={h2}>Why two funds tracking the same index are nearly identical</h2>
      <p style={p}>An index fund just buys everything in a particular index, in the same proportions. (<a href="/learn/how-to-invest-in-etfs-for-beginners/" style={a}>Here's a fuller explainer if you're new to them.</a>) So a Fidelity S&amp;P 500 fund and a Schwab S&amp;P 500 fund both hold the same 500 companies, weighted the same way. When those companies go up, both funds go up together.</p>
      <p style={p}>How together? The two main S&amp;P 500 funds — Fidelity's FXAIX and Schwab's SWPPX — move almost identically, and over the past decade their annualized returns have differed by only a few hundredths of a percentage point. That's the kind of gap that comes from tiny tracking differences, not from one company being "better" at running an index fund.</p>
      <p style={p}>When two things hold the same basket, the only durable wedge between them is what they charge you to hold it. Everything else is noise.</p>

      <h2 style={h2}>The five categories, head to head</h2>
      <p style={p}><strong style={b}>S&amp;P 500 — FXAIX vs. SWPPX.</strong> The 500 largest U.S. companies. Both funds yield about 1%, and as noted, their long-run returns sit within a hair of each other. The only real difference: FXAIX charges about 0.015% a year, SWPPX about 0.02%. A near-tie, with Fidelity a sliver cheaper.</p>
      <p style={p}><strong style={b}>Total market — FZROX vs. SWTSX.</strong> These add the mid-size and small companies the S&amp;P 500 leaves out. There's a small wrinkle here: they track slightly different indexes (FZROX follows Fidelity's own total-market index, SWTSX tracks the Dow Jones U.S. Total Stock Market Index), but both cover essentially the entire U.S. market and behave almost identically. Both yield roughly 1%. FZROX charges <strong style={b}>0%</strong>; SWTSX charges 0.03%.</p>
      <p style={p}><strong style={b}>Bonds — FXNAX vs. SWAGX.</strong> Both track the same benchmark, the Bloomberg U.S. Aggregate Bond Index. This is where a lot of comparisons go wrong, so here's the truth about bond funds: their return is almost entirely the income they pay, not price growth. Bond prices barely rise over time, and they can fall when interest rates climb — after the 2022 rate spike, SWAGX's trailing five-year return spent time slightly underwater. Today both funds yield around 4% (FXNAX about 3.7%, SWAGX about 4.1%). Don't expect a bond fund to compound like a stock fund — its job is steady income and stability, not growth. On fees, FXNAX (about 0.025%) edges SWAGX (about 0.04%).</p>
      <p style={p}><strong style={b}>International — FSPSX vs. SWISX.</strong> Both track the MSCI EAFE index of developed markets outside North America — Japan, the U.K., France, Germany and so on. Both yield somewhere in the 2.5–3.5% range and move closely together. FSPSX charges about 0.035%; SWISX charges 0.06%. Fidelity cheaper again.</p>
      <p style={p}><strong style={b}>Fees overall.</strong> Notice the pattern: Fidelity is slightly cheaper in all four fund categories, plus it offers the 0% ZERO funds Schwab has no answer to. If you're ranking purely on cost, Fidelity wins — just understand by how little, which is the next section.</p>

      <h2 style={h2}>The one thing that actually separates them — and what it costs</h2>
      <p style={p}>Since fees are the only real lever, let's measure it. Put $100,000 into two funds that are identical in every way — same yield, same growth, same 30-year horizon — and change <em>only</em> the expense ratio. One charges 0%, the other 0.03% (the widest gap you'll find between a Fidelity and Schwab fund). Here's the drag over time:</p>

      <table style={tbl}>
        <thead>
          <tr>
            <th style={th}>Year</th>
            <th style={th}>0.00% fund</th>
            <th style={th}>0.03% fund</th>
            <th style={th}>Fees paid (0.03% fund)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdB}>Year 1</td><td style={td}>$109,000</td><td style={td}>$109,000</td><td style={td}>$31</td></tr>
          <tr><td style={tdB}>Year 10</td><td style={td}>$235,000</td><td style={td}>$235,000</td><td style={td}>$472</td></tr>
          <tr><td style={tdB}>Year 20</td><td style={td}>$547,000</td><td style={td}>$544,000</td><td style={td}>$1,570</td></tr>
          <tr><td style={tdB}>Year 30</td><td style={tdB}>$1,260,000</td><td style={tdB}>$1,250,000</td><td style={tdB}>$4,110</td></tr>
        </tbody>
      </table>

      <p style={p}>After thirty years, the cheaper fund comes out about <strong style={b}>$10,000 ahead</strong> — a bit under <strong style={b}>1%</strong> of the balance.</p>
      <p style={p}>Two things worth noticing. First, the gap is invisible early and only opens up late — at year one it's $31, by year thirty it's real money. Second, look closely: the fund paid about <strong style={b}>$4,110</strong> in fees over the thirty years, but ended up roughly <strong style={b}>$10,000</strong> behind. The difference is the hidden part of fees — every dollar taken as a fee also gives up all the growth it would have earned. The true cost is always bigger than the fee itself.</p>
      <p style={p}>But step back. This is the <em>widest</em> fee gap between the two providers, on a six-figure balance, over three full decades — and it's still under 1%. On the S&amp;P 500 pair, where the gap is just 0.005%, the difference is almost nothing. So fees matter, but they don't decide your retirement. This is a tiebreaker, not a turning point.</p>

      <div style={{ background:t.sf, border:`1px solid ${t.bd2}`, borderRadius:16, padding:"24px 28px", margin:"28px 0" }}>
        <p style={{ ...p, margin:"0 0 16px 0" }}>Put in your own amount and timeline, then run it twice — once at 0%, once at 0.03% or higher — and watch the gap. Push the fee up to 0.5% or 1% to see why expensive funds are the real enemy, not the basis-point gap between two cheap ones.</p>
        <button onClick={() => navigate("calculator")} style={{ padding:"12px 24px", borderRadius:12, border:"none", background:t.ac, color:"#FFF", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>Open the Calculator</button>
      </div>

      <h2 style={h2}>The Fidelity ZERO catch: the 0% isn't free</h2>
      <p style={p}>Fidelity's ZERO funds — including FZROX — charge a genuine 0% expense ratio, which is unique. But there's a string attached. They're proprietary, which means you cannot transfer them to another brokerage; if you ever leave Fidelity you have to sell first, which can trigger capital gains taxes in a taxable account.</p>
      <p style={p}>In a Roth IRA or traditional IRA, that barely matters — selling inside those accounts isn't a taxable event, and most people stay put anyway. (<a href="/learn/how-dividends-are-taxed/" style={a}>Here's how dividend and capital gains taxes work.</a>) But in a regular taxable account, where you might someday want to move your holdings to another firm, that lock-in is a real cost. For taxable accounts, a portable ETF can be the more flexible choice, even if it charges a few basis points more.</p>
      <p style={p}>So the 0% is a great deal — mostly inside a retirement account.</p>

      <h2 style={h2}>So which should you pick?</h2>
      <p style={p}>There's no trophy here, because both are excellent. But here's how to decide in order:</p>
      <p style={p}><strong style={b}>Use the brokerage you already have.</strong> This is the biggest practical factor. If your money's at Schwab, buy SWPPX or SWTSX. If it's at Fidelity, buy FXAIX or FZROX. Both are top-tier, so don't open a second account to chase a basis point.</p>
      <p style={p}><strong style={b}>If you're starting fresh and ranking on cost, Fidelity edges it</strong> — slightly cheaper across the board, plus the 0% ZERO funds. Just keep the size of that edge in perspective.</p>
      <p style={p}><strong style={b}>Mind the ZERO lock-in for taxable accounts.</strong> Great in an IRA; think twice in a taxable account where you want the freedom to move.</p>
      <p style={p}>The honest takeaway: you are not going to win or lose retirement on Fidelity versus Schwab. Both are exactly the kind of low-cost, broad index funds that build wealth over decades. Pick the one that fits your accounts, keep your fees low, and let time do the work.</p>

      <h2 style={h2}>Frequently asked questions</h2>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Is Fidelity or Schwab better for index funds?</p>
        <p style={{ ...p, margin:0 }}>Both are excellent and nearly identical for any given index. Fidelity is slightly cheaper across the board and offers 0% funds, but the difference is small. For most people, the better choice is whichever brokerage you already use.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Do FXAIX and SWPPX actually perform differently?</p>
        <p style={{ ...p, margin:0 }}>Barely. They hold the same 500 companies and have tracked within a few hundredths of a percent of each other per year over the past decade. Choosing between them comes down to fees and which brokerage you're with.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Are the Fidelity ZERO funds worth it?</p>
        <p style={{ ...p, margin:0 }}>The 0% expense ratio is real and a genuine edge — but the funds can't be transferred out of Fidelity without selling. That makes them ideal inside an IRA or Roth, and less ideal in a taxable account where you may want flexibility.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Why are bond index fund returns so low compared to stock funds?</p>
        <p style={{ ...p, margin:0 }}>Because a bond fund's return is mostly the income it pays, not price growth. Bond prices rise slowly and can even fall when interest rates climb. A bond fund is for steady income and stability, not the kind of compounding you get from stocks.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Does the expense ratio difference really matter?</p>
        <p style={{ ...p, margin:0 }}>A little, over a long time. In the widest case between these two providers — a 0.03% gap on $100,000 over 30 years — it works out to under 1% of the final balance. Worth knowing, not worth losing sleep over. The fees that actually hurt are the 0.5%-plus ones on expensive funds.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Can I hold a Schwab fund at Fidelity, or a Fidelity fund at Schwab?</p>
        <p style={{ ...p, margin:0 }}>For most regular index mutual funds, transferring between brokerages is possible, though the rules vary. ETFs move easily. The Fidelity ZERO funds are the big exception — they only exist at Fidelity.</p>
      </div>

      <p style={{ fontSize:12, color:t.tx3, fontStyle:"italic", lineHeight:1.6, margin:"40px 0 0 0", paddingTop:20, borderTop:`1px solid ${t.bd2}` }}>Dividend Forecaster is for educational and informational purposes only and is not financial advice. Fund details, fees, and yields change over time and should be confirmed on the provider's site before investing. All projections are hypothetical, assume constant rates, and will differ from real results. Past performance does not guarantee future results. Consider speaking with a qualified financial advisor before investing.</p>
    </motion.div>
  );
}
