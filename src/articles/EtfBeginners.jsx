import { motion } from "framer-motion";

const pageT = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.25, ease: "easeOut" } };
const FONT = `'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif`;

export default function EtfBeginners({ t, navigate }) {
  const h2 = { fontSize:22, fontWeight:700, color:t.tx, marginTop:40, marginBottom:12, letterSpacing:"-0.01em" };
  const p = { fontSize:15, lineHeight:1.7, color:t.tx2, margin:"0 0 16px 0" };
  const b = { fontWeight:600, color:t.tx };
  const a = { color:t.ac, textDecoration:"underline" };
  const inlineBtn = { background:"none", border:"none", padding:0, color:t.ac, textDecoration:"underline", cursor:"pointer", fontFamily:FONT, fontSize:15, lineHeight:1.7 };
  const faqQ = { fontSize:16, fontWeight:600, color:t.tx, margin:"0 0 6px 0" };

  const faqs = [
    { q:"Is $5,000 really enough to start?", a:"Yes. With fractional shares you can start with far less, and a one-time $5,000 left alone for decades has a long runway to compound. The amount matters less than the time you give it." },
    { q:"What if the market crashes right after I invest?", a:"It might. Markets fall 20–30% periodically, and it's never comfortable. Every major crash so far has been followed by a recovery, and the people who came out fine were the ones who held. Selling in a panic is what turns a temporary drop into a permanent loss." },
    { q:"How many ETFs do I actually need?", a:"Not many. A handful of broad funds can cover thousands of companies across the whole market. More funds isn't more diversification once you already own the market — it's just more to track." },
  ];

  return (
    <motion.div key="article:how-to-invest-in-etfs-for-beginners" {...pageT} style={{ maxWidth:800, margin:"0 auto", padding:"48px 24px 60px" }}>
      <h1 style={{ fontSize:32, fontWeight:700, marginBottom:8, letterSpacing:"-0.02em" }}>How to Invest in ETFs for Beginners</h1>
      <p style={{ fontSize:12, color:t.tx3, marginBottom:32 }}>Written by Zahid Rehman · Updated July 2026</p>

      <p style={p}>You've got money sitting in a savings account, and a nagging sense it should be doing more than earning almost nothing. Maybe it's $5,000. Maybe you're not even sure that's enough to bother with.</p>
      <p style={p}>It is. And the hard part was never the money — it's not knowing what to actually do with it.</p>
      <p style={p}>This guide fixes that. What an ETF is, in one plain sentence. How to tell a good one from a forgettable one. How to buy your first share. And the step almost every other guide skips: what to do <em>after</em> you buy, when every instinct you have is going to be wrong. We'll build a real three-fund example as we go, then run it thirty years forward so you can see how a single $5,000 might grow — and why the early years look so slow.</p>

      <h2 style={h2}>What an ETF actually is</h2>
      <p style={p}>An ETF — an exchange-traded fund — is a basket.</p>
      <p style={p}>That's the whole idea. Instead of buying one company and hoping you picked right, an ETF lets you own hundreds, sometimes thousands, of companies in a single purchase. If one company in the basket has a rotten year, the other 499 carry it. You get instant diversification without doing anything clever.</p>
      <p style={p}>A single stock is the opposite. Buy Apple, and you feel every good day and every bad one in full. The upside is bigger if you pick the winner. The downside is just as steep when you don't, and most people don't pick winners consistently.</p>
      <p style={p}>A mutual fund is also a basket, but a person is running it — deciding what goes in and what comes out. That sounds like a service until you see the bill. Actively managed mutual funds often charge somewhere between 0.5% and 1.5% a year, taken out whether the fund goes up, down, or nowhere. Stretch that across thirty years and the fee becomes one of the most expensive things you own — and because it's skimmed off automatically, you never feel it leave.</p>
      <p style={p}>An ETF sits in between. It's a basket like a mutual fund, but no one's steering it. It just tracks an index — the S&amp;P 500, the Nasdaq, the global market — and does whatever the index does. No manager making calls with your money. The cost reflects that: most index ETFs charge between 0.03% and 0.30% a year. A sliver of what a managed fund takes.</p>
      <p style={p}>That one number — the expense ratio — is the first thing to check before buying anything. Which brings us to how you actually choose.</p>

      <h2 style={h2}>The three filters</h2>
      <p style={p}>Every ETF worth owning clears three checks. Run them in order.</p>
      <p style={p}><strong style={b}>One: the expense ratio.</strong> This is the slice the fund takes every year, no matter what. A fund charging 1% takes $10 out of every $1,000 you hold, annually, in good years and bad. It doesn't sound like much. Over decades, against your compounding, it adds up to real money. Lower is better, and with index ETFs "lower" can mean almost nothing.</p>
      <p style={p}><strong style={b}>Two: what it actually tracks.</strong> Two funds can both wear the word "index" and own completely different things. One holds 500 companies; another holds 8,000. One is half technology; another spreads across every sector on earth. The name won't tell you. The index will. So before you buy, ask one question about every fund: what's actually inside this? Knowing the answer is also what keeps you calm when the market drops and you're deciding whether to hold or panic.</p>
      <p style={p}><strong style={b}>Three: a track record across real market cycles.</strong> Not last year's return — that tells you almost nothing. What you want is a fund whose index has lived through the dot-com crash, 2008, and the 2020 collapse, and climbed out of all three. That history is a signal the structure works and the companies inside it can recover. You're investing on a decades-long timeline, so look for something that's survived decades.</p>
      <p style={p}>Three filters. A low fee, a clear picture of what's inside, and a record that's been through the fire and come back.</p>

      <h2 style={h2}>Applying the filters: a worked example</h2>
      <p style={p}>To make this concrete, here's one three-fund example. Read it as an illustration of the filters in action — not a portfolio I'm telling you to buy. The point is the <em>thinking</em>, which you can apply to whatever funds you choose.</p>
      <p style={p}><strong style={b}>VOO — Vanguard S&amp;P 500 ETF.</strong> VOO <a href="https://investor.vanguard.com/investment-products/etfs/profile/voo" target="_blank" rel="noopener noreferrer" style={a}>tracks the S&amp;P 500</a>, an index of 500 of the largest U.S. companies — Apple, Microsoft, Nvidia, Amazon, and 496 others. Buy it and you own a slice of all of them at once. It <a href="https://investor.vanguard.com/investment-products/etfs/profile/voo" target="_blank" rel="noopener noreferrer" style={a}>charges 0.03% a year</a>, the cheapest fund in this example, and its index has recovered from every major crash of the last 25 years. Its job here is to be the foundation. The steady floor everything else stands on.</p>
      <p style={p}><strong style={b}>QQQ — Invesco QQQ ETF.</strong> QQQ <a href="https://www.invesco.com/qqq-etf/en/home.html" target="_blank" rel="noopener noreferrer" style={a}>tracks the Nasdaq-100</a> — the 100 biggest non-financial companies on the Nasdaq, with technology making up more than half the fund. It <a href="https://www.invesco.com/qqq-etf/en/market-outlook/whats-new-about-qqq.html" target="_blank" rel="noopener noreferrer" style={a}>charges 0.18% a year</a>. The difference between QQQ and VOO is concentration: the S&amp;P 500 spreads across every sector, while the Nasdaq-100 leans hard into a smaller set of growth companies. That concentration is why it has tended to outrun the S&amp;P 500 over long stretches — and why it falls harder when tech has a bad year. Its job is acceleration. VOO is the floor; QQQ pushes the ceiling up.</p>
      <p style={p}><strong style={b}>VXUS — Vanguard Total International Stock ETF.</strong> VXUS <a href="https://investor.vanguard.com/investment-products/etfs/profile/vxus" target="_blank" rel="noopener noreferrer" style={a}>tracks the FTSE Global All Cap ex US Index</a> — more than 8,000 companies outside the United States, across Europe, Japan, the UK, and emerging markets. It <a href="https://investor.vanguard.com/investment-products/etfs/profile/vxus" target="_blank" rel="noopener noreferrer" style={a}>charges 0.05% a year</a>. International stocks don't always move with U.S. stocks, so when America has a flat decade — and at some point it will — this is the piece that can hold steady or grow on its own. Its job is balance. At a small slice it won't drag the whole thing down, and it covers the rest of the world for almost nothing.</p>
      <p style={p}>Here's how the example splits a $5,000 starting amount. Half goes to VOO ($2,500), because that's where the stability lives and it frees the other two to take more risk. QQQ gets 30% ($1,500), enough to lift the long-term return without making the whole portfolio swing with the Nasdaq every quarter. VXUS gets the last 20% ($1,000) — a real position, not a token one.</p>
      <p style={p}>Blend the three together and the portfolio comes out at roughly a 1.18% dividend yield, a 7.00% dividend growth rate, and a 14.48% average annual share-price appreciation — and that last number is the one that does the heavy lifting over thirty years.</p>

      <h2 style={h2}>How to actually buy it</h2>
      <p style={p}>This is the part most guides skip. The process is shorter than you'd think — three steps.</p>
      <p style={p}><strong style={b}>Open a brokerage account.</strong> This is where your ETFs live — like a bank account, but it holds investments instead of cash. Any of the big brokerages (Fidelity, Schwab, and Vanguard among them) are free to open, with no minimums, and all of them carry the funds above. It takes about ten minutes online: a name, an address, a Social Security number, and a linked bank account.</p>
      <p style={p}><strong style={b}>Fund it.</strong> Move your money from your bank into the brokerage account. Most transfers land in one to three business days. It sits there as cash until you're ready — there's no rush to buy the same day.</p>
      <p style={p}>While you're in the settings, flip on <strong style={b}>automatic dividend reinvestment</strong>. It's usually a single toggle. With it on, the dividends your funds pay don't sit idle — they buy more shares on their own, which is where the long-term compounding comes from. (<button onClick={() => navigate("methodology")} style={inlineBtn}>Here's exactly how that compounding works</button> if you want the mechanics.) Turn it on once and forget it.</p>
      <p style={p}><strong style={b}>Buy the funds.</strong> Search the ticker — VOO, QQQ, VXUS — enter the dollar amount for each, and confirm. Under five minutes per fund.</p>
      <p style={p}>One note if you've got less than $5,000 right now: most major brokerages support <strong style={b}>fractional shares</strong>. You don't need enough to buy a whole share of anything. Put in $50, or $100, or whatever you have, and the brokerage buys the fraction it covers. The minimum isn't a share price. It's whatever you can spare today.</p>

      <h2 style={h2}>What to do after you buy</h2>
      <p style={p}>Now the most important part, and the one people get wrong.</p>
      <p style={p}>The account's funded, the funds are bought, and every instinct you have is about to tell you to <em>do something</em> — check the balance each morning, react to the headlines, shuffle money toward whatever's hot this month. That instinct is the single most expensive habit in investing.</p>
      <p style={p}>What you actually do next is mostly nothing. But "nothing" has three specific pieces.</p>
      <p style={p}><strong style={b}>Hold through the drops.</strong> The portfolio will fall. Not might — will. 20%, maybe 30%, at some point. Every major crash in history has been followed by a recovery. The people who lost money for good weren't the ones who held through it. They were the ones who sold near the bottom and never got back in.</p>
      <p style={p}><strong style={b}>Let the dividends keep reinvesting.</strong> You set this up already. Every quarter the funds pay dividends, those dividends buy more shares, and more shares pay more dividends next quarter. It runs in the background for years without you touching it.</p>
      <p style={p}><strong style={b}>Review once a year.</strong> Not daily. Not weekly. Once a year, open the account and check whether the balance between the funds has drifted. If QQQ went on a tear and now makes up 45% instead of 30%, sell a little and buy back the others to reset the mix. If nothing's moved much, close the app and get on with your life.</p>
      <p style={p}>That's the whole maintenance plan. One check a year, rebalance if it's drifted, leave everything else alone.</p>

      <h2 style={h2}>What that $5,000 could become</h2>
      <p style={p}>Before any numbers: read these as a model, not a forecast.</p>
      <p style={p}>The projection below assumes each fund keeps returning, on average, what it has returned historically — and the last decade or so was unusually strong, especially for technology. Real markets don't grow in a smooth line, and there's no guarantee the next thirty years look like the last. The honest use of a projection is to show you the <em>shape</em> of compounding, not to promise a balance. Treat the numbers as "what if these rates held," and use the calculator to plug in your own — including more conservative ones.</p>
      <p style={p}>With that said, here's the example portfolio — $5,000 in once, nothing added after, dividends reinvesting, in a tax-free account like a Roth IRA, run thirty years forward.</p>
      <p style={p}>Year one lands at about <strong style={b}>$5,770</strong>. Twelve months in, the $770 gain is the first sign of life, but compounding hasn't had room to build yet. This is what trips up most beginners: year one looks slow because it <em>is</em> slow. What matters isn't where it ends — it's what it starts.</p>
      <p style={p}>By year ten, it's near <strong style={b}>$22,100</strong>. You haven't added a dollar, and the original $5,000 has more than quadrupled. The momentum is real now.</p>
      <p style={p}>By year twenty, about <strong style={b}>$108,000</strong>. The same $5,000 that crept to $22,000 over the first decade nearly five-times itself over the second. That's compounding speeding up.</p>
      <p style={p}>Then year thirty: roughly <strong style={b}>$579,000</strong> — <em>if</em> those historical rates held for the whole stretch.</p>
      <p style={p}>Sit with that if. The model borrows its growth rates from an unusually strong period of market history, and the next thirty years get a vote. Run the same portfolio at more conservative rates and the ending balance comes out far smaller. What holds up in every version is the shape — a slow first decade, a faster second, a steep third. That shape is compounding doing its work, and it's the real lesson here, not the headline number.</p>

      <div style={{ background:t.sf, border:`1px solid ${t.bd2}`, borderRadius:16, padding:"24px 28px", margin:"28px 0" }}>
        <p style={{ ...p, margin:"0 0 16px 0" }}>Change any input and watch it recompute. Lower the growth rates to something more conservative, shorten the timeline, add a monthly contribution, switch on taxes — see what your own assumptions produce instead of these.</p>
        <button onClick={() => navigate("calculator")} style={{ padding:"12px 24px", borderRadius:12, border:"none", background:t.ac, color:"#FFF", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>Open the Calculator</button>
      </div>

      <p style={p}>A quick honest note on income: by year thirty this blend is also paying some dividends, but it's built for <em>growth</em>, not income — the dividend stream stays small because most of these funds barely pay one. Whether to chase a bigger balance or steadier income is a real fork, and it's the whole subject of <a href="/learn/dividend-yield-vs-dividend-growth/" style={a}>dividend yield vs. dividend growth</a>.</p>
      <p style={p}><strong style={b}>If you have a longer horizon and a stronger stomach</strong>, you could tilt the same $5,000 harder toward growth — swap the international fund for a technology one like VGT and lean further into the Nasdaq. On the same historical assumptions — which lean hardest on tech's recent run, the least repeatable part of this model — that mix projects closer to <strong style={b}>$1.41 million</strong> at thirty years. It's bigger because it's far more concentrated in tech, and it would fall harder, and more often, when tech turns. More upside for a rougher ride, with the caveat applying twice over.</p>

      <h2 style={h2}>The takeaway</h2>
      <p style={p}>The barrier was never the size of the deposit. It was not knowing the steps. Now you have them: three filters to choose with, ten minutes to open an account, and the discipline to do nothing once the money's in. The $5,000 isn't the hard part. Sitting still for thirty years is.</p>

      <h2 style={h2}>Frequently asked questions</h2>
      {faqs.map((f, i) => (
        <div key={i} style={{ marginBottom:20 }}>
          <p style={faqQ}>{f.q}</p>
          <p style={{ ...p, margin:0 }}>{f.a}</p>
        </div>
      ))}
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Should I turn on dividend reinvestment?</p>
        <p style={{ ...p, margin:0 }}>If your goal is long-term growth, yes — reinvesting compounds your returns automatically. If you need the dividends as cash to spend, you'd leave it off. You can model both and see the gap in the <button onClick={() => navigate("calculator")} style={inlineBtn}>calculator</button>.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Do I have to pay tax on this?</p>
        <p style={{ ...p, margin:0 }}>It depends on the account. In a Roth IRA or similar, qualifying withdrawals come out tax-free. In a regular taxable account, you'll owe tax on dividends and on gains when you sell. It's worth understanding before you start — <a href="/learn/how-dividends-are-taxed/" style={a}>here's how dividends are taxed</a>. (This is general information, not tax advice.)</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Can I start with less than $5,000?</p>
        <p style={{ ...p, margin:0 }}>Yes. Thanks to fractional shares, the real minimum is whatever you have to invest right now — $50 works. The example uses $5,000 to keep the math clean, not because it's a threshold.</p>
      </div>

      <p style={{ fontSize:12, color:t.tx3, fontStyle:"italic", lineHeight:1.6, margin:"40px 0 0 0", paddingTop:20, borderTop:`1px solid ${t.bd2}` }}>Dividend Forecaster is for educational and informational purposes only and is not financial advice. All projections are hypothetical, assume constant rates, and will differ from real results. Dividends are not guaranteed, and past performance does not guarantee future results. Consider speaking with a qualified financial advisor before investing.</p>
    </motion.div>
  );
}
