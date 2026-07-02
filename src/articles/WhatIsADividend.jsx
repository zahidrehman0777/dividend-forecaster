import { motion } from "framer-motion";

const pageT = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.25, ease: "easeOut" } };
const FONT = `'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif`;

export default function WhatIsADividend({ t, navigate }) {
  const h2 = { fontSize:22, fontWeight:700, color:t.tx, marginTop:40, marginBottom:12, letterSpacing:"-0.01em" };
  const p = { fontSize:15, lineHeight:1.7, color:t.tx2, margin:"0 0 16px 0" };
  const b = { fontWeight:600, color:t.tx };
  const a = { color:t.ac, textDecoration:"underline" };
  const inlineBtn = { background:"none", border:"none", padding:0, color:t.ac, textDecoration:"underline", cursor:"pointer", fontFamily:FONT, fontSize:15, lineHeight:1.7 };
  const faqQ = { fontSize:16, fontWeight:600, color:t.tx, margin:"0 0 6px 0" };

  return (
    <motion.div key="article:what-is-a-dividend" {...pageT} style={{ maxWidth:800, margin:"0 auto", padding:"48px 24px 60px" }}>
      <h1 style={{ fontSize:32, fontWeight:700, marginBottom:8, letterSpacing:"-0.02em" }}>What Is a Dividend? How Dividends Work</h1>
      <p style={{ fontSize:12, color:t.tx3, marginBottom:32 }}>Written by Zahid Rehman · Updated July 2026</p>

      <p style={p}>A dividend is a slice of a company's profit, paid out in cash to the people who own its stock. Own shares in a company that pays one, and you get a small cash payment — usually every three months — simply for holding the stock.</p>
      <p style={p}>This article covers what dividends are, why companies pay them, the dates that decide whether you actually get paid, and the one thing about dividends that surprises almost every beginner: they aren't quite the free money they look like.</p>

      <h2 style={h2}>Where a dividend comes from</h2>
      <p style={p}>When a company earns a profit, it has a choice. It can pour that money back into the business — new factories, hiring, research — or it can hand some of it to the people who own the company. Shareholders own the company. So a dividend is the company sharing its profit with its owners.</p>
      <p style={p}>Say you own 100 shares of a company, and it pays a dividend of $1 per share. Four times a year, $100 in cash lands in your account. You didn't sell anything. You didn't do anything. You held the stock, and the company paid you for it.</p>
      <p style={p}>Most dividends are paid in cash, on a regular schedule. In the U.S., that schedule is usually quarterly — once every three months.</p>

      <h2 style={h2}>Why some companies pay and others don't</h2>
      <p style={p}>Dividends tend to come from large, established, profitable companies. They've already done most of their growing, they throw off more cash than they need, and paying a dividend is a way to reward shareholders and signal confidence.</p>
      <p style={p}>Younger, fast-growing companies often pay no dividend at all. That's deliberate. They'd rather take every dollar of profit and reinvest it to grow faster — and many investors prefer that, because faster growth can push the share price up more than a dividend would pay out.</p>
      <p style={p}>Neither approach is better. They suit different goals — income now versus growth for later — which is a real fork worth understanding on its own. (We dig into it in <a href="/learn/dividend-yield-vs-dividend-growth/" style={a}>dividend yield vs. dividend growth</a>.)</p>

      <h2 style={h2}>Dividend yield: the number you'll see most</h2>
      <p style={p}>When people talk about how much a stock "pays," they usually mean its <strong style={b}>dividend yield</strong>.</p>
      <p style={p}>Yield is just the annual dividend divided by the share price, written as a percentage. A stock at $100 a share paying $3 a year in dividends has a 3% yield. The same $3 dividend on a $50 stock is a 6% yield.</p>
      <p style={p}>Yield is a quick way to compare income across different stocks. One thing to keep in mind: because yield depends on price, it moves when the price moves. If the share price drops, the yield goes <em>up</em> even though the dividend hasn't changed — which is why a very high yield is sometimes a warning sign, not a gift.</p>

      <h2 style={h2}>The four dates that decide if you get paid</h2>
      <p style={p}>Dividends run on a calendar of four dates. Only one of them really matters to you, but it helps to know all four.</p>
      <p style={p}><strong style={b}>Declaration date</strong> — the day the company announces the dividend: how much, and when it'll be paid.</p>
      <p style={p}><strong style={b}>Ex-dividend date</strong> — the cutoff. This is the one that matters.</p>
      <p style={p}><strong style={b}>Record date</strong> — the day the company checks its books to see who owns the stock.</p>
      <p style={p}><strong style={b}>Payment date</strong> — the day the cash actually shows up in your account.</p>
      <p style={p}>The rule that matters is simple. <a href="https://www.investor.gov/introduction-investing/investing-basics/glossary/ex-dividend-dates-when-are-you-entitled-stock-and" target="_blank" rel="noopener noreferrer" style={a}>Per the SEC</a>, if you purchase a stock on its ex-dividend date or after, you will not receive the next dividend payment; instead, the seller gets the dividend, and if you purchase before the ex-dividend date, you get the dividend. The ex-dividend date is usually set as the record date, or one business day before if the record date is not a business day.</p>
      <p style={p}>So the takeaway is short: <strong style={b}>own the stock before the ex-dividend date, and the dividend is yours.</strong> Buy it on the ex-date or later, and you'll get the dividend after the <em>next</em> cycle instead.</p>

      <h2 style={h2}>Are dividends free money? Not exactly</h2>
      <p style={p}>Here's the part almost no one tells beginners.</p>
      <p style={p}>On the ex-dividend date, the share price usually drops by about the amount of the dividend. <a href="https://www.investor.gov/introduction-investing/investing-basics/glossary/ex-dividend-dates-when-are-you-entitled-stock-and" target="_blank" rel="noopener noreferrer" style={a}>The SEC puts it plainly</a>: with a significant dividend, the price of a stock may fall by that amount on the ex-dividend date.</p>
      <p style={p}>Picture a $100 stock that pays a $2 dividend. On the ex-dividend date, it tends to open around $98. The $2 didn't vanish — it moved. It left the share price and arrived in your pocket as cash. For that one day, your total value is the same; the money just changed form.</p>
      <p style={p}>This is why a popular-sounding trick doesn't work: buy a stock right before the ex-date, collect the dividend, sell the next day. The price drop roughly cancels the dividend you received, so there's no free lunch. (Worse, you may owe tax on the dividend while holding a stock that just dropped.)</p>
      <p style={p}>Now the important balance, so you don't walk away thinking dividends are pointless. That price drop is a <em>single-day</em> mechanical adjustment. Over time, a healthy company keeps earning new profit, the price tends to recover, and the next dividend arrives, and the next. Across years, those dividends are a real and meaningful part of your return — especially when you reinvest them. The "not free money" point is only about that one-day timing trick, not about dividends as a long-term strategy.</p>

      <h2 style={h2}>What you can do with a dividend</h2>
      <p style={p}>Once a dividend hits your account, you have two choices.</p>
      <p style={p}><strong style={b}>Take the cash.</strong> Spend it, save it, or invest it somewhere else. This is what you want if you're living off your investments.</p>
      <p style={p}><strong style={b}>Reinvest it.</strong> Use it to automatically buy more shares of the same fund, which then pay their own dividends next time. This is called a DRIP, and over decades it's one of the most powerful settings in investing. (<a href="/learn/what-drip-does-to-your-returns/" style={a}>Here's exactly what DRIP does to your returns.</a>)</p>
      <p style={p}>Which one you pick depends on whether you're building wealth or living on it.</p>

      <h2 style={h2}>A quick word on taxes</h2>
      <p style={p}>Dividends can be taxable, and how much you owe depends on the type of dividend and the kind of account you hold it in. In a tax-free or tax-deferred account like a Roth IRA, you generally don't pay tax on them as they're paid. In a regular taxable account, you do — and "qualified" dividends are usually taxed at a lower rate than "ordinary" ones.</p>
      <p style={p}>That's the short version. The full picture, with current rates, is in <a href="/learn/how-dividends-are-taxed/" style={a}>how dividends are taxed</a>. (This is general information, not tax advice.)</p>

      <div style={{ background:t.sf, border:`1px solid ${t.bd2}`, borderRadius:16, padding:"24px 28px", margin:"28px 0" }}>
        <p style={{ ...p, margin:"0 0 16px 0" }}>Want to see what a given yield actually pays? Enter an amount and a dividend yield, and watch the income — then add dividend growth and a few years to see how it builds.</p>
        <button onClick={() => navigate("calculator")} style={{ padding:"12px 24px", borderRadius:12, border:"none", background:t.ac, color:"#FFF", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>Open the Calculator</button>
      </div>

      <h2 style={h2}>The takeaway</h2>
      <p style={p}>A dividend is profit a company pays you for owning its stock, usually as cash, usually every quarter. The date that matters is the ex-dividend date — own the stock before it, and the payment is yours. The share price drops by about the dividend on that day, so there's no one-day free lunch, but over years, dividends are a genuine part of what makes investing pay. Whether you take them as cash or reinvest them is the choice that shapes what your money does next.</p>

      <h2 style={h2}>Frequently asked questions</h2>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>How often are dividends paid?</p>
        <p style={{ ...p, margin:0 }}>In the U.S., most dividend-paying stocks and funds pay quarterly — four times a year. Some pay monthly, some twice a year, and a few pay once a year.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Do all stocks pay dividends?</p>
        <p style={{ ...p, margin:0 }}>No. Many large, established companies do, while younger growth companies often pay nothing and reinvest their profit instead. Neither is better — they suit different goals.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>What's a good dividend yield?</p>
        <p style={{ ...p, margin:0 }}>There's no single right number. Broad index funds often yield somewhere in the low single digits. A very high yield can be a red flag rather than a bonus, because it sometimes means the share price has fallen for a reason.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>When do I need to own a stock to get its dividend?</p>
        <p style={{ ...p, margin:0 }}>Before the ex-dividend date. If you buy on the ex-date or later, the seller keeps that dividend and you'll catch the next one instead.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Why did my stock drop on the day the dividend was paid?</p>
        <p style={{ ...p, margin:0 }}>That's normal. On the ex-dividend date, the price usually falls by about the dividend amount. The value simply moved from the share price into the cash you're being paid — your total didn't change.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Should I take dividends as cash or reinvest them?</p>
        <p style={{ ...p, margin:0 }}>Reinvest if you're building for the long term; take the cash if you need income to spend now. You can see the long-run difference in <a href="/learn/what-drip-does-to-your-returns/" style={a}>what DRIP does to your returns</a>.</p>
      </div>

      <p style={{ fontSize:12, color:t.tx3, fontStyle:"italic", lineHeight:1.6, margin:"40px 0 0 0", paddingTop:20, borderTop:`1px solid ${t.bd2}` }}>Dividend Forecaster is for educational and informational purposes only and is not financial advice. Dividends are not guaranteed, and past performance does not guarantee future results. Consider speaking with a qualified financial advisor before investing.</p>
    </motion.div>
  );
}
