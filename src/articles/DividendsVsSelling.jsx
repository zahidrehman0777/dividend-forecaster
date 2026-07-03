import { motion } from "framer-motion";

const pageT = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.25, ease: "easeOut" } };
const FONT = `'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif`;

export default function DividendsVsSelling({ t, navigate }) {
  const h2 = { fontSize:22, fontWeight:700, color:t.tx, marginTop:40, marginBottom:12, letterSpacing:"-0.01em" };
  const p = { fontSize:15, lineHeight:1.7, color:t.tx2, margin:"0 0 16px 0" };
  const b = { fontWeight:600, color:t.tx };
  const a = { color:t.ac, textDecoration:"underline" };
  const faqQ = { fontSize:16, fontWeight:600, color:t.tx, margin:"0 0 6px 0" };

  return (
    <motion.div key="article:living-off-dividends-vs-selling-shares" {...pageT} style={{ maxWidth:800, margin:"0 auto", padding:"48px 24px 60px" }}>
      <h1 style={{ fontSize:32, fontWeight:700, marginBottom:8, letterSpacing:"-0.02em" }}>Living Off Dividends vs. Selling Shares in Retirement</h1>
      <p style={{ fontSize:12, color:t.tx3, marginBottom:32 }}>Written by Zahid Rehman · Updated July 2026</p>

      <p style={p}>There are two basic ways to turn a portfolio into a paycheck. Spend only what it pays you — the dividends — and never sell a share. Or own whatever grows best and sell a slice each year, the approach behind the famous 4% rule. Dividend investors tend to treat the first as obviously right; the finance literature leans hard toward the second. Both sides overstate their case, and the practical answer for most retirees is a mix. Here's the honest version of each.</p>

      <h2 style={h2}>The dividends-only approach</h2>
      <p style={p}>The plan: build a portfolio yielding 3–4%, spend the dividends, leave the shares alone. Income arrives on schedule, the share count never shrinks, and there's nothing to decide each year — the portfolio tells <em>you</em> what you can spend.</p>
      <p style={p}>Its genuine superpower shows up in crashes. The selling approach's worst enemy is being forced to sell shares while prices are down — every share sold at the bottom is gone for the recovery. The dividend approach never faces that moment. In 2008–09, the worst income event in modern market history, S&amp;P 500 prices fell about 55% while dividends fell about 24% — brutal, and still less than half the damage the screen showed. In <em>ordinary</em> recessions, broad-market income barely dips at all. (<a href="/learn/what-a-market-crash-does-to-dividends/" style={a}>The full history of what crashes do to dividend income.</a>) A dividend-funded retirement rides through bear markets without ever selling into one.</p>

      <h2 style={h2}>Where dividends-only overpromises</h2>
      <p style={p}>Honesty requires the other side of that ledger.</p>
      <p style={p}><strong style={b}>"Never touch the principal" is partly an accounting illusion.</strong> A dividend isn't conjured from nowhere — when it's paid, the share price drops by about that amount (<a href="/learn/what-is-a-dividend/" style={a}>the mechanics</a>). Total return — growth plus payouts — is what funds every retirement; dividends are one way of packaging it, not a way of escaping it.</p>
      <p style={p}><strong style={b}>The yield constraint quietly caps the plan.</strong> A durable dividend portfolio pays 3–4%. Notice: that's the same spending rate the selling approach uses — but achieved by restricting yourself to the subset of the market that pays yield. You give up owning big non-payers and concentrate the portfolio to earn a spending rate the diversified version offers anyway. And stretching for more income than 4-ish percent leads directly into <a href="/learn/dividend-yield-traps/" style={a}>yield-trap territory</a>, where the income itself gets fragile.</p>
      <p style={p}><strong style={b}>Dividends get cut exactly when things are worst.</strong> The 24% of 2008 was real. A dividends-only plan needs the same margin of safety every plan needs — income comfortably above expenses, <a href="/learn/how-to-tell-if-a-dividend-is-safe/" style={a}>payers screened for durability</a> — or it's the screen-watching it claims to replace.</p>
      <p style={p}><strong style={b}>Taxable accounts tax the whole payout, every year,</strong> whether you needed all of it or not — while a seller chooses when to realize gains and is taxed only on the gain portion. (<a href="/learn/how-dividends-are-taxed/" style={a}>The tax mechanics.</a>) In sheltered accounts this difference mostly disappears.</p>

      <h2 style={h2}>The 4% rule, stated accurately</h2>
      <p style={p}>The selling approach's anchor is usually quoted as folklore, so here's what the research actually said. In 1994, <a href="https://retirementresearcher.com/safe-withdrawal-rates-for-retirement-and-the-trinity-study/" target="_blank" rel="noopener noreferrer" style={a}>William Bengen tested every rolling 30-year retirement</a> in modern U.S. market history and asked what first-year withdrawal rate — <em>adjusted upward for inflation every year after</em> — survived even the worst starting point. The answer was <strong style={b}>4.15%</strong>, which the world rounded down to 4%. The <a href="https://en.wikipedia.org/wiki/Trinity_study" target="_blank" rel="noopener noreferrer" style={a}>Trinity Study (1998)</a> reframed the same question as success rates: roughly 95% of historical 30-year retirements survived 4% inflation-adjusted withdrawals from a balanced stock-heavy portfolio.</p>
      <p style={p}>Three details the folklore drops. It's a <strong style={b}>30-year</strong> result, not forever — retire at 40 and the rule wasn't built for you. The <strong style={b}>inflation adjustment</strong> is the point — $40,000 from $1 million grows each year with prices; skipping that detail changes everything. And it was derived from the <strong style={b}>worst case</strong>: most historical retirees could have spent more, which is why Bengen himself has since revised his number upward — his recent work puts the worst-case rate near <strong style={b}>4.7%</strong>.</p>
      <p style={p}>The rule's structural weakness is the mirror of the dividend approach's strength: <strong style={b}>sequence-of-returns risk.</strong> A crash in the first years of retirement forces selling shares at depressed prices to fund the same inflation-adjusted spending, and those shares never recover for you. The rule survives that historically — surviving it is what the 4% was calibrated <em>on</em> — but the mechanism is exactly the forced-selling the dividend approach never faces.</p>

      <h2 style={h2}>The convergence nobody markets</h2>
      <p style={p}>Put the two side by side and something deflating appears: a durable dividend portfolio pays 3–4%; the accurate withdrawal rule says 4-to-4.7% inflation-adjusted from a diversified portfolio. <strong style={b}>The spending rates are the same band.</strong> Neither approach lets you spend meaningfully more than the other — because both are drawing on the same underlying engine, total market return, through different plumbing.</p>
      <p style={p}>So the real differences are behavioral and structural, not arithmetic: dividends-only never forces a sale into a crash and never requires a decision, at the cost of portfolio concentration and payout risk; selling keeps the whole market and controls taxes, at the cost of discipline and sequence risk. Which failure mode scares you more is the actual question.</p>
      <p style={p}>And most retirees, in practice, split it: <strong style={b}>spend the dividends first — a broad portfolio throws off 1.5–3% without trying — and sell small slices to top up the difference.</strong> The dividend floor covers the non-negotiable bills without selling; the top-ups stay small enough that a crash-year pause is painless. It's less pure than either camp's pitch, and it has the smaller version of both weaknesses instead of the full version of either.</p>

      <div style={{ background:t.sf, border:`1px solid ${t.bd2}`, borderRadius:16, padding:"24px 28px", margin:"28px 0" }}>
        <p style={{ ...p, margin:"0 0 16px 0" }}>The Live Off Dividends tab models the dividends side of this directly: your portfolio, your expenses growing with inflation, and the month the income line crosses over. Build the dividend floor there; whatever gap remains is the part a small sale — or a bigger portfolio — has to cover.</p>
        <button onClick={() => navigate("calculator")} style={{ padding:"12px 24px", borderRadius:12, border:"none", background:t.ac, color:"#FFF", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>Open the Calculator</button>
      </div>

      <h2 style={h2}>The takeaway</h2>
      <p style={p}>Dividends-only and the 4% rule end up permitting the same spending — a portfolio can't outrun its own total return through packaging. The dividend path buys crash-proof <em>behavior</em> (no forced sales, no decisions) and pays for it with concentration and cut risk; the selling path buys diversification and tax control and pays with sequence risk and discipline. The hybrid — a dividend floor under modest top-up sales — takes the smaller half of each cost, which is why it's what most real retirements quietly run on.</p>

      <h2 style={h2}>Frequently asked questions</h2>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Is living off dividends better than the 4% rule?</p>
        <p style={{ ...p, margin:0 }}>Neither dominates. Both settle into a 3–4.7% spending band because both draw on total market return. The dividend approach avoids forced selling in crashes; the selling approach keeps full diversification and tax timing. Most retirees blend them.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>What did the 4% rule study actually find?</p>
        <p style={{ ...p, margin:0 }}>Bengen (1994) found 4.15% — rounded to 4% — was the highest first-year withdrawal, adjusted for inflation annually, that survived the worst 30-year period in U.S. market history with a stock-heavy balanced portfolio. Trinity (1998) put ~95% odds on it across all periods. Bengen's later work revised the worst case toward 4.7%.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Does the 4% rule work for early retirement?</p>
        <p style={{ ...p, margin:0 }}>It was built on 30-year horizons. A 50-year retirement needs a lower rate or more flexibility — the original research simply doesn't cover it.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Can I live off dividends without touching my principal?</p>
        <p style={{ ...p, margin:0 }}>Functionally yes — you never sell shares. Mechanically, dividends are part of total return, not free money on top of it; the discipline is real, the "untouched principal" framing is partly mental accounting.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>What happens to each approach in a crash?</p>
        <p style={{ ...p, margin:0 }}>The dividend approach keeps paying (with a haircut in severe recessions — about 24% in 2008) and never sells at the bottom. The selling approach must either sell depressed shares or cut spending — sequence-of-returns risk, the scenario the 4% calibration exists to survive.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>What's the hybrid version?</p>
        <p style={{ ...p, margin:0 }}>Spend the portfolio's natural dividends first, sell small slices for the remainder, and pause the top-ups in crash years. A floor of never-sell income with a thin, flexible selling layer on top.</p>
      </div>

      <p style={{ fontSize:12, color:t.tx3, fontStyle:"italic", lineHeight:1.6, margin:"40px 0 0 0", paddingTop:20, borderTop:`1px solid ${t.bd2}` }}>Dividend Forecaster is for educational and informational purposes only and is not financial advice. Historical figures and research findings are approximate summaries of published studies and index records. All projections are hypothetical, assume constant rates, and will differ from real results. Dividends are not guaranteed and can be cut, and past performance does not guarantee future results. Consider speaking with a qualified financial advisor before investing.</p>
    </motion.div>
  );
}
