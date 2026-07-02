import { motion } from "framer-motion";

const pageT = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.25, ease: "easeOut" } };
const FONT = `'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif`;

export default function WhatDripDoes({ t, navigate }) {
  const h2 = { fontSize:22, fontWeight:700, color:t.tx, marginTop:40, marginBottom:12, letterSpacing:"-0.01em" };
  const p = { fontSize:15, lineHeight:1.7, color:t.tx2, margin:"0 0 16px 0" };
  const b = { fontWeight:600, color:t.tx };
  const a = { color:t.ac, textDecoration:"underline" };
  const inlineBtn = { background:"none", border:"none", padding:0, color:t.ac, textDecoration:"underline", cursor:"pointer", fontFamily:FONT, fontSize:15, lineHeight:1.7 };
  const faqQ = { fontSize:16, fontWeight:600, color:t.tx, margin:"0 0 6px 0" };
  const tbl = { width:"100%", borderCollapse:"collapse", margin:"0 0 24px 0", fontSize:14 };
  const th = { padding:"10px 12px", border:`1px solid ${t.bd2}`, fontWeight:600, color:t.tx, background:t.sf2, textAlign:"left" };
  const td = { padding:"10px 12px", border:`1px solid ${t.bd2}`, color:t.tx2 };
  const tdB = { ...td, fontWeight:600, color:t.tx };

  return (
    <motion.div key="article:what-drip-does-to-your-returns" {...pageT} style={{ maxWidth:800, margin:"0 auto", padding:"48px 24px 60px" }}>
      <h1 style={{ fontSize:32, fontWeight:700, marginBottom:8, letterSpacing:"-0.02em" }}>What DRIP Actually Does to Your Returns</h1>
      <p style={{ fontSize:12, color:t.tx3, marginBottom:32 }}>Written by Zahid Rehman · Updated July 2026</p>

      <p style={p}>DRIP stands for <strong style={b}>Dividend Reinvestment Plan</strong>. It's one setting in your brokerage account, and it decides what happens to your dividends — the cash a fund pays you for holding it. Leave the setting off, and those dividends land in your account as cash. Switch it on, and they automatically buy more shares for you.</p>
      <p style={p}>That sounds like a small choice. Run it for thirty years and it can roughly double what you end up with.</p>
      <p style={p}>This article shows you exactly that — the same money invested both ways — then explains why the gap gets so wide, and when leaving DRIP <em>off</em> is actually the smarter move.</p>

      <h2 style={h2}>What DRIP is, in plain terms</h2>
      <p style={p}>When you own a dividend-paying fund, it pays you a little cash on a schedule — usually every three months. That payment is a dividend.</p>
      <p style={p}>DRIP decides where that cash goes:</p>
      <p style={p}><strong style={b}>DRIP off</strong> — the dividend shows up as cash. You can spend it, save it, or invest it yourself later.</p>
      <p style={p}><strong style={b}>DRIP on</strong> — the dividend immediately buys more shares of the same fund, automatically, for free at most brokerages.</p>
      <p style={p}>Here's the part that matters. Those new shares pay their own dividends next time. Which buy more shares. Which pay more dividends. The cycle feeds itself in the background. (For a fuller walk-through of how each dividend is calculated month by month, see <button onClick={() => navigate("methodology")} style={inlineBtn}>how the projection works</button>.)</p>
      <p style={p}>That loop is the whole story. Let's put real numbers on it.</p>

      <h2 style={h2}>The same money, invested both ways</h2>
      <p style={p}>Take one example and run it twice — once with DRIP off, once with DRIP on, everything else identical.</p>
      <p style={p}>You start with <strong style={b}>$10,000</strong>, add <strong style={b}>$500 a month</strong>, and hold a fund that pays a <strong style={b}>3.5% dividend yield</strong> (it pays 3.5% of its price each year), with that dividend <strong style={b}>growing 7% a year</strong> and the share price <strong style={b}>rising 6% a year</strong>. You run it for <strong style={b}>thirty years</strong> inside a tax-free account like a Roth IRA. Over those thirty years you put in about <strong style={b}>$190,000</strong> of your own money, either way.</p>
      <p style={p}>Same money in. Here's where it lands.</p>

      <table style={tbl}>
        <thead>
          <tr>
            <th style={th}></th>
            <th style={th}>DRIP off</th>
            <th style={th}>DRIP on</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style={tdB}>Year 10</td><td style={td}>$99,000</td><td style={td}>$124,000</td></tr>
          <tr><td style={tdB}>Year 20</td><td style={td}>$259,000</td><td style={td}>$429,000</td></tr>
          <tr><td style={tdB}>Year 30</td><td style={tdB}>$545,000</td><td style={tdB}>$1,280,000</td></tr>
        </tbody>
      </table>

      <p style={p}>By year thirty, reinvesting the dividends added roughly <strong style={b}>$735,000</strong> — on top of the same $190,000 you put in either way. More than double the ending balance, from one toggle.</p>
      <p style={p}>Look at how the gap grows. At year 10 it's about $25,000. At year 20, $170,000. At year 30, $735,000. The gap doesn't grow steadily — it starts small and then runs away from itself. That's compounding: the longer it runs, the faster the distance widens.</p>
      <p style={p}><strong style={b}>One honest caveat before you get too excited.</strong> This gap is as large as it is partly because of the assumptions. A 3.5% yield, a full thirty years, and zero tax all make reinvesting look its best. In a regular taxable account, dividends get taxed <em>before</em> they can reinvest, which shrinks the effect (more on that in <a href="/learn/how-dividends-are-taxed/" style={a}>how dividends are taxed</a>). A lower yield shrinks it too. So the lesson isn't "DRIP always doubles your money." It's that reinvesting did the heavy lifting <em>here</em> — and the things that make that lift big or small are worth understanding before you count on it.</p>

      <h2 style={h2}>Why the gap gets that big</h2>
      <p style={p}>Same money went in both times. The only difference is what happened to the dividends. So where did an extra $735,000 come from?</p>
      <p style={p}>Shares.</p>
      <p style={p}>With DRIP off, you finish with about <strong style={b}>948 shares</strong>. With DRIP on, you finish with <strong style={b}>2,230 shares</strong>. Both started at 100. The difference — roughly 1,280 extra shares — is built entirely from dividends buying more shares, year after year, each new share then earning dividends of its own.</p>
      <p style={p}>Here's the cleanest way to see it. The dividend <em>per share</em> grew exactly the same in both cases — from about <strong style={b}>$3.50 a share</strong> at the start to roughly <strong style={b}>$27 a share</strong> by year thirty. Reinvesting didn't change the dividend per share at all. It changed <strong style={b}>how many shares you owned to collect that dividend on.</strong></p>
      <p style={p}>That's why the early years barely differ and the late years blow apart. Reinvested dividends in year one buy you a handful of extra shares. By year thirty, those shares have been buying more shares, which bought more shares, for three decades.</p>

      <h2 style={h2}>When DRIP is worth the most</h2>
      <p style={p}>Reinvesting pays off hardest under three conditions:</p>
      <p style={p}><strong style={b}>A long time horizon.</strong> The loop needs years to build. Look at year one in the example: $16,800 with DRIP off versus $17,100 with it on. Almost nothing. The magic is entirely in the back half.</p>
      <p style={p}><strong style={b}>A higher dividend yield.</strong> More dividend each round means more cash buying more shares. A fund that pays very little gives reinvestment less to work with.</p>
      <p style={p}><strong style={b}>A tax-free or tax-deferred account.</strong> In a Roth IRA or similar, no tax gets skimmed off your dividends before they reinvest, so the full amount compounds. (<a href="/learn/how-dividends-are-taxed/" style={a}>Here's how the tax side works</a>.)</p>
      <p style={p}>Put those together — young, investing through a Roth, decades from needing the money — and DRIP is doing more for you than almost any other single setting in your account.</p>

      <h2 style={h2}>When DRIP barely matters — or when "off" is the right call</h2>
      <p style={p}>Turning DRIP off is not a mistake. Sometimes it's the entire point.</p>
      <p style={p}><strong style={b}>If you'll need the money soon.</strong> Over a few years, the reinvestment loop never really gets going. The two paths look nearly identical early on, so DRIP isn't the lever that matters on a short timeline.</p>
      <p style={p}><strong style={b}>If you need the dividends to live on.</strong> This is the big one. Picture someone retired, using their dividends as income. Taking that cash is exactly what they built the portfolio for. In the example, the DRIP-off version still grows to $545,000 <em>and</em> pays about <strong style={b}>$25,300 a year</strong> in cash you can actually spend. The DRIP-on version ends bigger, but every dividend got reinvested — none of it reached your pocket.</p>
      <p style={p}>So the real difference is the job you're asking the money to do:</p>
      <p style={p}><strong style={b}>DRIP on</strong> is for <strong style={b}>building</strong>. You're growing the pile and don't need the cash yet.</p>
      <p style={p}><strong style={b}>DRIP off</strong> is for <strong style={b}>harvesting</strong>. The portfolio is paying for your life, and you want the income in hand.</p>
      <p style={p}>Neither is right or wrong. They're different stages. (Choosing between a bigger pile later and steadier income now is its own decision — it's the heart of <a href="/learn/dividend-yield-vs-dividend-growth/" style={a}>dividend yield vs. dividend growth</a>.)</p>

      <div style={{ background:t.sf, border:`1px solid ${t.bd2}`, borderRadius:16, padding:"24px 28px", margin:"28px 0" }}>
        <p style={{ ...p, margin:"0 0 16px 0" }}>Flip DRIP on and off and watch the year-30 number jump. Then make it realistic for you — lower the yield, shorten the timeline, switch on a tax rate — and see how much of that gap survives.</p>
        <button onClick={() => navigate("calculator")} style={{ padding:"12px 24px", borderRadius:12, border:"none", background:t.ac, color:"#FFF", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>Open the Calculator</button>
      </div>

      <h2 style={h2}>The takeaway</h2>
      <p style={p}>DRIP is a single setting, free to turn on, and on a long enough timeline it does an enormous amount of work in the background. It is not free money, and it is not always the right choice — if you need the cash, take it. But if you're building for the long run and don't need the dividends yet, leaving DRIP on may be the easiest high-impact decision you'll make.</p>

      <h2 style={h2}>Frequently asked questions</h2>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>What does DRIP stand for?</p>
        <p style={{ ...p, margin:0 }}>Dividend Reinvestment Plan. It automatically uses your dividends to buy more shares of the same fund, instead of paying them to you as cash.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Does reinvesting cost anything?</p>
        <p style={{ ...p, margin:0 }}>At most major brokerages, no — DRIP is free and buys fractional shares, so every cent of the dividend gets put to work.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Do I still owe tax on dividends I reinvested?</p>
        <p style={{ ...p, margin:0 }}>In a regular taxable account, yes — this catches people out. Even though the cash never reached your pocket, reinvested dividends usually count as taxable income the year they're paid. In a Roth IRA or similar account, they aren't taxed that way. (<a href="/learn/how-dividends-are-taxed/" style={a}>More on dividend taxes here.</a> This is general information, not tax advice.)</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Can I turn DRIP on and off whenever I want?</p>
        <p style={{ ...p, margin:0 }}>Yes. It's a setting you can change at any time — many people reinvest while they're building, then switch it off later when they want the income.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Is DRIP automatic, or do I have to do it manually?</p>
        <p style={{ ...p, margin:0 }}>Once you switch it on, it's automatic. Every dividend reinvests on its own with no action from you.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Does DRIP work for ETFs, not just stocks?</p>
        <p style={{ ...p, margin:0 }}>Yes. It works for any dividend-paying investment, including the ETFs most beginners start with.</p>
      </div>

      <p style={{ fontSize:12, color:t.tx3, fontStyle:"italic", lineHeight:1.6, margin:"40px 0 0 0", paddingTop:20, borderTop:`1px solid ${t.bd2}` }}>Dividend Forecaster is for educational and informational purposes only and is not financial advice. All projections are hypothetical, assume constant rates, and will differ from real results. Dividends are not guaranteed, and past performance does not guarantee future results. Consider speaking with a qualified financial advisor before investing.</p>
    </motion.div>
  );
}
