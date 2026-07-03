import { motion } from "framer-motion";

const pageT = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.25, ease: "easeOut" } };
const FONT = `'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif`;

export default function YieldTraps({ t, navigate }) {
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
    <motion.div key="article:dividend-yield-traps" {...pageT} style={{ maxWidth:800, margin:"0 auto", padding:"48px 24px 60px" }}>
      <h1 style={{ fontSize:32, fontWeight:700, marginBottom:8, letterSpacing:"-0.02em" }}>Is a High Dividend Yield Good? Yield Traps Explained</h1>
      <p style={{ fontSize:12, color:t.tx3, marginBottom:32 }}>Written by Zahid Rehman · Updated July 2026</p>

      <p style={p}>A fund paying 12% sits next to a fund paying 4%. Same $10,000 gets you $1,200 a year from one and $400 from the other. Triple the income for the same money — it doesn't look like a decision at all.</p>
      <p style={p}>That's exactly what a yield trap is designed to look like. This article shows the mechanism that makes a huge yield appear right before the payout collapses, runs the actual 15-year cost of falling for one, and gives you the checks that catch most traps before you buy.</p>

      <h2 style={h2}>Why a giant yield is often a symptom, not a gift</h2>
      <p style={p}>Dividend yield is a fraction: annual dividend ÷ share price. It has two moving parts, and that's the whole problem — the yield can go <em>up</em> for a bad reason.</p>
      <p style={p}>If a $100 stock paying $4 sees its price fall to $40, the yield leaps from 4% to 10%. Nothing improved. The payout didn't grow a cent. The market marked the business down 60%, and the "great yield" is just old dividend divided by new, damaged price. Very often, a collapsed price means investors expect the dividend itself to be cut — so the double-digit yield you see advertised is frequently a payment that's about to stop existing at that size.</p>
      <p style={p}>That's the trap: <strong style={b}>the yield is highest at exactly the moment the dividend is least safe.</strong></p>

      <h2 style={h2}>What falling for one costs: a 15-year side-by-side</h2>
      <p style={p}>Two investments, $10,000 each, dividends taken as cash — because the person a trap catches is someone buying <em>for income</em>. The trap pays a <strong style={b}>12% yield</strong>, but the business is deteriorating: the payout shrinks 8% a year and the price slides 6% a year. The healthy fund pays just <strong style={b}>3.5%</strong>, growing 7% a year, with the price appreciating 6%.</p>

      <table style={tbl}>
        <thead>
          <tr>
            <th style={th}>Year</th>
            <th style={th}>Trap: income / value</th>
            <th style={th}>Healthy: income / value</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdB}>1</td><td style={td}>$1,104 / $9,400</td><td style={td}>$375 / $10,600</td></tr>
          <tr><td style={tdB}>5</td><td style={td}>$791 / $7,339</td><td style={td}>$491 / $13,382</td></tr>
          <tr><td style={tdB}>10</td><td style={td}>$521 / $5,386</td><td style={td}>$689 / $17,908</td></tr>
          <tr><td style={tdB}>15</td><td style={td}>$344 / $3,953</td><td style={tdB}>$966 / $23,966</td></tr>
        </tbody>
      </table>

      <p style={p}>Year one, the trap looks brilliant — nearly triple the income. Then every year is worse. By year ten the <em>healthy</em> fund out-pays it. By year fifteen the trap's income has fallen to $344 — a third of what it promised — and the $10,000 is worth $3,953.</p>
      <p style={p}>Here's the objection everyone raises: "but I collected big dividends the whole time." True — the trap paid out <strong style={b}>$10,491</strong> in total cash over the fifteen years. Add it to what's left of the principal and the whole position comes to about <strong style={b}>$14,444</strong>. The boring 3.5% fund, counting its cash the same way, sits at <strong style={b}>$32,915</strong>. The trap didn't just underperform. It paid you your own capital back in installments while the rest evaporated.</p>
      <p style={p}>One honesty note about this model: it lets the trap down <em>gently</em>, shrinking the dividend 8% a year in a smooth line. Real traps are usually uglier — the dividend holds, holds, holds, then gets cut 50% or suspended in one announcement, with the price collapsing before it. The smooth version, if anything, flatters the trap.</p>

      <h2 style={h2}>The checks that catch most traps</h2>
      <p style={p}><strong style={b}>Compare the yield to its neighborhood.</strong> Every category has a normal range. Broad index funds pay low single digits; dividend-focused funds a bit more. When something advertises two or three times its category's norm, the market is telling you it doubts the payout. An unusually high yield is a question, not an answer.</p>
      <p style={p}><strong style={b}>Check the payout ratio.</strong> This is the share of a company's earnings going out as dividends. Below ~60% leaves room for bad years; above 75% is stretched; above 100% means the company pays out more than it earns — which can't last. (One structural exception: REITs are legally required to distribute most of their income, so high ratios are normal <em>for them</em> — judge REITs against other REITs.)</p>
      <p style={p}><strong style={b}>Look at the price chart next to the dividend history.</strong> A stable dividend on top of a price that's fallen 50% is the classic trap silhouette — the yield looks amazing <em>because</em> the market has already voted on the business. Ask what the price knows that the yield hides.</p>
      <p style={p}><strong style={b}>Check whether the dividend has ever grown.</strong> A payout that's been flat or shrinking for years, dressed up by a falling price, is the opposite of the growing-payment engine that makes dividend investing work. (<a href="/learn/dividend-yield-vs-dividend-growth/" style={a}>Why growth usually beats a big static yield over time.</a>)</p>

      <h2 style={h2}>When high yield is legitimate</h2>
      <p style={p}>Not every big number is a trap, and pretending otherwise would be its own dishonesty. REITs run structurally higher yields because of how they're taxed. Covered-call funds convert potential price growth into distributions by design — the high payout is real, and the trade-off is capped upside, not hidden decay. Utilities and telecoms often sit at the high end of normal because they're mature and slow-growing. The difference between these and a trap isn't the number — it's whether the payout is <em>designed</em> or <em>distressed</em>. A 7% yield from a structure built to pay 7% is a choice. A 12% yield from a business the market just cut in half is a warning.</p>

      <div style={{ background:t.sf, border:`1px solid ${t.bd2}`, borderRadius:16, padding:"24px 28px", margin:"28px 0" }}>
        <p style={{ ...p, margin:"0 0 16px 0" }}>Model a trap yourself: set a high yield with negative dividend growth and negative appreciation, turn DRIP off, and watch fifteen years of "income" against the shrinking value. Then run the boring fund next to it.</p>
        <button onClick={() => navigate("calculator")} style={{ padding:"12px 24px", borderRadius:12, border:"none", background:t.ac, color:"#FFF", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>Open the Calculator</button>
      </div>

      <h2 style={h2}>The takeaway</h2>
      <p style={p}>Yield has two parts, and a soaring one usually means the price part broke. The honest test of a dividend investment is never today's percentage — it's whether the payment behind it is durable and growing. When a yield looks too good against everything around it, it almost always is; the market has simply priced in the bad news before the dividend announcement catches up.</p>

      <h2 style={h2}>Frequently asked questions</h2>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>What exactly is a yield trap?</p>
        <p style={{ ...p, margin:0 }}>A stock or fund whose high yield comes from a collapsed share price rather than a strong payout — making the dividend look generous at precisely the moment it's most likely to be cut.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Is there a specific yield number that means "trap"?</p>
        <p style={{ ...p, margin:0 }}>No hard line, but context does the work: a yield two or three times its category's normal range deserves suspicion. For broad equity funds, sustained double-digit yields are rare outside structures specifically built for distribution.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Are all REITs and covered-call funds yield traps?</p>
        <p style={{ ...p, margin:0 }}>No. Their higher yields are structural — REITs must distribute most income, and covered-call funds trade upside for payout by design. The trap test is whether the yield is by design or by distress.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>What's the fastest single check?</p>
        <p style={{ ...p, margin:0 }}>Price history next to dividend history. If the yield is high mainly because the price fell hard, you're looking at the trap silhouette.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Isn't collecting a big dividend fine even if the price falls?</p>
        <p style={{ ...p, margin:0 }}>The side-by-side above answers this: the trap paid $10,491 in cash and still finished $18,000 behind a boring fund, because the payments were partly your own capital coming back while the rest shrank.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>What's a payout ratio again?</p>
        <p style={{ ...p, margin:0 }}>The percentage of earnings a company pays as dividends. It's the quickest read on whether a dividend is comfortably funded or running on fumes.</p>
      </div>

      <p style={{ fontSize:12, color:t.tx3, fontStyle:"italic", lineHeight:1.6, margin:"40px 0 0 0", paddingTop:20, borderTop:`1px solid ${t.bd2}` }}>Dividend Forecaster is for educational and informational purposes only and is not financial advice. All projections are hypothetical, assume constant rates, and will differ from real results. Dividends are not guaranteed and can be cut, and past performance does not guarantee future results. Consider speaking with a qualified financial advisor before investing.</p>
    </motion.div>
  );
}
