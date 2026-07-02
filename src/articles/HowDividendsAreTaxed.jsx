import { motion } from "framer-motion";

const pageT = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.25, ease: "easeOut" } };
const FONT = `'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif`;

export default function HowDividendsAreTaxed({ t, navigate }) {
  const h2 = { fontSize:22, fontWeight:700, color:t.tx, marginTop:40, marginBottom:12, letterSpacing:"-0.01em" };
  const p = { fontSize:15, lineHeight:1.7, color:t.tx2, margin:"0 0 16px 0" };
  const b = { fontWeight:600, color:t.tx };
  const a = { color:t.ac, textDecoration:"underline" };
  const faqQ = { fontSize:16, fontWeight:600, color:t.tx, margin:"0 0 6px 0" };

  return (
    <motion.div key="article:how-dividends-are-taxed" {...pageT} style={{ maxWidth:800, margin:"0 auto", padding:"48px 24px 60px" }}>
      <h1 style={{ fontSize:32, fontWeight:700, marginBottom:8, letterSpacing:"-0.02em" }}>How Dividends Are Taxed (and What DRIP Does to the Bill)</h1>
      <p style={{ fontSize:12, color:t.tx3, marginBottom:32 }}>Written by Zahid Rehman · Updated July 2026</p>

      <p style={p}>Dividends can be taxed, but how much you owe depends on three things: what kind of account you hold them in, what kind of dividend it is, and how much total income you have. Get the account right and you might pay nothing at all.</p>
      <p style={p}>This article walks through all three in plain language, points out the one mistake that surprises almost everyone (you can owe tax on dividends you never spent), and shows how to model your own tax situation in the calculator. Tax rules change every year and vary by state, so treat this as a starting map, not the final word — and check current figures on <a href="https://www.irs.gov/taxtopics/tc404" target="_blank" rel="noopener noreferrer" style={a}>IRS.gov</a>.</p>

      <h2 style={h2}>The biggest lever: which account holds the dividend</h2>
      <p style={p}>Before any rate or rule, this is the decision that matters most.</p>
      <p style={p}><strong style={b}>In a tax-advantaged retirement account</strong> — a Roth IRA, a traditional IRA, a 401(k) — your dividends generally aren't taxed as they're paid. They just reinvest and compound, year after year, with no yearly tax bill. In a <strong style={b}>Roth</strong> specifically, qualifying withdrawals in retirement come out completely tax-free. The dividends were never taxed going in over the decades, and they're not taxed coming out.</p>
      <p style={p}><strong style={b}>In a regular taxable brokerage account</strong>, dividends are taxed in the year you receive them, every year, whether you spend them or not.</p>
      <p style={p}>That difference is enormous over thirty years, because tax taken out each year is money that never gets to compound. It's also why the same investment can look very different in the calculator depending on the account — which we'll get to at the end.</p>
      <p style={p}>So the simplest tax strategy most people have available: hold dividend investments inside a retirement account when you can.</p>

      <h2 style={h2}>Two kinds of dividends: qualified and ordinary</h2>
      <p style={p}>Inside a taxable account, the tax rate depends on whether your dividend is "qualified" or "ordinary." The gap between them is large.</p>
      <p style={p}><strong style={b}>Qualified dividends</strong> get the friendly treatment. Per the IRS, they're taxed at the <a href="https://www.irs.gov/taxtopics/tc409" target="_blank" rel="noopener noreferrer" style={a}>long-term capital gains rates of 0%, 15%, or 20%</a> — the same low rates that apply to investments held a long time.</p>
      <p style={p}><strong style={b}>Ordinary dividends</strong> (also called nonqualified) are <a href="https://www.irs.gov/taxtopics/tc404" target="_blank" rel="noopener noreferrer" style={a}>taxed at your regular income tax rate</a>, the same rate as your paycheck — which can run as high as 37%.</p>
      <p style={p}>Same $1,000 in dividends. If it's qualified and you're a typical earner, you might owe $150. If it's ordinary, you could owe more than double that. The label does real work.</p>
      <p style={p}>The good news: most dividends from regular U.S. stocks and broad index funds, held for a while, are qualified. Your brokerage sorts this out for you and reports it on a tax form called a 1099-DIV.</p>

      <h2 style={h2}>What makes a dividend "qualified"</h2>
      <p style={p}>Two tests decide it.</p>
      <p style={p}><strong style={b}>The payer test.</strong> The dividend has to come from a U.S. corporation or a qualifying foreign one. Most large U.S. companies and the funds that hold them pass this easily. A notable exception: <strong style={b}>REITs</strong> (real estate investment trusts) and <strong style={b}>MLPs</strong> (master limited partnerships) usually pay <em>ordinary</em> dividends, because of how they're structured — so a high-yielding REIT fund may come with a higher tax rate than its yield suggests.</p>
      <p style={p}><strong style={b}>The holding-period test.</strong> You have to actually hold the stock for a while. The IRS rule is that you must <a href="https://www.irs.gov/pub/irs-news/ir-04-022.pdf" target="_blank" rel="noopener noreferrer" style={a}>hold the stock for more than 60 days during the 121-day period that begins 60 days before the ex-dividend date</a>. In plain terms, roughly 61 days of holding around the dividend. Buy a stock, grab the dividend, and sell a few days later, and that dividend gets bumped down to ordinary rates. The rule exists to reward actual investors over quick in-and-out traders. (The ex-dividend date is the cutoff for <em>receiving</em> a dividend at all — <a href="/learn/what-is-a-dividend/" style={a}>here's how those dates work</a>.)</p>

      <h2 style={h2}>The rates, and the 0% bracket most people miss</h2>
      <p style={p}>Qualified dividends use the long-term capital gains rates: <strong style={b}>0%, 15%, or 20%</strong>, depending on your total taxable income.</p>
      <p style={p}>Here's the part worth knowing. The 0% rate is real. For the <strong style={b}>2026 tax year</strong> (per IRS Rev. Proc. 2025-32), a single filer with taxable income up to <strong style={b}>$49,450</strong> — or a married couple filing jointly up to <strong style={b}>$98,900</strong> — pays <strong style={b}>0% federal tax</strong> on qualified dividends. If your income sits below those lines, your qualified dividends are federally tax-free.</p>
      <p style={p}>Most middle-income investors land in the <strong style={b}>15%</strong> band, which for 2026 runs up to $545,500 for single filers and $613,700 for joint filers. The <strong style={b}>20%</strong> rate only kicks in above that. Very high earners may also owe an extra <strong style={b}>3.8%</strong> surtax called the Net Investment Income Tax (on income over $200,000 single / $250,000 joint), pushing the top effective rate to about 23.8%.</p>
      <div style={{ background:t.sf, border:`1px solid ${t.bd2}`, borderRadius:16, padding:"18px 22px", margin:"20px 0" }}>
        <p style={{ ...p, margin:0 }}><strong style={b}>These dollar thresholds change every year.</strong> The IRS adjusts them for inflation, and they differ by filing status. The figures above are for tax year 2026 — always confirm the current year's numbers on <a href="https://www.irs.gov/taxtopics/tc409" target="_blank" rel="noopener noreferrer" style={a}>IRS.gov</a> before relying on them, and remember your state may tax dividends too.</p>
      </div>

      <h2 style={h2}>The DRIP surprise: tax on money you never touched</h2>
      <p style={p}>This one catches almost every new investor.</p>
      <p style={p}>If you reinvest your dividends automatically (a <a href="/learn/what-drip-does-to-your-returns/" style={a}>DRIP</a>) inside a <em>taxable</em> account, those dividends are <strong style={b}>still taxable</strong> in the year they're paid — even though the cash never reached your pocket. The money went straight into buying more shares, and you still owe tax on it.</p>
      <p style={p}>It feels unfair, but the logic is consistent: the IRS treats the dividend as income the moment it's paid to you. What you chose to do with it afterward — spend it or reinvest it — doesn't change that.</p>
      <p style={p}>There's a silver lining. Those reinvested dividends raise your <strong style={b}>cost basis</strong> — the total you've effectively paid into the investment. So when you eventually sell, you won't be taxed again on the same money. (And in a Roth or IRA, none of this applies — reinvested dividends aren't taxed as they go.)</p>

      <h2 style={h2}>Capital gains tax: the other half</h2>
      <p style={p}>Dividends are taxed as you go. <strong style={b}>Capital gains tax</strong> is different — you only owe it when you <em>sell</em>, and only on your profit.</p>
      <p style={p}>When you sell, your gain is the sale price minus your cost basis. You're taxed on that gain, not on the whole value. And the rate depends on how long you held:</p>
      <p style={p}><strong style={b}>Held one year or less</strong> → short-term gain, taxed at your ordinary income rate.</p>
      <p style={p}><strong style={b}>Held more than one year</strong> → long-term gain, taxed at the same friendly 0%, 15%, or 20% as qualified dividends.</p>
      <p style={p}>This is exactly what the calculator's <strong style={b}>Walk-Away Value</strong> is showing you. It's a "what if you sold everything today" number — your full portfolio value, minus the capital gains tax you'd owe on the profit. You don't actually owe that tax until you sell, which is why your Portfolio Value and Walk-Away Value are the same when you set the capital gains rate to zero.</p>

      <h2 style={h2}>How to model your own taxes in the calculator</h2>
      <p style={p}>The tool has two tax inputs under Advanced Options, and now you know what they mean:</p>
      <p style={p}><strong style={b}>Div Tax</strong> — the rate on your dividends each year. Set it to <strong style={b}>0</strong> for a Roth or IRA. For a taxable account, set it to your qualified rate (often 15%), or higher if your dividends are ordinary.</p>
      <p style={p}><strong style={b}>Cap Gains Tax</strong> — the rate applied to your profit in the Walk-Away Value. Set it to <strong style={b}>0</strong> for a Roth, or your long-term rate (often 15%) for a taxable account.</p>

      <div style={{ background:t.sf, border:`1px solid ${t.bd2}`, borderRadius:16, padding:"24px 28px", margin:"28px 0" }}>
        <p style={{ ...p, margin:"0 0 16px 0" }}>Run the same investment twice — once with these at zero, once with real rates — and you'll see the cost of holding dividends in a taxable account instead of a sheltered one. That gap is the clearest argument for using retirement accounts there is.</p>
        <button onClick={() => navigate("calculator")} style={{ padding:"12px 24px", borderRadius:12, border:"none", background:t.ac, color:"#FFF", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>Open the Calculator</button>
      </div>

      <h2 style={h2}>The takeaway</h2>
      <p style={p}>The account decides the most: dividends in a Roth or IRA largely escape tax, while dividends in a taxable account are taxed every year. Inside a taxable account, qualified dividends get the low capital-gains rates and ordinary ones get your full income rate, with the difference hinging on what you own and how long you hold it. Reinvested dividends are still taxed the year they're paid. And because all of this shifts yearly and by state, the figures here are a map — confirm the specifics for your situation on IRS.gov or with a professional.</p>

      <h2 style={h2}>Frequently asked questions</h2>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Do I pay tax on dividends I automatically reinvested?</p>
        <p style={{ ...p, margin:0 }}>In a taxable account, yes — reinvested dividends are taxable the year they're paid, even though you didn't take the cash. In a Roth IRA or similar account, they're not taxed as they go.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>How do I know if my dividends are qualified or ordinary?</p>
        <p style={{ ...p, margin:0 }}>Your brokerage tells you. The 1099-DIV form they send each year splits your dividends into qualified and ordinary, so you don't have to track it yourself.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Are dividends from ETFs and index funds qualified?</p>
        <p style={{ ...p, margin:0 }}>Usually, if the underlying stocks are U.S. companies and you've held the fund long enough. Funds built on REITs are the common exception — those distributions are generally taxed as ordinary income.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Do I owe dividend tax inside a Roth IRA?</p>
        <p style={{ ...p, margin:0 }}>No. Dividends inside a Roth aren't taxed as they're paid, and qualifying withdrawals in retirement are tax-free. That's what makes it such a powerful place to hold dividend investments.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Can I really pay 0% tax on dividends?</p>
        <p style={{ ...p, margin:0 }}>Yes — qualified dividends are taxed at 0% federally if your total taxable income is below the year's threshold ($49,450 single / $98,900 married filing jointly for tax year 2026). State tax may still apply, and the thresholds change yearly.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>When do I owe capital gains tax?</p>
        <p style={{ ...p, margin:0 }}>Only when you sell, and only on your profit. Hold for more than a year and that profit is taxed at the lower long-term rates; sell within a year and it's taxed as ordinary income. Until you sell, an unrealized gain isn't taxed.</p>
      </div>

      <p style={{ fontSize:12, color:t.tx3, fontStyle:"italic", lineHeight:1.6, margin:"40px 0 0 0", paddingTop:20, borderTop:`1px solid ${t.bd2}` }}>Dividend Forecaster is for educational and informational purposes only and is not tax or financial advice. Tax laws change frequently, thresholds are adjusted annually, and state taxes vary. The figures here reflect the 2026 federal tax year as a general guide and may not match your situation. Verify current rules at IRS.gov and consult a qualified tax professional before making decisions.</p>
    </motion.div>
  );
}
