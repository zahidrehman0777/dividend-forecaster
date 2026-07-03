import { motion } from "framer-motion";

const pageT = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.25, ease: "easeOut" } };
const FONT = `'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif`;

export default function AristocratsKings({ t, navigate }) {
  const h2 = { fontSize:22, fontWeight:700, color:t.tx, marginTop:40, marginBottom:12, letterSpacing:"-0.01em" };
  const p = { fontSize:15, lineHeight:1.7, color:t.tx2, margin:"0 0 16px 0" };
  const b = { fontWeight:600, color:t.tx };
  const a = { color:t.ac, textDecoration:"underline" };
  const faqQ = { fontSize:16, fontWeight:600, color:t.tx, margin:"0 0 6px 0" };

  return (
    <motion.div key="article:dividend-aristocrats-and-kings" {...pageT} style={{ maxWidth:800, margin:"0 auto", padding:"48px 24px 60px" }}>
      <h1 style={{ fontSize:32, fontWeight:700, marginBottom:8, letterSpacing:"-0.02em" }}>Dividend Aristocrats and Kings, Explained</h1>
      <p style={{ fontSize:12, color:t.tx3, marginBottom:32 }}>Written by Zahid Rehman · Updated July 2026</p>

      <p style={p}>Some companies have raised their dividend every single year for longer than most investors have been alive — through the dot-com crash, 2008, and a pandemic. The market keeps two informal honor rolls for them: <strong style={b}>Dividend Aristocrats</strong>, with 25-plus consecutive years of increases, and <strong style={b}>Dividend Kings</strong>, with 50-plus. This article covers what the lists actually require, what a streak genuinely proves, what it doesn't — and the fallen names that show why the second half matters.</p>

      <h2 style={h2}>What makes an Aristocrat</h2>
      <p style={p}>The <a href="https://www.spglobal.com/spdji/en/indices/dividends-factors/sp-500-dividend-aristocrats/" target="_blank" rel="noopener noreferrer" style={a}>S&amp;P 500 Dividend Aristocrats index</a> has three requirements: be a member of the S&amp;P 500, have increased the dividend every year for at least 25 consecutive years, and meet the index's size and liquidity rules. Not just <em>paid</em> a dividend for 25 years — <em>raised</em> it, every single year, without one skip.</p>
      <p style={p}>Entering 2026, the index holds <strong style={b}>69 companies</strong> — the largest the list has ever been. Out of the thousands of public companies in the U.S., that's roughly a one-in-a-hundred achievement. Three names joined for 2025 (FactSet, Erie Indemnity, and Eversource Energy), and the longest active streaks belong to Genuine Parts and Dover, tied at <strong style={b}>70 consecutive years</strong> of raises.</p>

      <h2 style={h2}>What makes a King</h2>
      <p style={p}>Dividend Kings clear a higher bar on one dimension and a lower bar on another: <strong style={b}>50-plus consecutive years</strong> of increases, with no S&amp;P 500 requirement at all. Any listed company qualifies, which is why the Kings list includes small utilities and industrial firms most people have never heard of alongside Coca-Cola, Johnson &amp; Johnson, and Procter &amp; Gamble.</p>
      <p style={p}>One honest wrinkle: unlike the Aristocrats, the Kings list isn't an official S&amp;P index — it's maintained by independent researchers, and the count varies by a few companies depending on who's counting and how they treat edge cases. As of 2026 the tallies run from the low fifties to the high fifties. Fifty years of raises means a company has increased its payout through every recession since the early 1970s — roughly seven of them.</p>

      <h2 style={h2}>What a streak actually proves</h2>
      <p style={p}>A multi-decade raise streak is one of the strongest signals that exists in dividend investing, for a mechanical reason: you cannot fake it. A company can dress up one year's earnings; it cannot conjure fifty consecutive years of growing cash payouts without a durable business underneath. The streak also creates its own discipline — no management team wants to be the one that breaks a 60-year record, so the dividend gets defended through bad years.</p>
      <p style={p}>The stress test worth knowing: in 2008, the Aristocrats index fell about <strong style={b}>21.9%</strong> while the S&amp;P 500 fell <strong style={b}>37%</strong>. Down badly — but meaningfully less, which is the pattern across most bear markets. Stability is the product these companies sell.</p>

      <h2 style={h2}>What a streak doesn't prove</h2>
      <p style={p}>This is the part most Aristocrat articles skip, and it's half the story.</p>
      <p style={p}><strong style={b}>Streaks end.</strong> Walgreens and 3M were both Aristocrats — decades-long raisers, permanent-looking fixtures — until their businesses deteriorated and the dividends were cut. Membership is a track record, not a warranty. The list you buy today is survivorship in motion.</p>
      <p style={p}><strong style={b}>A streak says nothing about the price you're paying</strong> or the return you'll get. In recent years the Aristocrats have lagged the tech-heavy S&amp;P 500 badly, for a structural reason: only a couple of Aristocrats are technology companies, while tech has driven most of the index's gains. You're buying consistency, and consistency has been out of fashion.</p>
      <p style={p}><strong style={b}>Some raises are technicalities.</strong> A company can keep a streak alive with a token increase of a cent — the streak survives, but the income barely moves. And the list mechanics involve human judgment calls: Kenvue was granted Aristocrat status on the strength of Johnson &amp; Johnson's history when it was spun off, a decision reasonable people dispute. These are curated lists, not laws of nature.</p>
      <p style={p}><strong style={b}>Aristocrats often yield less than you'd expect.</strong> Many pay 2–3% — the appeal is the <em>growth and reliability</em> of the payment, not its starting size. If you're comparing a growing 2.5% against a static high yield, that's the classic fork. (<a href="/learn/dividend-yield-vs-dividend-growth/" style={a}>The full yield-versus-growth trade-off.</a>)</p>

      <h2 style={h2}>How people invest in them</h2>
      <p style={p}>Two routes. Pick individual names — most Aristocrat lists are public and updated annually — or buy the whole index at once through an ETF (NOBL holds all the S&amp;P 500 Aristocrats in a single fund). The single-fund route trades away selectivity for instant diversification across all 69, which also softens the blow when any one streak breaks. Neither route is "right"; they're the usual concentration-versus-diversification choice wearing a dividend costume.</p>

      <div style={{ background:t.sf, border:`1px solid ${t.bd2}`, borderRadius:16, padding:"24px 28px", margin:"28px 0" }}>
        <p style={{ ...p, margin:"0 0 16px 0" }}>Take any Aristocrat's real numbers — its current yield and its dividend growth rate from the company's own investor page — and project what a position pays in 10, 20, 30 years. A 2.5% yield growing 8% a year tells a very different story at year 25 than it does at year one.</p>
        <button onClick={() => navigate("calculator")} style={{ padding:"12px 24px", borderRadius:12, border:"none", background:t.ac, color:"#FFF", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>Open the Calculator</button>
      </div>

      <h2 style={h2}>The takeaway</h2>
      <p style={p}>Aristocrats and Kings are the closest thing dividend investing has to a proven track record: 25 and 50 consecutive years of raises, unfakeable and rare. The streak is real evidence of durability — and it is only evidence, not a guarantee, as Walgreens and 3M holders learned. Use the lists the way they deserve to be used: as a high-quality starting screen for further judgment, not a substitute for it.</p>

      <h2 style={h2}>Frequently asked questions</h2>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>What's the difference between a Dividend Aristocrat and a Dividend King?</p>
        <p style={{ ...p, margin:0 }}>Aristocrats: 25+ consecutive years of dividend increases plus S&amp;P 500 membership. Kings: 50+ years, any listed company. A company can be both — Coca-Cola and Procter &amp; Gamble are.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>How many Dividend Aristocrats are there?</p>
        <p style={{ ...p, margin:0 }}>69 as of 2026 — the most in the index's history. The Kings count sits in the fifties, varying slightly by source since it's not an official index.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Do Aristocrats beat the market?</p>
        <p style={{ ...p, margin:0 }}>Not reliably, and not recently — they've lagged the tech-heavy S&amp;P 500 over the last decade. Their historical pattern is falling less in bear markets and delivering steadier income, not winning bull markets.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Can an Aristocrat lose its status?</p>
        <p style={{ ...p, margin:0 }}>Yes — one skipped raise or one cut ends the streak. Walgreens and 3M are recent examples of long-time members whose dividends were ultimately cut.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Is there a fund that holds all the Aristocrats?</p>
        <p style={{ ...p, margin:0 }}>Yes — NOBL, an ETF that holds the S&amp;P 500 Dividend Aristocrats index. Check the fund's own page for its current fee and holdings before buying anything.</p>
      </div>
      <div style={{ marginBottom:20 }}>
        <p style={faqQ}>Does a long streak mean the dividend is safe?</p>
        <p style={{ ...p, margin:0 }}>Safer than average, not safe. The streak is strong evidence of a durable business and a committed management — and it can still end, which is exactly why diversification across many payers beats faith in any single one.</p>
      </div>

      <p style={{ fontSize:12, color:t.tx3, fontStyle:"italic", lineHeight:1.6, margin:"40px 0 0 0", paddingTop:20, borderTop:`1px solid ${t.bd2}` }}>Dividend Forecaster is for educational and informational purposes only and is not financial advice. Index membership, counts, and company details change over time and should be verified against current sources. Dividends are not guaranteed and can be cut, and past performance does not guarantee future results. Consider speaking with a qualified financial advisor before investing.</p>
    </motion.div>
  );
}
