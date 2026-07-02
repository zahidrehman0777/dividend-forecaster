import { motion } from "framer-motion";

const pageT = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.25, ease: "easeOut" } };
const FONT = `'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif`;

export default function YieldVsGrowth({ t, navigate }) {
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
    <motion.div key="article:dividend-yield-vs-dividend-growth" {...pageT} style={{ maxWidth:800, margin:"0 auto", padding:"48px 24px 60px" }}>
      <h1 style={{ fontSize:32, fontWeight:700, marginBottom:8, letterSpacing:"-0.02em" }}>Dividend Yield vs. Dividend Growth: Which Matters More?</h1>
      <p style={{ fontSize:12, color:t.tx3, marginBottom:32 }}>Written by Zahid Rehman · Updated July 2026</p>

      <p style={p}>When you pick a dividend investment, you're really choosing between two things: how much it pays you <strong style={b}>now</strong>, and how fast that payment <strong style={b}>grows</strong>. Those are dividend yield and dividend growth, and they often pull in opposite directions.</p>
      <p style={p}>Here's the part that surprises people. A fund paying you just 1.5% today can end up paying you <em>more</em> than a fund paying 6% — more income, and a bigger balance. The catch is time. It can take nearly thirty years for the switch to happen. This article shows exactly when the slow-and-growing payment overtakes the big-but-flat one, and which approach fits which kind of investor.</p>

      <h2 style={h2}>The two numbers, in plain terms</h2>
      <p style={p}><strong style={b}>Dividend yield</strong> is what a fund pays right now, as a percentage of its price. A 6% yield on $10,000 pays you $600 a year today. (<a href="/learn/what-is-a-dividend/" style={a}>Here's a fuller look at yield</a> if you want the basics.)</p>
      <p style={p}><strong style={b}>Dividend growth</strong> is how fast that payment rises each year. A dividend growing 10% a year roughly doubles every seven years. A dividend growing 2% a year barely keeps up with inflation.</p>
      <p style={p}>Think of it as a paycheck. Yield is your starting salary. Growth is your annual raise. One job starts you at $639 a year with tiny raises. Another starts you at $167 with steep ones. Which job pays more over a career depends entirely on how long you stay.</p>

      <h2 style={h2}>The trade: income now, or income later</h2>
      <p style={p}>Most dividend investments lean one way or the other.</p>
      <p style={p}><strong style={b}>High yield, slow growth.</strong> These pay a lot up front — often older, slower-growing companies and funds. Great if you need income today. The downside is the payment creeps up slowly, so thirty years on, it may not look much bigger than it does now.</p>
      <p style={p}><strong style={b}>Low yield, fast growth.</strong> These pay little today but raise the payment quickly — often younger, faster-growing companies. The starting income is almost nothing, which tests your patience. But the payment can snowball into something far larger.</p>
      <p style={p}>You can't usually have both. A company handing you a big dividend today has less profit left to grow it. A company growing its dividend fast is usually keeping the payout small on purpose. That's the trade.</p>

      <h2 style={h2}>What happens over thirty years</h2>
      <p style={p}>Take two holdings, each starting with $10,000, dividends reinvested, run thirty years. One is the income type — a 6% starting yield, but the dividend grows slowly. The other is the growth type — just a 1.5% yield, but the dividend grows fast. Here's the income each pays per year:</p>

      <table style={tbl}>
        <thead>
          <tr>
            <th style={th}>Year</th>
            <th style={th}>High-yield holding</th>
            <th style={th}>Dividend-growth holding</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdB}>Year 1</td><td style={td}>$639</td><td style={td}>$167</td></tr>
          <tr><td style={tdB}>Year 10</td><td style={td}>$1,230</td><td style={td}>$454</td></tr>
          <tr><td style={tdB}>Year 20</td><td style={td}>$2,340</td><td style={td}>$1,420</td></tr>
          <tr><td style={tdB}>Year 30</td><td style={td}>$4,110</td><td style={tdB}>$4,620</td></tr>
        </tbody>
      </table>

      <p style={p}>Read that top to bottom. For the first <strong style={b}>twenty-plus years</strong>, the high-yield holding pays far more — nearly four times as much at the start, and still well ahead at year 20. If you needed income in that whole stretch, it's not close.</p>
      <p style={p}>Then, somewhere past year 20, the growth holding catches up and passes it. By year 30 it's paying <strong style={b}>more</strong> income, despite starting at a quarter of the yield. The steep raises finally outrun the big starting salary.</p>
      <p style={p}>It shows up in <strong style={b}>yield on cost</strong>, too — your current income measured against what you originally paid. The high-yield holding climbs from 6% to about 41%. The growth holding climbs from 2% to about 46%, ending higher. (Yield on cost is explained more in <a href="/learn/what-drip-does-to-your-returns/" style={a}>what DRIP does</a>, since reinvesting drives a lot of it.)</p>
      <p style={p}>One honest note on these numbers. The growth holding here also grows its <em>share price</em> faster, not just its dividend — which is why it ends up worth more in total ($178,000 versus $123,000). That's realistic: growth-style investments tend to appreciate faster as well as raise dividends faster. So this is a comparison of two real profiles, not a lab test of dividend growth in isolation. And as always, these are projections on steady assumptions — real dividends get cut, real growth rates wobble, and the fast rates are the least likely to hold for three full decades.</p>

      <h2 style={h2}>So which one is "better"?</h2>
      <p style={p}>Neither. They answer different questions, and the right choice depends on your timeline and what you need the money for.</p>
      <p style={p}><strong style={b}>Lean toward yield if you need income now.</strong> If you're retired, or close to it, and the dividends are meant to pay your bills, a higher starting yield does that job today. Waiting twenty-five years for a growth holding to catch up isn't useful if you need the cash this year.</p>
      <p style={p}><strong style={b}>Lean toward growth if you're decades from needing it.</strong> If you're young and building, the tiny starting income doesn't matter — you're not spending it anyway. What matters is where the payment lands in thirty years, and that's where fast growth wins. Reinvesting those growing dividends (<a href="/learn/what-drip-does-to-your-returns/" style={a}>with DRIP on</a>) compounds the effect.</p>
      <p style={p}><strong style={b}>Or hold both.</strong> Plenty of investors do — some growth holdings for the long climb, some higher-yield ones for steadier income — and shift the balance toward yield as they get closer to needing the money. It doesn't have to be one or the other.</p>

      <div style={{ background:t.sf, border:`1px solid ${t.bd2}`, borderRadius:16, padding:"24px 28px", margin:"28px 0" }}>
        <p style={{ ...p, margin:"0 0 16px 0" }}>Change the yield, the growth rate, and the years, and watch the crossover move. Shorten the timeline and the high-yield holding stays ahead the whole way. Stretch it out and growth takes over. Find the point that matches your own plan.</p>
        <button onClick={() => navigate("calculator")} style={{ padding:"12px 24px", borderRadius:12, border:"none", background:t.ac, color:"#FFF", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>Open the Calculator</button>
      </div>

      <h2 style={h2}>The takeaway</h2>
      <p style={p}>Yield is income now; growth is income later. A high starting yield wins for the first couple of decades, which is exactly what you want if you're living on the money. A fast-growing dividend wins the long game, which is what you want if you're decades from spending it. The "better" number is just the one that matches your timeline — and there's no rule against owning some of each.</p>

      <h2 style={h2}>Frequently asked questions</h2>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Is a higher dividend yield always better?</p>
        <p style={{ ...p, margin:0 }}>No. A very high yield can mean the share price has dropped for a reason, or that the dividend grows slowly. Yield tells you today's income, not what you'll be paid in twenty years.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>What's a good dividend growth rate?</p>
        <p style={{ ...p, margin:0 }}>It varies. Established dividend payers often grow their payout in the mid-single digits to low double digits a year. Look up a fund's actual dividend growth history before assuming a number — past growth isn't a promise, but it's a starting point.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Can a low-yield investment really out-earn a high-yield one?</p>
        <p style={{ ...p, margin:0 }}>Yes, given enough time. As the example shows, a fast-growing 1.5% dividend can overtake a flat 6% one — but it took more than twenty years. On a short timeline, the higher yield stays ahead.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Which should I pick if I'm just starting out and young?</p>
        <p style={{ ...p, margin:0 }}>If you won't touch the money for decades, dividend growth has the longer runway, and reinvesting those rising dividends compounds hard. But there's no wrong answer — many investors hold a mix.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Does it matter which account I hold these in?</p>
        <p style={{ ...p, margin:0 }}>Yes. A high-yield holding pays more taxable income each year, so in a taxable account it can mean a bigger yearly tax bill than a low-yield growth holding. In a Roth or IRA, that's not a concern. (<a href="/learn/how-dividends-are-taxed/" style={a}>Here's how dividends are taxed.</a>)</p>
      </div>

      <p style={{ fontSize:12, color:t.tx3, fontStyle:"italic", lineHeight:1.6, margin:"40px 0 0 0", paddingTop:20, borderTop:`1px solid ${t.bd2}` }}>Dividend Forecaster is for educational and informational purposes only and is not financial advice. All projections are hypothetical, assume constant rates, and will differ from real results. Dividends are not guaranteed and can be cut, and past performance does not guarantee future results. Consider speaking with a qualified financial advisor before investing.</p>
    </motion.div>
  );
}
