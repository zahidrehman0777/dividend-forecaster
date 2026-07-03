import { motion } from "framer-motion";

const pageT = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.25, ease: "easeOut" } };
const FONT = `'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif`;

export default function LiveOffDividends({ t, navigate }) {
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
    <motion.div key="article:how-much-to-live-off-dividends" {...pageT} style={{ maxWidth:800, margin:"0 auto", padding:"48px 24px 60px" }}>
      <h1 style={{ fontSize:32, fontWeight:700, marginBottom:8, letterSpacing:"-0.02em" }}>How Much Do You Need to Live Off Dividends?</h1>
      <p style={{ fontSize:12, color:t.tx3, marginBottom:32 }}>Written by Zahid Rehman · Updated July 2026</p>

      <p style={p}>Here's the math in one line: your annual expenses, divided by your portfolio's dividend yield. Spend $3,000 a month — $36,000 a year — and at a 3.5% yield you need about <strong style={b}>$1,028,571</strong> invested. That's the whole formula. Everything else in this article is about what that number hides: how the yield you choose moves it by hundreds of thousands of dollars, how long it actually takes to build there, and why inflation keeps dragging the finish line as you run at it.</p>

      <h2 style={h2}>The formula, and what your number looks like</h2>
      <p style={p}>Living off dividends means your portfolio pays your bills without you selling shares. The portfolio stays intact; the income arrives on its own. To find your target, take what you spend in a year and divide by the yield you expect:</p>
      <p style={p}><strong style={b}>Portfolio needed = Annual expenses ÷ Dividend yield</strong></p>

      <table style={tbl}>
        <thead>
          <tr>
            <th style={th}>Monthly expenses</th>
            <th style={th}>At 3% yield</th>
            <th style={th}>At 3.5% yield</th>
            <th style={th}>At 4% yield</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdB}>$2,000</td><td style={td}>$800,000</td><td style={td}>$685,714</td><td style={td}>$600,000</td></tr>
          <tr><td style={tdB}>$3,000</td><td style={td}>$1,200,000</td><td style={td}>$1,028,571</td><td style={td}>$900,000</td></tr>
          <tr><td style={tdB}>$5,000</td><td style={td}>$2,000,000</td><td style={td}>$1,714,286</td><td style={td}>$1,500,000</td></tr>
        </tbody>
      </table>

      <p style={p}>Two things jump out of that table. First, the number is big — for most people, seven figures. Second, the yield assumption moves it enormously: at $3,000 a month, the difference between a 3% portfolio and a 4% portfolio is $300,000 of required savings.</p>
      <p style={p}>Which creates an obvious temptation: why not use a 8% or 10% yield and cut the target in half? Because unusually high yields are often a sign of trouble, not a gift — the dividend behind them tends to shrink or get cut, which defeats the entire plan. (<a href="/learn/dividend-yield-traps/" style={a}>Here's how yield traps work</a>, and why a smaller, growing payment usually beats a big fragile one.) The 3–4% range in the table reflects what broad, durable dividend portfolios have realistically paid.</p>

      <h2 style={h2}>Watching someone build toward it</h2>
      <p style={p}>A target number is abstract. Here's what the climb actually looks like — one modeled example, run through the calculator's engine.</p>
      <p style={p}>Say you start with <strong style={b}>$50,000</strong> saved, add <strong style={b}>$1,000 a month</strong>, and hold a portfolio with a <strong style={b}>3.5% yield</strong>, dividends <strong style={b}>growing 7% a year</strong>, prices <strong style={b}>appreciating 6% a year</strong>, everything reinvested, in a tax-sheltered account. Your expenses are <strong style={b}>$3,000 a month today</strong>, and they grow with <strong style={b}>3% inflation</strong> — because the bills you'll need to cover in twenty years are not today's bills.</p>

      <table style={tbl}>
        <thead>
          <tr>
            <th style={th}>Year</th>
            <th style={th}>Monthly dividend income</th>
            <th style={th}>Monthly expenses (inflated)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdB}>10</td><td style={td}>$1,039</td><td style={td}>$4,032</td></tr>
          <tr><td style={tdB}>15</td><td style={td}>$2,020</td><td style={td}>$4,674</td></tr>
          <tr><td style={tdB}>20</td><td style={td}>$3,727</td><td style={td}>$5,418</td></tr>
          <tr><td style={tdB}>25</td><td style={td}>$6,723</td><td style={td}>$6,281</td></tr>
          <tr><td style={tdB}>30</td><td style={tdB}>$12,031</td><td style={td}>$7,282</td></tr>
        </tbody>
      </table>

      <p style={p}>For twenty years, the income line loses. At year ten you're earning a quarter of what you spend. Even at year twenty — with over <strong style={b}>$1 million</strong> in the account — the dividends cover about two-thirds of the bills. Then the compounding catches the inflation: in this run, income crosses above expenses just before the <strong style={b}>25-year mark</strong> (the calculator pins it to the month — it calls this your <strong style={b}>freedom date</strong>). By year 30, income is running at $12,031 a month against $7,282 of expenses, and the gap widens every year after.</p>
      <p style={p}>Notice what the crossover actually required: not the $1 million. It required the <em>income</em> to outgrow the <em>expenses</em>, which took nearly a quarter century of contributions and reinvestment. That's the honest timescale for a middle-of-the-road saver, and it's why this is a long game and not a trick.</p>

      <div style={{ background:t.sf, border:`1px solid ${t.bd2}`, borderRadius:16, padding:"24px 28px", margin:"28px 0" }}>
        <p style={{ ...p, margin:"0 0 16px 0" }}>The Live Off Dividends tab runs this exact race for your own numbers — your starting amount, your contribution, your expenses, your inflation guess — and reports the month your income crosses over. Change the contribution and watch the date move; that's the most instructive slider in the whole tool.</p>
        <button onClick={() => navigate("calculator")} style={{ padding:"12px 24px", borderRadius:12, border:"none", background:t.ac, color:"#FFF", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>Open the Calculator</button>
      </div>

      <h2 style={h2}>The two things that move your date most</h2>
      <p style={p}><strong style={b}>Contributions, by a huge margin.</strong> Rerun the exact same scenario with no monthly contribution — just the $50,000 left to compound — and the crossover doesn't arrive at year 25. It arrives at <strong style={b}>year 39</strong>. The $1,000 a month didn't speed the date up a little; it pulled it fourteen years closer. In the early decades, what you add matters more than what the market does.</p>
      <p style={p}><strong style={b}>Inflation, quietly working against you.</strong> In the example, $3,000 of today's expenses became $6,098 by the crossover month. If the projection had compared dividend income against a <em>frozen</em> $3,000, the freedom date would have looked eleven-plus years earlier — and it would have been a lie. Any calculator (or article) that ignores inflation is flattering you. This one grows the expense line every month, which is why the target keeps moving and why the honest date is later than the naive one.</p>

      <h2 style={h2}>What the model can't promise</h2>
      <p style={p}>These figures are one modeled path, not a forecast. The run assumes steady rates — 7% dividend growth and 6% appreciation every single year for three decades — and real markets don't do steady. Dividends themselves are not guaranteed; in deep recessions even large, stable companies have cut them. A real plan holds a margin: a crossover that clears expenses with room to spare, not by $50. Treat your freedom date as a planning estimate that you re-run yearly, not an appointment.</p>

      <h2 style={h2}>The takeaway</h2>
      <p style={p}>The math is one division: annual expenses over yield. The realistic answer for most budgets is a seven-figure portfolio built over twenty-plus years, where contributions do most of the early work, reinvestment does the late work, and inflation moves the target the whole time. The number is big, but it's computable — and a target you can compute is a target you can track.</p>

      <h2 style={h2}>Frequently asked questions</h2>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>How much do I need to make $3,000 a month in dividends?</p>
        <p style={{ ...p, margin:0 }}>At a 3.5% portfolio yield, about $1,028,571. At 4%, $900,000. At 3%, $1.2 million. Annual expenses divided by yield gives your number for any budget.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Can I just buy 10% yield funds and retire on a third of the money?</p>
        <p style={{ ...p, margin:0 }}>That's the yield-trap temptation. Yields that high usually signal elevated risk of dividend cuts or price decline, and a cut breaks the whole plan. Most sustainable dividend portfolios yield in the low single digits.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Do I need to sell shares to live off dividends?</p>
        <p style={{ ...p, margin:0 }}>No — that's the defining feature. The dividends arrive as cash while the shares stay put. Whether that's better than selling a little each year is a real debate with arguments on both sides.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Does the calculator account for inflation?</p>
        <p style={{ ...p, margin:0 }}>Yes. The Live Off Dividends mode grows your expenses at the inflation rate you set, every month, and only declares a freedom date when income beats the <em>inflated</em> expense line.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>What if I can't invest $1,000 a month?</p>
        <p style={{ ...p, margin:0 }}>The date moves later, but the mechanics are identical. Run your real number — the point of the tool is seeing <em>your</em> timeline, not someone else's. Even the difference between $0 and $200 a month is dramatic over decades.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Is dividend income guaranteed once I reach the crossover?</p>
        <p style={{ ...p, margin:0 }}>No. Companies cut dividends in bad recessions, which is why a margin above bare expenses — and a diversified portfolio rather than a handful of high yielders — matters more the closer you get.</p>
      </div>

      <p style={{ fontSize:12, color:t.tx3, fontStyle:"italic", lineHeight:1.6, margin:"40px 0 0 0", paddingTop:20, borderTop:`1px solid ${t.bd2}` }}>Dividend Forecaster is for educational and informational purposes only and is not financial advice. All projections are hypothetical, assume constant rates, and will differ from real results. Dividends are not guaranteed and can be cut, and past performance does not guarantee future results. Consider speaking with a qualified financial advisor before investing.</p>
    </motion.div>
  );
}
