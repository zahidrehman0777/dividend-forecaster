import React, { useState, useMemo, useCallback, useEffect } from "react";
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import EtfBeginners from "./articles/EtfBeginners.jsx";
import WhatDripDoes from "./articles/WhatDripDoes.jsx";
import WhatIsADividend from "./articles/WhatIsADividend.jsx";
import YieldVsGrowth from "./articles/YieldVsGrowth.jsx";
import FidelityVsSchwab from "./articles/FidelityVsSchwab.jsx";
import HowDividendsAreTaxed from "./articles/HowDividendsAreTaxed.jsx";
import LiveOffDividends from "./articles/LiveOffDividends.jsx";
import YieldTraps from "./articles/YieldTraps.jsx";
import AristocratsKings from "./articles/AristocratsKings.jsx";
import FiveHundredAMonth from "./articles/FiveHundredAMonth.jsx";
import DividendSafety from "./articles/DividendSafety.jsx";
import PayoutFrequency from "./articles/PayoutFrequency.jsx";
import MarketCrashDividends from "./articles/MarketCrashDividends.jsx";
import LumpSumVsMonthly from "./articles/LumpSumVsMonthly.jsx";
import OneDollarADay from "./articles/OneDollarADay.jsx";
import DividendsVsSelling from "./articles/DividendsVsSelling.jsx";

// Article slug → component. Add here when scaffolding a new article.
const ARTICLE_COMPONENTS = {
  "how-to-invest-in-etfs-for-beginners": EtfBeginners,
  "what-drip-does-to-your-returns": WhatDripDoes,
  "what-is-a-dividend": WhatIsADividend,
  "dividend-yield-vs-dividend-growth": YieldVsGrowth,
  "fidelity-vs-schwab-index-funds": FidelityVsSchwab,
  "how-dividends-are-taxed": HowDividendsAreTaxed,
  "how-much-to-live-off-dividends": LiveOffDividends,
  "dividend-yield-traps": YieldTraps,
  "dividend-aristocrats-and-kings": AristocratsKings,
  "how-much-to-invest-for-500-a-month": FiveHundredAMonth,
  "how-to-tell-if-a-dividend-is-safe": DividendSafety,
  "monthly-vs-quarterly-dividends": PayoutFrequency,
  "what-a-market-crash-does-to-dividends": MarketCrashDividends,
  "lump-sum-vs-monthly-investing": LumpSumVsMonthly,
  "what-one-dollar-a-day-builds": OneDollarADay,
  "living-off-dividends-vs-selling-shares": DividendsVsSelling,
};

const ADS_ENABLED = false;

const FONT = `'SF Pro Display', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif`;

// Animation variants — subtle, no spring, max 0.4s
const pageT = { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.25, ease: "easeOut" } };
const modeT = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2, ease: "easeOut" } };
const cardContainer = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const cardItem = { hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } } };

// URL routing — keep in sync with the page state values used inside DividendForecasterV2.
// Articles under /learn/<slug> use page keys of the form "article:<slug>". To add an article:
// 1) add its slug + display title to ARTICLES here, 2) register a component for it in
// ARTICLE_COMPONENTS below, 3) add the route to prerender.js.
const ARTICLES = [
  { slug: "how-to-invest-in-etfs-for-beginners", title: "How to Invest in ETFs for Beginners — Dividend Forecaster" },
  { slug: "what-drip-does-to-your-returns", title: "What DRIP Actually Does to Your Returns — Dividend Forecaster" },
  { slug: "what-is-a-dividend", title: "What Is a Dividend? How Dividends Work — Dividend Forecaster" },
  { slug: "dividend-yield-vs-dividend-growth", title: "Dividend Yield vs. Dividend Growth: Which Matters More? — Dividend Forecaster" },
  { slug: "fidelity-vs-schwab-index-funds", title: "Fidelity vs. Schwab Index Funds: Which Is Actually Better? — Dividend Forecaster" },
  { slug: "how-dividends-are-taxed", title: "How Dividends Are Taxed (and What DRIP Does to the Bill) — Dividend Forecaster" },
  { slug: "how-much-to-live-off-dividends", title: "How Much Do You Need to Live Off Dividends? — Dividend Forecaster" },
  { slug: "dividend-yield-traps", title: "Is a High Dividend Yield Good? Yield Traps Explained — Dividend Forecaster" },
  { slug: "dividend-aristocrats-and-kings", title: "Dividend Aristocrats and Kings, Explained — Dividend Forecaster" },
  { slug: "how-much-to-invest-for-500-a-month", title: "How Much Do You Need to Invest for $500 a Month in Dividends? — Dividend Forecaster" },
  { slug: "how-to-tell-if-a-dividend-is-safe", title: "How to Tell If a Dividend Is Safe — Dividend Forecaster" },
  { slug: "monthly-vs-quarterly-dividends", title: "Monthly vs. Quarterly Dividends: Does Payout Frequency Matter? — Dividend Forecaster" },
  { slug: "what-a-market-crash-does-to-dividends", title: "What a Market Crash Actually Does to Dividend Income — Dividend Forecaster" },
  { slug: "lump-sum-vs-monthly-investing", title: "Lump Sum vs. Monthly Investing: Which Builds More? — Dividend Forecaster" },
  { slug: "what-one-dollar-a-day-builds", title: "What $1 a Day Actually Builds (and What It Doesn't) — Dividend Forecaster" },
  { slug: "living-off-dividends-vs-selling-shares", title: "Living Off Dividends vs. Selling Shares in Retirement — Dividend Forecaster" },
];
// PAGE_TO_PATH values are the URLs navigate() pushes into the history. Non-root paths
// use a trailing slash so client-side pushState matches Cloudflare's canonical URL
// (Pages 308-redirects /foo -> /foo/). PATH_TO_PAGE keys accept both /foo and /foo/ so
// a slash-less hit from an old link, the SSR loop (which passes slash-less routes), or
// a stray Cloudflare edge case still resolves cleanly.
const PAGE_TO_PATH = { calculator: "/", learn: "/learn/", methodology: "/methodology/", about: "/about/", contact: "/contact/", privacy: "/privacy/" };
const PATH_TO_PAGE = { "/": "calculator", "/learn": "learn", "/methodology": "methodology", "/about": "about", "/contact": "contact", "/privacy": "privacy" };
const PAGE_TITLES = {
  calculator: "Dividend Forecaster — Free Dividend Calculator",
  learn: "Learn — Dividend Forecaster",
  methodology: "Methodology — Dividend Forecaster",
  about: "About — Dividend Forecaster",
  contact: "Contact — Dividend Forecaster",
  privacy: "Privacy Policy — Dividend Forecaster",
  notfound: "Page Not Found — Dividend Forecaster",
};
for (const { slug, title } of ARTICLES) {
  const key = `article:${slug}`;
  const path = `/learn/${slug}`;
  PAGE_TO_PATH[key] = `${path}/`;
  PATH_TO_PAGE[path] = key;
  PAGE_TITLES[key] = title;
}
// Register trailing-slash aliases for every non-root path so direct hits with a
// trailing slash (Cloudflare's canonical form) resolve to the same page.
for (const [path, key] of Object.entries({ ...PATH_TO_PAGE })) {
  if (path !== "/" && !path.endsWith("/")) PATH_TO_PAGE[path + "/"] = key;
}

const L = { bg:"#FAFAFA", sf:"#FFF", sf2:"#F5F5F7", bd:"#E5E5EA", bd2:"#F0F0F2", tx:"#1D1D1F", tx2:"#6E6E73", tx3:"#AEAEB2",
  ac:"#0071E3", gn:"#34C759", gnB:"#F0FDF4", or:"#FF9500", orB:"#FFFBEB", pu:"#AF52DE", puB:"#FAF5FF", bl:"#007AFF", blB:"#EFF6FF",
  rd:"#FF3B30", rdB:"#FEF2F2", grid:"#F0F0F2", ttBg:"#FFF", ttBd:"#E5E5EA", sh:"0 1px 3px rgba(0,0,0,0.04),0 4px 12px rgba(0,0,0,0.03)",
  shL:"0 2px 8px rgba(0,0,0,0.04),0 8px 24px rgba(0,0,0,0.06)", inBg:"#FFF", inBd:"#D2D2D7", inF:"#0071E3", hd:"rgba(255,255,255,0.8)" };
const D = { bg:"#000", sf:"#1C1C1E", sf2:"#2C2C2E", bd:"#38383A", bd2:"#2C2C2E", tx:"#F5F5F7", tx2:"#98989D", tx3:"#636366",
  ac:"#0A84FF", gn:"#30D158", gnB:"rgba(48,209,88,0.1)", or:"#FF9F0A", orB:"rgba(255,159,10,0.1)", pu:"#BF5AF2", puB:"rgba(191,90,242,0.1)",
  bl:"#0A84FF", blB:"rgba(10,132,255,0.1)", rd:"#FF453A", rdB:"rgba(255,69,58,0.1)", grid:"#2C2C2E", ttBg:"#1C1C1E", ttBd:"#38383A",
  sh:"0 1px 3px rgba(0,0,0,0.3),0 4px 12px rgba(0,0,0,0.2)", shL:"0 2px 8px rgba(0,0,0,0.3),0 8px 24px rgba(0,0,0,0.3)",
  inBg:"#2C2C2E", inBd:"#48484A", inF:"#0A84FF", hd:"rgba(28,28,30,0.8)" };

const UNITS = ["","K","M","B","T","Q","Qi","Sx","Sp","Oc","No","Dc","UDc","DDc","TDc","QaDc","QiDc","SxDc","SpDc","OcDc","NoDc"];
const fmtBig = (n,pre="$",suf="") => {
  if(!isFinite(n)||isNaN(n)) return `${pre}0${suf}`;
  const a=Math.abs(n);
  if(a===0) return `${pre}0${suf}`;
  if(a<1) return `${pre}${n.toFixed(2)}${suf}`;
  if(a<1e3) return `${pre}${Math.round(n).toLocaleString()}${suf}`;
  const exp = Math.floor(Math.log10(a));
  const tier = Math.min(Math.floor(exp/3), UNITS.length-1);
  const div = Math.pow(10, tier*3);
  const val = n/div;
  const av = Math.abs(val);
  const label = UNITS[tier];
  if(av>=100) return `${pre}${Math.round(val)}${label}${suf}`;
  if(av>=10) { const s = val.toFixed(1); return `${pre}${s.endsWith('.0')?Math.round(val):s}${label}${suf}`; }
  { const s = val.toFixed(2); return `${pre}${s.endsWith('0')?val.toFixed(1).replace(/\.0$/,''):s}${label}${suf}`; }
};
const fmt = n => fmtBig(n,"$");
const fmtF = n => fmtBig(n,"$");
const fmtShares = n => fmtBig(n,"");
const pct = n => fmtBig(n,"","%");
const freqToMonthly = { daily:30.44, weekly:52/12, biweekly:26/12, monthly:1, quarterly:1/3, yearly:1/12 };
const freqLabels = { daily:"Daily", weekly:"Weekly", biweekly:"Bi-Weekly", monthly:"Monthly", quarterly:"Quarterly", yearly:"Yearly" };
const divFreqLabels = { monthly:"Monthly", quarterly:"Quarterly", semiannually:"Semi-Annually", annually:"Annually" };

const splitLabels = { none:"No Split", "2:1":"2 for 1", "3:1":"3 for 1", "5:1":"5 for 1", "10:1":"10 for 1" };
const splitMultiplier = { none:1, "2:1":2, "3:1":3, "5:1":5, "10:1":10 };

function runEngine(p) {
  const { lumpSum, contribAmt, contribFreq, years, divYield, divGrowth, appreciation, divTaxRate, capGainsTaxRate, drip, costOfLiving, inflation, divFrequency, expenseRatio, splitRatio, splitInterval, sharePrice: startPrice } = p;
  const data = [];
  const crossoverChartData = [];
  const monthlyAppreciation = Math.pow(1 + appreciation/100, 1/12) - 1;
  const monthlyInflation = Math.pow(1 + inflation/100, 1/12) - 1;
  const monthlyContrib = contribAmt * (freqToMonthly[contribFreq] || 1);
  const monthlyExpenseRate = (expenseRatio / 100) / 12;
  const divFreqMonths = { monthly:1, quarterly:3, semiannually:6, annually:12 };
  const divInterval = divFreqMonths[divFrequency] || 3;
  const payoutsPerYear = 12 / divInterval;
  const sMult = splitMultiplier[splitRatio] || 1;
  const splitEvery = (splitRatio !== "none" && splitInterval > 0) ? splitInterval * 12 : 0;
  const safePrice = startPrice > 0 ? startPrice : 1;
  let sharePrice = safePrice;
  let annualDivPerShare = safePrice * (divYield/100);
  let shares = lumpSum / safePrice;
  let totalContrib = lumpSum;
  let totalGrossDiv = 0, totalTaxPaid = 0, totalNetDiv = 0, totalFees = 0;
  let costBasis = lumpSum;
  let monthlyCost = costOfLiving;
  let crossoverMonth = -1;
  const totalMonths = years * 12;

  for (let m = 0; m <= totalMonths; m++) {
    // Annual dividend growth — applied once at the start of each new year
    if (m > 0 && m % 12 === 0) {
      annualDivPerShare *= (1 + divGrowth/100);
    }

    // Check for split
    if (splitEvery > 0 && m > 0 && m % splitEvery === 0) {
      shares *= sMult;
      sharePrice /= sMult;
      annualDivPerShare /= sMult;
    }

    const isDivMonth = m > 0 && m % divInterval === 0;
    const divPerPayout = annualDivPerShare / payoutsPerYear;
    const grossDiv = isDivMonth ? shares * divPerPayout : 0;
    const divTax = grossDiv * (divTaxRate/100);
    const netDiv = grossDiv - divTax;
    const portfolioValue = shares * sharePrice;
    const unrealizedGain = Math.max(0, portfolioValue - costBasis);
    const capGainsTax = unrealizedGain * (capGainsTaxRate/100);
    const walkAwayValue = portfolioValue - capGainsTax;
    const annualGrossDiv = shares * annualDivPerShare;
    const annualNetDiv = annualGrossDiv * (1 - divTaxRate/100);
    const monthlyNetDiv = annualNetDiv / 12;
    const yieldOnCost = totalContrib > 0 ? (annualGrossDiv / totalContrib) * 100 : 0;
    const annualFeesCost = portfolioValue * (expenseRatio / 100);

    if (isDivMonth) {
      totalGrossDiv += grossDiv;
      totalTaxPaid += divTax;
      totalNetDiv += netDiv;
    }

    const canLiveOff = monthlyNetDiv >= monthlyCost;
    if (crossoverMonth < 0 && m > 0 && canLiveOff) crossoverMonth = m;

    // Monthly data for crossover chart (lightweight)
    if (m > 0) {
      crossoverChartData.push({
        month: m,
        year: +(m/12).toFixed(2),
        netDivMonthly: +monthlyNetDiv.toFixed(2),
        monthlyCost: +monthlyCost.toFixed(2),
      });
    }

    if (m % 12 === 0 || m === totalMonths) {
      const isStart = m === 0;
      data.push({
        month: m, year: m/12,
        sharePrice: +sharePrice.toFixed(2),
        divPerShare: +(annualDivPerShare).toFixed(6),
        shares: +shares.toFixed(4),
        grossDivMonthly: isStart ? 0 : +(annualGrossDiv/12).toFixed(2),
        netDivMonthly: isStart ? 0 : +monthlyNetDiv.toFixed(2),
        taxMonthly: isStart ? 0 : +(annualGrossDiv/12 * divTaxRate/100).toFixed(2),
        grossDivAnnual: isStart ? 0 : +annualGrossDiv.toFixed(2),
        netDivAnnual: isStart ? 0 : +annualNetDiv.toFixed(2),
        portfolioValue: +portfolioValue.toFixed(2),
        walkAwayValue: isStart ? +portfolioValue.toFixed(2) : +walkAwayValue.toFixed(2),
        totalContrib: +totalContrib.toFixed(2),
        totalGrossDiv: isStart ? 0 : +totalGrossDiv.toFixed(2),
        totalTaxPaid: isStart ? 0 : +totalTaxPaid.toFixed(2),
        totalNetDiv: isStart ? 0 : +totalNetDiv.toFixed(2),
        totalFees: isStart ? 0 : +totalFees.toFixed(2),
        annualFees: isStart ? 0 : +annualFeesCost.toFixed(2),
        costBasis: +costBasis.toFixed(2),
        yieldOnCost: isStart ? 0 : +yieldOnCost.toFixed(2),
        monthlyCost: +monthlyCost.toFixed(2),
        canLiveOff: isStart ? false : canLiveOff,
      });
    }

    if (m < totalMonths) {
      // Expense ratio drag (deducted from NAV monthly)
      const feeThisMonth = shares * sharePrice * monthlyExpenseRate;
      totalFees += feeThisMonth;
      sharePrice *= (1 - monthlyExpenseRate);

      sharePrice *= (1 + monthlyAppreciation);
      if (isDivMonth && drip) {
        const newDripShares = netDiv / sharePrice;
        shares += newDripShares;
        costBasis += netDiv;
      }
      const newContribShares = monthlyContrib / sharePrice;
      shares += newContribShares;
      totalContrib += monthlyContrib;
      costBasis += monthlyContrib;
      monthlyCost *= (1 + monthlyInflation);

      // Overflow protection — prevent Infinity only
      const CAP = 1e30;
      if (sharePrice > CAP) sharePrice = CAP;
      if (shares > CAP) shares = CAP;
      if (annualDivPerShare > CAP) annualDivPerShare = CAP;
      if (totalFees > CAP) totalFees = CAP;
      if (totalGrossDiv > CAP) totalGrossDiv = CAP;
      if (totalTaxPaid > CAP) totalTaxPaid = CAP;
      if (totalNetDiv > CAP) totalNetDiv = CAP;
      if (costBasis > CAP) costBasis = CAP;
    }
  }
  return { data, crossoverMonth, crossoverChartData };
}

const Tip = ({ active, payload, label, t, type }) => {
  if(!active||!payload?.length) return null;
  const dp = payload[0]?.payload;
  return (<div style={{ background:t.ttBg, border:`1px solid ${t.ttBd}`, borderRadius:12, padding:"12px 16px", boxShadow:t.shL, fontFamily:FONT, fontSize:13 }}>
    <div style={{ color:t.tx2, marginBottom:6, fontWeight:500 }}>Year {label}</div>
    {payload.map((p,i) => {
      const isDivLine = p.name?.includes("Net Dividend");
      return (<div key={i}>
        <div style={{ color:t.tx, display:"flex", alignItems:"center", gap:8, marginTop:4 }}>
          <div style={{ width:8, height:8, borderRadius:4, background:p.color }} />
          <span style={{ color:t.tx2 }}>{p.name}:</span>
          <span style={{ fontWeight:600 }}>{type==="pct"?`${p.value.toFixed(2)}%`:fmtF(p.value)}</span>
        </div>
        {isDivLine && dp && (<div style={{ marginLeft:16, marginTop:2, fontSize:11, color:t.tx3 }}>
          {p.dataKey?.includes("Annual") || p.dataKey?.includes("annual")
            ? `${fmtF(dp.netDivMonthly || 0)}/mo`
            : `${fmtF(dp.netDivAnnual || 0)}/yr`}
        </div>)}
      </div>);
    })}
  </div>);
};

const InputField = ({ label, unit, value, onChange, min, max, step, t, placeholder }) => {
  const [focused, setFocused] = useState(false);
  const [draft, setDraft] = useState("");
  const display = focused ? draft : (value === 0 || !Number.isFinite(value) ? "" : String(value));
  return (
    <div style={{ flex:"1 1 140px", minWidth:130 }}>
      <label style={{ display:"block", fontSize:11, fontWeight:600, color:t.tx2, marginBottom:5, letterSpacing:"0.03em", textTransform:"uppercase" }}>{label}</label>
      <div style={{ display:"flex", alignItems:"center", background:t.inBg, border:`1.5px solid ${t.inBd}`, borderRadius:10, overflow:"hidden", transition:"border-color 0.2s" }}>
        {unit && <span style={{ padding:"9px 0 9px 10px", color:t.tx3, fontSize:14, fontWeight:500, userSelect:"none" }}>{unit}</span>}
        <input type="text" inputMode="decimal" value={display} placeholder={focused ? "" : placeholder}
          onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if(e.key==="Enter") e.target.blur(); }}
          style={{ flex:1, border:"none", outline:"none", background:"transparent", padding:unit?"9px 10px 9px 4px":"9px 10px", fontSize:14, fontWeight:500, color:t.tx, fontFamily:FONT, width:"100%" }}
          onFocus={e => { setDraft(value === 0 || !Number.isFinite(value) ? "" : String(value)); setFocused(true); e.target.parentElement.style.borderColor = t.inF; }}
          onBlur={e => { setFocused(false); e.target.parentElement.style.borderColor = t.inBd; onChange(parseFloat(e.target.value)||0); }} />
      </div>
    </div>
  );
};

export default function DividendForecasterV2({ ssrPath } = {}) {
  const [dark, setDark] = useState(false);
  const t = dark ? D : L;
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
  // Gate DOM-measuring components (Recharts ResponsiveContainer) so they only render after mount.
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);
  const [page, setPage] = useState(() => {
    // Root resolves to calculator; unknown paths become "notfound" (no more soft-404s).
    if (typeof window === "undefined") {
      if (ssrPath === "/") return "calculator";
      return PATH_TO_PAGE[ssrPath] || "notfound";
    }
    if (window.location.pathname === "/") return "calculator";
    return PATH_TO_PAGE[window.location.pathname] || "notfound";
  });
  const navigate = useCallback((newPage) => {
    setPage(newPage);
    const newPath = PAGE_TO_PATH[newPage] || "/";
    if (typeof window !== "undefined" && window.location.pathname !== newPath) {
      window.history.pushState(null, "", newPath);
    }
  }, []);
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const newPage = path === "/" ? "calculator" : (PATH_TO_PAGE[path] || "notfound");
      setPage(newPage);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
  useEffect(() => { document.title = PAGE_TITLES[page] || PAGE_TITLES.calculator; }, [page]);
  const [mode, setMode] = useState("projection");
  const [projMode, setProjMode] = useState("single");
  const [chartTab, setChartTab] = useState("overview");
  const [breakdownAllYears, setBreakdownAllYears] = useState(false);
  const [goalTarget, setGoalTarget] = useState(0);
  const [goalGrowthRate, setGoalGrowthRate] = useState(0);
  const [demoYear, setDemoYear] = useState(0);
  const [demoPrice, setDemoPrice] = useState(100);
  const [selectedYear, setSelectedYear] = useState("all");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [inflationAdj, setInflationAdj] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [sharePriceFocused, setSharePriceFocused] = useState(false);
  const [sharePriceDraft, setSharePriceDraft] = useState("");
  const [cagrMode, setCagrMode] = useState("price");
  const [priceMethod, setPriceMethod] = useState("prices");
  const [cagr, setCagr] = useState(() => {
    const defaults = {
      startVal:0, endVal:0, years:0,
      startPrice:0, endPrice:0, priceYears:0,
      priceReturnPct:0, priceReturnYears:0,
      trStartPrice:0, trEndPrice:0, trYield:0, trYears:0,
      divStart:0, divEnd:0, divYears:0,
      goalStart:0, goalTarget:0, goalYears:0,
    };
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.size === 0) return defaults;
      const c = { ...defaults };
      if (params.get("csp")) c.startPrice = parseFloat(params.get("csp"));
      if (params.get("cep")) c.endPrice = parseFloat(params.get("cep"));
      if (params.get("cpy")) c.priceYears = parseFloat(params.get("cpy"));
      if (params.get("crp")) c.priceReturnPct = parseFloat(params.get("crp"));
      if (params.get("cry")) c.priceReturnYears = parseFloat(params.get("cry"));
      if (params.get("cds")) c.divStart = parseFloat(params.get("cds"));
      if (params.get("cde")) c.divEnd = parseFloat(params.get("cde"));
      if (params.get("cdy")) c.divYears = parseFloat(params.get("cdy"));
      if (params.get("cts")) c.trStartPrice = parseFloat(params.get("cts"));
      if (params.get("cte")) c.trEndPrice = parseFloat(params.get("cte"));
      if (params.get("cty")) c.trYield = parseFloat(params.get("cty"));
      if (params.get("ctr")) c.trYears = parseFloat(params.get("ctr"));
      if (params.get("cgs")) c.goalStart = parseFloat(params.get("cgs"));
      if (params.get("cgt")) c.goalTarget = parseFloat(params.get("cgt"));
      if (params.get("cgy")) c.goalYears = parseFloat(params.get("cgy"));
      return c;
    } catch { return defaults; }
  });

  const defaultInp = {
    ticker:"", lumpSum:0, contribAmt:0, contribFreq:"monthly", years:30, sharePrice:0,
    divYield:0, divGrowth:0, appreciation:0, expenseRatio:0, divTaxRate:0, capGainsTaxRate:0, drip:true,
    divFrequency:"quarterly", splitRatio:"none", splitInterval:0, costOfLiving:0, inflation:0,
  };

  const [inp, setInp] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.size === 0) return defaultInp;
      const parsed = { ...defaultInp };
      if (params.get("t")) parsed.ticker = params.get("t");
      if (params.get("l")) parsed.lumpSum = parseFloat(params.get("l"));
      if (params.get("c")) parsed.contribAmt = parseFloat(params.get("c"));
      if (params.get("cf")) parsed.contribFreq = params.get("cf");
      if (params.get("y")) parsed.years = parseInt(params.get("y"));
      if (params.get("sp")) parsed.sharePrice = parseFloat(params.get("sp"));
      if (params.get("dy")) parsed.divYield = parseFloat(params.get("dy"));
      if (params.get("dg")) parsed.divGrowth = parseFloat(params.get("dg"));
      if (params.get("ap")) parsed.appreciation = parseFloat(params.get("ap"));
      if (params.get("er")) parsed.expenseRatio = parseFloat(params.get("er"));
      if (params.get("dt")) parsed.divTaxRate = parseFloat(params.get("dt"));
      if (params.get("cg")) parsed.capGainsTaxRate = parseFloat(params.get("cg"));
      if (params.get("dr")) parsed.drip = params.get("dr") === "1";
      if (params.get("df")) parsed.divFrequency = params.get("df");
      if (params.get("sr")) parsed.splitRatio = params.get("sr");
      if (params.get("si")) parsed.splitInterval = parseInt(params.get("si"));
      if (params.get("cl")) parsed.costOfLiving = parseFloat(params.get("cl"));
      if (params.get("ir")) parsed.inflation = parseFloat(params.get("ir"));
      if (params.get("m") === "liveoff") setMode("liveoff");
      if (params.get("m") === "goal") { setMode("goal"); if(params.get("gt")) setGoalTarget(parseFloat(params.get("gt"))); if(params.get("gg")) setGoalGrowthRate(parseFloat(params.get("gg"))); }
      if (params.get("m") === "compare") setMode("compare");
      if (params.get("m") === "cagr") { setMode("cagr"); if(params.get("cm")) setCagrMode(params.get("cm")); if(params.get("pm")) setPriceMethod(params.get("pm")); }
      return parsed;
    } catch { return defaultInp; }
  });

  const fundColors = ["#FF9500","#0071E3","#34C759","#AF52DE","#FF3B30","#30B0C7","#FFCC00","#FF2D55","#5AC8FA","#64D2FF","#8E8E93","#00C7BE"];
  const darkFundColors = ["#FF9F0A","#0A84FF","#30D158","#BF5AF2","#FF453A","#40C8E0","#FFD60A","#FF375F","#5AC8FA","#64D2FF","#98989D","#63E6E2"];
  const getFundColor = (idx) => dark ? darkFundColors[idx % darkFundColors.length] : fundColors[idx % fundColors.length];
  const [pfFunds, setPfFunds] = useState([
    { id:1, ticker:"", alloc:50, divYield:0, divGrowth:0, appreciation:0, expenseRatio:0, divFrequency:"quarterly", sharePrice:0 },
    { id:2, ticker:"", alloc:30, divYield:0, divGrowth:0, appreciation:0, expenseRatio:0, divFrequency:"quarterly", sharePrice:0 },
    { id:3, ticker:"", alloc:20, divYield:0, divGrowth:0, appreciation:0, expenseRatio:0, divFrequency:"quarterly", sharePrice:0 },
  ]);
  const [pfShared, setPfShared] = useState({ lumpSum:0, contribAmt:0, contribFreq:"monthly", years:30, drip:true, divTaxRate:0, capGainsTaxRate:0, inflation:0, costOfLiving:0 });
  const [pfChartTab, setPfChartTab] = useState("combined");
  const [pfSelectedYear, setPfSelectedYear] = useState("all");
  const [pfInflationAdj, setPfInflationAdj] = useState(false);

  const upf = useCallback((id,k,v) => setPfFunds(fs => fs.map(f => f.id===id?{...f,[k]:v}:f)), []);
  const ups = useCallback((k,v) => setPfShared(p => ({...p,[k]:v})), []);
  const addFund = useCallback(() => {
    setPfFunds(fs => {
      const newId = Math.max(...fs.map(f=>f.id)) + 1;
      return [...fs, { id:newId, ticker:"", alloc:0, divYield:0, divGrowth:0, appreciation:0, expenseRatio:0, divFrequency:"quarterly", sharePrice:0 }];
    });
  }, []);
  const removeFund = useCallback((id) => setPfFunds(fs => fs.length > 1 ? fs.filter(f=>f.id!==id) : fs), []);

  const pfResults = useMemo(() => {
    const fundData = pfFunds.map(fund => {
      const allocFrac = fund.alloc / 100;
      const params = {
        lumpSum: pfShared.lumpSum * allocFrac,
        contribAmt: pfShared.contribAmt * allocFrac,
        contribFreq: pfShared.contribFreq,
        years: pfShared.years,
        sharePrice: fund.sharePrice,
        divYield: fund.divYield,
        divGrowth: fund.divGrowth,
        appreciation: fund.appreciation,
        expenseRatio: fund.expenseRatio,
        divTaxRate: pfShared.divTaxRate,
        capGainsTaxRate: pfShared.capGainsTaxRate,
        drip: pfShared.drip,
        divFrequency: fund.divFrequency,
        splitRatio: "none", splitInterval: 0,
        costOfLiving: 0, inflation: pfShared.inflation,
      };
      return { fund, result: runEngine(params) };
    });
    // Blend by year (for display)
    const blended = [];
    const yearCount = fundData[0]?.result.data.length || 0;
    for (let i = 0; i < yearCount; i++) {
      const yr = fundData[0].result.data[i].year;
      const row = { year: yr, month: fundData[0].result.data[i].month };
      const keys = ["portfolioValue","walkAwayValue","netDivMonthly","netDivAnnual","grossDivAnnual","totalContrib","totalGrossDiv","totalTaxPaid","totalNetDiv","totalFees","annualFees"];
      keys.forEach(k => { row[k] = fundData.reduce((s, fd) => s + (fd.result.data[i]?.[k] || 0), 0); });
      row.shares = 0; row.sharePrice = 0;
      row.yieldOnCost = row.totalContrib > 0 ? (row.grossDivAnnual / row.totalContrib) * 100 : 0;
      row.monthlyCost = pfShared.costOfLiving * Math.pow(1 + pfShared.inflation/100, yr);
      row.canLiveOff = row.netDivMonthly >= row.monthlyCost && yr > 0;
      row.perFund = fundData.map(fd => ({ ticker: fd.fund.ticker, alloc: fd.fund.alloc, ...fd.result.data[i] }));
      blended.push(row);
    }

    // Exact monthly crossover: run a lightweight monthly sim for each fund
    let pfCrossoverMonth = -1;
    const totalMonths = pfShared.years * 12;
    const divFreqMonths = { monthly:1, quarterly:3, semiannually:6, annually:12 };
    const monthlyInflation = Math.pow(1 + pfShared.inflation/100, 1/12) - 1;
    const totalAlloc = pfFunds.reduce((s,f)=>s+f.alloc,0) || 100;

    // Initialize per-fund tracking
    const fundSim = pfFunds.map(fund => {
      const allocFrac = fund.alloc / totalAlloc;
      const sp = fund.sharePrice || 1;
      const divInt = divFreqMonths[fund.divFrequency] || 3;
      return {
        shares: (pfShared.lumpSum * allocFrac) / sp,
        sharePrice: sp,
        annualDivPerShare: sp * (fund.divYield/100),
        divGrowthRate: fund.divGrowth / 100,
        monthlyAppreciation: Math.pow(1 + fund.appreciation/100, 1/12) - 1,
        monthlyExpenseRate: (fund.expenseRatio/100) / 12,
        divInterval: divInt,
        payoutsPerYear: 12 / divInt,
        monthlyContrib: (pfShared.contribAmt * allocFrac) * (freqToMonthly[pfShared.contribFreq] || 1),
      };
    });

    let monthlyCost = pfShared.costOfLiving;
    const pfCrossoverChartData = [];
    for (let m = 1; m <= totalMonths; m++) {
      // Annual dividend growth at year boundaries
      if (m % 12 === 0) {
        fundSim.forEach(fs => { fs.annualDivPerShare *= (1 + fs.divGrowthRate); });
      }

      let blendedNetDiv = 0;
      fundSim.forEach(fs => {
        const isDivMonth = m % fs.divInterval === 0;
        const divPerPayout = fs.annualDivPerShare / fs.payoutsPerYear;
        const grossDiv = isDivMonth ? fs.shares * divPerPayout : 0;
        const netDiv = grossDiv * (1 - pfShared.divTaxRate/100);
        const annualNet = fs.shares * fs.annualDivPerShare * (1 - pfShared.divTaxRate/100);
        blendedNetDiv += annualNet / 12;

        // Advance state
        fs.sharePrice *= (1 - fs.monthlyExpenseRate);
        fs.sharePrice *= (1 + fs.monthlyAppreciation);
        if (isDivMonth && pfShared.drip) {
          fs.shares += netDiv / fs.sharePrice;
        }
        fs.shares += fs.monthlyContrib / fs.sharePrice;
      });
      monthlyCost *= (1 + monthlyInflation);
      pfCrossoverChartData.push({ month:m, year:+(m/12).toFixed(2), netDivMonthly:+blendedNetDiv.toFixed(2), monthlyCost:+monthlyCost.toFixed(2) });
      if (pfCrossoverMonth < 0 && blendedNetDiv >= monthlyCost) {
        pfCrossoverMonth = m;
      }
    }
    const pfCrossYr = pfCrossoverMonth > 0 ? Math.ceil(pfCrossoverMonth / 12) - 1 : null;
    const pfCrossMo = pfCrossoverMonth > 0 ? (pfCrossoverMonth % 12 === 0 ? 12 : pfCrossoverMonth % 12) : null;
    const pfCrossLabel = pfCrossYr !== null ? `Year ${pfCrossYr}, Month ${pfCrossMo}` : null;
    return { blended, fundData, pfCrossoverMonth, pfCrossYr, pfCrossLabel, pfCrossoverChartData };
  }, [pfFunds, pfShared]);

  const pfDisplayData = useMemo(() => {
    if (!pfInflationAdj) return pfResults.blended;
    const r = pfShared.inflation / 100;
    return pfResults.blended.map(row => {
      const factor = Math.pow(1 + r, row.year);
      const adj = { ...row };
      ["portfolioValue","walkAwayValue","netDivMonthly","netDivAnnual","grossDivAnnual","totalContrib","totalGrossDiv","totalTaxPaid","totalNetDiv","totalFees","annualFees"].forEach(k => { adj[k] = +(row[k] / factor).toFixed(2); });
      return adj;
    });
  }, [pfResults.blended, pfInflationAdj, pfShared.inflation]);

  const pfChartData = useMemo(() => {
    let d = pfSelectedYear === "all" ? pfDisplayData : pfDisplayData.filter(r => r.year <= pfSelectedYear);
    if (mode === "goal") d = d.map(r => ({ ...r, goalTargetLine: goalTarget * Math.pow(1 + goalGrowthRate/100, r.year) }));
    return d;
  }, [pfDisplayData, pfSelectedYear, mode, goalTarget, goalGrowthRate]);

  // ===== COMPARE MODE =====
  const [cmpCompetitors, setCmpCompetitors] = useState([
    { id:1, name:"Fund 1", holdings:[{ id:1, ticker:"", alloc:100, sharePrice:0, divYield:0, divGrowth:0, appreciation:0, expenseRatio:0, divFrequency:"quarterly" }]},
    { id:2, name:"Fund 2", holdings:[{ id:1, ticker:"", alloc:100, sharePrice:0, divYield:0, divGrowth:0, appreciation:0, expenseRatio:0, divFrequency:"quarterly" }]},
  ]);
  const [cmpShared, setCmpShared] = useState({ lumpSum:0, contribAmt:0, contribFreq:"monthly", years:30, drip:true, divTaxRate:0, capGainsTaxRate:0, inflation:0, chartStyle:"line" });
  const [cmpChartTab, setCmpChartTab] = useState("value");
  const [cmpSelectedYear, setCmpSelectedYear] = useState("all");
  const [cmpExpanded, setCmpExpanded] = useState(null);
  const [raceFrame, setRaceFrame] = useState(0);
  const [racePlaying, setRacePlaying] = useState(false);

  // Restore Portfolio / Compare / projMode from shared-link URL params (runs once on mount).
  // Single Holding (inp.*) and CAGR are already restored inside their own useState lazy initializers.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const pm = params.get("pm");
    if (pm === "p") setProjMode("portfolio");
    else if (pm === "s") setProjMode("single");

    const pfBlob = params.get("pf");
    if (pfBlob) {
      try {
        const json = decodeURIComponent(escape(atob(pfBlob)));
        const payload = JSON.parse(json);
        if (payload.funds && Array.isArray(payload.funds) && payload.funds.length > 0) setPfFunds(payload.funds);
        if (payload.shared && typeof payload.shared === "object") setPfShared(payload.shared);
      } catch (e) {
        console.warn("Failed to parse pf param:", e);
      }
    }

    const cmpBlob = params.get("cmp");
    if (cmpBlob) {
      try {
        const json = decodeURIComponent(escape(atob(cmpBlob)));
        const payload = JSON.parse(json);
        if (payload.competitors && Array.isArray(payload.competitors) && payload.competitors.length > 0) setCmpCompetitors(payload.competitors);
        if (payload.shared && typeof payload.shared === "object") setCmpShared(payload.shared);
      } catch (e) {
        console.warn("Failed to parse cmp param:", e);
      }
    }
  }, []);

  const ucmp = useCallback((k,v) => setCmpShared(p => ({...p,[k]:v})), []);
  const addCompetitor = useCallback(() => {
    setCmpCompetitors(cs => {
      const newId = Math.max(...cs.map(c=>c.id)) + 1;
      return [...cs, { id:newId, name:`Fund ${newId}`, holdings:[{ id:1, ticker:"", alloc:100, sharePrice:0, divYield:0, divGrowth:0, appreciation:0, expenseRatio:0, divFrequency:"quarterly" }]}];
    });
  }, []);
  const removeCompetitor = useCallback((id) => setCmpCompetitors(cs => cs.length > 2 ? cs.filter(c=>c.id!==id) : cs), []);
  const updateCompetitor = useCallback((id,k,v) => setCmpCompetitors(cs => cs.map(c => c.id===id?{...c,[k]:v}:c)), []);
  const updateCmpHolding = useCallback((cid,hid,k,v) => {
    setCmpCompetitors(cs => cs.map(c => c.id===cid ? {...c, holdings:c.holdings.map(h => h.id===hid?{...h,[k]:v}:h)} : c));
  }, []);
  const addCmpHolding = useCallback((cid) => {
    setCmpCompetitors(cs => cs.map(c => {
      if (c.id !== cid) return c;
      const newId = Math.max(...c.holdings.map(h=>h.id)) + 1;
      return {...c, holdings:[...c.holdings, { id:newId, ticker:"", alloc:0, sharePrice:0, divYield:0, divGrowth:0, appreciation:0, expenseRatio:0, divFrequency:"quarterly" }]};
    }));
  }, []);
  const removeCmpHolding = useCallback((cid,hid) => {
    setCmpCompetitors(cs => cs.map(c => c.id===cid ? {...c, holdings:c.holdings.length>1?c.holdings.filter(h=>h.id!==hid):c.holdings} : c));
  }, []);

  const cmpResults = useMemo(() => {
    const divFreqMonthsMap = { monthly:1, quarterly:3, semiannually:6, annually:12 };
    return cmpCompetitors.map((comp, idx) => {
      const totalAlloc = comp.holdings.reduce((s,h)=>s+h.alloc,0) || 100;
      const holdingResults = comp.holdings.map(h => {
        const af = h.alloc / totalAlloc;
        return runEngine({
          lumpSum: cmpShared.lumpSum * af, contribAmt: cmpShared.contribAmt * af,
          contribFreq: cmpShared.contribFreq, years: cmpShared.years, sharePrice: h.sharePrice,
          divYield: h.divYield, divGrowth: h.divGrowth, appreciation: h.appreciation,
          expenseRatio: h.expenseRatio, divTaxRate: cmpShared.divTaxRate, capGainsTaxRate: cmpShared.capGainsTaxRate,
          drip: cmpShared.drip, divFrequency: h.divFrequency, splitRatio:"none", splitInterval:0,
          costOfLiving:0, inflation:cmpShared.inflation,
        });
      });
      // Blend
      const blended = [];
      const yc = holdingResults[0]?.data.length || 0;
      for (let i = 0; i < yc; i++) {
        const row = { year: holdingResults[0].data[i].year };
        ["portfolioValue","walkAwayValue","netDivMonthly","netDivAnnual","grossDivAnnual","totalContrib","totalGrossDiv","totalTaxPaid","totalNetDiv","totalFees","annualFees"].forEach(k => {
          row[k] = holdingResults.reduce((s,hr) => s + (hr.data[i]?.[k]||0), 0);
        });
        row.yieldOnCost = row.totalContrib > 0 ? (row.grossDivAnnual / row.totalContrib) * 100 : 0;
        blended.push(row);
      }
      return { comp, blended, color: getFundColor(idx) };
    });
  }, [cmpCompetitors, cmpShared, dark]);

  const cmpChartData = useMemo(() => {
    if (!cmpResults.length) return [];
    const base = cmpResults[0].blended;
    return base.map((row, i) => {
      const point = { year: row.year };
      cmpResults.forEach((cr, idx) => {
        point[`value_${idx}`] = cr.blended[i]?.portfolioValue || 0;
        point[`income_${idx}`] = cr.blended[i]?.netDivMonthly || 0;
        point[`walkaway_${idx}`] = cr.blended[i]?.walkAwayValue || 0;
      });
      return point;
    }).filter(d => cmpSelectedYear === "all" || d.year <= cmpSelectedYear);
  }, [cmpResults, cmpSelectedYear]);

  // Race animation frames
  const raceYears = useMemo(() => [1,5,10,15,20,25,30].filter(y => y <= cmpShared.years), [cmpShared.years]);
  const raceFrames = useMemo(() => {
    if (!cmpResults.length) return [];
    return raceYears.map(yr => {
      const entries = cmpResults.map(cr => {
        const row = cr.blended.find(d => d.year === yr) || cr.blended[cr.blended.length-1];
        return { name: cr.comp.name, color: cr.color, value: row?.portfolioValue||0, income: row?.netDivMonthly||0, walkaway: row?.walkAwayValue||0 };
      });
      const vals = entries.map(e => e.value);
      const maxVal = Math.max(...vals);
      const minVal = Math.min(...vals);
      return { year: yr, entries, maxVal, gap: maxVal - minVal };
    });
  }, [cmpResults, raceYears]);

  useEffect(() => {
    if (!racePlaying || cmpShared.chartStyle !== "bars" || !raceFrames.length) return;
    const holdTimes = raceFrames.map((f,i) => i === raceFrames.length-1 ? 5000 : 3000);
    const timer = setTimeout(() => {
      setRaceFrame(prev => (prev + 1) % raceFrames.length);
    }, holdTimes[raceFrame]);
    return () => clearTimeout(timer);
  }, [racePlaying, raceFrame, raceFrames, cmpShared.chartStyle]);

  const generateLink = useCallback(() => {
    const p = new URLSearchParams();
    p.set("m", mode);
    if (inp.ticker) p.set("t", inp.ticker);
    p.set("l", inp.lumpSum);
    p.set("c", inp.contribAmt);
    p.set("cf", inp.contribFreq);
    p.set("y", inp.years);
    p.set("sp", inp.sharePrice);
    p.set("dy", inp.divYield);
    p.set("dg", inp.divGrowth);
    p.set("ap", inp.appreciation);
    p.set("er", inp.expenseRatio);
    p.set("dt", inp.divTaxRate);
    p.set("cg", inp.capGainsTaxRate);
    p.set("dr", inp.drip ? "1" : "0");
    p.set("df", inp.divFrequency);
    if (inp.splitRatio !== "none") { p.set("sr", inp.splitRatio); p.set("si", inp.splitInterval); }
    if (mode === "liveoff") p.set("cl", inp.costOfLiving);
    if (mode === "goal") { p.set("gt", goalTarget); p.set("gg", goalGrowthRate); }
    p.set("ir", inp.inflation);
    if (mode === "cagr") {
      p.set("cm", cagrMode);
      if (cagrMode === "price") {
        p.set("pm", priceMethod);
        p.set("csp", cagr.startPrice); p.set("cep", cagr.endPrice); p.set("cpy", cagr.priceYears);
        p.set("crp", cagr.priceReturnPct); p.set("cry", cagr.priceReturnYears);
      }
      if (cagrMode === "divgrowth") { p.set("cds", cagr.divStart); p.set("cde", cagr.divEnd); p.set("cdy", cagr.divYears); }
      if (cagrMode === "total") { p.set("cts", cagr.trStartPrice); p.set("cte", cagr.trEndPrice); p.set("cty", cagr.trYield); p.set("ctr", cagr.trYears); }
      if (cagrMode === "goal") { p.set("cgs", cagr.goalStart); p.set("cgt", cagr.goalTarget); p.set("cgy", cagr.goalYears); }
    }
    // Portfolio sub-pill + per-fund data. Only written when actually on Portfolio
    // (scoped to projection/liveoff/goal modes so it can't clash with CAGR's pm=priceMethod).
    if ((mode === "projection" || mode === "liveoff" || mode === "goal") && projMode === "portfolio") {
      p.set("pm", "p");
      try {
        const payload = { funds: pfFunds, shared: pfShared };
        p.set("pf", btoa(unescape(encodeURIComponent(JSON.stringify(payload)))));
      } catch (e) { /* encoding failure — fall through without pf param */ }
    }
    // Compare per-competitor data.
    if (mode === "compare") {
      try {
        const payload = { competitors: cmpCompetitors, shared: cmpShared };
        p.set("cmp", btoa(unescape(encodeURIComponent(JSON.stringify(payload)))));
      } catch (e) { /* encoding failure — fall through without cmp param */ }
    }
    return `${window.location.origin}${window.location.pathname}?${p.toString()}`;
  }, [inp, mode, cagrMode, priceMethod, cagr, goalTarget, goalGrowthRate, projMode, pfFunds, pfShared, cmpCompetitors, cmpShared]);

  const copyLink = useCallback(() => {
    const link = generateLink();
    navigator.clipboard.writeText(link).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }).catch(() => {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = link;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    });
  }, [generateLink]);

  const u = useCallback((k,v) => setInp(p => ({...p,[k]:v})), []);
  const { data, crossoverMonth, crossoverChartData: rawCrossoverData } = useMemo(() => runEngine(inp), [inp]);
  const final = data[data.length-1];
  const crossoverYr = crossoverMonth > 0 ? Math.ceil(crossoverMonth / 12) - 1 : null;
  const crossoverMo = crossoverMonth > 0 ? (crossoverMonth % 12 === 0 ? 12 : crossoverMonth % 12) : null;
  const crossoverLabel = crossoverYr !== null ? `Year ${crossoverYr}, Month ${crossoverMo}` : null;
  const crossoverYear = crossoverMonth > 0 ? (crossoverMonth/12).toFixed(1) : null;

  const neededToLiveNow = inp.divYield > 0 ? ((inp.costOfLiving * 12) / ((inp.divYield/100) * (1 - inp.divTaxRate/100))) : 0;

  const uc = useCallback((k,v) => setCagr(p => ({...p,[k]:v})), []);
  const cagrCalc = (start,end,yrs) => yrs > 0 && start > 0 ? (Math.pow(end/start, 1/yrs) - 1) * 100 : 0;
  const cagrResults = useMemo(() => {
    const basic = cagrCalc(cagr.startVal, cagr.endVal, cagr.years);
    const price = cagrCalc(cagr.startPrice, cagr.endPrice, cagr.priceYears);
    const priceFromReturn = cagr.priceReturnYears > 0 ? (Math.pow(1 + cagr.priceReturnPct/100, 1/cagr.priceReturnYears) - 1) * 100 : 0;
    // Total return: simulate reinvesting dividends yearly
    let trBal = cagr.trStartPrice;
    for (let i = 0; i < cagr.trYears; i++) {
      const div = trBal * (cagr.trYield / 100);
      trBal = (trBal + div) * (cagr.trEndPrice / cagr.trStartPrice) ** (1 / cagr.trYears);
    }
    const totalReturn = cagr.trYears > 0 && cagr.trStartPrice > 0 ? (Math.pow(trBal / cagr.trStartPrice, 1 / cagr.trYears) - 1) * 100 : 0;
    const divGrowth = cagrCalc(cagr.divStart, cagr.divEnd, cagr.divYears);
    const goal = cagrCalc(cagr.goalStart, cagr.goalTarget, cagr.goalYears);
    return { basic, price, priceFromReturn, totalReturn, divGrowth, goal };
  }, [cagr]);


  const InfoTip = ({ text }) => {
    const [show, setShow] = useState(false);
    return (
      <span style={{ position:"relative", display:"inline-block", marginLeft:5, cursor:"help" }} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:14, height:14, borderRadius:7, background:t.bd, color:t.tx3, fontSize:8, fontWeight:700, lineHeight:1, textTransform:"none" }}>i</span>
        {show && <div style={{ position:"absolute", bottom:"calc(100% + 8px)", left:"50%", transform:"translateX(-50%)", background:t.ttBg, border:`1px solid ${t.ttBd}`, padding:"10px 14px", borderRadius:10, fontSize:12, lineHeight:1.5, fontWeight:400, textTransform:"none", letterSpacing:"normal", minWidth:220, maxWidth:320, whiteSpace:"normal", zIndex:999, boxShadow:t.shL, pointerEvents:"none", color:t.tx2 }}>{text}</div>}
      </span>
    );
  };

  const Pill = ({ active, children, onClick }) => (
    <button onClick={onClick} style={{ padding:"7px 16px", borderRadius:8, border:"none", background:active?t.sf:"transparent", color:active?t.tx:t.tx2,
      fontWeight:active?600:400, fontSize:12, cursor:"pointer", fontFamily:FONT, boxShadow:active?"0 1px 4px rgba(0,0,0,0.08)":"none", transition:"all 0.2s" }}>{children}</button>
  );

  const tips = {
    pv: "Total value of all shares at the current projected price",
    wa: "What you'd keep after selling everything and paying capital gains tax",
    ndi: "Dividend income after tax — what actually hits your account",
    yoc: "How much income you earn compared to what you originally put in. A 10% YoC means you're earning 10% back each year in dividends on your original investment",
    free: "The year and month when dividend income surpasses your monthly expenses",
    need: "Lump sum needed right now to cover your expenses from dividends at today's yield after tax",
    exp: "Your monthly living costs, adjusted each year for inflation",
    shares: "Total shares including original purchase, DRIP reinvestments, and contribution purchases",
    cost: "Combined lifetime cost of capital gains tax, dividend tax, and expense ratio fees",
    status: "Whether your current dividend income covers your monthly living expenses",
  };

  const Card = ({ label, value, sub, sub2, color, bg, tip }) => (
    <motion.div variants={cardItem} style={{ flex:"1 1 180px", minWidth:160, background:bg||t.sf, borderRadius:14, padding:"16px 20px", border:`1px solid ${t.bd2}`, boxShadow:t.sh, transition:"background 0.3s, border-color 0.3s" }}>
      <div style={{ fontSize:10, fontWeight:700, color:t.tx2, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:6 }}>{label}{tip && <InfoTip text={tip}/>}</div>
      <div style={{ fontSize:24, fontWeight:700, color:color||t.tx, letterSpacing:"-0.02em", lineHeight:1.1 }}>{value}</div>
      {sub && <div style={{ fontSize:12, color:t.tx2, marginTop:5 }}>{sub}</div>}
      {sub2 && <div style={{ fontSize:12, color:t.tx3, marginTop:2 }}>{sub2}</div>}
    </motion.div>
  );

  const deflate = useCallback((d) => {
    if (!inflationAdj || !d) return d;
    const r = inp.inflation / 100;
    return d.map(row => {
      const factor = Math.pow(1 + r, row.year);
      return { ...row,
        portfolioValue: +(row.portfolioValue / factor).toFixed(2),
        walkAwayValue: +(row.walkAwayValue / factor).toFixed(2),
        netDivMonthly: +(row.netDivMonthly / factor).toFixed(2),
        netDivAnnual: +(row.netDivAnnual / factor).toFixed(2),
        grossDivMonthly: +(row.grossDivMonthly / factor).toFixed(2),
        grossDivAnnual: +(row.grossDivAnnual / factor).toFixed(2),
        totalContrib: +(row.totalContrib / factor).toFixed(2),
        totalGrossDiv: +(row.totalGrossDiv / factor).toFixed(2),
        totalTaxPaid: +(row.totalTaxPaid / factor).toFixed(2),
        totalNetDiv: +(row.totalNetDiv / factor).toFixed(2),
        totalFees: +(row.totalFees / factor).toFixed(2),
        annualFees: +(row.annualFees / factor).toFixed(2),
        monthlyCost: +(row.monthlyCost / factor).toFixed(2),
      };
    });
  }, [inflationAdj, inp.inflation]);

  const displayData = useMemo(() => deflate(data), [data, deflate]);
  const displayFinal = displayData[displayData.length - 1];

  const chartData = useMemo(() => {
    let d = selectedYear === "all" ? displayData : displayData.filter(r => r.year <= selectedYear);
    if (mode === "goal") {
      d = d.map(r => ({ ...r, goalTargetLine: goalTarget * Math.pow(1 + goalGrowthRate/100, r.year) }));
    }
    return d;
  }, [displayData, selectedYear, mode, goalTarget, goalGrowthRate]);

  const crossoverDisplayData = useMemo(() => {
    if (!rawCrossoverData) return [];
    const filtered = selectedYear === "all" ? rawCrossoverData : rawCrossoverData.filter(d => d.year <= selectedYear);
    return filtered;
  }, [rawCrossoverData, selectedYear]);

  // Goal tracker computation
  const goalData = useMemo(() => {
    if (mode !== "goal") return { reachedMonth:-1, reachedLabel:null, yearData:[] };
    let reachedMonth = -1;
    // Monthly check for exact crossover
    if (rawCrossoverData && rawCrossoverData.length) {
      for (const pt of rawCrossoverData) {
        const targetAtMonth = goalTarget * Math.pow(1 + goalGrowthRate/100, pt.month/12);
        // Use the monthly portfolio value approximation from engine
        // rawCrossoverData has netDivMonthly and monthlyCost but not portfolioValue
        // So we check from yearly displayData instead
      }
    }
    // Check from yearly data
    const yearData = displayData.filter(d => d.year > 0).map(d => {
      const targetAtYear = goalTarget * Math.pow(1 + goalGrowthRate/100, d.year);
      const gap = targetAtYear - d.portfolioValue;
      const progress = targetAtYear > 0 ? Math.min((d.portfolioValue / targetAtYear) * 100, 999) : 100;
      return { ...d, goalTarget: targetAtYear, goalGap: gap, goalProgress: progress, goalReached: d.portfolioValue >= targetAtYear };
    });
    // Find first year reached
    const firstReached = yearData.find(d => d.goalReached);
    if (firstReached) reachedMonth = firstReached.year * 12;
    // Try to find exact month by interpolating between the year before and the year it was reached
    if (firstReached && firstReached.year > 1) {
      const prevYear = yearData.find(d => d.year === firstReached.year - 1);
      if (prevYear && !prevYear.goalReached) {
        const pvGap = prevYear.goalTarget - prevYear.portfolioValue;
        const curGap = firstReached.portfolioValue - firstReached.goalTarget;
        const ratio = pvGap / (pvGap + curGap);
        const exactMonth = Math.round((firstReached.year - 1 + ratio) * 12);
        reachedMonth = exactMonth;
      }
    }
    const reachedYr = reachedMonth > 0 ? Math.ceil(reachedMonth / 12) - 1 : null;
    const reachedMo = reachedMonth > 0 ? (reachedMonth % 12 === 0 ? 12 : reachedMonth % 12) : null;
    const reachedLabel = reachedYr !== null ? `Year ${reachedYr}, Month ${reachedMo}` : null;
    return { reachedMonth, reachedLabel, yearData };
  }, [mode, displayData, rawCrossoverData, goalTarget, goalGrowthRate]);

  const chartTabs = mode === "projection" || mode === "goal"
    ? [{ id:"overview", l:"Overview" },{ id:"growth", l:"Growth" },{ id:"income", l:"Income" },{ id:"yoc", l:"Yield on Cost" },{ id:"breakdown", l:"Breakdown" },{ id:"tax", l:"Tax & Fees" }]
    : [{ id:"crossover", l:"Crossover" },{ id:"overview", l:"Overview" },{ id:"income", l:"Income vs Expenses" },{ id:"growth", l:"Portfolio" }];

  const renderChart = () => {
    const h = 340;
    if (!isClient) return <div style={{ height:h }} />;
    const cd = chartData;
    if (chartTab === "overview") return (
      <ResponsiveContainer width="100%" height={h}>
        <AreaChart data={cd} margin={{ top:10,right:10,left:10,bottom:0 }}>
          <defs>
            <linearGradient id="gOG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={t.ac} stopOpacity={0.10}/><stop offset="100%" stopColor={t.ac} stopOpacity={0}/></linearGradient>
            <linearGradient id="gOI" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={t.pu} stopOpacity={0.10}/><stop offset="100%" stopColor={t.pu} stopOpacity={0}/></linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={t.grid}/>
          <XAxis dataKey="year" tick={{ fill:t.tx3, fontSize:11 }} axisLine={{ stroke:t.grid }} tickLine={false}/>
          <YAxis tickFormatter={fmt} tick={{ fill:t.tx3, fontSize:11 }} axisLine={false} tickLine={false}/>
          <Tooltip content={<Tip t={t}/>}/>
          <Area type="monotone" dataKey="portfolioValue" name="Portfolio Value" fill="url(#gOG)" stroke={t.ac} strokeWidth={2} dot={false}/>
          <Area type="monotone" dataKey="totalContrib" name="Contributed" fill="none" stroke={t.tx3} strokeWidth={1.5} strokeDasharray="4 4" dot={false}/>
          <Area type="monotone" dataKey={mode==="liveoff"?"netDivMonthly":"netDivAnnual"} name={mode==="liveoff"?"Monthly Net Dividend":"Annual Net Dividend"} fill="url(#gOI)" stroke={t.pu} strokeWidth={2} dot={false}/>
          {mode==="goal" && <Area type="monotone" dataKey="goalTargetLine" name="Target" fill="none" stroke={t.or} strokeWidth={2.5} strokeDasharray="8 4" dot={false}/>}
        </AreaChart>
      </ResponsiveContainer>
    );
    if (chartTab === "growth") return (
      <ResponsiveContainer width="100%" height={h}>
        <AreaChart data={cd} margin={{ top:10,right:10,left:10,bottom:0 }}>
          <defs>
            <linearGradient id="gG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={t.ac} stopOpacity={0.12}/><stop offset="100%" stopColor={t.ac} stopOpacity={0}/></linearGradient>
            <linearGradient id="gW" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={t.gn} stopOpacity={0.12}/><stop offset="100%" stopColor={t.gn} stopOpacity={0}/></linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={t.grid}/>
          <XAxis dataKey="year" tick={{ fill:t.tx3, fontSize:11 }} axisLine={{ stroke:t.grid }} tickLine={false}/>
          <YAxis tickFormatter={fmt} tick={{ fill:t.tx3, fontSize:11 }} axisLine={false} tickLine={false}/>
          <Tooltip content={<Tip t={t}/>}/>
          <Area type="monotone" dataKey="totalContrib" name="Contributed" fill="none" stroke={t.tx3} strokeWidth={1.5} strokeDasharray="4 4" dot={false}/>
          <Area type="monotone" dataKey="portfolioValue" name="Portfolio Value" fill="url(#gG)" stroke={t.ac} strokeWidth={2} dot={false}/>
          <Area type="monotone" dataKey="walkAwayValue" name="After-Tax Value" fill="url(#gW)" stroke={t.gn} strokeWidth={2} dot={false}/>
          {mode==="goal" && <Area type="monotone" dataKey="goalTargetLine" name="Target" fill="none" stroke={t.or} strokeWidth={2.5} strokeDasharray="8 4" dot={false}/>}
        </AreaChart>
      </ResponsiveContainer>
    );
    if (chartTab === "income") return (
      <ResponsiveContainer width="100%" height={h}>
        <AreaChart data={cd} margin={{ top:10,right:10,left:10,bottom:0 }}>
          <defs>
            <linearGradient id="gI" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={t.pu} stopOpacity={0.12}/><stop offset="100%" stopColor={t.pu} stopOpacity={0}/></linearGradient>
            <linearGradient id="gIM" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={t.pu} stopOpacity={0.05}/><stop offset="100%" stopColor={t.pu} stopOpacity={0}/></linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={t.grid}/>
          <XAxis dataKey="year" tick={{ fill:t.tx3, fontSize:11 }} axisLine={{ stroke:t.grid }} tickLine={false}/>
          <YAxis tickFormatter={fmt} tick={{ fill:t.tx3, fontSize:11 }} axisLine={false} tickLine={false}/>
          <Tooltip content={<Tip t={t}/>}/>
          {mode==="liveoff" && <Area type="monotone" dataKey="monthlyCost" name="Monthly Expenses" fill="none" stroke={t.rd} strokeWidth={2} strokeDasharray="6 3" dot={false}/>}
          {mode==="liveoff" ? <>
            <Area type="monotone" dataKey="netDivAnnual" name="Annual Net Dividend" fill="url(#gIM)" stroke={t.pu} strokeWidth={1.5} strokeOpacity={0.4} dot={false}/>
            <Area type="monotone" dataKey="netDivMonthly" name="Monthly Net Dividend" fill="url(#gI)" stroke={t.pu} strokeWidth={2.5} dot={false}/>
          </> : <>
            <Area type="monotone" dataKey="netDivMonthly" name="Monthly Net Dividend" fill="url(#gIM)" stroke={t.pu} strokeWidth={1.5} strokeOpacity={0.4} dot={false}/>
            <Area type="monotone" dataKey="netDivAnnual" name="Annual Net Dividend" fill="url(#gI)" stroke={t.pu} strokeWidth={2.5} dot={false}/>
          </>}
        </AreaChart>
      </ResponsiveContainer>
    );
    if (chartTab === "yoc") return (
      <ResponsiveContainer width="100%" height={h}>
        <LineChart data={cd} margin={{ top:10,right:10,left:10,bottom:0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={t.grid}/>
          <XAxis dataKey="year" tick={{ fill:t.tx3, fontSize:11 }} axisLine={{ stroke:t.grid }} tickLine={false}/>
          <YAxis tickFormatter={v=>`${v.toFixed(0)}%`} tick={{ fill:t.tx3, fontSize:11 }} axisLine={false} tickLine={false}/>
          <Tooltip content={<Tip t={t} type="pct"/>}/>
          <Line type="monotone" dataKey="yieldOnCost" name="Yield on Cost" stroke={t.or} strokeWidth={2.5} dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    );
    if (chartTab === "breakdown") return (<>
      <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:8 }}>
        <button onClick={() => setBreakdownAllYears(!breakdownAllYears)} style={{ padding:"4px 10px", borderRadius:6, border:`1px solid ${t.bd}`, background:breakdownAllYears?t.ac+"15":"transparent", color:breakdownAllYears?t.ac:t.tx3, fontSize:10, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>
          {breakdownAllYears ? "All Years ✓" : "All Years"}
        </button>
      </div>
      <ResponsiveContainer width="100%" height={h}>
        <BarChart data={cd.filter(d=>d.year>0&&(breakdownAllYears||(d.year<=5||d.year%5===0)))} margin={{ top:10,right:10,left:10,bottom:0 }} barGap={0} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke={t.grid}/>
          <XAxis dataKey="year" tick={{ fill:t.tx3, fontSize:10 }} axisLine={{ stroke:t.grid }} tickLine={false} tickFormatter={v=>breakdownAllYears?(v%5===0||v===1?v:""):v}/>
          <YAxis tickFormatter={fmt} tick={{ fill:t.tx3, fontSize:11 }} axisLine={false} tickLine={false}/>
          <Tooltip content={<Tip t={t}/>}/>
          <Bar dataKey="totalContrib" name="Contributed" fill={t.tx3} radius={[3,3,0,0]} opacity={0.35}/>
          <Bar dataKey="totalNetDiv" name="Net Dividends" fill={t.pu} radius={[3,3,0,0]}/>
          <Bar dataKey="portfolioValue" name="Portfolio" fill={t.ac} radius={[3,3,0,0]}/>
        </BarChart>
      </ResponsiveContainer>
    </>);
    if (chartTab === "tax") return (
      <ResponsiveContainer width="100%" height={h}>
        <AreaChart data={cd} margin={{ top:10,right:10,left:10,bottom:0 }}>
          <defs><linearGradient id="gT" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={t.rd} stopOpacity={0.12}/><stop offset="100%" stopColor={t.rd} stopOpacity={0}/></linearGradient></defs>
          <CartesianGrid strokeDasharray="3 3" stroke={t.grid}/>
          <XAxis dataKey="year" tick={{ fill:t.tx3, fontSize:11 }} axisLine={{ stroke:t.grid }} tickLine={false}/>
          <YAxis tickFormatter={fmt} tick={{ fill:t.tx3, fontSize:11 }} axisLine={false} tickLine={false}/>
          <Tooltip content={<Tip t={t}/>}/>
          <Area type="monotone" dataKey="totalTaxPaid" name="Cumulative Tax Paid" fill="url(#gT)" stroke={t.rd} strokeWidth={2} dot={false}/>
          <Area type="monotone" dataKey="totalFees" name="Cumulative Fees Paid" fill="none" stroke={t.or} strokeWidth={2} strokeDasharray="6 3" dot={false}/>
          <Area type="monotone" dataKey="totalNetDiv" name="Cumulative Net Dividends" fill="none" stroke={t.pu} strokeWidth={2} dot={false}/>
        </AreaChart>
      </ResponsiveContainer>
    );
    if (chartTab === "crossover") {
      const cxYear = crossoverMonth > 0 ? +(crossoverMonth/12).toFixed(2) : null;
      // Use yearly data for smooth lines, monthly precision only for the crossover marker
      const yearlyForChart = crossoverDisplayData.filter(d => d.month % 12 === 0 || d.month === 1);
      return (
      <ResponsiveContainer width="100%" height={h}>
        <LineChart data={yearlyForChart} margin={{ top:10,right:10,left:10,bottom:0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={t.grid}/>
          <XAxis dataKey="year" tick={{ fill:t.tx3, fontSize:11 }} axisLine={{ stroke:t.grid }} tickLine={false} type="number" domain={["dataMin","dataMax"]} tickCount={Math.min(16, inp.years+1)} tickFormatter={v => Math.round(v)}/>
          <YAxis tickFormatter={fmt} tick={{ fill:t.tx3, fontSize:11 }} axisLine={false} tickLine={false}/>
          <Tooltip content={({ active, payload, label, ...rest }) => {
            if (!active || !payload?.length) return null;
            const yr = Math.round(label);
            return (<div style={{ background:t.ttBg, border:`1px solid ${t.ttBd}`, borderRadius:12, padding:"12px 16px", boxShadow:t.shL, fontFamily:FONT, fontSize:13 }}>
              <div style={{ color:t.tx2, marginBottom:6, fontWeight:500 }}>Year {yr}</div>
              {payload.map((p,i) => (<div key={i} style={{ color:t.tx, display:"flex", alignItems:"center", gap:8, marginTop:4 }}>
                <div style={{ width:8, height:8, borderRadius:4, background:p.color }} />
                <span style={{ color:t.tx2 }}>{p.name}:</span>
                <span style={{ fontWeight:600 }}>{fmtF(p.value)}</span>
              </div>))}
            </div>);
          }}/>
          <Line type="monotone" dataKey="monthlyCost" name="Monthly Expenses" stroke={t.rd} strokeWidth={2} strokeDasharray="6 3" dot={false}/>
          <Line type="monotone" dataKey="netDivMonthly" name="Monthly Net Dividend" stroke={t.pu} strokeWidth={2.5} dot={false}/>
          {cxYear && <ReferenceLine x={cxYear} stroke={t.or} strokeWidth={2} strokeDasharray="6 4" label={{ value: crossoverLabel || `Yr ${cxYear}`, position:"insideTopLeft", fill:t.or, fontSize:11, fontWeight:600, offset:10 }}/>}
        </LineChart>
      </ResponsiveContainer>
    );}
    return null;
  };

  return (
    <div style={{ minHeight:"100vh", background:t.bg, color:t.tx, fontFamily:FONT, transition:"background 0.3s, color 0.3s" }}>
      {/* Header */}
      <div style={{ borderBottom:`1px solid ${t.bd}`, background:t.hd, backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"14px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <a href="/" onClick={e => { e.preventDefault(); navigate("calculator"); }} style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", textDecoration:"none", color:"inherit" }}>
            <div style={{ width:32, height:32, borderRadius:9, background:`linear-gradient(135deg, ${t.ac}, ${t.pu})`, display:"flex", alignItems:"center", justifyContent:"center", color:"#FFF", fontWeight:700, fontSize:14 }}>DF</div>
            <div>
              <div style={{ fontSize:16, fontWeight:600, letterSpacing:"-0.01em" }}>Dividend Forecaster</div>
              <div style={{ fontSize:10, color:t.tx3, letterSpacing:"0.02em" }}>Project dividend income, compare funds, plan your freedom date</div>
            </div>
          </a>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <div style={{ display:"flex", gap:2 }}>
              {[{id:"calculator",l:"Calculator"},{id:"methodology",l:"How It Works"},{id:"learn",l:"Learn"},{id:"about",l:"About"}].map(p => (
                <a key={p.id} href={PAGE_TO_PATH[p.id]} onClick={e => { e.preventDefault(); navigate(p.id); }} style={{
                  display:"inline-block", padding:"7px 14px", borderRadius:8, border:"none", fontSize:12, fontWeight:page===p.id?600:400,
                  background:page===p.id?t.sf:"transparent", color:page===p.id?t.tx:t.tx3, textDecoration:"none",
                  cursor:"pointer", fontFamily:FONT, boxShadow:page===p.id?"0 1px 4px rgba(0,0,0,0.08)":"none", transition:"all 0.2s"
                }}>{p.l}</a>
              ))}
            </div>
            <button onClick={() => setDark(!dark)} style={{ width:36, height:36, borderRadius:18, border:`1.5px solid ${t.bd}`, background:t.sf, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:t.tx2, transition:"all 0.2s", fontSize:16 }}>
              {dark ? "☀" : "☾"}
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <AnimatePresence mode="wait">
      {page === "learn" ? (
        <motion.div key="learn" {...pageT} style={{ maxWidth:800, margin:"0 auto", padding:"48px 24px 60px" }}>
          <h1 style={{ fontSize:32, fontWeight:700, marginBottom:8, letterSpacing:"-0.02em" }}>Dividend Investing: Everything You Need to Know</h1>
          <p style={{ fontSize:12, color:t.tx3, marginBottom:16 }}>Written by Zahid Rehman · Updated June 2026</p>
          <p style={{ fontSize:15, lineHeight:1.7, color:t.tx2, marginBottom:24 }}>Start with the guides — six in-depth articles that walk through the big decisions. Below them, quick definitions for every concept and every number the calculator shows.</p>

          <div style={{ fontSize:11, fontWeight:700, color:t.tx3, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Guides</div>
          <div style={{ marginBottom:36 }}>
            {[
              { heading:"START HERE", items:[
                { slug:"what-is-a-dividend", title:"What Is a Dividend? How Dividends Work", sub:"Where the cash comes from, the dates that decide if you get paid, and the one-day catch." },
                { slug:"how-to-invest-in-etfs-for-beginners", title:"How to Invest in ETFs for Beginners", sub:"A plain-language guide to your first $5,000 — and a 30-year projection you can rerun yourself." },
                { slug:"what-drip-does-to-your-returns", title:"What DRIP Actually Does to Your Returns", sub:"The same money, reinvestment on and off, thirty years apart in outcome." },
                { slug:"what-one-dollar-a-day-builds", title:"What $1 a Day Actually Builds", sub:"The honest 30-year number — and why the million-dollar version is a rate trick." },
              ]},
              { heading:"GROW THE PILE", items:[
                { slug:"dividend-yield-vs-dividend-growth", title:"Dividend Yield vs. Dividend Growth", sub:"Income now or income later — and when the slow starter overtakes." },
                { slug:"lump-sum-vs-monthly-investing", title:"Lump Sum vs. Monthly Investing", sub:"The measured gap, the model's bias, and the one strategy that loses to both." },
                { slug:"monthly-vs-quarterly-dividends", title:"Monthly vs. Quarterly Dividends", sub:"What payout frequency actually changes — measured, not assumed." },
                { slug:"how-much-to-invest-for-500-a-month", title:"How Much to Invest for $500 a Month", sub:"The lump-sum answer, the build-toward answer, and why builders cross the line early." },
              ]},
              { heading:"CHOOSE SAFELY", items:[
                { slug:"how-to-tell-if-a-dividend-is-safe", title:"How to Tell If a Dividend Is Safe", sub:"Five checks that catch most cuts before the announcement." },
                { slug:"dividend-yield-traps", title:"Is a High Dividend Yield Good? Yield Traps", sub:"When a big yield is a warning sign, and the 15-year cost of chasing one." },
                { slug:"dividend-aristocrats-and-kings", title:"Dividend Aristocrats and Kings, Explained", sub:"What 25- and 50-year raise streaks prove — and what they don't." },
                { slug:"fidelity-vs-schwab-index-funds", title:"Fidelity vs. Schwab Index Funds", sub:"Near-identical funds, one real difference — and what the fee gap actually costs over 30 years." },
              ]},
              { heading:"LIVE OFF IT", items:[
                { slug:"how-much-to-live-off-dividends", title:"How Much Do You Need to Live Off Dividends?", sub:"The portfolio your expenses require, a freedom-date projection, and why the target moves." },
                { slug:"living-off-dividends-vs-selling-shares", title:"Living Off Dividends vs. Selling Shares", sub:"Natural yield or the 4% rule — where each one breaks, and the hybrid in between." },
                { slug:"what-a-market-crash-does-to-dividends", title:"What a Market Crash Does to Dividend Income", sub:"Prices fell 55% in 2008. Dividends fell 24%. Both halves of that sentence matter." },
                { slug:"how-dividends-are-taxed", title:"How Dividends Are Taxed", sub:"The account matters more than the rate: qualified vs. ordinary, the 0% bracket, and the reinvestment surprise." },
              ]},
            ].map((cat, ci) => (
              <div key={cat.heading}>
                <div style={{ fontSize:13, fontWeight:700, color:t.tx3, letterSpacing:"0.06em", textTransform:"uppercase", marginTop:ci===0?0:22, marginBottom:10 }}>{cat.heading}</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:12 }}>
                  {cat.items.map(item => (
                    <div key={item.slug} style={{ background:t.sf, border:`1px solid ${t.bd2}`, borderRadius:14, padding:"16px 20px" }}>
                      <a href={`/learn/${item.slug}/`} onClick={e => { e.preventDefault(); navigate(`article:${item.slug}`); }} style={{ color:t.ac, fontSize:16, fontWeight:600, textDecoration:"none", fontFamily:FONT }}>{item.title}</a>
                      <p style={{ fontSize:13, lineHeight:1.6, color:t.tx2, margin:"4px 0 0 0" }}>{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontSize:11, fontWeight:700, color:t.tx3, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Glossary — Quick Definitions</div>

          <div style={{ background:t.sf, borderRadius:16, padding:"24px 28px", border:`1px solid ${t.bd2}`, marginBottom:28 }}>
            <div style={{ fontSize:13, fontWeight:700, color:t.tx2, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:12 }}>Contents</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 24px" }}>
              {["What Is a Dividend?","Dividend Yield","Dividend Growth","What Is DRIP?","How Compounding Works","Yield on Cost","What Is an ETF?","Expense Ratios","Dividend Tax","Capital Gains Tax","Walk-Away Value","Payout Frequency","Payout Ratio","Dividend Aristocrats","Inflation and Dividends","Living Off Dividends","Freedom Date","CAGR","How to Compare Funds","Getting Started"].map((item,idx) => (
                <a key={idx} href={`#learn-${idx}`} onClick={e => { e.preventDefault(); document.getElementById(`learn-${idx}`)?.scrollIntoView({ behavior:"smooth", block:"start" }); }} style={{ fontSize:12, color:t.ac, textDecoration:"none", cursor:"pointer" }}>{idx+1}. {item}</a>
              ))}
            </div>
          </div>

          {(() => {
            const W="#FAF8F5", WD=t.sf2, WB=dark?t.bd2:"#EDE8E0", O="#E8874A", O2="#F5C09A", G="#1a8a4a", R="#D94040", B="#4A90D9", P="#9B6FD4";
              const vbStyle = {background:dark?WD:"#FAF6F1",borderRadius:14,padding:"20px 24px",marginTop:16,border:`1px solid ${WB}`}
            const vlStyle = (color) => ({fontSize:11,fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:color||O,marginBottom:10});

            const sections = [
              // 1. What Is a Dividend?
              { t:"What Is a Dividend?", b:"When a company makes a profit, it can share part of it with the people who own its stock. That shared profit is a dividend — own 100 shares of a company paying $3.50 per share per year, and you collect $350 just for holding. Dividends aren't guaranteed, and the dates that decide who gets paid have a catch worth knowing.", link:{ text:"What Is a Dividend? How Dividends Work", slug:"what-is-a-dividend" } },
              // 2. Dividend Yield
              { t:"Dividend Yield", b:"Dividend yield is how much income a stock pays relative to its price: Annual Dividend ÷ Share Price × 100. A $100 stock paying $3.50 a year yields 3.5%. Because yield moves opposite to price, an unusually high yield is often a warning sign, not a gift.", link:{ text:"What Is a Dividend? How Dividends Work", slug:"what-is-a-dividend" } },
              // 3. Dividend Growth
              { t:"Dividend Growth", b:"Dividend growth is how much the per-share payout rises each year — separate from the share price. Raises compound on each other, so a payout growing 7% a year roughly doubles every decade. Whether fast growth beats a high starting yield is the classic dividend fork.", link:{ text:"Dividend Yield vs. Dividend Growth", slug:"dividend-yield-vs-dividend-growth" } },
              // 4. What Is DRIP?
              { t:"What Is DRIP?", b:"DRIP (Dividend Reinvestment Plan) automatically uses each dividend to buy more shares — and those new shares pay their own dividends next time. Most brokerages offer it free, as a single toggle. Over thirty years, that one toggle can roughly double an outcome.", link:{ text:"What DRIP Actually Does to Your Returns", slug:"what-drip-does-to-your-returns" } },
              // 5. How Compounding Works
              { t:"How Compounding Works", b:"Compounding means your earnings generate their own earnings — price growth building on prior growth, and reinvested dividends buying shares that pay dividends of their own. It starts invisibly slow and ends steep: the back half of a thirty-year run does most of the work.", link:{ text:"What DRIP Actually Does to Your Returns", slug:"what-drip-does-to-your-returns" } },
              // 6. Yield on Cost
              { t:"Yield on Cost", b:"Yield on cost (YoC) is your annual dividend income divided by what you originally paid — not what the stock is worth today.\n\nYou buy at $100/share with a 3.5% yield ($3.50/share). If the dividend grows 7% per year, by Year 10 each share pays $6.89. You still paid $100. Your yield on cost is 6.89%.\n\nBy Year 30, the same share pays $26.64. Your yield on cost: 26.64%. You cannot buy that yield on the market today. You earn it through time." },
              // 7. What Is an ETF?
              { t:"What Is an ETF?", b:"An ETF (Exchange-Traded Fund) is a basket of stocks in one purchase — a single fund can hold 500 companies, giving instant diversification for a small annual fee. Choosing a good one comes down to three checks: the fee, what it tracks, and its track record.", link:{ text:"How to Invest in ETFs for Beginners", slug:"how-to-invest-in-etfs-for-beginners" } },
              // 8. Expense Ratios
              { t:"Expense Ratios", b:"An expense ratio is the annual fee a fund deducts automatically from its share price — you never see a bill, which is exactly why it's easy to ignore. On $10,000 over 30 years at 10% growth, a 0.03% fund costs about $900 in total; a 0.75% fund costs about $23,000. The calculator deducts the fee monthly, the way real funds do, and tracks the cumulative cost.", link:{ text:"Fidelity vs. Schwab Index Funds — what fees actually cost", slug:"fidelity-vs-schwab-index-funds" } },
              // 9. Dividend Tax
              { t:"Dividend Tax", b:"Dividends are income, and in a regular brokerage account they're taxed in the year they're paid — qualified dividends at the friendlier capital-gains rates, ordinary ones at your regular income rate. Inside a Roth IRA they generally aren't taxed at all, which is the biggest tax lever most investors have.", link:{ text:"How Dividends Are Taxed", slug:"how-dividends-are-taxed" } },
              // 10. Capital Gains Tax
              { t:"Capital Gains Tax", b:"Capital gains tax applies only when you sell, and only on the profit — long-term gains (held more than a year) get the 0%, 15%, or 20% rates. Hold, and nothing is owed. That's why the calculator shows both Portfolio Value and Walk-Away Value.", link:{ text:"How Dividends Are Taxed", slug:"how-dividends-are-taxed" } },
              // 11. Walk-Away Value
              { t:"Walk-Away Value", b:"Walk-away value is what you keep after selling everything and paying capital gains tax.\n\nPortfolio value is not what you keep — it includes unrealized gains that will be taxed. Walk-away value subtracts that tax to show the real number.\n\nTwo portfolios can both be worth $200,000. One where you contributed $150,000 has a small gain and small tax. One where you contributed $30,000 has a massive gain and a bigger tax bill. Same value, very different walk-away." },
              // 12. Payout Frequency
              { t:"Payout Frequency", b:"How often a fund pays dividends affects how your money compounds.\n\nQuarterly (every 3 months) is most common — months 3, 6, 9, and 12. Some funds pay monthly. A few pay semi-annually or annually.\n\nWhy it matters: a monthly-paying fund reinvests dividends 12 times per year. A quarterly fund reinvests 4 times. Those extra reinvestment cycles mean more shares earning dividends sooner. Over 30 years, a monthly payer can produce slightly more than a quarterly payer — all else equal." },
              // 13. Payout Ratio
              { t:"Payout Ratio", b:"Payout ratio tells you what percentage of a company's earnings it pays as dividends. It measures how safe the dividend is.\n\nFormula: Annual Dividend ÷ Earnings Per Share × 100\n\nBelow 60% is healthy — the company keeps plenty to reinvest and can maintain the dividend in a bad quarter. 60-75% is moderate. Above 75% is stretched. Above 100% means the company pays more than it earns — usually a red flag.\n\nREITs are the exception — they must pay out 90%+ of income by law, so high payout ratios are normal for them." },
              // 14. Dividend Aristocrats
              { t:"Dividend Aristocrats", b:"Dividend Aristocrats are S&P 500 companies that have raised their dividend for 25+ consecutive years. About 65 companies qualify.\n\nDividend Kings go even further — 50+ consecutive years. Coca-Cola, Johnson & Johnson, and Procter & Gamble are in both groups.\n\nA company that raised its dividend every year for 50 years — through recessions, financial crises, pandemics — has demonstrated extreme commitment to shareholders. You can invest in all Aristocrats at once through the NOBL ETF." },
              // 15. Inflation and Dividends
              { t:"Inflation and Dividends", b:"Inflation means prices rise over time. $500/month in expenses today will cost roughly $900/month in 20 years at 3% inflation.\n\nIf your dividends grow at 7% and inflation runs at 3%, your income grows more than twice as fast as expenses. The gap widens in your favor every year.\n\nIf dividends do not grow (0% growth), inflation eats your purchasing power. $500/month in income today buys less every year. After 20 years it has the buying power of about $275 in today's dollars." },
              // 16. Living Off Dividends
              { t:"Living Off Dividends", b:"Living off dividends means your portfolio pays enough each month to cover expenses — without selling shares.\n\nThe basic math: if expenses are $2,000/month ($24,000/year) and your portfolio yields 3% after tax, you need about $800,000 invested.\n\nMost people build toward that number over 15-25 years through regular contributions and DRIP. The combination of your contributions, price growth, dividend growth, and compounding can build a portfolio that covers your expenses — and then keeps growing after that." },
              // 17. Freedom Date
              { t:"Freedom Date", b:"Your freedom date is the exact month when your dividend income crosses above your living expenses — adjusted for inflation.\n\nThis is different from having enough saved. You never sell shares. Your portfolio stays intact, keeps growing, keeps paying. A 30% market crash drops your share prices but if the companies keep paying dividends, your income does not change.\n\nOur calculator checks every single month: does this month's net dividend income exceed this month's inflation-adjusted expenses? The first month where the answer is yes is your freedom date." },
              // 18. CAGR
              { t:"CAGR", b:"CAGR (Compound Annual Growth Rate) is the average annual growth rate, accounting for compounding.\n\nFormula: (End Value ÷ Start Value)^(1 ÷ Years) − 1\n\nExample: $10,000 grows to $30,000 in 10 years. CAGR = 11.6% per year.\n\nCAGR is different from a simple average. A stock up 50% one year then down 33% the next has a simple average of +8.5% — but the CAGR is 0%, because you are back where you started. CAGR tells the real story." },
              // 19. How to Compare Funds
              { t:"How to Compare Funds", b:"Five numbers tell you almost everything about a dividend fund.\n\nDividend yield: how much income it pays today. Dividend growth rate: how fast that income is rising. Price appreciation: how fast the share price grows. Expense ratio: the annual fee. Track record: how many years of consistent performance.\n\nA high yield with no growth will eventually lose to a moderate yield with strong growth. A cheap fund will beat an expensive one that performs identically. Our Compare tab sets up a fair race — same investment, same timeframe — and crowns a winner per metric.", link:{ prefix:"For a worked example of how close two 'identical' funds really run, see", text:"Fidelity vs. Schwab Index Funds", slug:"fidelity-vs-schwab-index-funds" } },
              // 20. Getting Started
              { t:"Getting Started", b:"You don't need much — fractional shares mean you can start with $5. The path: open a free brokerage account, buy a broad dividend ETF, turn on DRIP, automate a contribution, and then leave it alone. The full walkthrough, including what to do after you buy, is in the guide.", link:{ text:"How to Invest in ETFs for Beginners", slug:"how-to-invest-in-etfs-for-beginners" } },
            ];

            return sections.map((section, i) => (
              React.createElement("div", { key:i, id:`learn-${i}`, style:{ background:t.sf, borderRadius:16, padding:"28px 32px", border:`1px solid ${t.bd2}`, marginBottom:16 }},
                React.createElement("h2", { style:{ fontSize:20, fontWeight:600, marginBottom:12 }}, `${i+1}. ${section.t}`),
                ...section.b.split("\n\n").map((para, j) =>
                  React.createElement("p", { key:j, style:{ fontSize:14, lineHeight:1.7, color:t.tx2, margin: j < section.b.split("\n\n").length - 1 ? "0 0 12px 0" : "0" }}, para)
                ),
                section.link && React.createElement("p", { key:"lnk", style:{ fontSize:14, lineHeight:1.7, color:t.tx2, margin:"12px 0 0 0" }},
                  (section.link.prefix || "Full guide:") + " ",
                  React.createElement("a", { href:`/learn/${section.link.slug}/`, onClick:(e) => { e.preventDefault(); navigate(`article:${section.link.slug}`); }, style:{ color:t.ac, textDecoration:"underline" } }, `${section.link.text} →`)
                ),

                // ===== VISUALS =====

                // 1. What Is a Dividend — flow diagram
                i===0 && React.createElement("div", {style:vbStyle},
                  React.createElement("div", {style:vlStyle()}, "How dividends flow"),
                  React.createElement("div", { style:{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, flexWrap:"wrap" }},
                    React.createElement("div", { style:{ textAlign:"center", padding:"14px 20px", borderRadius:10, border:`2px solid ${B}40`, background:`${B}08` }},
                      React.createElement("div", { style:{ fontSize:11, color:t.tx3 }}, "You Own"),
                      React.createElement("div", { style:{ fontSize:22, fontWeight:700, color:B }}, "100"),
                      React.createElement("div", { style:{ fontSize:11, color:t.tx3 }}, "shares")
                    ),
                    React.createElement("div", { style:{ fontSize:18, color:t.tx3 }}, "×"),
                    React.createElement("div", { style:{ textAlign:"center", padding:"14px 20px", borderRadius:10, border:`2px solid ${O}40`, background:`${O}08` }},
                      React.createElement("div", { style:{ fontSize:11, color:t.tx3 }}, "Dividend"),
                      React.createElement("div", { style:{ fontSize:22, fontWeight:700, color:O }}, "$3.50"),
                      React.createElement("div", { style:{ fontSize:11, color:t.tx3 }}, "per share/yr")
                    ),
                    React.createElement("div", { style:{ fontSize:18, color:t.tx3 }}, "="),
                    React.createElement("div", { style:{ textAlign:"center", padding:"14px 20px", borderRadius:10, border:`2px solid ${G}40`, background:`${G}08` }},
                      React.createElement("div", { style:{ fontSize:11, color:t.tx3 }}, "You Receive"),
                      React.createElement("div", { style:{ fontSize:22, fontWeight:700, color:G }}, "$350"),
                      React.createElement("div", { style:{ fontSize:11, color:t.tx3 }}, "per year")
                    )
                  )
                ),

                // 2. Yield — interactive slider
                i===1 && React.createElement("div", {style:vbStyle},
                  React.createElement("div", {style:vlStyle()}, "Drag the price — watch the yield"),
                  React.createElement("div", { style:{ display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }},
                    React.createElement("div", { style:{ flex:1, minWidth:200 }},
                      React.createElement("div", { style:{ fontSize:12, color:t.tx3, marginBottom:4 }}, "Share Price: ", React.createElement("strong", { style:{ color:t.tx }}, `$${demoPrice}`)),
                      React.createElement("input", { type:"range", min:20, max:200, value:demoPrice, onInput:e=>setDemoPrice(+e.target.value), onChange:e=>setDemoPrice(+e.target.value), style:{ width:"100%", accentColor:O, cursor:"pointer" }})
                    ),
                    React.createElement("div", { style:{ textAlign:"center" }}, React.createElement("div",{style:{fontSize:11,color:t.tx3}},"Dividend"), React.createElement("div",{style:{fontSize:20,fontWeight:700,color:P}},"$3.50")),
                    React.createElement("div", { style:{ textAlign:"center" }}, React.createElement("div",{style:{fontSize:11,color:t.tx3}},"Yield"), React.createElement("div",{style:{fontSize:28,fontWeight:800,color:O}},`${(3.50/demoPrice*100).toFixed(2)}%`))
                  ),
                  React.createElement("div", { style:{ fontSize:12, color:t.tx3, marginTop:8 }}, "Same $3.50 dividend. The yield changes because the price moved.")
                ),

                // 3. Dividend Growth — stepping bars
                i===2 && React.createElement("div", {style:vbStyle},
                  React.createElement("div", {style:vlStyle()}, "$3.50/share growing at 7% per year"),
                  React.createElement("div", { style:{ display:"flex", alignItems:"flex-end", height:120, gap:6, borderBottom:`1px solid ${t.bd}`, paddingBottom:8, marginBottom:8 }},
                    ...[{yr:0,v:3.50},{yr:1,v:3.75},{yr:2,v:4.01},{yr:3,v:4.29},{yr:5,v:4.91},{yr:10,v:6.89},{yr:20,v:13.54},{yr:30,v:26.64}].map((d,yi) =>
                      React.createElement("div", { key:yi, style:{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end", height:"100%" }},
                        React.createElement("div", { style:{ fontSize:9, fontWeight:700, color:O, marginBottom:3 }}, `$${d.v.toFixed(2)}`),
                        React.createElement("div", { style:{ width:"70%", maxWidth:28, height:`${(d.v/26.64)*90}%`, borderRadius:"4px 4px 0 0", background:`linear-gradient(to top, ${O}30, ${O})`, minHeight:4 }})
                      )
                    )
                  ),
                  React.createElement("div", { style:{ display:"flex", justifyContent:"space-around", fontSize:9, color:t.tx3 }},
                    ...["0","1","2","3","5","10","20","30"].map(yr => React.createElement("div", { key:yr, style:{ flex:1, textAlign:"center" }}, `Yr ${yr}`))
                  )
                ),

                // 4. DRIP — snowball demo
                i===3 && (() => {
                  const sn=[{yr:0,sh:200,add:0},{yr:1,sh:210,add:10},{yr:2,sh:220.5,add:10.5},{yr:3,sh:231.5,add:11}], mx=231.5;
                  return React.createElement("div", {style:vbStyle},
                    React.createElement("div", {style:vlStyle()}, "The Snowball — $1,000 at $5/share, 5% yield"),
                    React.createElement("div", { style:{ display:"flex", gap:4, marginBottom:14 }},
                      ...sn.map((d,si) => React.createElement("button", { key:si, onClick:()=>setDemoYear(si), style:{ padding:"5px 12px", borderRadius:6, border:`1.5px solid ${si===demoYear?O:t.bd}`, background:si===demoYear?O:"transparent", color:si===demoYear?"#FFF":t.tx3, fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:FONT }}, `Yr ${d.yr}`))
                    ),
                    React.createElement("div", { style:{ display:"flex", alignItems:"flex-end", justifyContent:"center", height:120, gap:28, borderBottom:`1px solid ${t.bd}`, paddingBottom:10, marginBottom:12 }},
                      ...sn.map((d,si) => {
                        const bH=(d.sh/mx)*100, aH=(d.add/mx)*100, on=si<=demoYear;
                        return React.createElement("div", { key:si, style:{ display:"flex", flexDirection:"column", alignItems:"center", opacity:on?1:0.15, transition:"all 0.5s" }},
                          React.createElement("div", { style:{ fontSize:13, fontWeight:700, marginBottom:6, color:on?t.tx:t.tx3 }}, d.sh),
                          React.createElement("div", { style:{ width:44, height:bH, borderRadius:"5px 5px 0 0", position:"relative", overflow:"hidden" }},
                            React.createElement("div", { style:{ position:"absolute", bottom:0, width:"100%", height:"100%", background:`linear-gradient(to top, ${t.tx3}30, ${t.tx3}60)`, borderRadius:"5px 5px 0 0" }}),
                            d.add>0 && React.createElement("div", { style:{ position:"absolute", top:0, width:"100%", height:aH, background:`linear-gradient(to top, ${O}BB, ${O})`, borderRadius:"5px 5px 0 0" }})
                          )
                        );
                      })
                    ),
                    React.createElement("div", { style:{ display:"flex", justifyContent:"space-around", fontSize:12 }},
                      React.createElement("span", null, React.createElement("span",{style:{color:t.tx3}},"Shares: "), React.createElement("strong",null,sn[demoYear].sh)),
                      React.createElement("span", null, React.createElement("span",{style:{color:t.tx3}},"New via DRIP: "), React.createElement("strong",{style:{color:G}},`+${sn[demoYear].add}`)),
                      React.createElement("span", null, React.createElement("span",{style:{color:t.tx3}},"You added: "), React.createElement("strong",null,"$0"))
                    )
                  );
                })(),

                // 5. Compounding — DRIP vs No DRIP
                i===4 && (() => {
                  const dV=[10000,18399,33275,59286,104257,181261,312018], nV=[10000,17822,30042,49192,79283,126683,201525], yrs=[0,5,10,15,20,25,30], mx=312018;
                  return React.createElement("div", {style:vbStyle},
                    React.createElement("div", {style:vlStyle()}, "$10,000 over 30 years — DRIP vs No DRIP"),
                    React.createElement("div", { style:{ display:"flex", alignItems:"flex-end", height:150, gap:4, borderBottom:`1px solid ${t.bd}`, paddingBottom:8, marginBottom:8 }},
                      ...yrs.map((yr,yi) => {
                        const dH=Math.max(Math.sqrt(dV[yi]/mx)*140,5), nH=Math.max(Math.sqrt(nV[yi]/mx)*140,5);
                        return React.createElement("div", { key:yi, style:{ flex:1, display:"flex", gap:2, alignItems:"flex-end", justifyContent:"center" }},
                          React.createElement("div", { title:`DRIP: $${dV[yi].toLocaleString()}`, style:{ width:"38%", maxWidth:22, height:dH, borderRadius:"3px 3px 0 0", background:`linear-gradient(to top, ${G}50, ${G})` }}),
                          React.createElement("div", { title:`No DRIP: $${nV[yi].toLocaleString()}`, style:{ width:"38%", maxWidth:22, height:nH, borderRadius:"3px 3px 0 0", background:`linear-gradient(to top, ${t.tx3}20, ${t.tx3}55)` }})
                        );
                      })
                    ),
                    React.createElement("div", { style:{ display:"flex", justifyContent:"space-around", fontSize:10, color:t.tx3, marginBottom:8 }}, ...yrs.map(yr => React.createElement("div", { key:yr, style:{ flex:1, textAlign:"center" }}, `Yr ${yr}`))),
                    React.createElement("div", { style:{ display:"flex", gap:16, justifyContent:"center" }},
                      React.createElement("div", { style:{ display:"flex", alignItems:"center", gap:5, fontSize:11 }}, React.createElement("div",{style:{width:10,height:10,borderRadius:2,background:G}}), React.createElement("span",{style:{color:t.tx2}},`DRIP — $312K`)),
                      React.createElement("div", { style:{ display:"flex", alignItems:"center", gap:5, fontSize:11 }}, React.createElement("div",{style:{width:10,height:10,borderRadius:2,background:t.tx3,opacity:0.5}}), React.createElement("span",{style:{color:t.tx2}},`No DRIP — $202K`))
                    )
                  );
                })(),

                // 6. YoC — progression bars
                i===5 && React.createElement("div", {style:vbStyle},
                  React.createElement("div", {style:vlStyle()}, "Your yield on cost over time — 3.5% start, 7% growth"),
                  React.createElement("div", { style:{ display:"flex", alignItems:"flex-end", height:120, gap:4, borderBottom:`1px solid ${t.bd}`, paddingBottom:8, marginBottom:8 }},
                    ...[{yr:0,v:3.5},{yr:5,v:4.91},{yr:10,v:6.89},{yr:15,v:9.66},{yr:20,v:13.54},{yr:25,v:19.00},{yr:30,v:26.64}].map((d,yi) =>
                      React.createElement("div", { key:yi, style:{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end", height:"100%" }},
                        React.createElement("div", { style:{ fontSize:10, fontWeight:700, color:O, marginBottom:3 }}, `${d.v}%`),
                        React.createElement("div", { style:{ width:"65%", maxWidth:28, height:`${(d.v/26.64)*85}%`, borderRadius:"4px 4px 0 0", background:`linear-gradient(to top, ${O}30, ${O})`, minHeight:4 }})
                      )
                    )
                  ),
                  React.createElement("div", { style:{ display:"flex", justifyContent:"space-around", fontSize:10, color:t.tx3 }}, ...["0","5","10","15","20","25","30"].map(yr => React.createElement("div",{key:yr,style:{flex:1,textAlign:"center"}},`Yr ${yr}`)))
                ),

                // 7. ETF — basket visual
                i===6 && React.createElement("div", {style:vbStyle},
                  React.createElement("div", {style:vlStyle(B)}, "One ETF = hundreds of stocks"),
                  React.createElement("div", { style:{ display:"flex", alignItems:"center", justifyContent:"center", gap:16 }},
                    React.createElement("div", { style:{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:3 }},
                      ...Array(15).fill(0).map((_,k) => React.createElement("div", { key:k, style:{ width:16, height:16, borderRadius:3, background:`${B}${(20+k*5).toString(16)}` }}))
                    ),
                    React.createElement("div", { style:{ fontSize:22, color:t.tx3 }}, "→"),
                    React.createElement("div", { style:{ padding:"16px 24px", borderRadius:12, border:`2px solid ${O}40`, background:`${O}08`, textAlign:"center" }},
                      React.createElement("div", { style:{ fontSize:18, fontWeight:800, color:O }}, "1 ETF"),
                      React.createElement("div", { style:{ fontSize:11, color:t.tx3, marginTop:2 }}, "SCHD, VOO, VYM")
                    )
                  )
                ),

                // 8. Expense Ratio — cheap vs expensive
                i===7 && React.createElement("div", {style:vbStyle},
                  React.createElement("div", {style:vlStyle(R)}, "$10,000 over 30 years — what fees cost you"),
                  React.createElement("div", { style:{ display:"flex", alignItems:"flex-end", justifyContent:"center", gap:40, height:120, borderBottom:`1px solid ${t.bd}`, paddingBottom:10, marginBottom:10 }},
                    React.createElement("div", { style:{ display:"flex", flexDirection:"column", alignItems:"center" }},
                      React.createElement("div", { style:{ fontSize:14, fontWeight:700, color:G, marginBottom:4 }}, "$900"),
                      React.createElement("div", { style:{ width:50, height:6, borderRadius:3, background:`linear-gradient(to top, ${G}80, ${G})` }}),
                    ),
                    React.createElement("div", { style:{ display:"flex", flexDirection:"column", alignItems:"center" }},
                      React.createElement("div", { style:{ fontSize:14, fontWeight:700, color:R, marginBottom:4 }}, "$23,000"),
                      React.createElement("div", { style:{ width:50, height:100, borderRadius:6, background:`linear-gradient(to top, ${R}60, ${R})` }}),
                    )
                  ),
                  React.createElement("div", { style:{ display:"flex", justifyContent:"center", gap:40, fontSize:11, color:t.tx3 }},
                    React.createElement("div", { style:{ width:50, textAlign:"center" }}, "0.03%"),
                    React.createElement("div", { style:{ width:50, textAlign:"center" }}, "0.75%")
                  ),
                  React.createElement("div", { style:{ fontSize:12, color:t.tx3, textAlign:"center", marginTop:10 }}, "Same investment. The expensive fund takes $22,000 more.")
                ),

                // 9. Dividend Tax — gross to net
                i===8 && React.createElement("div", {style:vbStyle},
                  React.createElement("div", {style:vlStyle(P)}, "Where your dividend goes"),
                  React.createElement("div", { style:{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, flexWrap:"wrap" }},
                    React.createElement("div", { style:{ textAlign:"center", padding:"12px 18px", borderRadius:10, border:`2px solid ${O}40`, background:`${O}08` }},
                      React.createElement("div", { style:{ fontSize:11, color:t.tx3 }}, "Gross Dividend"),
                      React.createElement("div", { style:{ fontSize:22, fontWeight:700, color:O }}, "$1,000")
                    ),
                    React.createElement("div", { style:{ fontSize:14, color:t.tx3 }}, "→"),
                    React.createElement("div", { style:{ textAlign:"center", padding:"12px 18px", borderRadius:10, border:`2px solid ${R}40`, background:`${R}08` }},
                      React.createElement("div", { style:{ fontSize:11, color:t.tx3 }}, "Tax (15%)"),
                      React.createElement("div", { style:{ fontSize:22, fontWeight:700, color:R }}, "$150")
                    ),
                    React.createElement("div", { style:{ fontSize:14, color:t.tx3 }}, "→"),
                    React.createElement("div", { style:{ textAlign:"center", padding:"12px 18px", borderRadius:10, border:`2px solid ${G}40`, background:`${G}08` }},
                      React.createElement("div", { style:{ fontSize:11, color:t.tx3 }}, "You Keep / DRIP"),
                      React.createElement("div", { style:{ fontSize:22, fontWeight:700, color:G }}, "$850")
                    )
                  )
                ),

                // 10. Capital Gains — visual
                i===9 && React.createElement("div", {style:vbStyle},
                  React.createElement("div", {style:vlStyle(R)}, "Capital gains example"),
                  React.createElement("div", { style:{ height:24, borderRadius:6, overflow:"hidden", display:"flex", marginBottom:8 }},
                    React.createElement("div", { style:{ width:"25%", background:`${t.tx3}40` }}),
                    React.createElement("div", { style:{ width:"63.75%", background:`linear-gradient(90deg, ${G}BB, ${G})` }}),
                    React.createElement("div", { style:{ flex:1, background:`linear-gradient(90deg, ${R}BB, ${R})` }})
                  ),
                  React.createElement("div", { style:{ display:"flex", justifyContent:"space-between", fontSize:11 }},
                    React.createElement("span", { style:{ color:t.tx3 }}, "Cost: $50K"),
                    React.createElement("span", { style:{ color:G, fontWeight:600 }}, "Gain: $150K"),
                    React.createElement("span", { style:{ color:R, fontWeight:600 }}, "Tax: $22.5K")
                  )
                ),

                // 11. Walk-Away — horizontal bar
                i===10 && React.createElement("div", {style:vbStyle},
                  React.createElement("div", {style:vlStyle(G)}, "$200K portfolio → what you actually keep"),
                  React.createElement("div", { style:{ height:28, borderRadius:8, overflow:"hidden", display:"flex", marginBottom:8 }},
                    React.createElement("div", { style:{ width:"89%", background:`linear-gradient(90deg, ${G}, ${G}BB)` }}),
                    React.createElement("div", { style:{ flex:1, background:`linear-gradient(90deg, ${R}BB, ${R})` }})
                  ),
                  React.createElement("div", { style:{ display:"flex", justifyContent:"space-between", fontSize:12 }},
                    React.createElement("span", { style:{ color:G, fontWeight:600 }}, "Keep: $177,500 (89%)"),
                    React.createElement("span", { style:{ color:R, fontWeight:600 }}, "Tax: $22,500")
                  )
                ),

                // 12. Payout Frequency — calendar
                i===11 && React.createElement("div", {style:vbStyle},
                  React.createElement("div", {style:vlStyle()}, "Quarterly payouts — 4 times per year"),
                  React.createElement("div", { style:{ display:"flex", gap:8, justifyContent:"center" }},
                    ...["Q1","Q2","Q3","Q4"].map((q,qi) => React.createElement("div", { key:qi, style:{ textAlign:"center", padding:"10px 16px", borderRadius:8, border:`2px solid ${qi%2===0?O:O}40`, background:`${O}${qi%2===0?"15":"08"}` }},
                      React.createElement("div", { style:{ fontSize:11, color:t.tx3 }}, q),
                      React.createElement("div", { style:{ fontSize:16, fontWeight:700, color:O }}, ["Mar","Jun","Sep","Dec"][qi]),
                      React.createElement("div", { style:{ fontSize:10, color:t.tx3 }}, "Payout")
                    ))
                  )
                ),

                // 13. Payout Ratio — gauge
                i===12 && React.createElement("div", {style:vbStyle},
                  React.createElement("div", {style:vlStyle()}, "Dividend safety zones"),
                  React.createElement("div", { style:{ height:20, borderRadius:10, overflow:"hidden", display:"flex", marginBottom:8 }},
                    React.createElement("div", { style:{ width:"60%", background:`linear-gradient(90deg, ${G}CC, ${G})` }}),
                    React.createElement("div", { style:{ width:"15%", background:`linear-gradient(90deg, ${O}CC, ${O})` }}),
                    React.createElement("div", { style:{ flex:1, background:`linear-gradient(90deg, ${R}CC, ${R})` }})
                  ),
                  React.createElement("div", { style:{ display:"flex", justifyContent:"space-between", fontSize:11 }},
                    React.createElement("span", { style:{ color:G }}, "< 60% Healthy"),
                    React.createElement("span", { style:{ color:O }}, "60-75%"),
                    React.createElement("span", { style:{ color:R }}, "> 75% Risky")
                  )
                ),

                // 14. Aristocrats — timeline
                i===13 && React.createElement("div", {style:vbStyle},
                  React.createElement("div", {style:vlStyle(B)}, "Consecutive years of dividend increases"),
                  React.createElement("div", { style:{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }},
                    ...[{l:"Typical Stock",y:3,c:t.tx3},{l:"Aristocrat",y:25,c:O},{l:"King",y:50,c:G}].map((d,di) =>
                      React.createElement("div", { key:di, style:{ textAlign:"center", flex:1, minWidth:80 }},
                        React.createElement("div", { style:{ fontSize:28, fontWeight:800, color:d.c }}, `${d.y}+`),
                        React.createElement("div", { style:{ fontSize:11, color:t.tx3 }}, "years"),
                        React.createElement("div", { style:{ fontSize:12, fontWeight:600, color:d.c, marginTop:4 }}, d.l)
                      )
                    )
                  )
                ),

                // 15. Inflation — diverging bars
                i===14 && React.createElement("div", {style:vbStyle},
                  React.createElement("div", {style:vlStyle(R)}, "$500/month expenses over time at 3% inflation"),
                  React.createElement("div", { style:{ display:"flex", alignItems:"flex-end", height:100, gap:8, borderBottom:`1px solid ${t.bd}`, paddingBottom:8, marginBottom:8 }},
                    ...[{yr:"Today",v:500},{yr:"Yr 5",v:580},{yr:"Yr 10",v:672},{yr:"Yr 15",v:780},{yr:"Yr 20",v:903}].map((d,yi) =>
                      React.createElement("div", { key:yi, style:{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end", height:"100%" }},
                        React.createElement("div", { style:{ fontSize:10, fontWeight:700, color:R, marginBottom:3 }}, `$${d.v}`),
                        React.createElement("div", { style:{ width:"70%", maxWidth:30, height:`${(d.v/903)*80}%`, borderRadius:"4px 4px 0 0", background:`linear-gradient(to top, ${R}30, ${R}80)`, minHeight:4 }})
                      )
                    )
                  ),
                  React.createElement("div", { style:{ fontSize:12, color:t.tx3, textAlign:"center" }}, "Your income needs to grow faster than this.")
                ),

                // 16. Living Off Dividends — math visual
                i===15 && React.createElement("div", {style:vbStyle},
                  React.createElement("div", {style:vlStyle(G)}, "How much do you need?"),
                  React.createElement("div", { style:{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, flexWrap:"wrap" }},
                    React.createElement("div", { style:{ textAlign:"center", padding:"12px 18px", borderRadius:10, border:`2px solid ${R}40`, background:`${R}08` }},
                      React.createElement("div", { style:{ fontSize:11, color:t.tx3 }}, "Annual Expenses"),
                      React.createElement("div", { style:{ fontSize:20, fontWeight:700, color:R }}, "$24,000")
                    ),
                    React.createElement("div", { style:{ fontSize:14, color:t.tx3 }}, "÷"),
                    React.createElement("div", { style:{ textAlign:"center", padding:"12px 18px", borderRadius:10, border:`2px solid ${O}40`, background:`${O}08` }},
                      React.createElement("div", { style:{ fontSize:11, color:t.tx3 }}, "Net Yield"),
                      React.createElement("div", { style:{ fontSize:20, fontWeight:700, color:O }}, "3.0%")
                    ),
                    React.createElement("div", { style:{ fontSize:14, color:t.tx3 }}, "="),
                    React.createElement("div", { style:{ textAlign:"center", padding:"12px 18px", borderRadius:10, border:`2px solid ${G}40`, background:`${G}08` }},
                      React.createElement("div", { style:{ fontSize:11, color:t.tx3 }}, "Portfolio Needed"),
                      React.createElement("div", { style:{ fontSize:20, fontWeight:700, color:G }}, "$800K")
                    )
                  )
                ),

                // 17. Freedom Date — crossover
                i===16 && (() => {
                  const data=[{yr:1,inc:30,exp:515},{yr:5,inc:65,exp:580},{yr:10,inc:150,exp:670},{yr:15,inc:350,exp:780},{yr:18,inc:600,exp:850},{yr:20,inc:800,exp:905},{yr:22,inc:1100,exp:940}];
                  const mx=1100;
                  return React.createElement("div", {style:vbStyle},
                    React.createElement("div", {style:vlStyle(P)}, "Dividend income catches up to expenses"),
                    React.createElement("div", { style:{ display:"flex", alignItems:"flex-end", height:120, gap:4, borderBottom:`1px solid ${t.bd}`, paddingBottom:8, marginBottom:8 }},
                      ...data.map((d,yi) => {
                        const iH=Math.max((d.inc/mx)*110,3), eH=Math.max((d.exp/mx)*110,3);
                        return React.createElement("div", { key:yi, style:{ flex:1, display:"flex", gap:2, alignItems:"flex-end", justifyContent:"center" }},
                          React.createElement("div", { title:`Income: $${d.inc}`, style:{ width:"38%", maxWidth:18, height:iH, borderRadius:"3px 3px 0 0", background:`linear-gradient(to top, ${P}40, ${P})` }}),
                          React.createElement("div", { title:`Expenses: $${d.exp}`, style:{ width:"38%", maxWidth:18, height:eH, borderRadius:"3px 3px 0 0", background:`linear-gradient(to top, ${R}20, ${R}55)` }})
                        );
                      })
                    ),
                    React.createElement("div", { style:{ display:"flex", justifyContent:"space-around", fontSize:9, color:t.tx3 }}, ...data.map(d => React.createElement("div",{key:d.yr,style:{flex:1,textAlign:"center"}},d.yr))),
                    React.createElement("div", { style:{ display:"flex", gap:16, justifyContent:"center", marginTop:8 }},
                      React.createElement("div", { style:{ display:"flex", alignItems:"center", gap:5, fontSize:11 }}, React.createElement("div",{style:{width:10,height:10,borderRadius:2,background:P}}), React.createElement("span",{style:{color:t.tx2}},"Income")),
                      React.createElement("div", { style:{ display:"flex", alignItems:"center", gap:5, fontSize:11 }}, React.createElement("div",{style:{width:10,height:10,borderRadius:2,background:R,opacity:0.5}}), React.createElement("span",{style:{color:t.tx2}},"Expenses"))
                    )
                  );
                })(),

                // 18. CAGR — before/after
                i===17 && React.createElement("div", {style:vbStyle},
                  React.createElement("div", {style:vlStyle()}, "CAGR in action"),
                  React.createElement("div", { style:{ display:"flex", alignItems:"center", justifyContent:"center", gap:20 }},
                    React.createElement("div", { style:{ textAlign:"center" }}, React.createElement("div",{style:{fontSize:11,color:t.tx3}},"Start"), React.createElement("div",{style:{fontSize:24,fontWeight:700,color:t.tx3}},"$10K")),
                    React.createElement("div", { style:{ textAlign:"center", padding:"8px 16px", borderRadius:8, background:`${O}15` }}, React.createElement("div",{style:{fontSize:11,color:t.tx3}},"10 years"), React.createElement("div",{style:{fontSize:22,fontWeight:800,color:O}},"11.6%"), React.createElement("div",{style:{fontSize:10,color:t.tx3}},"CAGR")),
                    React.createElement("div", { style:{ textAlign:"center" }}, React.createElement("div",{style:{fontSize:11,color:t.tx3}},"End"), React.createElement("div",{style:{fontSize:24,fontWeight:700,color:G}},"$30K"))
                  )
                ),

                // 19. Compare — 5 metrics
                i===18 && React.createElement("div", {style:vbStyle},
                  React.createElement("div", {style:vlStyle(B)}, "The five numbers that matter"),
                  React.createElement("div", { style:{ display:"flex", gap:6, justifyContent:"center", flexWrap:"wrap" }},
                    ...[{l:"Yield",c:O},{l:"Growth",c:G},{l:"Price",c:B},{l:"Fees",c:R},{l:"Track Record",c:P}].map((m,mi) =>
                      React.createElement("div", { key:mi, style:{ width:56, textAlign:"center" }},
                        React.createElement("div", { style:{ width:40, height:40, borderRadius:20, background:`${m.c}15`, border:`2px solid ${m.c}40`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 4px", fontSize:13, fontWeight:800, color:m.c }}, mi+1),
                        React.createElement("div", { style:{ fontSize:10, color:t.tx2, fontWeight:600 }}, m.l)
                      )
                    )
                  )
                ),

                // 20. Getting Started — steps
                i===19 && React.createElement("div", {style:vbStyle},
                  React.createElement("div", {style:vlStyle(G)}, "Your first five steps"),
                  React.createElement("div", { style:{ display:"flex", flexDirection:"column", gap:8 }},
                    ...[{n:1,l:"Open account",d:"Fidelity, Schwab, or Vanguard"},{n:2,l:"Buy a dividend ETF",d:"SCHD, VYM, or DGRO"},{n:3,l:"Turn on DRIP",d:"One toggle"},{n:4,l:"Auto-contribute",d:"Even $50/month"},{n:5,l:"Don't touch it",d:"Let time do the work"}].map(s =>
                      React.createElement("div", { key:s.n, style:{ display:"flex", alignItems:"center", gap:12 }},
                        React.createElement("div", { style:{ width:28, height:28, borderRadius:14, background:`${G}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color:G, flexShrink:0 }}, s.n),
                        React.createElement("div", null, React.createElement("span",{style:{fontWeight:600,fontSize:13}},s.l), React.createElement("span",{style:{fontSize:12,color:t.tx3,marginLeft:6}},`— ${s.d}`))
                      )
                    )
                  )
                )
              )
            ));
          })()}

          <div style={{ background:`linear-gradient(135deg, ${t.ac}11, ${t.pu}11)`, borderRadius:16, padding:"32px", border:`1px solid ${t.bd2}`, marginTop:24, textAlign:"center" }}>
            <h2 style={{ fontSize:22, fontWeight:600, marginBottom:8 }}>Ready to Run Your Numbers?</h2>
            <p style={{ fontSize:14, color:t.tx2, marginBottom:16 }}>Every concept above is modeled in our calculator. Enter your real numbers and see what your plan looks like.</p>
            <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
              <button onClick={() => { navigate("calculator"); setMode("projection"); }} style={{ padding:"12px 24px", borderRadius:10, border:"none", background:t.ac, color:"#FFF", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>Projection</button>
              <button onClick={() => { navigate("calculator"); setMode("liveoff"); }} style={{ padding:"12px 24px", borderRadius:10, border:"none", background:t.gn, color:"#FFF", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>Live Off Dividends</button>
              <button onClick={() => { navigate("calculator"); setMode("compare"); }} style={{ padding:"12px 24px", borderRadius:10, border:"none", background:t.pu, color:"#FFF", fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>Compare</button>
            </div>
          </div>
        </motion.div>
      ) : page === "about" ? (() => {
        return (
        <motion.div key="about" {...pageT} style={{ maxWidth:880, margin:"0 auto", padding:"48px 24px 60px" }}>
          <div style={{ textAlign:"center", marginBottom:48 }}>
            
            <h1 style={{ fontSize:36, fontWeight:700, letterSpacing:"-0.03em", lineHeight:1.15, marginBottom:12 }}>About Dividend Forecaster</h1>
            <p style={{ fontSize:15, lineHeight:1.7, color:t.tx2, maxWidth:560, margin:"0 auto" }}>Most calculators show you a big number and call it a plan. We show you the taxes, the fees, and the income — the numbers that actually decide whether your plan works.</p>
          </div>

          {/* Feature Grid */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:16, marginBottom:32 }}>
            {[
              { icon:"📊", title:"Monthly Engine", desc:"360 iterations for a 30-year projection. Every month modeled independently — dividends, taxes, DRIP, appreciation, fees." },
              { icon:"🎯", title:"Freedom Date", desc:"The exact year and month when your dividend income covers your inflation-adjusted expenses. Not a guess — a calculation." },
              { icon:"💰", title:"Walk-Away Value", desc:"What you actually keep after selling and paying capital gains tax. The number most calculators pretend does not exist." },
              { icon:"⚖️", title:"Head-to-Head Compare", desc:"Same money, same contribution, same timeframe. Different funds. One winner per metric. No opinions — just math." },
              { icon:"📈", title:"Goal Tracker", desc:"Set a target amount that grows over time — a house, a retirement number, a milestone. Watch your portfolio race toward it." },
              { icon:"🔓", title:"Free Forever", desc:"No accounts. No paywalls. No data collected. Every feature on this page works right now, for free, without signing up." },
            ].map((f,i) => (
              <div key={i} style={{ background:t.sf, borderRadius:14, padding:"20px 22px", border:`1px solid ${t.bd2}` }}>
                <div style={{ fontSize:24, marginBottom:10 }}>{f.icon}</div>
                <div style={{ fontSize:14, fontWeight:700, marginBottom:6 }}>{f.title}</div>
                <div style={{ fontSize:13, lineHeight:1.6, color:t.tx2 }}>{f.desc}</div>
              </div>
            ))}
          </div>

          {/* What makes it different */}
          <div style={{ background:t.sf, borderRadius:16, padding:"28px 32px", border:`1px solid ${t.bd2}`, marginBottom:32 }}>
            <h2 style={{ fontSize:22, fontWeight:700, marginBottom:20 }}>What makes this different</h2>
            {[
              { label:"Annual dividend growth on per-share payout", detail:"7% growth means the dollar amount per share jumps 7% once a year — stair-step, the way real funds do it. Not smoothed monthly." },
              { label:"Payout frequency changes the math", detail:"Quarterly and monthly funds compound differently. A quarterly fund's DRIP shares have fewer months to grow between payouts. We model this." },
              { label:"Expense ratio as real NAV drag", detail:"Deducted monthly from share price. The cumulative cost is tracked — so you can see what 0.03% vs 0.75% actually costs over 30 years." },
              { label:"Taxes at the right layer", detail:"Dividend tax before DRIP. Capital gains tax on unrealized gains for walk-away only. Your compounding portfolio is not reduced by taxes you have not paid yet." },
            ].map((item,i) => (
              <div key={i} style={{ display:"flex", gap:14, marginBottom:i<3?16:0, paddingBottom:i<3?16:0, borderBottom:i<3?`1px solid ${t.bd2}`:"none" }}>
                <div style={{ width:6, borderRadius:3, background:t.ac, flexShrink:0, marginTop:3, height:16 }}/>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, marginBottom:3 }}>{item.label}</div>
                  <div style={{ fontSize:13, lineHeight:1.6, color:t.tx2 }}>{item.detail}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Who's behind this */}
          <div style={{ background:t.sf, borderRadius:16, padding:"28px 32px", border:`1px solid ${t.bd2}`, marginBottom:32 }}>
            <h2 style={{ fontSize:22, fontWeight:700, marginBottom:12 }}>Who's behind this</h2>
            <p style={{ fontSize:14, lineHeight:1.75, color:t.tx2, margin:0 }}>This site is built and maintained by Zahid Rehman. I hold a BS in Accounting and Finance from the Institute of Management Sciences (IMSciences), where my research focused on seasonal anomalies in the stock market. I spend much of my time researching dividend and index-fund strategies — reading fund filings, checking distribution histories, and running long-term projections. I built the Dividend Forecaster because I wanted a calculator that was transparent about its math and grounded in real numbers, rather than a black box. Every projection here uses assumptions I'd want spelled out before trusting a forecast myself. If you spot an error or have a question, the <button onClick={() => navigate("contact")} style={{ background:"none", border:"none", padding:0, color:t.ac, textDecoration:"underline", cursor:"pointer", fontFamily:FONT, fontSize:14 }}>contact page</button> is the best way to reach me.</p>
          </div>

          <div style={{ textAlign:"center" }}>
            <button onClick={() => navigate("calculator")} style={{ padding:"14px 32px", borderRadius:12, border:"none", background:t.ac, color:"#FFF", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:FONT,  }}>Try the Calculator</button>
          </div>
        </motion.div>);
      })() : page === "methodology" ? (
        <motion.div key="methodology" {...pageT} style={{ maxWidth:800, margin:"0 auto", padding:"48px 24px 60px" }}>
          <h1 style={{ fontSize:32, fontWeight:700, marginBottom:8, letterSpacing:"-0.02em" }}>How the Calculator Works</h1>
          <p style={{ fontSize:15, lineHeight:1.7, color:t.tx2, marginBottom:32 }}>A quick guide to every tab, input, and metric — so you know exactly what you are looking at.</p>

          {/* Tabs Guide */}
          {[
            { title:"Projection", desc:"Enter a fund's numbers — yield, growth rate, appreciation, share price — and see what happens over 5 to 100 years. Add a lump sum, set a contribution, turn DRIP on or off. The engine runs monthly (360 cycles for 30 years), applying dividend payouts, tax, expense ratio drag, and appreciation in the exact order real markets process them. Switch between Single Holding and Portfolio to model one fund or many." },
            { title:"Live Off Dividends", desc:"Same engine as Projection, plus a monthly expenses input and inflation rate. The calculator finds the exact year and month when your dividend income crosses above your inflation-adjusted expenses — your Freedom Date. The crossover chart shows both lines converging. The Status card tells you whether you are free yet at each snapshot year." },
            { title:"Goal Tracker", desc:"Set a target amount — $1M, a house price, any number. Add a Target Growth rate if that number increases over time (house prices, inflation-adjusted goals). The calculator shows the gap between your portfolio and the moving target, your progress percentage, and the estimated year you reach it. The target appears as an orange dashed line on the chart." },
            { title:"CAGR Calculator", desc:"Four modes: Price Return (start/end price over years), Dividend Growth (start/end dividend), Total Return (including reinvested dividends), and Goal-Based (what growth rate do you need to reach X from Y in Z years). Enter two numbers and a timeframe, get the compound annual growth rate." },
            { title:"Compare", desc:"Add unlimited funds or portfolios. They all share the same investment, contribution, and timeframe — the only thing that differs is the fund parameters. Line chart and animated bar chart views show who wins on portfolio value, monthly income, and walk-away value. The head-to-head table crowns a winner per metric." },
          ].map((tab,i) => (
            <div key={i} style={{ background:t.sf, borderRadius:14, padding:"22px 28px", border:`1px solid ${t.bd2}`, marginBottom:14 }}>
              <h2 style={{ fontSize:17, fontWeight:700, marginBottom:8 }}>{tab.title}</h2>
              <p style={{ fontSize:13, lineHeight:1.7, color:t.tx2, margin:0 }}>{tab.desc}</p>
            </div>
          ))}

          {/* Key Inputs */}
          <h2 style={{ fontSize:20, fontWeight:700, marginTop:32, marginBottom:16 }}>What Each Input Does</h2>
          <div style={{ background:t.sf, borderRadius:14, padding:"22px 28px", border:`1px solid ${t.bd2}`, marginBottom:14 }}>
            {[
              { label:"Lump Sum", desc:"Starting investment. This buys your initial shares at the share price you set." },
              { label:"Contribution", desc:"How much you add periodically. Daily, weekly, bi-weekly, monthly, quarterly, or yearly — the engine converts it to monthly." },
              { label:"Div Yield", desc:"Annual dividend as a percentage of share price. A $100 stock paying $3.50/year has a 3.5% yield." },
              { label:"Div Growth", desc:"How much the dividend per share increases each year. Applied once per year as a stair-step — the way real funds raise dividends." },
              { label:"Price Appreciation", desc:"Annual share price growth rate. 10% means the price compounds by ~0.8% per month." },
              { label:"DRIP", desc:"When on, dividends automatically buy more shares (after tax). When off, dividends are cash — they still show as income but do not compound." },
              { label:"Payout Frequency", desc:"How often dividends are paid — monthly, quarterly, semi-annually, or annually. Affects when DRIP fires and how compounding works between payouts." },
              { label:"Expense Ratio", desc:"Annual fund fee, deducted monthly from share price. A 0.03% ratio costs $3/year on $10K. It compounds — over 30 years the difference between 0.03% and 0.75% is tens of thousands." },
              { label:"Div Tax / Cap Gains Tax", desc:"Dividend tax is deducted before DRIP. Capital gains tax only reduces the Walk-Away Value — it does not slow your compounding." },
            ].map((item,i) => (
              <div key={i} style={{ padding:"10px 0", borderBottom:i<8?`1px solid ${t.bd2}`:"none" }}>
                <span style={{ fontSize:13, fontWeight:700 }}>{item.label}</span>
                <span style={{ fontSize:13, color:t.tx2 }}> — {item.desc}</span>
              </div>
            ))}
          </div>

          {/* Snapshot Cards */}
          <h2 style={{ fontSize:20, fontWeight:700, marginTop:32, marginBottom:16 }}>What Each Card Means</h2>
          <div style={{ background:t.sf, borderRadius:14, padding:"22px 28px", border:`1px solid ${t.bd2}`, marginBottom:14 }}>
            {[
              { label:"Portfolio Value", desc:"Total value of all shares at the projected price. Includes contributions, DRIP shares, and appreciation." },
              { label:"Walk-Away Value", desc:"What you keep after selling everything and paying capital gains tax on the profit. The real number." },
              { label:"Net Dividend Income", desc:"Dividend income after tax. Monthly is the primary number. Annual is below it." },
              { label:"Yield on Cost", desc:"Your annual dividends divided by what you put in — not the current market yield. Grows as dividend raises compound on your original investment." },
              { label:"Freedom", desc:"The year and month your dividend income surpasses your inflation-adjusted expenses. Checked every month." },
              { label:"Need Today", desc:"The lump sum you would need right now to cover your expenses from dividends alone, at the current yield after tax." },
              { label:"Total Cost", desc:"Lifetime cost of capital gains tax (if you sold), dividend tax, and expense ratio fees combined." },
            ].map((item,i) => (
              <div key={i} style={{ padding:"10px 0", borderBottom:i<6?`1px solid ${t.bd2}`:"none" }}>
                <span style={{ fontSize:13, fontWeight:700 }}>{item.label}</span>
                <span style={{ fontSize:13, color:t.tx2 }}> — {item.desc}</span>
              </div>
            ))}
          </div>

          {/* Disclaimers */}
          <div style={{ background:dark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.02)", borderRadius:14, padding:"20px 24px", marginTop:32, marginBottom:32 }}>
            <p style={{ fontSize:12, lineHeight:1.7, color:t.tx3, margin:0 }}>All projections are hypothetical and assume constant rates. Real markets fluctuate. This tool is for education — not financial advice. Past performance does not guarantee future results. Dividends can be reduced or eliminated at any time.</p>
          </div>

          <div style={{ textAlign:"center" }}>
            <button onClick={() => navigate("calculator")} style={{ padding:"14px 32px", borderRadius:12, border:"none", background:t.ac, color:"#FFF", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>Open the Calculator</button>
          </div>
        </motion.div>
      ) : page === "contact" ? (
        <motion.div key="contact" {...pageT} style={{ maxWidth:800, margin:"0 auto", padding:"48px 24px 60px" }}>
          <h1 style={{ fontSize:32, fontWeight:700, marginBottom:8, letterSpacing:"-0.02em" }}>Contact</h1>
          <p style={{ fontSize:13, color:t.tx3, marginBottom:32 }}>We read every message. Here is how to reach us, and what we can — and cannot — help with.</p>

          <div style={{ background:t.sf, borderRadius:14, padding:"22px 28px", border:`1px solid ${t.bd2}`, marginBottom:14 }}>
            <h2 style={{ fontSize:17, fontWeight:700, marginBottom:8 }}>General Inquiries</h2>
            <p style={{ fontSize:13, lineHeight:1.7, color:t.tx2, margin:0 }}>For general questions about Dividend Forecaster, how the calculator works, or feedback on the tool, email us at <a href="mailto:contact@thedividendforecaster.com" style={{ color:t.ac, textDecoration:"underline" }}>contact@thedividendforecaster.com</a>. We aim to respond within two business days.</p>
          </div>

          <div style={{ background:t.sf, borderRadius:14, padding:"22px 28px", border:`1px solid ${t.bd2}`, marginBottom:14 }}>
            <h2 style={{ fontSize:17, fontWeight:700, marginBottom:8 }}>Bug Reports &amp; Feedback</h2>
            <p style={{ fontSize:13, lineHeight:1.7, color:t.tx2, margin:0 }}>Found something broken or behaving unexpectedly? Email <a href="mailto:contact@thedividendforecaster.com" style={{ color:t.ac, textDecoration:"underline" }}>contact@thedividendforecaster.com</a> with as much detail as possible. The most useful reports include: which tab you were on, what you typed into which field, what you expected to happen, what actually happened, and your browser and device. Screenshots help.</p>
          </div>

          <div style={{ background:t.sf, borderRadius:14, padding:"22px 28px", border:`1px solid ${t.bd2}`, marginBottom:14 }}>
            <h2 style={{ fontSize:17, fontWeight:700, marginBottom:8 }}>Partnership &amp; Press</h2>
            <p style={{ fontSize:13, lineHeight:1.7, color:t.tx2, margin:0 }}>For partnership inquiries, press requests, or media questions, email <a href="mailto:contact@thedividendforecaster.com" style={{ color:t.ac, textDecoration:"underline" }}>contact@thedividendforecaster.com</a> with "Partnership" or "Press" in the subject line.</p>
          </div>

          <div style={{ background:t.sf, borderRadius:14, padding:"22px 28px", border:`1px solid ${t.bd2}`, marginBottom:14 }}>
            <h2 style={{ fontSize:17, fontWeight:700, marginBottom:8 }}>What We Cannot Help With</h2>
            <p style={{ fontSize:13, lineHeight:1.7, color:t.tx2, margin:0 }}>Dividend Forecaster is a calculation tool, not a financial advisor. We cannot provide personalized investment advice, recommend specific funds or stocks, predict market movements, or answer questions about your individual tax situation. For decisions about your money, please consult a licensed financial advisor or tax professional.</p>
          </div>

          <div style={{ background:t.sf, borderRadius:14, padding:"22px 28px", border:`1px solid ${t.bd2}`, marginBottom:32 }}>
            <h2 style={{ fontSize:17, fontWeight:700, marginBottom:8 }}>Privacy</h2>
            <p style={{ fontSize:13, lineHeight:1.7, color:t.tx2, margin:0 }}>Questions about how we handle data are covered in our Privacy Policy. We do not collect personal information from visitors — everything you type into the calculator stays in your browser.</p>
          </div>

          <div style={{ textAlign:"center" }}>
            <button onClick={() => navigate("calculator")} style={{ padding:"14px 32px", borderRadius:12, border:"none", background:t.ac, color:"#FFF", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>Open the Calculator</button>
          </div>
        </motion.div>
      ) : page === "privacy" ? (
        <motion.div key="privacy" {...pageT} style={{ maxWidth:800, margin:"0 auto", padding:"48px 24px 60px" }}>
          <h1 style={{ fontSize:32, fontWeight:700, marginBottom:8, letterSpacing:"-0.02em" }}>Privacy Policy</h1>
          <p style={{ fontSize:13, color:t.tx3, marginBottom:32 }}>Last updated: May 14, 2026</p>

          <div style={{ background:t.sf, borderRadius:14, padding:"22px 28px", border:`1px solid ${t.bd2}`, marginBottom:14 }}>
            <h2 style={{ fontSize:17, fontWeight:700, marginBottom:8 }}>What This Site Is</h2>
            <p style={{ fontSize:13, lineHeight:1.7, color:t.tx2, margin:0 }}>Dividend Forecaster is a free dividend calculator. You do not need an account, and we do not collect names, email addresses, or any personal information from visitors. Everything you type into the calculator stays in your browser — we never save it to a server.</p>
          </div>

          <div style={{ background:t.sf, borderRadius:14, padding:"22px 28px", border:`1px solid ${t.bd2}`, marginBottom:14 }}>
            <h2 style={{ fontSize:17, fontWeight:700, marginBottom:8 }}>Cookies</h2>
            <p style={{ fontSize:13, lineHeight:1.7, color:t.tx2, margin:0 }}>This site uses third-party cookies from Google AdSense. These cookies help Google show ads that may be more relevant to you. They store small pieces of data in your browser, like which ads you have seen and whether you clicked them. We do not set our own tracking cookies.</p>
          </div>

          <div style={{ background:t.sf, borderRadius:14, padding:"22px 28px", border:`1px solid ${t.bd2}`, marginBottom:14 }}>
            <h2 style={{ fontSize:17, fontWeight:700, marginBottom:8 }}>Third-Party Services</h2>
            <p style={{ fontSize:13, lineHeight:1.7, color:t.tx2, margin:0 }}>We use Google AdSense to display ads. Google may collect anonymous information about your device, browser, and browsing activity to decide which ads to show. This information is not tied to your identity. For full details on what Google collects and how it is used, see <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" style={{ color:t.ac, textDecoration:"underline" }}>Google's policy on partner sites</a>.</p>
          </div>

          <div style={{ background:t.sf, borderRadius:14, padding:"22px 28px", border:`1px solid ${t.bd2}`, marginBottom:14 }}>
            <h2 style={{ fontSize:17, fontWeight:700, marginBottom:8 }}>Your Choices</h2>
            <p style={{ fontSize:13, lineHeight:1.7, color:t.tx2, margin:0 }}>You can opt out of personalized ads at any time. Visit <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color:t.ac, textDecoration:"underline" }}>Google's Ads Settings</a> to control how ads are tailored to you, or to turn personalization off entirely. You can also block third-party cookies in your browser settings — the calculator will still work.</p>
          </div>

          <div style={{ background:t.sf, borderRadius:14, padding:"22px 28px", border:`1px solid ${t.bd2}`, marginBottom:32 }}>
            <h2 style={{ fontSize:17, fontWeight:700, marginBottom:8 }}>Contact</h2>
            <p style={{ fontSize:13, lineHeight:1.7, color:t.tx2, margin:0 }}>Questions about this policy? Email us at <a href="mailto:contact@thedividendforecaster.com" style={{ color:t.ac, textDecoration:"underline" }}>contact@thedividendforecaster.com</a>.</p>
          </div>

          <div style={{ textAlign:"center" }}>
            <button onClick={() => navigate("calculator")} style={{ padding:"14px 32px", borderRadius:12, border:"none", background:t.ac, color:"#FFF", fontSize:15, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>Open the Calculator</button>
          </div>
        </motion.div>
      ) : page.startsWith("article:") && ARTICLE_COMPONENTS[page.slice("article:".length)] ? (
        (() => {
          const ArticleComponent = ARTICLE_COMPONENTS[page.slice("article:".length)];
          return <ArticleComponent t={t} navigate={navigate} />;
        })()
      ) : page === "notfound" ? (
        <motion.div key="notfound" {...pageT} style={{ maxWidth:800, margin:"0 auto", padding:"80px 24px 60px", textAlign:"center" }}>
          <h1 style={{ fontSize:32, fontWeight:700, marginBottom:12, letterSpacing:"-0.02em" }}>Page not found</h1>
          <p style={{ fontSize:15, lineHeight:1.7, color:t.tx2, marginBottom:32 }}>That page doesn't exist — it may have moved.</p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="/" onClick={e => { e.preventDefault(); navigate("calculator"); }} style={{ display:"inline-block", padding:"12px 24px", borderRadius:12, background:t.ac, color:"#FFF", fontSize:15, fontWeight:600, textDecoration:"none", fontFamily:FONT }}>Open the Calculator</a>
            <a href="/learn/" onClick={e => { e.preventDefault(); navigate("learn"); }} style={{ display:"inline-block", padding:"12px 24px", borderRadius:12, border:`1.5px solid ${t.bd}`, background:t.sf, color:t.tx, fontSize:15, fontWeight:600, textDecoration:"none", fontFamily:FONT }}>Browse the guides</a>
          </div>
        </motion.div>
      ) : (
        /* ===== CALCULATOR PAGE ===== */
        <motion.div key="calculator" {...pageT}>
        {/* Ad Slot — Top Banner */}
        {ADS_ENABLED && (
          <div style={{ maxWidth:1200, margin:"0 auto", padding:"12px 24px 0" }}>
            <div style={{ background:t.sf2, borderRadius:10, padding:"10px 0", textAlign:"center", fontSize:11, color:t.tx3, border:`1px dashed ${t.bd}` }}>Ad Space — Top Banner (728×90)</div>
          </div>
        )}

        {/* Calculator Tab Bar */}
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"16px 24px 0" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10, marginBottom:16 }}>
            <div style={{ display:"flex", gap:3, background:t.sf2, borderRadius:10, padding:3 }}>
              <Pill active={mode==="projection"} onClick={() => { setMode("projection"); setChartTab("overview"); }}>Projection</Pill>
              <Pill active={mode==="liveoff"} onClick={() => { setMode("liveoff"); setChartTab("crossover"); if(projMode==="portfolio") setPfChartTab("crossover"); }}>Live Off Dividends</Pill>
              <Pill active={mode==="goal"} onClick={() => { setMode("goal"); setChartTab("overview"); }}>Goal Tracker</Pill>
              <Pill active={mode==="compare"} onClick={() => setMode("compare")}>Compare</Pill>
              <Pill active={mode==="cagr"} onClick={() => setMode("cagr")}>CAGR</Pill>
            </div>
            <div style={{ display:"flex", gap:6 }}>
              <button onClick={copyLink} style={{
                  padding:"7px 14px", borderRadius:18, border:`1.5px solid ${linkCopied?t.gn:t.bd}`,
                  background:linkCopied?t.gnB:t.sf, cursor:"pointer", fontFamily:FONT,
                  fontSize:11, fontWeight:600, color:linkCopied?t.gn:t.tx2, transition:"all 0.2s",
                  display:"flex", alignItems:"center", gap:5, whiteSpace:"nowrap",
                }}>
                  {linkCopied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px 60px" }}>

        <AnimatePresence mode="wait">
        {mode === "cagr" ? (
          /* ===== CAGR CALCULATOR ===== */
          <motion.div key="cagr" {...modeT}>
            <div style={{ background:t.sf, borderRadius:16, padding:"22px 24px", border:`1px solid ${t.bd2}`, boxShadow:t.sh, marginBottom:20 }}>
              <h2 style={{ fontSize:16, fontWeight:600, margin:"0 0 16px 0" }}>CAGR Calculator</h2>
              <div style={{ display:"flex", gap:3, background:t.sf2, borderRadius:10, padding:3, marginBottom:24, width:"fit-content", flexWrap:"wrap" }}>
                {[{id:"price",l:"Price Return"},{id:"divgrowth",l:"Dividend Growth"},{id:"total",l:"Total Return"},{id:"goal",l:"Goal-Based"}].map(tab => (
                  <Pill key={tab.id} active={cagrMode===tab.id} onClick={() => setCagrMode(tab.id)}>{tab.l}</Pill>
                ))}
              </div>

              {cagrMode === "price" && (
                <div>
                  <p style={{ fontSize:13, color:t.tx2, margin:"0 0 16px 0" }}>What was the price-only CAGR? No dividends, just share price movement.</p>
                  <div style={{ display:"flex", gap:3, background:t.sf2, borderRadius:8, padding:3, marginBottom:16, width:"fit-content" }}>
                    <Pill active={priceMethod==="prices"} onClick={() => setPriceMethod("prices")}>From Prices</Pill>
                    <Pill active={priceMethod==="return"} onClick={() => setPriceMethod("return")}>From Total Return %</Pill>
                  </div>

                  {priceMethod === "prices" ? (
                    <>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:20 }}>
                        <InputField t={t} label="Starting Price" unit="$" value={cagr.startPrice} onChange={v => uc("startPrice",v)} min={0} step={0.01} placeholder="e.g. 50"/>
                        <InputField t={t} label="Current Price" unit="$" value={cagr.endPrice} onChange={v => uc("endPrice",v)} min={0} step={0.01} placeholder="e.g. 85"/>
                        <InputField t={t} label="Years" unit="YR" value={cagr.priceYears} onChange={v => uc("priceYears",v)} min={0} step={0.1} placeholder="e.g. 5"/>
                      </div>
                      <div style={{ background:t.blB, borderRadius:14, padding:"20px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
                        <div>
                          <div style={{ fontSize:10, fontWeight:700, color:t.tx2, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:4 }}>Price CAGR</div>
                          <div style={{ fontSize:36, fontWeight:700, color:t.ac, letterSpacing:"-0.02em" }}>{cagrResults.price.toFixed(2)}%</div>
                        </div>
                        <div style={{ fontSize:13, color:t.tx2, textAlign:"right" }}>
                          <div>${cagr.startPrice.toFixed(2)} → ${cagr.endPrice.toFixed(2)}</div>
                          <div>over {cagr.priceYears} year{cagr.priceYears!==1?"s":""}</div>
                          <div style={{ marginTop:4, color:t.gn, fontWeight:600 }}>Price return: {cagr.startPrice > 0 ? ((cagr.endPrice/cagr.startPrice - 1)*100).toFixed(1) : "0.0"}% total</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:20 }}>
                        <InputField t={t} label="Total Price Return" unit="%" value={cagr.priceReturnPct} onChange={v => uc("priceReturnPct",v)} min={-99} step={0.1} placeholder="e.g. 70"/>
                        <InputField t={t} label="Over Years" unit="YR" value={cagr.priceReturnYears} onChange={v => uc("priceReturnYears",v)} min={0} step={0.1} placeholder="e.g. 5"/>
                      </div>
                      <div style={{ background:t.blB, borderRadius:14, padding:"20px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
                        <div>
                          <div style={{ fontSize:10, fontWeight:700, color:t.tx2, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:4 }}>Annualized CAGR</div>
                          <div style={{ fontSize:36, fontWeight:700, color:t.ac, letterSpacing:"-0.02em" }}>{cagrResults.priceFromReturn.toFixed(2)}%</div>
                        </div>
                        <div style={{ fontSize:13, color:t.tx2, textAlign:"right" }}>
                          <div>{cagr.priceReturnPct}% total return</div>
                          <div>over {cagr.priceReturnYears} year{cagr.priceReturnYears!==1?"s":""}</div>
                          <div style={{ marginTop:4, color:t.tx3 }}>Formula: (1 + {(cagr.priceReturnPct/100).toFixed(2)})^(1/{cagr.priceReturnYears}) − 1</div>
                        </div>
                      </div>
                    </>
                  )}

                  <div style={{ marginTop:12, background:t.sf2, borderRadius:12, padding:"14px 18px" }}>
                    <div style={{ fontSize:12, color:t.tx2, marginBottom:6 }}>Quick comparison — what the same CAGR does over time:</div>
                    <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                      {[5,10,20,30].map(y => {
                        const rate = priceMethod === "prices" ? cagrResults.price : cagrResults.priceFromReturn;
                        const growth = Math.pow(1 + rate/100, y);
                        return <div key={y} style={{ fontSize:12 }}>
                          <span style={{ color:t.tx3 }}>{y}yr:</span>
                          <span style={{ fontWeight:600, color:t.ac, marginLeft:4 }}>{((growth - 1)*100).toFixed(0)}% total</span>
                        </div>;
                      })}
                    </div>
                  </div>
                </div>
              )}

              {cagrMode === "divgrowth" && (
                <div>
                  <p style={{ fontSize:13, color:t.tx2, margin:"0 0 16px 0" }}>How fast is the dividend payout per share growing?</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:20 }}>
                    <InputField t={t} label="Starting Dividend" unit="$" value={cagr.divStart} onChange={v => uc("divStart",v)} min={0} step={0.01} placeholder="e.g. 1.30"/>
                    <InputField t={t} label="Current Dividend" unit="$" value={cagr.divEnd} onChange={v => uc("divEnd",v)} min={0} step={0.01} placeholder="e.g. 2.80"/>
                    <InputField t={t} label="Years" unit="YR" value={cagr.divYears} onChange={v => uc("divYears",v)} min={0} step={0.1} placeholder="e.g. 10"/>
                  </div>
                  <div style={{ background:t.puB, borderRadius:14, padding:"20px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
                    <div>
                      <div style={{ fontSize:10, fontWeight:700, color:t.tx2, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:4 }}>Dividend Growth CAGR</div>
                      <div style={{ fontSize:36, fontWeight:700, color:t.pu, letterSpacing:"-0.02em" }}>{cagrResults.divGrowth.toFixed(2)}%</div>
                    </div>
                    <div style={{ fontSize:13, color:t.tx2, textAlign:"right" }}>
                      <div>${cagr.divStart.toFixed(2)}/share → ${cagr.divEnd.toFixed(2)}/share</div>
                      <div>over {cagr.divYears} year{cagr.divYears!==1?"s":""}</div>
                      <div style={{ marginTop:4, color:t.pu, fontWeight:600 }}>Dividend {cagr.divEnd > cagr.divStart ? "grew" : "shrank"} {cagr.divStart > 0 ? ((cagr.divEnd/cagr.divStart - 1)*100).toFixed(1) : "0.0"}% total</div>
                    </div>
                  </div>
                  <div style={{ marginTop:12, background:t.sf2, borderRadius:12, padding:"14px 18px" }}>
                    <div style={{ fontSize:12, color:t.tx2 }}>At this rate, the dividend per share would be:</div>
                    <div style={{ display:"flex", gap:16, marginTop:8, flexWrap:"wrap" }}>
                      {[5,10,20,30].map(y => {
                        const futureDiv = cagr.divEnd * Math.pow(1 + cagrResults.divGrowth/100, y);
                        return <div key={y} style={{ fontSize:12 }}>
                          <span style={{ color:t.tx3 }}>Year {y}:</span>
                          <span style={{ fontWeight:600, color:t.pu, marginLeft:4 }}>${futureDiv.toFixed(2)}</span>
                        </div>;
                      })}
                    </div>
                  </div>
                </div>
              )}

              {cagrMode === "total" && (
                <div>
                  <p style={{ fontSize:13, color:t.tx2, margin:"0 0 16px 0" }}>What was the total return CAGR including dividends reinvested?</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:20 }}>
                    <InputField t={t} label="Starting Price" unit="$" value={cagr.trStartPrice} onChange={v => uc("trStartPrice",v)} min={0} step={0.01} placeholder="e.g. 50"/>
                    <InputField t={t} label="Current Price" unit="$" value={cagr.trEndPrice} onChange={v => uc("trEndPrice",v)} min={0} step={0.01} placeholder="e.g. 85"/>
                    <InputField t={t} label="Avg Yield" unit="%" value={cagr.trYield} onChange={v => uc("trYield",v)} min={0} max={100} step={0.01} placeholder="e.g. 3.5"/>
                    <InputField t={t} label="Years" unit="YR" value={cagr.trYears} onChange={v => uc("trYears",v)} min={0} step={0.1} placeholder="e.g. 5"/>
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
                    <div style={{ flex:"1 1 200px", background:t.blB, borderRadius:14, padding:"20px 24px" }}>
                      <div style={{ fontSize:10, fontWeight:700, color:t.tx2, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:4 }}>Total Return CAGR</div>
                      <div style={{ fontSize:36, fontWeight:700, color:t.gn, letterSpacing:"-0.02em" }}>{cagrResults.totalReturn.toFixed(2)}%</div>
                      <div style={{ fontSize:12, color:t.tx2, marginTop:4 }}>Price + dividends reinvested</div>
                    </div>
                    <div style={{ flex:"1 1 200px", background:t.sf2, borderRadius:14, padding:"20px 24px" }}>
                      <div style={{ fontSize:10, fontWeight:700, color:t.tx2, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:4 }}>Price CAGR Only</div>
                      <div style={{ fontSize:36, fontWeight:700, color:t.ac, letterSpacing:"-0.02em" }}>{cagrCalc(cagr.trStartPrice, cagr.trEndPrice, cagr.trYears).toFixed(2)}%</div>
                      <div style={{ fontSize:12, color:t.tx2, marginTop:4 }}>Without dividends</div>
                    </div>
                    <div style={{ flex:"1 1 200px", background:t.gnB, borderRadius:14, padding:"20px 24px" }}>
                      <div style={{ fontSize:10, fontWeight:700, color:t.tx2, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:4 }}>Dividend Bonus</div>
                      <div style={{ fontSize:36, fontWeight:700, color:t.pu, letterSpacing:"-0.02em" }}>+{(cagrResults.totalReturn - cagrCalc(cagr.trStartPrice, cagr.trEndPrice, cagr.trYears)).toFixed(2)}%</div>
                      <div style={{ fontSize:12, color:t.tx2, marginTop:4 }}>The invisible value of dividends</div>
                    </div>
                  </div>
                </div>
              )}

              {cagrMode === "goal" && (
                <div>
                  <p style={{ fontSize:13, color:t.tx2, margin:"0 0 16px 0" }}>What CAGR do you need to reach your target?</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:20 }}>
                    <InputField t={t} label="Starting Amount" unit="$" value={cagr.goalStart} onChange={v => uc("goalStart",v)} min={0} placeholder="e.g. 10000"/>
                    <InputField t={t} label="Target Amount" unit="$" value={cagr.goalTarget} onChange={v => uc("goalTarget",v)} min={0} placeholder="e.g. 1000000"/>
                    <InputField t={t} label="Years" unit="YR" value={cagr.goalYears} onChange={v => uc("goalYears",v)} min={0} step={0.1} placeholder="e.g. 30"/>
                  </div>
                  <div style={{ background:t.orB, borderRadius:14, padding:"20px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
                    <div>
                      <div style={{ fontSize:10, fontWeight:700, color:t.tx2, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:4 }}>Required CAGR</div>
                      <div style={{ fontSize:36, fontWeight:700, color:t.or, letterSpacing:"-0.02em" }}>{cagrResults.goal.toFixed(2)}%</div>
                    </div>
                    <div style={{ fontSize:13, color:t.tx2, textAlign:"right" }}>
                      <div>{fmtF(cagr.goalStart)} → {fmtF(cagr.goalTarget)}</div>
                      <div>in {cagr.goalYears} year{cagr.goalYears!==1?"s":""}</div>
                      <div style={{ marginTop:4, color:t.or, fontWeight:600 }}>{cagr.goalStart > 0 && cagr.goalTarget/cagr.goalStart > 1 ? `${(cagr.goalTarget/cagr.goalStart).toFixed(0)}x your money` : "Target below start"}</div>
                    </div>
                  </div>
                  <div style={{ marginTop:12, background:t.sf2, borderRadius:12, padding:"14px 18px" }}>
                    <div style={{ fontSize:12, color:t.tx2, marginBottom:8 }}>For reference — historical average annual returns:</div>
                    <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                      {[{n:"S&P 500",v:"~10%"},{n:"Total Market",v:"~9.5%"},{n:"International",v:"~6%"},{n:"Bonds",v:"~4%"},{n:"SCHD",v:"~11%"},{n:"QQQ",v:"~14%"}].map(r => (
                        <div key={r.n} style={{ fontSize:11, background:t.sf, borderRadius:8, padding:"6px 10px", border:`1px solid ${t.bd2}` }}>
                          <span style={{ color:t.tx3 }}>{r.n}:</span>
                          <span style={{ fontWeight:600, color:t.tx, marginLeft:4 }}>{r.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div style={{ textAlign:"center", padding:"32px 0 0", color:t.tx3, fontSize:11 }}>
              <p style={{ margin:0 }}>CAGR calculations are based on user inputs. Past performance does not guarantee future results.</p>
              <p style={{ margin:"4px 0 0", letterSpacing:"0.02em" }}>DIVIDEND FORECASTER — V2.1</p>
            </div>
          </motion.div>
        ) : mode === "compare" ? (
          /* ===== COMPARE MODE ===== */
          <motion.div key="compare" {...modeT}>
            {/* Shared Race Settings */}
            <div style={{ background:t.sf, borderRadius:16, padding:"22px 24px", border:`1px solid ${t.bd2}`, boxShadow:t.sh, marginBottom:20 }}>
              <h2 style={{ fontSize:16, fontWeight:600, margin:"0 0 16px 0" }}>Race Settings</h2>
              <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:12 }}>
                <InputField t={t} label="Investment" unit="$" value={cmpShared.lumpSum} onChange={v => ucmp("lumpSum",v)} min={0} placeholder="e.g. 10000"/>
                <InputField t={t} label="Contribution" unit="$" value={cmpShared.contribAmt} onChange={v => ucmp("contribAmt",v)} min={0} placeholder="e.g. 500"/>
                <div style={{ flex:"1 1 130px", minWidth:120 }}>
                  <label style={{ display:"block", fontSize:11, fontWeight:600, color:cmpShared.contribAmt > 0 ? t.tx2 : t.tx3, marginBottom:5, letterSpacing:"0.03em", textTransform:"uppercase", transition:"color 0.2s" }}>Frequency</label>
                  <select value={cmpShared.contribFreq} onChange={e => ucmp("contribFreq",e.target.value)} disabled={cmpShared.contribAmt === 0}
                    style={{ width:"100%", padding:"9px 10px", borderRadius:10, border:`1.5px solid ${t.inBd}`, background:t.inBg, color:cmpShared.contribAmt > 0 ? t.tx : t.tx3, fontSize:14, fontWeight:500, fontFamily:FONT, outline:"none", cursor:cmpShared.contribAmt > 0 ? "pointer" : "not-allowed", appearance:"auto", opacity:cmpShared.contribAmt > 0 ? 1 : 0.5, transition:"opacity 0.2s, color 0.2s" }}>
                    {Object.entries(freqLabels).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <InputField t={t} label="Years" unit="YR" value={cmpShared.years} onChange={v => ucmp("years",Math.min(100,v))} min={0} max={100} placeholder="e.g. 30"/>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:12, alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <button onClick={() => ucmp("drip",!cmpShared.drip)} style={{ width:44, height:24, borderRadius:12, border:"none", background:cmpShared.drip?t.ac:t.bd, cursor:"pointer", position:"relative", transition:"background 0.2s" }}>
                    <div style={{ width:20, height:20, borderRadius:10, background:"#FFF", position:"absolute", top:2, left:cmpShared.drip?22:2, transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }}/>
                  </button>
                  <span style={{ fontSize:13, fontWeight:500, color:t.tx2 }}>DRIP {cmpShared.drip?"ON":"OFF"}</span>
                </div>
                <InputField t={t} label="Div Tax" unit="%" value={cmpShared.divTaxRate} onChange={v => ucmp("divTaxRate",v)} min={0} max={100} step={0.1} placeholder="e.g. 15"/>
                <InputField t={t} label="Cap Gains Tax" unit="%" value={cmpShared.capGainsTaxRate} onChange={v => ucmp("capGainsTaxRate",v)} min={0} max={100} step={0.1} placeholder="e.g. 15"/>
              </div>
            </div>

            {/* Competitors */}
            <div style={{ background:t.sf, borderRadius:16, padding:"22px 24px", border:`1px solid ${t.bd2}`, boxShadow:t.sh, marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                <h2 style={{ fontSize:16, fontWeight:600, margin:0 }}>Competitors ({cmpCompetitors.length})</h2>
                <button onClick={addCompetitor} style={{ padding:"6px 14px", borderRadius:8, border:`1.5px solid ${t.ac}`, background:"transparent", color:t.ac, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>+ Add Competitor</button>
              </div>
              {cmpCompetitors.map((comp, idx) => {
                const cc = getFundColor(idx);
                const isExpanded = cmpExpanded === comp.id;
                return (
                  <div key={comp.id} style={{ borderRadius:12, border:`1px solid ${t.bd2}`, marginBottom:12, borderLeft:`4px solid ${cc}`, overflow:"hidden" }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 16px", cursor:"pointer", background:isExpanded?t.sf2:"transparent" }} onClick={() => setCmpExpanded(isExpanded?null:comp.id)}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <span style={{ transform:isExpanded?"rotate(90deg)":"rotate(0deg)", transition:"transform 0.2s", display:"inline-block", fontSize:10, color:t.tx3 }}>▶</span>
                        <input type="text" value={comp.name} onClick={e => e.stopPropagation()} onChange={e => updateCompetitor(comp.id,"name",e.target.value)}
                          style={{ border:"none", outline:"none", background:"transparent", fontSize:15, fontWeight:700, color:cc, fontFamily:FONT, width:150 }}/>
                        <span style={{ fontSize:11, color:t.tx3 }}>{comp.holdings.length === 1 ? comp.holdings[0].ticker || "1 holding" : `${comp.holdings.length} holdings`}</span>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        {cmpResults[idx] && (() => {
                          const final = cmpResults[idx].blended[cmpResults[idx].blended.length-1];
                          return (<div style={{ display:"flex", gap:16, fontSize:12 }}>
                            <span><span style={{ color:t.tx3 }}>Value:</span> <span style={{ fontWeight:600 }}>{fmt(final?.portfolioValue||0)}</span></span>
                            <span><span style={{ color:t.tx3 }}>Income:</span> <span style={{ fontWeight:600, color:t.pu }}>{fmt(final?.netDivMonthly||0)}/mo</span></span>
                          </div>);
                        })()}
                        {cmpCompetitors.length > 2 && (
                          <button onClick={e => { e.stopPropagation(); removeCompetitor(comp.id); }} style={{ padding:"4px 8px", borderRadius:6, border:`1px solid ${t.rd}`, background:"transparent", color:t.rd, fontSize:10, fontWeight:600, cursor:"pointer" }}>✕</button>
                        )}
                      </div>
                    </div>
                    {isExpanded && (
                      <div style={{ padding:"12px 16px", borderTop:`1px solid ${t.bd2}` }}>
                        {comp.holdings.map((h, hi) => (
                          <div key={h.id} style={{ display:"flex", flexWrap:"wrap", gap:8, alignItems:"flex-end", marginBottom:8, paddingBottom:8, borderBottom:hi<comp.holdings.length-1?`1px solid ${t.bd2}`:"none" }}>
                            <div style={{ flex:"0 0 70px" }}><label style={{ display:"block", fontSize:9, fontWeight:700, color:t.tx3, marginBottom:3, textTransform:"uppercase" }}>Ticker</label>
                              <input type="text" value={h.ticker} onChange={e => updateCmpHolding(comp.id,h.id,"ticker",e.target.value.toUpperCase())} style={{ width:"100%", padding:"6px 7px", borderRadius:7, border:`1.5px solid ${t.inBd}`, background:t.inBg, color:t.tx, fontSize:13, fontWeight:700, fontFamily:FONT, outline:"none" }}/></div>
                            {comp.holdings.length > 1 && <div style={{ flex:"0 0 55px" }}><label style={{ display:"block", fontSize:9, fontWeight:700, color:t.tx3, marginBottom:3, textTransform:"uppercase" }}>Alloc%</label>
                              <input type="number" value={h.alloc} min={0} max={100} onChange={e => updateCmpHolding(comp.id,h.id,"alloc",parseFloat(e.target.value)||0)} style={{ width:"100%", padding:"6px 7px", borderRadius:7, border:`1.5px solid ${t.inBd}`, background:t.inBg, color:t.tx, fontSize:13, fontWeight:600, fontFamily:FONT, outline:"none" }}/></div>}
                            <div style={{ flex:"0 0 65px" }}><label style={{ display:"block", fontSize:9, fontWeight:700, color:t.tx3, marginBottom:3, textTransform:"uppercase" }}>Price</label>
                              <input type="number" value={h.sharePrice} min={0.01} step={0.01} onChange={e => updateCmpHolding(comp.id,h.id,"sharePrice",parseFloat(e.target.value)||1)} style={{ width:"100%", padding:"6px 7px", borderRadius:7, border:`1.5px solid ${t.inBd}`, background:t.inBg, color:t.tx, fontSize:13, fontWeight:500, fontFamily:FONT, outline:"none" }}/></div>
                            <div style={{ flex:"0 0 55px" }}><label style={{ display:"block", fontSize:9, fontWeight:700, color:t.tx3, marginBottom:3, textTransform:"uppercase" }}>Yield%</label>
                              <input type="number" value={h.divYield} min={0} max={100} step={0.01} onChange={e => updateCmpHolding(comp.id,h.id,"divYield",parseFloat(e.target.value)||0)} style={{ width:"100%", padding:"6px 7px", borderRadius:7, border:`1.5px solid ${t.inBd}`, background:t.inBg, color:t.tx, fontSize:13, fontWeight:500, fontFamily:FONT, outline:"none" }}/></div>
                            <div style={{ flex:"0 0 60px" }}><label style={{ display:"block", fontSize:9, fontWeight:700, color:t.tx3, marginBottom:3, textTransform:"uppercase" }}>DivGr%</label>
                              <input type="number" value={h.divGrowth} min={0} max={100} step={0.01} onChange={e => updateCmpHolding(comp.id,h.id,"divGrowth",parseFloat(e.target.value)||0)} style={{ width:"100%", padding:"6px 7px", borderRadius:7, border:`1.5px solid ${t.inBd}`, background:t.inBg, color:t.tx, fontSize:13, fontWeight:500, fontFamily:FONT, outline:"none" }}/></div>
                            <div style={{ flex:"0 0 60px" }}><label style={{ display:"block", fontSize:9, fontWeight:700, color:t.tx3, marginBottom:3, textTransform:"uppercase" }}>Appr%</label>
                              <input type="number" value={h.appreciation} min={-50} max={100} step={0.01} onChange={e => updateCmpHolding(comp.id,h.id,"appreciation",parseFloat(e.target.value)||0)} style={{ width:"100%", padding:"6px 7px", borderRadius:7, border:`1.5px solid ${t.inBd}`, background:t.inBg, color:t.tx, fontSize:13, fontWeight:500, fontFamily:FONT, outline:"none" }}/></div>
                            <div style={{ flex:"0 0 50px" }}><label style={{ display:"block", fontSize:9, fontWeight:700, color:t.tx3, marginBottom:3, textTransform:"uppercase" }}>ER%</label>
                              <input type="number" value={h.expenseRatio} min={0} max={10} step={0.01} onChange={e => updateCmpHolding(comp.id,h.id,"expenseRatio",parseFloat(e.target.value)||0)} style={{ width:"100%", padding:"6px 7px", borderRadius:7, border:`1.5px solid ${t.inBd}`, background:t.inBg, color:t.tx, fontSize:13, fontWeight:500, fontFamily:FONT, outline:"none" }}/></div>
                            {comp.holdings.length > 1 && <button onClick={() => removeCmpHolding(comp.id,h.id)} style={{ padding:"5px 7px", borderRadius:6, border:`1px solid ${t.rd}`, background:"transparent", color:t.rd, fontSize:10, cursor:"pointer" }}>✕</button>}
                          </div>
                        ))}
                        <button onClick={() => addCmpHolding(comp.id)} style={{ padding:"5px 12px", borderRadius:7, border:`1px dashed ${t.bd}`, background:"transparent", color:t.tx3, fontSize:11, fontWeight:500, cursor:"pointer", fontFamily:FONT, width:"100%" }}>+ Add holding to this competitor</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Chart */}
            <div style={{ background:t.sf, borderRadius:16, padding:"22px 24px", border:`1px solid ${t.bd2}`, boxShadow:t.sh, marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:10 }}>
                <div style={{ display:"flex", gap:3, background:t.sf2, borderRadius:10, padding:3 }}>
                  {[{id:"value",l:"Portfolio Value"},{id:"income",l:"Monthly Income"},{id:"walkaway",l:"Walk-Away"}].map(tab => (
                    <Pill key={tab.id} active={cmpChartTab===tab.id} onClick={() => setCmpChartTab(tab.id)}>{tab.l}</Pill>
                  ))}
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8 }}>
                  <div style={{ display:"flex", gap:3, background:t.sf2, borderRadius:10, padding:3, flexWrap:"wrap" }}>
                    {[1,5,10,15,20,25,30].filter(y=>y<=cmpShared.years).map(yr => (
                      <Pill key={yr} active={cmpSelectedYear===yr} onClick={() => setCmpSelectedYear(yr)}>Yr {yr}</Pill>
                    ))}
                    <Pill active={cmpSelectedYear==="all"} onClick={() => setCmpSelectedYear("all")}>All</Pill>
                  </div>
                  <div style={{ display:"flex", gap:2, background:t.sf2, borderRadius:8, padding:2 }}>
                    <button onClick={() => { ucmp("chartStyle","line"); setRacePlaying(false); }} style={{ padding:"5px 10px", borderRadius:6, border:"none", fontSize:11, fontWeight:cmpShared.chartStyle!=="bars"?600:400, background:cmpShared.chartStyle!=="bars"?t.sf:"transparent", color:cmpShared.chartStyle!=="bars"?t.tx:t.tx3, cursor:"pointer", fontFamily:FONT }}>Line</button>
                    <button onClick={() => { ucmp("chartStyle","bars"); setRacePlaying(true); setRaceFrame(0); }} style={{ padding:"5px 10px", borderRadius:6, border:"none", fontSize:11, fontWeight:cmpShared.chartStyle==="bars"?600:400, background:cmpShared.chartStyle==="bars"?t.sf:"transparent", color:cmpShared.chartStyle==="bars"?t.tx:t.tx3, cursor:"pointer", fontFamily:FONT }}>Bars</button>
                  </div>
                </div>
              </div>

              {cmpShared.chartStyle === "bars" ? (() => {
                const barYear = cmpSelectedYear === "all" ? cmpShared.years : cmpSelectedYear;
                const frame = raceFrames.find(f => f.year === barYear) || raceFrames[raceFrames.length-1];
                if (!frame) return null;
                const getVal = e => cmpChartTab==="income"?e.income:cmpChartTab==="walkaway"?e.walkaway:e.value;
                const frameIdx = raceYears.indexOf(barYear);
                const totalFrames = raceYears.length;
                const frameMax = Math.max(...frame.entries.map(getVal), 1);
                
                // Check if values are growing: compare to all previous frames
                const allFrameMaxes = raceFrames.slice(0, frameIdx + 1).map(f => Math.max(...f.entries.map(getVal), 1));
                const runningMax = Math.max(...allFrameMaxes);
                const isGrowing = frameMax >= runningMax * 0.99; // allow tiny rounding tolerance
                
                let axisMax;
                if (isGrowing) {
                  // Progressive scaling — bars grow taller over time
                  const targetPct = 25 + (frameIdx / Math.max(totalFrames-1,1)) * 70;
                  axisMax = frameMax / (targetPct / 100);
                } else {
                  // Values declined — scale relative to running peak so bars shrink naturally
                  const peakIdx = allFrameMaxes.indexOf(runningMax);
                  const peakTargetPct = 25 + (peakIdx / Math.max(totalFrames-1,1)) * 70;
                  axisMax = runningMax / (peakTargetPct / 100);
                }
                const vals = frame.entries.map(getVal);
                const gap = Math.max(...vals) - Math.min(...vals);
                return (
                <div>
                  <div style={{ display:"flex", height:360 }}>
                    <div style={{ width:60, display:"flex", flexDirection:"column", justifyContent:"space-between", paddingBottom:2, paddingTop:10 }}>
                      {[4,3,2,1,0].map(i => {
                        const tick = axisMax * (i/4);
                        return <div key={i} style={{ fontSize:11, color:t.tx3, textAlign:"right", paddingRight:8 }}>{fmt(tick)}</div>;
                      })}
                    </div>
                    <div style={{ flex:1, display:"flex", alignItems:"flex-end", justifyContent:"space-around", borderLeft:`1px solid ${t.bd}`, borderBottom:`1.5px solid ${t.bd}`, padding:"0 20px", gap:16, position:"relative" }}>
                    {frame.entries.map((entry, i) => {
                      const val = getVal(entry);
                      const barPct = (val / axisMax) * 100;
                      return (
                        <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end", height:"100%", maxWidth:180 }}>
                          <div style={{ fontSize:18, fontWeight:700, marginBottom:12, fontVariantNumeric:"tabular-nums", transition:"all 0.5s ease", color:t.tx }}>{fmt(val)}</div>
                          <div style={{ width:"100%", maxWidth:120, borderRadius:"8px 8px 0 0", background:`linear-gradient(to top, ${entry.color}30, ${entry.color})`, height:`${barPct}%`, transition:"height 1.2s cubic-bezier(0.65, 0, 0.35, 1)", boxShadow:`0 -4px 16px ${entry.color}22`, minHeight:2 }}/>
                        </div>
                      );
                    })}
                    </div>
                  </div>
                  {/* Fund names below the line */}
                  <div style={{ display:"flex", justifyContent:"space-around", paddingLeft:60 }}>
                    {frame.entries.map((entry, i) => (
                      <div key={i} style={{ flex:1, maxWidth:180, textAlign:"center", paddingTop:12 }}>
                        <div style={{ fontSize:15, fontWeight:800, letterSpacing:"0.05em", color:t.tx }}>{entry.name}</div>
                      </div>
                    ))}
                  </div>
                  {cmpResults.length >= 2 && (
                    <div style={{ marginTop:20, textAlign:"center" }}>
                      <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:dark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.04)", padding:"10px 20px", borderRadius:6, fontSize:14, fontWeight:600 }}>
                        <div style={{ width:7, height:7, borderRadius:4, background:t.or }}/>
                        Gap between top and bottom: {fmt(gap)}
                      </div>
                    </div>
                  )}
                </div>);
              })() : (<>
              <div style={{ height:380 }}>
                {isClient && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={cmpChartData} margin={{ top:10,right:10,left:10,bottom:0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={t.grid}/>
                    <XAxis dataKey="year" tick={{ fill:t.tx3, fontSize:11 }} axisLine={{ stroke:t.grid }} tickLine={false}/>
                    <YAxis tickFormatter={fmt} tick={{ fill:t.tx3, fontSize:11 }} axisLine={false} tickLine={false}/>
                    <Tooltip content={<Tip t={t}/>}/>
                    {cmpResults.map((cr, idx) => (
                      <Line key={cr.comp.id} type="monotone"
                        dataKey={cmpChartTab==="income"?`income_${idx}`:cmpChartTab==="walkaway"?`walkaway_${idx}`:`value_${idx}`}
                        name={cr.comp.name} stroke={cr.color} strokeWidth={2.5} dot={false}/>
                    ))}
                  </LineChart>
                </ResponsiveContainer>
                )}
              </div>
              <div style={{ display:"flex", gap:16, marginTop:12, flexWrap:"wrap", justifyContent:"center" }}>
                {cmpResults.map(cr => (
                  <div key={cr.comp.id} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12 }}>
                    <div style={{ width:12, height:3, borderRadius:2, background:cr.color }}/>
                    <span style={{ fontWeight:500, color:t.tx2 }}>{cr.comp.name}</span>
                  </div>
                ))}
              </div>
              </>)}
            </div>

            {/* Head-to-Head Table */}
            <div style={{ background:t.sf, borderRadius:16, padding:"22px 24px", border:`1px solid ${t.bd2}`, boxShadow:t.sh, marginBottom:20 }}>
              <h3 style={{ fontSize:16, fontWeight:600, margin:"0 0 16px 0" }}>Head-to-Head</h3>
              <div style={{ overflow:"auto", maxHeight:600 }}>
                <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                  <thead><tr>
                    <th style={{ textAlign:"left", padding:"10px 12px", color:t.tx2, fontSize:10, fontWeight:700, textTransform:"uppercase", borderBottom:`2px solid ${t.bd}` }}>Metric</th>
                    {cmpResults.map(cr => (
                      <th key={cr.comp.id} style={{ textAlign:"right", padding:"10px 12px", color:cr.color, fontSize:11, fontWeight:700, borderBottom:`2px solid ${t.bd}` }}>{cr.comp.name}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {(() => {
                      const finals = cmpResults.map(cr => cr.blended[cr.blended.length-1]);
                      const metrics = [
                        { label:"Portfolio Value", key:"portfolioValue", f:fmtF },
                        { label:"Walk-Away Value", key:"walkAwayValue", f:fmtF },
                        { label:"Monthly Net Income", key:"netDivMonthly", f:fmtF },
                        { label:"Annual Net Income", key:"netDivAnnual", f:fmtF },
                        { label:"Yield on Cost", key:"yieldOnCost", f:v=>pct(v) },
                        { label:"Total Tax Paid", key:"totalTaxPaid", f:fmtF },
                        { label:"Total Fees Paid", key:"totalFees", f:fmtF },
                      ];
                      return metrics.map(m => {
                        const vals = finals.map(fi => fi?.[m.key]||0);
                        const best = m.key==="totalTaxPaid"||m.key==="totalFees" ? Math.min(...vals) : Math.max(...vals);
                        return (<tr key={m.key} style={{ borderBottom:`1px solid ${t.bd2}` }}>
                          <td style={{ padding:"11px 12px", fontWeight:500, color:t.tx2 }}>{m.label}</td>
                          {vals.map((v,i) => (
                            <td key={i} style={{ padding:"11px 12px", textAlign:"right", fontWeight:600, color:v===best?t.gn:t.tx }}>
                              {m.f(v)} {v===best && "👑"}
                            </td>
                          ))}
                        </tr>);
                      });
                    })()}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Winner Cards */}
            {(() => {
              const finals = cmpResults.map(cr => cr.blended[cr.blended.length-1]);
              const bestVal = cmpResults.reduce((a,b,i) => (finals[i]?.portfolioValue||0) > (finals[cmpResults.indexOf(a)]?.portfolioValue||0) ? b : a, cmpResults[0]);
              const bestInc = cmpResults.reduce((a,b,i) => (finals[i]?.netDivMonthly||0) > (finals[cmpResults.indexOf(a)]?.netDivMonthly||0) ? b : a, cmpResults[0]);
              const bestYoC = cmpResults.reduce((a,b,i) => (finals[i]?.yieldOnCost||0) > (finals[cmpResults.indexOf(a)]?.yieldOnCost||0) ? b : a, cmpResults[0]);
              const lowFee = cmpResults.reduce((a,b,i) => (finals[i]?.totalFees||Infinity) < (finals[cmpResults.indexOf(a)]?.totalFees||Infinity) ? b : a, cmpResults[0]);
              return (
                <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:20 }}>
                  <Card label="Best Growth" value={bestVal?.comp.name} sub={fmt(finals[cmpResults.indexOf(bestVal)]?.portfolioValue||0)} color={bestVal?.color} bg={t.gnB}/>
                  <Card label="Best Income" value={bestInc?.comp.name} sub={`${fmt(finals[cmpResults.indexOf(bestInc)]?.netDivMonthly||0)}/mo`} color={bestInc?.color} bg={t.puB}/>
                  <Card label="Best Yield on Cost" value={bestYoC?.comp.name} sub={pct(finals[cmpResults.indexOf(bestYoC)]?.yieldOnCost||0)} color={bestYoC?.color} bg={t.orB}/>
                  <Card label="Lowest Fees" value={lowFee?.comp.name} sub={fmt(finals[cmpResults.indexOf(lowFee)]?.totalFees||0)} color={lowFee?.color} bg={t.blB}/>
                </div>
              );
            })()}

            <div style={{ textAlign:"center", padding:"32px 0 0", color:t.tx3, fontSize:11 }}>
              <p style={{ margin:0 }}>Comparison projections are hypothetical. Same investment, contribution, and timeframe applied equally. Past performance does not guarantee future results.</p>
              <p style={{ margin:"4px 0 0", letterSpacing:"0.02em" }}>DIVIDEND FORECASTER — V2.1</p>
            </div>
          </motion.div>
        ) : (
        <motion.div key={mode} {...modeT}>
        {/* Projection Mode Sub-Pills */}
        {(mode === "projection" || mode === "liveoff" || mode === "goal") && (
          <div style={{ display:"flex", gap:3, background:t.sf2, borderRadius:10, padding:3, marginBottom:20, width:"fit-content" }}>
            <Pill active={projMode==="single"} onClick={() => setProjMode("single")}>Single Holding</Pill>
            <Pill active={projMode==="portfolio"} onClick={() => setProjMode("portfolio")}>Portfolio</Pill>
          </div>
        )}

        {(mode === "projection" || mode === "liveoff" || mode === "goal") && projMode === "portfolio" ? (
          /* ===== PORTFOLIO BUILDER ===== */
          <>
            {/* Shared Inputs */}
            <div style={{ background:t.sf, borderRadius:16, padding:"22px 24px", border:`1px solid ${t.bd2}`, boxShadow:t.sh, marginBottom:20 }}>
              <h2 style={{ fontSize:16, fontWeight:600, margin:"0 0 16px 0" }}>Portfolio Settings</h2>
              <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:12 }}>
                <InputField t={t} label="Total Investment" unit="$" value={pfShared.lumpSum} onChange={v => ups("lumpSum",v)} min={0} placeholder="e.g. 10000"/>
                <InputField t={t} label="Contribution" unit="$" value={pfShared.contribAmt} onChange={v => ups("contribAmt",v)} min={0} placeholder="e.g. 500"/>
                <div style={{ flex:"1 1 140px", minWidth:130 }}>
                  <label style={{ display:"block", fontSize:11, fontWeight:600, color:pfShared.contribAmt > 0 ? t.tx2 : t.tx3, marginBottom:5, letterSpacing:"0.03em", textTransform:"uppercase", transition:"color 0.2s" }}>Frequency</label>
                  <select value={pfShared.contribFreq} onChange={e => ups("contribFreq", e.target.value)} disabled={pfShared.contribAmt === 0}
                    style={{ width:"100%", padding:"9px 10px", borderRadius:10, border:`1.5px solid ${t.inBd}`, background:t.inBg, color:pfShared.contribAmt > 0 ? t.tx : t.tx3, fontSize:14, fontWeight:500, fontFamily:FONT, outline:"none", cursor:pfShared.contribAmt > 0 ? "pointer" : "not-allowed", appearance:"auto", opacity:pfShared.contribAmt > 0 ? 1 : 0.5, transition:"opacity 0.2s, color 0.2s" }}>
                    {Object.entries(freqLabels).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <InputField t={t} label="Years" unit="YR" value={pfShared.years} onChange={v => ups("years",Math.min(100,v))} min={0} max={100} placeholder="e.g. 30"/>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:12, alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <button onClick={() => ups("drip",!pfShared.drip)} style={{ width:44, height:24, borderRadius:12, border:"none", background:pfShared.drip?t.ac:t.bd, cursor:"pointer", position:"relative", transition:"background 0.2s" }}>
                    <div style={{ width:20, height:20, borderRadius:10, background:"#FFF", position:"absolute", top:2, left:pfShared.drip?22:2, transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }}/>
                  </button>
                  <span style={{ fontSize:13, fontWeight:500, color:t.tx2 }}>DRIP {pfShared.drip?"ON":"OFF"}</span>
                </div>
                <InputField t={t} label="Div Tax" unit="%" value={pfShared.divTaxRate} onChange={v => ups("divTaxRate",v)} min={0} max={100} step={0.1} placeholder="e.g. 15"/>
                <InputField t={t} label="Cap Gains Tax" unit="%" value={pfShared.capGainsTaxRate} onChange={v => ups("capGainsTaxRate",v)} min={0} max={100} step={0.1} placeholder="e.g. 15"/>
                {mode === "liveoff" && <>
                  <InputField t={t} label="Monthly Expenses" unit="$" value={pfShared.costOfLiving} onChange={v => ups("costOfLiving",v)} min={0} placeholder="e.g. 4000"/>
                  <InputField t={t} label="Inflation" unit="%" value={pfShared.inflation} onChange={v => ups("inflation",v)} min={0} max={30} step={0.01} placeholder="e.g. 2.79"/>
                </>}
                {mode === "goal" && <>
                  <InputField t={t} label="Target Amount" unit="$" value={goalTarget} onChange={setGoalTarget} min={0} placeholder="e.g. 1000000"/>
                  <InputField t={t} label="Target Growth" unit="%" value={goalGrowthRate} onChange={setGoalGrowthRate} min={0} step={0.1}/>
                </>}
              </div>
            </div>

            {/* Fund List */}
            <div style={{ background:t.sf, borderRadius:16, padding:"22px 24px", border:`1px solid ${t.bd2}`, boxShadow:t.sh, marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                <h2 style={{ fontSize:16, fontWeight:600, margin:0 }}>Holdings ({pfFunds.length})</h2>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  {(() => {
                    const total = pfFunds.reduce((s,f)=>s+f.alloc,0);
                    return (
                      <div style={{ fontSize:12, fontWeight:600, color:total===100?t.gn:t.rd }}>
                        {total}% allocated{total > 100 ? " — over 100%!" : total < 100 ? ` — ${100-total}% remaining` : " ✓"}
                      </div>
                    );
                  })()}
                  {pfFunds.reduce((s,f)=>s+f.alloc,0) < 100 && (
                    <button onClick={addFund} style={{ padding:"6px 14px", borderRadius:8, border:`1.5px solid ${t.ac}`, background:"transparent", color:t.ac, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>+ Add Holding</button>
                  )}
                </div>
              </div>

              {pfFunds.map((fund, idx) => {
                const fc = getFundColor(idx);
                return (
                  <div key={fund.id} style={{ borderRadius:12, border:`1px solid ${t.bd2}`, padding:"16px 18px", marginBottom:12, borderLeft:`4px solid ${fc}` }}>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:10, alignItems:"flex-end" }}>
                      <div style={{ flex:"0 0 80px" }}>
                        <label style={{ display:"block", fontSize:10, fontWeight:700, color:fc, marginBottom:4, textTransform:"uppercase", letterSpacing:"0.04em" }}>Ticker</label>
                        <input type="text" value={fund.ticker} onChange={e => upf(fund.id,"ticker",e.target.value.toUpperCase())} placeholder="TICK"
                          style={{ width:"100%", padding:"7px 8px", borderRadius:8, border:`1.5px solid ${t.inBd}`, background:t.inBg, color:t.tx, fontSize:14, fontWeight:700, fontFamily:FONT, outline:"none", letterSpacing:"0.04em" }}/>
                      </div>
                      <div style={{ flex:"0 0 70px" }}>
                        <label style={{ display:"block", fontSize:10, fontWeight:700, color:t.tx2, marginBottom:4, textTransform:"uppercase" }}>Alloc %</label>
                        <input type="number" value={fund.alloc} min={0} max={100} onChange={e => upf(fund.id,"alloc",parseFloat(e.target.value)||0)}
                          style={{ width:"100%", padding:"7px 8px", borderRadius:8, border:`1.5px solid ${t.inBd}`, background:t.inBg, color:t.tx, fontSize:14, fontWeight:600, fontFamily:FONT, outline:"none" }}/>
                      </div>
                      <div style={{ flex:"0 0 80px" }}>
                        <label style={{ display:"block", fontSize:10, fontWeight:700, color:t.tx2, marginBottom:4, textTransform:"uppercase" }}>Price</label>
                        <input type="number" value={fund.sharePrice} min={0.01} step={0.01} onChange={e => upf(fund.id,"sharePrice",parseFloat(e.target.value)||1)}
                          style={{ width:"100%", padding:"7px 8px", borderRadius:8, border:`1.5px solid ${t.inBd}`, background:t.inBg, color:t.tx, fontSize:14, fontWeight:500, fontFamily:FONT, outline:"none" }}/>
                      </div>
                      <div style={{ flex:"0 0 70px" }}>
                        <label style={{ display:"block", fontSize:10, fontWeight:700, color:t.tx2, marginBottom:4, textTransform:"uppercase" }}>Yield %</label>
                        <input type="number" value={fund.divYield} min={0} max={100} step={0.01} onChange={e => upf(fund.id,"divYield",parseFloat(e.target.value)||0)}
                          style={{ width:"100%", padding:"7px 8px", borderRadius:8, border:`1.5px solid ${t.inBd}`, background:t.inBg, color:t.tx, fontSize:14, fontWeight:500, fontFamily:FONT, outline:"none" }}/>
                      </div>
                      <div style={{ flex:"0 0 80px" }}>
                        <label style={{ display:"block", fontSize:10, fontWeight:700, color:t.tx2, marginBottom:4, textTransform:"uppercase" }}>Div Grw %</label>
                        <input type="number" value={fund.divGrowth} min={0} max={100} step={0.01} onChange={e => upf(fund.id,"divGrowth",parseFloat(e.target.value)||0)}
                          style={{ width:"100%", padding:"7px 8px", borderRadius:8, border:`1.5px solid ${t.inBd}`, background:t.inBg, color:t.tx, fontSize:14, fontWeight:500, fontFamily:FONT, outline:"none" }}/>
                      </div>
                      <div style={{ flex:"0 0 80px" }}>
                        <label style={{ display:"block", fontSize:10, fontWeight:700, color:t.tx2, marginBottom:4, textTransform:"uppercase" }}>Apprec %</label>
                        <input type="number" value={fund.appreciation} min={-50} max={100} step={0.01} onChange={e => upf(fund.id,"appreciation",parseFloat(e.target.value)||0)}
                          style={{ width:"100%", padding:"7px 8px", borderRadius:8, border:`1.5px solid ${t.inBd}`, background:t.inBg, color:t.tx, fontSize:14, fontWeight:500, fontFamily:FONT, outline:"none" }}/>
                      </div>
                      <div style={{ flex:"0 0 70px" }}>
                        <label style={{ display:"block", fontSize:10, fontWeight:700, color:t.tx2, marginBottom:4, textTransform:"uppercase" }}>ER %</label>
                        <input type="number" value={fund.expenseRatio} min={0} max={10} step={0.01} onChange={e => upf(fund.id,"expenseRatio",parseFloat(e.target.value)||0)}
                          style={{ width:"100%", padding:"7px 8px", borderRadius:8, border:`1.5px solid ${t.inBd}`, background:t.inBg, color:t.tx, fontSize:14, fontWeight:500, fontFamily:FONT, outline:"none" }}/>
                      </div>
                      <div style={{ flex:"0 0 100px" }}>
                        <label style={{ display:"block", fontSize:10, fontWeight:700, color:pfShared.drip?t.tx2:t.tx3, marginBottom:4, textTransform:"uppercase", transition:"color 0.2s" }}>Payout</label>
                        <select value={fund.divFrequency} onChange={e => upf(fund.id,"divFrequency",e.target.value)}
                          style={{ width:"100%", padding:"7px 8px", borderRadius:8, border:`1.5px solid ${pfShared.drip?t.inF:t.inBd}`, background:t.inBg, color:pfShared.drip?t.tx:t.tx3, fontSize:13, fontWeight:500, fontFamily:FONT, outline:"none", cursor:"pointer", appearance:"auto", transition:"border-color 0.2s, color 0.2s" }}>
                          {Object.entries(divFreqLabels).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
                        </select>
                      </div>
                      {pfFunds.length > 1 && (
                        <button onClick={() => removeFund(fund.id)} style={{ padding:"7px 10px", borderRadius:8, border:`1px solid ${t.rd}`, background:"transparent", color:t.rd, fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:FONT, marginLeft:"auto" }}>Remove</button>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Blended Metrics */}
              {(() => {
                const ta = pfFunds.reduce((s,f)=>s+f.alloc,0) || 100;
                const bY = pfFunds.reduce((s,f)=>s+(f.divYield*f.alloc/ta),0);
                const bG = pfFunds.reduce((s,f)=>s+(f.divGrowth*f.alloc/ta),0);
                const bA = pfFunds.reduce((s,f)=>s+(f.appreciation*f.alloc/ta),0);
                const bE = pfFunds.reduce((s,f)=>s+(f.expenseRatio*f.alloc/ta),0);
                return (
                  <div style={{ background:t.sf2, borderRadius:12, padding:"14px 18px", marginTop:4 }}>
                    <div style={{ fontSize:11, fontWeight:600, color:t.tx2, textTransform:"uppercase", letterSpacing:"0.04em", marginBottom:8 }}>Blended Portfolio Metrics</div>
                    <div style={{ display:"flex", gap:16, flexWrap:"wrap", fontSize:13 }}>
                      <span><span style={{ color:t.tx3 }}>Yield:</span> <span style={{ fontWeight:600 }}>{bY.toFixed(2)}%</span></span>
                      <span><span style={{ color:t.tx3 }}>Div Growth:</span> <span style={{ fontWeight:600 }}>{bG.toFixed(2)}%</span></span>
                      <span><span style={{ color:t.tx3 }}>Appreciation:</span> <span style={{ fontWeight:600 }}>{bA.toFixed(2)}%</span></span>
                      <span><span style={{ color:t.tx3 }}>Expense Ratio:</span> <span style={{ fontWeight:600 }}>{bE.toFixed(3)}%</span></span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Allocation Warning */}
            {pfFunds.reduce((s,f)=>s+f.alloc,0) !== 100 && (
              <div style={{ background:dark?"rgba(255,59,48,0.15)":"#FEF2F2", borderRadius:12, padding:"14px 20px", marginBottom:20, border:`1.5px solid ${t.rd}`, display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ fontSize:24 }}>⚠</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:600, color:t.rd }}>Allocation is at {pfFunds.reduce((s,f)=>s+f.alloc,0)}% — not 100%</div>
                  <div style={{ fontSize:12, color:t.tx2, marginTop:2 }}>Results below {pfFunds.reduce((s,f)=>s+f.alloc,0) > 100 ? "assume more money invested than your total investment" : "do not reflect your full investment amount"}. Adjust allocations above to total exactly 100%.</div>
                </div>
              </div>
            )}

            {/* Portfolio Snapshot */}
            {(() => {
              const milestoneYears = [1,5,10,15,20,25,30].filter(y => y <= pfShared.years);
              if (!milestoneYears.includes(pfShared.years)) milestoneYears.push(pfShared.years);
              const snap = pfSelectedYear === "all" ? pfDisplayData[pfDisplayData.length-1] : (pfDisplayData.find(d => d.year === pfSelectedYear) || pfDisplayData[pfDisplayData.length-1]);
              if (!snap) return null;
              return (
                <div style={{ background:t.sf, borderRadius:16, padding:"22px 24px", border:`1px solid ${t.bd2}`, boxShadow:t.sh, marginBottom:20 }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:10 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <h2 style={{ fontSize:16, fontWeight:600, margin:0 }}>Portfolio Snapshot</h2>
                      <button onClick={() => setPfInflationAdj(!pfInflationAdj)} style={{
                        display:"flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:20,
                        border:`1.5px solid ${pfInflationAdj?t.or:t.bd}`, background:pfInflationAdj?t.orB:"transparent",
                        cursor:"pointer", fontFamily:FONT, fontSize:11, fontWeight:600, color:pfInflationAdj?t.or:t.tx3, transition:"all 0.2s",
                      }}>
                        <div style={{ width:8, height:8, borderRadius:4, background:pfInflationAdj?t.or:t.tx3 }}/>
                        {pfInflationAdj ? `Today's dollars (${pfShared.inflation}%)` : "Inflation adjust"}
                      </button>
                    </div>
                    <div style={{ display:"flex", gap:3, background:t.sf2, borderRadius:10, padding:3, flexWrap:"wrap" }}>
                      {milestoneYears.map(yr => <Pill key={yr} active={pfSelectedYear===yr} onClick={() => setPfSelectedYear(yr)}>Yr {yr}</Pill>)}
                      <Pill active={pfSelectedYear==="all"} onClick={() => setPfSelectedYear("all")}>All</Pill>
                    </div>
                  </div>
                  {mode === "projection" ? (
                  <motion.div key={`pf-proj-${pfSelectedYear}`} variants={cardContainer} initial="hidden" animate="show" style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:16 }}>
                    <Card label="Portfolio Value" tip={tips.pv} value={fmt(snap.portfolioValue)} sub={`from ${fmtF(snap.totalContrib)} contributed`} color={t.ac} bg={t.blB}/>
                    <Card label="Walk-Away Value" tip={tips.wa} value={fmt(snap.walkAwayValue)} sub={`after ${pfShared.capGainsTaxRate}% cap gains`} color={t.gn} bg={t.gnB}/>
                    <Card label="Net Dividend Income" tip={tips.ndi} value={fmt(snap.netDivMonthly)} sub={`${fmtF(snap.netDivAnnual)}/yr after ${pfShared.divTaxRate}% tax`} color={t.pu} bg={t.puB}/>
                    <Card label="Yield on Cost" tip={tips.yoc} value={pct(snap.yieldOnCost)} sub={`blended across ${pfFunds.length} holdings`} color={t.or} bg={t.orB}/>
                    <motion.div variants={cardItem} style={{ flex:"1 1 180px", minWidth:160, background:t.rdB, borderRadius:14, padding:"16px 20px", border:`1px solid ${t.bd2}`, boxShadow:t.sh }}>
                      <div style={{ fontSize:10, fontWeight:700, color:t.tx2, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:6 }}>Total Cost<InfoTip text={tips.cost}/></div>
                      <div style={{ fontSize:24, fontWeight:700, color:t.rd, letterSpacing:"-0.02em", lineHeight:1.1 }}>{fmt(snap.totalTaxPaid + snap.totalFees + (snap.portfolioValue - snap.walkAwayValue))}</div>
                      <div style={{ marginTop:8, display:"flex", flexDirection:"column", gap:3 }}>
                        <div style={{ fontSize:11, color:t.tx2, display:"flex", justifyContent:"space-between" }}><span>Cap gains</span><span style={{ fontWeight:600, color:t.rd }}>{fmtF(snap.portfolioValue - snap.walkAwayValue)}</span></div>
                        <div style={{ fontSize:11, color:t.tx2, display:"flex", justifyContent:"space-between" }}><span>Div tax</span><span style={{ fontWeight:600, color:t.rd }}>{fmtF(snap.totalTaxPaid)}</span></div>
                        <div style={{ fontSize:11, color:t.tx2, display:"flex", justifyContent:"space-between" }}><span>Fees</span><span style={{ fontWeight:600, color:t.rd }}>{fmtF(snap.totalFees)}</span></div>
                      </div>
                    </motion.div>
                  </motion.div>
                  ) : mode === "goal" ? (() => {
                    const pfGoalTarget = goalTarget * Math.pow(1 + goalGrowthRate/100, pfSelectedYear === "all" ? pfShared.years : pfSelectedYear);
                    const pfGoalGap = pfGoalTarget - snap.portfolioValue;
                    const pfGoalProgress = pfGoalTarget > 0 ? Math.min((snap.portfolioValue / pfGoalTarget) * 100, 999) : 100;
                    // Find ETA from blended data
                    const pfGoalYearData = pfResults.blended.filter(d => d.year > 0).map(d => {
                      const tgt = goalTarget * Math.pow(1 + goalGrowthRate/100, d.year);
                      return { year: d.year, reached: d.portfolioValue >= tgt };
                    });
                    const pfGoalFirst = pfGoalYearData.find(d => d.reached);
                    const pfGoalETA = pfGoalFirst ? `Year ${pfGoalFirst.year}` : null;
                    return (
                    <motion.div key={`pf-goal-${pfSelectedYear}`} variants={cardContainer} initial="hidden" animate="show" style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:16 }}>
                      <Card label="Portfolio Value" tip={tips.pv} value={fmt(snap.portfolioValue)} sub={`from ${fmtF(snap.totalContrib)} contributed`} color={t.ac} bg={t.blB}/>
                      <Card label="Target" tip="The goal amount, adjusted for growth rate" value={fmt(pfGoalTarget)} sub={goalGrowthRate > 0 ? `growing at ${goalGrowthRate}%/yr` : "fixed target"} color={t.or} bg={t.orB}/>
                      <Card label="Gap" tip="How much more needed to reach the target" value={pfGoalGap > 0 ? fmt(pfGoalGap) : "Reached!"} sub={pfGoalGap > 0 ? "remaining to target" : "Portfolio exceeds target"} color={pfGoalGap > 0 ? t.rd : t.gn} bg={pfGoalGap > 0 ? t.rdB : t.gnB}/>
                      <Card label="ETA" tip="Estimated year when portfolio reaches the target" value={pfGoalETA || "Not reached"} sub={pfGoalETA ? "Portfolio hits target" : `within ${pfShared.years} years`} color={pfGoalETA ? t.gn : t.rd} bg={pfGoalETA ? t.gnB : t.rdB}/>
                      <Card label="Progress" tip="Percentage of the target reached" value={`${Math.min(pfGoalProgress, 100).toFixed(1)}%`} sub={pfGoalProgress >= 100 ? "Target exceeded" : "of target reached"} color={pfGoalProgress >= 100 ? t.gn : t.ac} bg={pfGoalProgress >= 100 ? t.gnB : t.blB}/>
                      <Card label="Walk-Away Value" tip={tips.wa} value={fmt(snap.walkAwayValue)} sub={`after ${pfShared.capGainsTaxRate}% cap gains`} color={t.gn} bg={t.gnB}/>
                    </motion.div>);
                  })() : (() => {
                    const blendYield = pfFunds.reduce((s,f)=>s+(f.divYield*f.alloc/(pfFunds.reduce((ss,ff)=>ss+ff.alloc,0)||100)),0);
                    const pfNeededNow = blendYield > 0 ? ((pfShared.costOfLiving * 12) / ((blendYield/100) * (1 - pfShared.divTaxRate/100))) : 0;
                    return (
                    <motion.div key={`pf-liveoff-${pfSelectedYear}`} variants={cardContainer} initial="hidden" animate="show" style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:16 }}>
                      <Card label="Portfolio Value" tip={tips.pv} value={fmt(snap.portfolioValue)} sub={`from ${fmtF(snap.totalContrib)} contributed`} color={t.ac} bg={t.blB}/>
                      <Card label="Walk-Away Value" tip={tips.wa} value={fmt(snap.walkAwayValue)} sub={`after ${pfShared.capGainsTaxRate}% cap gains`} color={t.gn} bg={t.gnB}/>
                      <Card label="Net Dividend Income" tip={tips.ndi} value={fmt(snap.netDivMonthly)} sub={`${fmtF(snap.netDivAnnual)}/yr after ${pfShared.divTaxRate}% tax`} color={t.pu} bg={t.puB}/>
                      <Card label="Freedom" tip={tips.free} value={pfResults.pfCrossLabel || "Not reached"} sub={pfResults.pfCrossLabel ? "Dividends exceed expenses" : `within ${pfShared.years} years`} color={pfResults.pfCrossYr!==null?t.gn:t.rd} bg={pfResults.pfCrossYr!==null?t.gnB:t.rdB}/>
                      <Card label={snap.canLiveOff ? "Status: FREE" : "Status: Building"} tip={tips.status} value={snap.canLiveOff ? "Yes" : "Not Yet"} sub={snap.canLiveOff ? "Dividends cover expenses" : `Need ${fmtF(snap.monthlyCost - snap.netDivMonthly)} more/mo`} color={snap.canLiveOff?t.gn:t.rd} bg={snap.canLiveOff?t.gnB:t.rdB}/>
                      <Card label="Monthly Expenses" tip={tips.exp} value={fmt(snap.monthlyCost)} sub={`at ${pfShared.inflation}% inflation`} color={t.rd} bg={t.rdB}/>
                      <Card label="Need Today" tip={tips.need} value={fmt(pfNeededNow)} sub={`to live off ${blendYield.toFixed(2)}% blended yield`} color={t.or} bg={t.orB}/>
                      <Card label="Yield on Cost" tip={tips.yoc} value={pct(snap.yieldOnCost)} sub={`blended across ${pfFunds.length} holdings`} color={t.or} bg={t.orB}/>
                    </motion.div>
                    );
                  })()}
                  {/* Per-Holding Breakdown */}
                  {snap.perFund && (
                    <div>
                      <div style={{ fontSize:12, fontWeight:600, color:t.tx2, textTransform:"uppercase", letterSpacing:"0.04em", marginBottom:10 }}>Per-Holding Breakdown</div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                        {snap.perFund.map((pf, idx) => {
                          const fc = getFundColor(idx);
                          return (
                            <div key={idx} style={{ flex:"1 1 150px", minWidth:140, borderRadius:10, border:`1px solid ${t.bd2}`, padding:"12px 14px", borderLeft:`3px solid ${fc}` }}>
                              <div style={{ fontSize:13, fontWeight:700, color:fc, marginBottom:6 }}>{pf.ticker || `Holding ${idx+1}`} <span style={{ fontWeight:400, color:t.tx3, fontSize:11 }}>{pf.alloc}%</span></div>
                              <div style={{ fontSize:11, color:t.tx2, display:"flex", justifyContent:"space-between", marginBottom:3 }}><span>Value</span><span style={{ fontWeight:600, color:t.tx }}>{fmt(pf.portfolioValue)}</span></div>
                              <div style={{ fontSize:11, color:t.tx2, display:"flex", justifyContent:"space-between", marginBottom:3 }}><span>Mo. Income</span><span style={{ fontWeight:600, color:t.pu }}>{fmtF(pf.netDivMonthly)}</span></div>
                              <div style={{ fontSize:11, color:t.tx2, display:"flex", justifyContent:"space-between" }}><span>Shares</span><span style={{ fontWeight:600 }}>{fmtShares(pf.shares)}</span></div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Portfolio Charts */}
            <div style={{ background:t.sf, borderRadius:16, padding:"22px 24px", border:`1px solid ${t.bd2}`, boxShadow:t.sh, marginBottom:20 }}>
              <div style={{ display:"flex", gap:3, background:t.sf2, borderRadius:10, padding:3, marginBottom:22, width:"fit-content", flexWrap:"wrap" }}>
                {[...(mode==="liveoff"?[{id:"crossover",l:"Crossover"}]:[]),{id:"combined",l:"Combined"},{id:"individual",l:"Individual Holdings"},{id:"income",l:"Income"},{id:"yoc",l:"Yield on Cost"},{id:"breakdown",l:"Breakdown"},{id:"tax",l:"Tax & Fees"}].map(tab => (
                  <Pill key={tab.id} active={pfChartTab===tab.id} onClick={() => setPfChartTab(tab.id)}>{tab.l}</Pill>
                ))}
              </div>
              {pfChartTab === "breakdown" && (
                <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:8 }}>
                  <button onClick={() => setBreakdownAllYears(!breakdownAllYears)} style={{ padding:"4px 10px", borderRadius:6, border:`1px solid ${t.bd}`, background:breakdownAllYears?t.ac+"15":"transparent", color:breakdownAllYears?t.ac:t.tx3, fontSize:10, fontWeight:600, cursor:"pointer", fontFamily:FONT }}>
                    {breakdownAllYears ? "All Years ✓" : "All Years"}
                  </button>
                </div>
              )}
              <div style={{ height:340 }}>
                {isClient && (
                <ResponsiveContainer width="100%" height="100%">
                  {pfChartTab === "crossover" ? (() => {
                    const cxData = pfResults.pfCrossoverChartData ? (pfSelectedYear === "all" ? pfResults.pfCrossoverChartData : pfResults.pfCrossoverChartData.filter(d => d.year <= pfSelectedYear)) : pfChartData;
                    const yearlyForChart = cxData.filter(d => d.month % 12 === 0 || d.month === 1);
                    const cxYear = pfResults.pfCrossoverMonth > 0 ? +(pfResults.pfCrossoverMonth/12).toFixed(2) : null;
                    return (
                    <LineChart data={yearlyForChart} margin={{ top:10,right:10,left:10,bottom:0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={t.grid}/>
                      <XAxis dataKey="year" tick={{ fill:t.tx3, fontSize:11 }} axisLine={{ stroke:t.grid }} tickLine={false} type="number" domain={["dataMin","dataMax"]} tickCount={Math.min(16, pfShared.years+1)} tickFormatter={v => Math.round(v)}/>
                      <YAxis tickFormatter={fmt} tick={{ fill:t.tx3, fontSize:11 }} axisLine={false} tickLine={false}/>
                      <Tooltip content={({ active, payload, label }) => {
                        if (!active || !payload?.length) return null;
                        const yr = Math.round(label);
                        return (<div style={{ background:t.ttBg, border:`1px solid ${t.ttBd}`, borderRadius:12, padding:"12px 16px", boxShadow:t.shL, fontFamily:FONT, fontSize:13 }}>
                          <div style={{ color:t.tx2, marginBottom:6, fontWeight:500 }}>Year {yr}</div>
                          {payload.map((p,i) => (<div key={i} style={{ color:t.tx, display:"flex", alignItems:"center", gap:8, marginTop:4 }}>
                            <div style={{ width:8, height:8, borderRadius:4, background:p.color }} />
                            <span style={{ color:t.tx2 }}>{p.name}:</span>
                            <span style={{ fontWeight:600 }}>{fmtF(p.value)}</span>
                          </div>))}
                        </div>);
                      }}/>
                      <Line type="monotone" dataKey="monthlyCost" name="Monthly Expenses" stroke={t.rd} strokeWidth={2} strokeDasharray="6 3" dot={false}/>
                      <Line type="monotone" dataKey="netDivMonthly" name="Monthly Net Dividend" stroke={t.pu} strokeWidth={2.5} dot={false}/>
                      {cxYear && <ReferenceLine x={cxYear} stroke={t.or} strokeWidth={2} strokeDasharray="6 4" label={{ value: pfResults.pfCrossLabel || `Yr ${cxYear}`, position:"insideTopLeft", fill:t.or, fontSize:11, fontWeight:600, offset:10 }}/>}
                    </LineChart>);
                  })() : pfChartTab === "combined" ? (
                    <AreaChart data={pfChartData} margin={{ top:10,right:10,left:10,bottom:0 }}>
                      <defs><linearGradient id="gPG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={t.ac} stopOpacity={0.12}/><stop offset="100%" stopColor={t.ac} stopOpacity={0}/></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={t.grid}/>
                      <XAxis dataKey="year" tick={{ fill:t.tx3, fontSize:11 }} axisLine={{ stroke:t.grid }} tickLine={false}/>
                      <YAxis tickFormatter={fmt} tick={{ fill:t.tx3, fontSize:11 }} axisLine={false} tickLine={false}/>
                      <Tooltip content={<Tip t={t}/>}/>
                      <Area type="monotone" dataKey="totalContrib" name="Contributed" fill="none" stroke={t.tx3} strokeWidth={1.5} strokeDasharray="4 4" dot={false}/>
                      <Area type="monotone" dataKey="portfolioValue" name="Portfolio Value" fill="url(#gPG)" stroke={t.ac} strokeWidth={2} dot={false}/>
                      <Area type="monotone" dataKey="walkAwayValue" name="Walk-Away" fill="none" stroke={t.gn} strokeWidth={2} dot={false}/>
                      {mode==="goal" && <Area type="monotone" dataKey="goalTargetLine" name="Target" fill="none" stroke={t.or} strokeWidth={2.5} strokeDasharray="8 4" dot={false}/>}
                    </AreaChart>
                  ) : pfChartTab === "individual" ? (
                    <LineChart data={pfChartData} margin={{ top:10,right:10,left:10,bottom:0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={t.grid}/>
                      <XAxis dataKey="year" tick={{ fill:t.tx3, fontSize:11 }} axisLine={{ stroke:t.grid }} tickLine={false}/>
                      <YAxis tickFormatter={fmt} tick={{ fill:t.tx3, fontSize:11 }} axisLine={false} tickLine={false}/>
                      <Tooltip content={<Tip t={t}/>}/>
                      {pfFunds.map((fund, idx) => (
                        <Line key={fund.id} type="monotone" dataKey={d => d.perFund?.[idx]?.portfolioValue || 0} name={fund.ticker || `Holding ${idx+1}`} stroke={getFundColor(idx)} strokeWidth={2} dot={false}/>
                      ))}
                    </LineChart>
                  ) : pfChartTab === "income" ? (
                    <AreaChart data={pfChartData} margin={{ top:10,right:10,left:10,bottom:0 }}>
                      <defs>
                        <linearGradient id="gPI" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={t.pu} stopOpacity={0.12}/><stop offset="100%" stopColor={t.pu} stopOpacity={0}/></linearGradient>
                        <linearGradient id="gPIS" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={t.pu} stopOpacity={0.05}/><stop offset="100%" stopColor={t.pu} stopOpacity={0}/></linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={t.grid}/>
                      <XAxis dataKey="year" tick={{ fill:t.tx3, fontSize:11 }} axisLine={{ stroke:t.grid }} tickLine={false}/>
                      <YAxis tickFormatter={fmt} tick={{ fill:t.tx3, fontSize:11 }} axisLine={false} tickLine={false}/>
                      <Tooltip content={<Tip t={t}/>}/>
                      {mode==="liveoff" ? <>
                        <Area type="monotone" dataKey="monthlyCost" name="Monthly Expenses" fill="none" stroke={t.rd} strokeWidth={2} strokeDasharray="6 3" dot={false}/>
                        <Area type="monotone" dataKey="netDivAnnual" name="Annual Net Dividend" fill="url(#gPIS)" stroke={t.pu} strokeWidth={1.5} strokeOpacity={0.4} dot={false}/>
                        <Area type="monotone" dataKey="netDivMonthly" name="Monthly Net Dividend" fill="url(#gPI)" stroke={t.pu} strokeWidth={2.5} dot={false}/>
                      </> : <>
                        <Area type="monotone" dataKey="netDivMonthly" name="Monthly Net Dividend" fill="url(#gPIS)" stroke={t.pu} strokeWidth={1.5} strokeOpacity={0.4} dot={false}/>
                        <Area type="monotone" dataKey="netDivAnnual" name="Annual Net Dividend" fill="url(#gPI)" stroke={t.pu} strokeWidth={2.5} dot={false}/>
                      </>}
                    </AreaChart>
                  ) : pfChartTab === "yoc" ? (
                    <AreaChart data={pfChartData} margin={{ top:10,right:10,left:10,bottom:0 }}>
                      <defs><linearGradient id="gPY" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={t.or} stopOpacity={0.12}/><stop offset="100%" stopColor={t.or} stopOpacity={0}/></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={t.grid}/>
                      <XAxis dataKey="year" tick={{ fill:t.tx3, fontSize:11 }} axisLine={{ stroke:t.grid }} tickLine={false}/>
                      <YAxis tickFormatter={v=>pct(v)} tick={{ fill:t.tx3, fontSize:11 }} axisLine={false} tickLine={false}/>
                      <Tooltip content={<Tip t={t}/>}/>
                      <Area type="monotone" dataKey="yieldOnCost" name="Yield on Cost" fill="url(#gPY)" stroke={t.or} strokeWidth={2.5} dot={false}/>
                    </AreaChart>
                  ) : pfChartTab === "breakdown" ? (() => {
                    const pfBkData = pfChartData.filter(d=>d.year>0&&(breakdownAllYears||(d.year<=5||d.year%5===0)));
                    return (
                    <BarChart data={pfBkData} margin={{ top:10,right:10,left:10,bottom:0 }} barGap={0} barCategoryGap="20%">
                      <CartesianGrid strokeDasharray="3 3" stroke={t.grid}/>
                      <XAxis dataKey="year" tick={{ fill:t.tx3, fontSize:10 }} axisLine={{ stroke:t.grid }} tickLine={false} tickFormatter={v=>breakdownAllYears?(v%5===0||v===1?v:""):v}/>
                      <YAxis tickFormatter={fmt} tick={{ fill:t.tx3, fontSize:11 }} axisLine={false} tickLine={false}/>
                      <Tooltip content={<Tip t={t}/>}/>
                      <Bar dataKey="totalContrib" name="Contributed" fill={t.tx3} radius={[3,3,0,0]} opacity={0.35}/>
                      <Bar dataKey="totalNetDiv" name="Net Dividends" fill={t.pu} radius={[3,3,0,0]}/>
                      <Bar dataKey="portfolioValue" name="Portfolio" fill={t.ac} radius={[3,3,0,0]}/>
                    </BarChart>);
                  })() : pfChartTab === "tax" ? (
                    <AreaChart data={pfChartData} margin={{ top:10,right:10,left:10,bottom:0 }}>
                      <defs><linearGradient id="gPT" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={t.rd} stopOpacity={0.12}/><stop offset="100%" stopColor={t.rd} stopOpacity={0}/></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke={t.grid}/>
                      <XAxis dataKey="year" tick={{ fill:t.tx3, fontSize:11 }} axisLine={{ stroke:t.grid }} tickLine={false}/>
                      <YAxis tickFormatter={fmt} tick={{ fill:t.tx3, fontSize:11 }} axisLine={false} tickLine={false}/>
                      <Tooltip content={<Tip t={t}/>}/>
                      <Area type="monotone" dataKey="totalTaxPaid" name="Dividend Tax Paid" fill="url(#gPT)" stroke={t.rd} strokeWidth={2} dot={false}/>
                      <Area type="monotone" dataKey="totalFees" name="Expense Ratio Fees" fill="none" stroke={t.or} strokeWidth={2} strokeDasharray="4 4" dot={false}/>
                    </AreaChart>
                  ) : null}
                </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Portfolio Table */}
            <div style={{ background:t.sf, borderRadius:16, padding:"22px 24px", border:`1px solid ${t.bd2}`, boxShadow:t.sh }}>
              <h3 style={{ fontSize:16, fontWeight:600, margin:"0 0 16px 0" }}>Portfolio Milestones</h3>
              <div style={{ overflow:"auto", maxHeight:600 }}>
                <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
                  <thead><tr>
                    {["Year","Contributed","Portfolio","Net Dividend","Walk-Away","YoC","Tax Paid","Fees",
                      ...(mode==="liveoff"?["Mo. Expenses","Live Off?"]:[])]
                    .map(h => (
                      <th key={h} style={{ position:"sticky", top:0, zIndex:10, textAlign:"left", padding:"10px 12px", color:t.tx2, fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em", borderBottom:`2px solid ${t.bd}`, whiteSpace:"nowrap", background:t.sf, boxShadow:`0 2px 4px ${t.bd}` }}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {(() => {
                      const cxFloor = pfResults.pfCrossoverMonth > 0 ? Math.floor(pfResults.pfCrossoverMonth / 12) : -1;
                      const cxCeil = pfResults.pfCrossoverMonth > 0 ? Math.ceil(pfResults.pfCrossoverMonth / 12) : -1;
                      return pfDisplayData.filter(d => d.year >= 0).map(d => {
                        const isCxRow = mode === "liveoff" && (d.year === cxFloor || d.year === cxCeil) && d.year > 0;
                        return (
                        <tr key={d.year} style={{ borderBottom:`1px solid ${t.bd2}`, background:d.year===0?t.sf2:isCxRow?(dark?"rgba(255,149,0,0.06)":"rgba(255,149,0,0.05)"):"transparent", borderLeft:isCxRow?`3px solid ${t.or}`:"3px solid transparent" }}>
                          <td style={{ padding:"11px 12px", fontWeight:600, color:d.year===0?t.tx3:t.ac }}>{d.year===0?"Start":d.year}</td>
                          <td style={{ padding:"11px 12px", color:t.tx2 }}>{fmtF(d.totalContrib)}</td>
                          <td style={{ padding:"11px 12px", fontWeight:600 }}>{fmtF(d.portfolioValue)}</td>
                          <td style={{ padding:"11px 12px" }}><div style={{ fontWeight:600, color:t.pu }}>{fmtF(d.netDivMonthly)}/mo</div><div style={{ fontSize:11, color:t.tx3 }}>{fmtF(d.netDivAnnual)}/yr</div></td>
                          <td style={{ padding:"11px 12px", color:t.gn, fontWeight:600 }}>{fmtF(d.walkAwayValue)}</td>
                          <td style={{ padding:"11px 12px", color:t.or, fontWeight:600 }}>{pct(d.yieldOnCost)}</td>
                          <td style={{ padding:"11px 12px", color:t.rd }}>{fmtF(d.totalTaxPaid)}</td>
                          <td style={{ padding:"11px 12px", color:t.rd }}>{fmtF(d.totalFees)}</td>
                          {mode==="liveoff" && <>
                            <td style={{ padding:"11px 12px" }}>{fmtF(d.monthlyCost)}</td>
                            <td style={{ padding:"11px 12px", fontWeight:600, color:d.canLiveOff?t.gn:t.rd }}>{d.canLiveOff?"Yes":"No"}</td>
                          </>}
                        </tr>
                      );});
                    })()}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ textAlign:"center", padding:"32px 0 0", color:t.tx3, fontSize:11 }}>
              <p style={{ margin:0 }}>Portfolio projections are hypothetical. Each holding runs independently with its own parameters. Past performance does not guarantee future results.</p>
              <p style={{ margin:"4px 0 0", letterSpacing:"0.02em" }}>DIVIDEND FORECASTER — V2.1</p>
            </div>
          </>
        ) : (
        <>
        {/* Inputs */}
        <div style={{ background:t.sf, borderRadius:16, padding:"22px 24px", border:`1px solid ${t.bd2}`, boxShadow:t.sh, marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18, flexWrap:"wrap", gap:10 }}>
            <h2 style={{ fontSize:16, fontWeight:600, margin:0 }}>Fund Parameters</h2>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, background:t.sf2, borderRadius:8, padding:"6px 12px" }}>
                <input type="text" placeholder="TICKER" value={inp.ticker} onChange={e => u("ticker", e.target.value.toUpperCase())}
                  style={{ border:"none", outline:"none", background:"transparent", fontSize:13, fontWeight:600, color:t.tx, width:72, fontFamily:FONT, letterSpacing:"0.04em", textAlign:"center" }}/>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:4, background:t.sf2, borderRadius:8, padding:"4px 8px" }}>
                <span style={{ fontSize:11, color:t.tx3, fontWeight:500 }}>$</span>
                <input type="text" inputMode="decimal"
                  value={sharePriceFocused ? sharePriceDraft : (inp.sharePrice === 0 || !Number.isFinite(inp.sharePrice) ? "" : String(inp.sharePrice))}
                  placeholder={sharePriceFocused ? "" : "e.g. 100"}
                  onChange={e => setSharePriceDraft(e.target.value)}
                  onFocus={() => { setSharePriceDraft(inp.sharePrice === 0 || !Number.isFinite(inp.sharePrice) ? "" : String(inp.sharePrice)); setSharePriceFocused(true); }}
                  onBlur={e => { setSharePriceFocused(false); u("sharePrice", parseFloat(e.target.value) || 0); }}
                  style={{ border:"none", outline:"none", background:"transparent", fontSize:13, fontWeight:600, color:t.tx, width:60, fontFamily:FONT, textAlign:"center" }}/>
                <span style={{ fontSize:10, color:t.tx3, fontWeight:500 }}>/share</span>
              </div>
              <div style={{ fontSize:12, color:t.tx2, fontWeight:500 }}>
                {inp.lumpSum > 0 && inp.sharePrice > 0 ? `${fmtShares(inp.lumpSum / inp.sharePrice)} shares` : "0 shares"}
              </div>
            </div>
          </div>

          <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:16 }}>
            <InputField t={t} label="Lump Sum" unit="$" value={inp.lumpSum} onChange={v => u("lumpSum",v)} min={0} placeholder="e.g. 10000"/>
            <InputField t={t} label="Contribution" unit="$" value={inp.contribAmt} onChange={v => u("contribAmt",v)} min={0} placeholder="e.g. 500"/>
            <div style={{ flex:"1 1 140px", minWidth:130 }}>
              <label style={{ display:"block", fontSize:11, fontWeight:600, color:inp.contribAmt > 0 ? t.tx2 : t.tx3, marginBottom:5, letterSpacing:"0.03em", textTransform:"uppercase", transition:"color 0.2s" }}>Frequency</label>
              <select value={inp.contribFreq} onChange={e => u("contribFreq", e.target.value)} disabled={inp.contribAmt === 0}
                style={{ width:"100%", padding:"9px 10px", borderRadius:10, border:`1.5px solid ${t.inBd}`, background:t.inBg, color:inp.contribAmt > 0 ? t.tx : t.tx3, fontSize:14, fontWeight:500, fontFamily:FONT, outline:"none", cursor:inp.contribAmt > 0 ? "pointer" : "not-allowed", appearance:"auto", opacity:inp.contribAmt > 0 ? 1 : 0.5, transition:"opacity 0.2s, color 0.2s" }}>
                {Object.entries(freqLabels).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <InputField t={t} label="Years" unit="YR" value={inp.years} onChange={v => { const yr = Math.min(100,v); u("years",yr); setSelectedYear("all"); }} min={0} max={100} placeholder="e.g. 30"/>
          </div>

          <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:16 }}>
            <InputField t={t} label="Div Yield" unit="%" value={inp.divYield} onChange={v => u("divYield",v)} min={0} step={0.01} placeholder="e.g. 3.6"/>
            <InputField t={t} label="Div Growth" unit="%" value={inp.divGrowth} onChange={v => u("divGrowth",v)} min={0} step={0.01} placeholder="e.g. 7"/>
            <InputField t={t} label="Price Apprec." unit="%" value={inp.appreciation} onChange={v => u("appreciation",v)} min={-50} step={0.01} placeholder="e.g. 7"/>
          </div>

          <div style={{ display:"flex", flexWrap:"wrap", gap:12, alignItems:"flex-end", marginBottom:16 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, paddingBottom:4 }}>
              <button onClick={() => u("drip",!inp.drip)} style={{ width:44, height:24, borderRadius:12, border:"none", background:inp.drip?t.ac:t.bd, cursor:"pointer", position:"relative", transition:"background 0.2s" }}>
                <div style={{ width:20, height:20, borderRadius:10, background:"#FFF", position:"absolute", top:2, left:inp.drip?22:2, transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }}/>
              </button>
              <span style={{ fontSize:13, fontWeight:500, color:t.tx2 }}>DRIP {inp.drip?"ON":"OFF"}</span>
            </div>
            <div style={{ flex:"1 1 130px", minWidth:120 }}>
              <label style={{ display:"block", fontSize:11, fontWeight:600, color:inp.drip?t.tx2:t.tx3, marginBottom:5, letterSpacing:"0.03em", textTransform:"uppercase", transition:"color 0.2s" }}>Div Payout Freq</label>
              <select value={inp.divFrequency} onChange={e => u("divFrequency", e.target.value)}
                style={{ width:"100%", padding:"9px 10px", borderRadius:10, border:`1.5px solid ${inp.drip?t.inF:t.inBd}`, background:t.inBg, color:inp.drip?t.tx:t.tx3, fontSize:14, fontWeight:500, fontFamily:FONT, outline:"none", cursor:"pointer", appearance:"auto", transition:"border-color 0.2s, color 0.2s" }}>
                {Object.entries(divFreqLabels).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            {mode === "liveoff" &&
              <InputField t={t} label="Monthly Expenses" unit="$" value={inp.costOfLiving} onChange={v => u("costOfLiving",v)} min={0} placeholder="e.g. 4000"/>
            }
            {mode === "goal" && <>
              <InputField t={t} label="Target Amount" unit="$" value={goalTarget} onChange={setGoalTarget} min={0} placeholder="e.g. 1000000"/>
              <InputField t={t} label="Target Growth" unit="%" value={goalGrowthRate} onChange={setGoalGrowthRate} min={0} step={0.1}/>
            </>}
          </div>

          <button onClick={() => setShowAdvanced(!showAdvanced)} style={{
            display:"flex", alignItems:"center", gap:6, background:"none", border:"none", cursor:"pointer",
            fontSize:12, fontWeight:600, color:t.tx3, padding:"4px 0", fontFamily:FONT, letterSpacing:"0.02em",
          }}>
            <span style={{ transform:showAdvanced?"rotate(90deg)":"rotate(0deg)", transition:"transform 0.2s", display:"inline-block" }}>▶</span>
            Advanced Options
          </button>

          {showAdvanced && (
            <div style={{ marginTop:12, paddingTop:12, borderTop:`1px solid ${t.bd2}` }}>
              <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:12 }}>
                <InputField t={t} label="Expense Ratio" unit="%" value={inp.expenseRatio} onChange={v => u("expenseRatio",v)} min={0} max={10} step={0.01} placeholder="e.g. 0.03"/>
                <InputField t={t} label="Div Tax" unit="%" value={inp.divTaxRate} onChange={v => u("divTaxRate",v)} min={0} max={100} step={0.1} placeholder="e.g. 15"/>
                <InputField t={t} label="Cap Gains Tax" unit="%" value={inp.capGainsTaxRate} onChange={v => u("capGainsTaxRate",v)} min={0} max={100} step={0.1} placeholder="e.g. 15"/>
                <InputField t={t} label="Inflation Rate" unit="%" value={inp.inflation} onChange={v => u("inflation",v)} min={0} max={30} step={0.01} placeholder="e.g. 2.79"/>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:12, alignItems:"flex-end" }}>
                <div style={{ flex:"1 1 110px", minWidth:100 }}>
                  <label style={{ display:"block", fontSize:11, fontWeight:600, color:t.tx2, marginBottom:5, letterSpacing:"0.03em", textTransform:"uppercase" }}>Share Split</label>
                  <select value={inp.splitRatio} onChange={e => u("splitRatio", e.target.value)}
                    style={{ width:"100%", padding:"9px 10px", borderRadius:10, border:`1.5px solid ${t.inBd}`, background:t.inBg, color:t.tx, fontSize:14, fontWeight:500, fontFamily:FONT, outline:"none", cursor:"pointer", appearance:"auto" }}>
                    {Object.entries(splitLabels).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                {inp.splitRatio !== "none" && <InputField t={t} label="Split Every" unit="YR" value={inp.splitInterval} onChange={v => u("splitInterval", Math.max(1,v))} min={1} max={50}/>}
              </div>
            </div>
          )}
        </div>

        {/* Milestone Year Selector + Cards */}
        {(() => {
          const milestoneYears = [1,5,10,15,20,25,30].filter(y => y <= inp.years);
          if (!milestoneYears.includes(inp.years)) milestoneYears.push(inp.years);
          const getSnap = yr => yr === "all" ? displayFinal : (displayData.find(d => d.year === yr) || displayFinal);
          const snap = getSnap(selectedYear);
          return (<div style={{ background:t.sf, borderRadius:16, padding:"22px 24px", border:`1px solid ${t.bd2}`, boxShadow:t.sh, marginBottom:20 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, flexWrap:"wrap", gap:10 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <h2 style={{ fontSize:16, fontWeight:600, margin:0 }}>Snapshot</h2>
                <button onClick={() => setInflationAdj(!inflationAdj)} style={{
                  display:"flex", alignItems:"center", gap:6, padding:"5px 12px", borderRadius:20,
                  border:`1.5px solid ${inflationAdj?t.or:t.bd}`, background:inflationAdj?t.orB:"transparent",
                  cursor:"pointer", fontFamily:FONT, fontSize:11, fontWeight:600,
                  color:inflationAdj?t.or:t.tx3, transition:"all 0.2s",
                }}>
                  <div style={{ width:8, height:8, borderRadius:4, background:inflationAdj?t.or:t.tx3 }}/>
                  {inflationAdj ? `Today's dollars (${inp.inflation}%)` : "Inflation adjust"}
                </button>
              </div>
              <div style={{ display:"flex", gap:3, background:t.sf2, borderRadius:10, padding:3, flexWrap:"wrap" }}>
                {milestoneYears.map(yr => <Pill key={yr} active={selectedYear===yr} onClick={() => setSelectedYear(yr)}>Yr {yr}</Pill>)}
                <Pill active={selectedYear==="all"} onClick={() => setSelectedYear("all")}>All</Pill>
              </div>
            </div>
            {mode === "projection" ? (
              <motion.div key={`sf-proj-${selectedYear}`} variants={cardContainer} initial="hidden" animate="show" style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
                <Card label="Portfolio Value" tip={tips.pv} value={fmt(snap.portfolioValue)} sub={`from ${fmtF(snap.totalContrib)} contributed`} color={t.ac} bg={t.blB}/>
                <Card label="Walk-Away Value" tip={tips.wa} value={fmt(snap.walkAwayValue)} sub={`after ${inp.capGainsTaxRate}% cap gains tax`} color={t.gn} bg={t.gnB}/>
                <Card label="Net Dividend Income" tip={tips.ndi} value={fmt(snap.netDivMonthly)} sub={`${fmtF(snap.netDivAnnual)}/yr after ${inp.divTaxRate}% tax`} sub2={`${fmtF(snap.grossDivAnnual)}/yr gross`} color={t.pu} bg={t.puB}/>
                <Card label="Shares Owned" tip={tips.shares} value={fmtShares(snap.shares)} sub={`@ $${snap.sharePrice.toFixed(2)}/share`} sub2={`Started with ${fmtShares(data[0].shares)} shares`} color={t.ac} bg={t.blB}/>
                {/* Total Cost Card */}
                <motion.div variants={cardItem} style={{ flex:"1 1 180px", minWidth:160, background:t.rdB, borderRadius:14, padding:"16px 20px", border:`1px solid ${t.bd2}`, boxShadow:t.sh }}>
                  <div style={{ fontSize:10, fontWeight:700, color:t.tx2, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:6 }}>Total Cost<InfoTip text={tips.cost}/></div>
                  <div style={{ fontSize:24, fontWeight:700, color:t.rd, letterSpacing:"-0.02em", lineHeight:1.1 }}>{fmt(snap.totalTaxPaid + snap.totalFees + (snap.portfolioValue - snap.walkAwayValue))}</div>
                  <div style={{ marginTop:8, display:"flex", flexDirection:"column", gap:3 }}>
                    <div style={{ fontSize:11, color:t.tx2, display:"flex", justifyContent:"space-between" }}>
                      <span>Cap gains (if sold)</span>
                      <span style={{ fontWeight:600, color:t.rd }}>{fmtF(snap.portfolioValue - snap.walkAwayValue)}</span>
                    </div>
                    <div style={{ fontSize:11, color:t.tx2, display:"flex", justifyContent:"space-between" }}>
                      <span>Dividend tax</span>
                      <span style={{ fontWeight:600, color:t.rd }}>{fmtF(snap.totalTaxPaid)}</span>
                    </div>
                    <div style={{ fontSize:11, color:t.tx2, display:"flex", justifyContent:"space-between" }}>
                      <span>Fees ({inp.expenseRatio}%)</span>
                      <span style={{ fontWeight:600, color:t.rd }}>{fmtF(snap.totalFees)}</span>
                    </div>
                  </div>
                </motion.div>
                <Card label="Yield on Cost" tip={tips.yoc} value={pct(snap.yieldOnCost)} sub={`from ${pct(inp.divYield)} starting yield`} color={t.or} bg={t.orB}/>
              </motion.div>
            ) : mode === "goal" ? (() => {
              const goalSnap = goalData.yearData.find(d => selectedYear === "all" ? d.year === inp.years : d.year === selectedYear) || goalData.yearData[goalData.yearData.length-1];
              return (
              <motion.div key={`sf-goal-${selectedYear}`} variants={cardContainer} initial="hidden" animate="show" style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
                <Card label="Portfolio Value" tip={tips.pv} value={fmt(snap.portfolioValue)} sub={`from ${fmtF(snap.totalContrib)} contributed`} color={t.ac} bg={t.blB}/>
                <Card label="Target" tip="The goal amount, adjusted for growth rate over time" value={fmt(goalSnap?.goalTarget||goalTarget)} sub={goalGrowthRate > 0 ? `growing at ${goalGrowthRate}%/yr` : "fixed target"} color={t.or} bg={t.orB}/>
                <Card label="Gap" tip="How much more your portfolio needs to reach the target" value={goalSnap?.goalGap > 0 ? fmt(goalSnap.goalGap) : "Reached!"} sub={goalSnap?.goalGap > 0 ? "remaining to target" : "Portfolio exceeds target"} color={goalSnap?.goalGap > 0 ? t.rd : t.gn} bg={goalSnap?.goalGap > 0 ? t.rdB : t.gnB}/>
                <Card label="ETA" tip="Estimated year and month when your portfolio reaches the target" value={goalData.reachedLabel || "Not reached"} sub={goalData.reachedLabel ? "Portfolio hits target" : `within ${inp.years} years`} color={goalData.reachedLabel ? t.gn : t.rd} bg={goalData.reachedLabel ? t.gnB : t.rdB}/>
                <Card label="Progress" tip="What percentage of the target your portfolio has reached" value={`${Math.min(goalSnap?.goalProgress||0, 100).toFixed(1)}%`} sub={goalSnap?.goalProgress >= 100 ? "Target exceeded" : "of target reached"} color={goalSnap?.goalProgress >= 100 ? t.gn : t.ac} bg={goalSnap?.goalProgress >= 100 ? t.gnB : t.blB}/>
                <Card label="Walk-Away Value" tip={tips.wa} value={fmt(snap.walkAwayValue)} sub={`after ${inp.capGainsTaxRate}% cap gains`} color={t.gn} bg={t.gnB}/>
              </motion.div>);
            })() : (
              <motion.div key={`sf-liveoff-${selectedYear}`} variants={cardContainer} initial="hidden" animate="show" style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
                <Card label="Portfolio Value" tip={tips.pv} value={fmt(snap.portfolioValue)} sub={`from ${fmtF(snap.totalContrib)} contributed`} color={t.ac} bg={t.blB}/>
                <Card label="Walk-Away Value" tip={tips.wa} value={fmt(snap.walkAwayValue)} sub={`after ${inp.capGainsTaxRate}% cap gains`} color={t.gn} bg={t.gnB}/>
                <Card label="Net Dividend Income" tip={tips.ndi} value={fmt(snap.netDivMonthly)} sub={`${fmtF(snap.netDivAnnual)}/yr after ${inp.divTaxRate}% tax`} color={t.pu} bg={t.puB}/>
                <Card label="Freedom" tip={tips.free} value={crossoverLabel || "Not reached"} sub={crossoverLabel ? "Dividends exceed expenses" : `within ${inp.years} years`} color={crossoverLabel?t.gn:t.rd} bg={crossoverLabel?t.gnB:t.rdB}/>
                <Card label={snap.canLiveOff ? "Status: FREE" : "Status: Building"} tip={tips.status} value={snap.canLiveOff ? "Yes" : "Not Yet"} sub={snap.canLiveOff ? (crossoverLabel ? `Free since ${crossoverLabel}` : "Dividends cover expenses") : `Need ${fmtF(snap.monthlyCost - snap.netDivMonthly)} more/mo`} color={snap.canLiveOff?t.gn:t.rd} bg={snap.canLiveOff?t.gnB:t.rdB}/>
                <Card label="Monthly Expenses" tip={tips.exp} value={fmt(snap.monthlyCost)} sub={`at ${inp.inflation}% inflation`} color={t.rd} bg={t.rdB}/>
                <Card label="Need Today" tip={tips.need} value={fmt(neededToLiveNow)} sub={`to live off ${pct(inp.divYield)} yield now`} color={t.or} bg={t.orB}/>
                <Card label="Yield on Cost" tip={tips.yoc} value={pct(snap.yieldOnCost)} sub={`from ${pct(inp.divYield)} starting yield`} color={t.or} bg={t.orB}/>
              </motion.div>
            )}
          </div>);
        })()}

        {/* Chart */}
        <div style={{ background:t.sf, borderRadius:16, padding:"22px 24px", border:`1px solid ${t.bd2}`, boxShadow:t.sh, marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:22, flexWrap:"wrap", gap:10 }}>
            <div style={{ display:"flex", gap:3, background:t.sf2, borderRadius:10, padding:3, flexWrap:"wrap" }}>
              {chartTabs.map(tab => <Pill key={tab.id} active={chartTab===tab.id} onClick={() => setChartTab(tab.id)}>{tab.l}</Pill>)}
            </div>
          </div>
          {renderChart()}
        </div>

        {/* Milestones Table */}
        <div style={{ background:t.sf, borderRadius:16, padding:"22px 24px", border:`1px solid ${t.bd2}`, boxShadow:t.sh }}>
          <h3 style={{ fontSize:16, fontWeight:600, margin:"0 0 16px 0" }}>Projection Milestones</h3>
          <div style={{ overflow:"auto", maxHeight:600 }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
              <thead>
                <tr>
                  {["Year","Contributed","Portfolio","Shares","Net Dividend","Walk-Away","YoC","Tax Paid","Fees","Price",
                    ...(mode==="liveoff"?["Mo. Expenses","Live Off?"]:[])]
                    .map(h => <th key={h} style={{ position:"sticky", top:0, zIndex:10, textAlign:"left", padding:"10px 12px", color:t.tx2, fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em", borderBottom:`2px solid ${t.bd}`, whiteSpace:"nowrap", background:t.sf, boxShadow:`0 2px 4px ${t.bd}` }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const cxFloor = crossoverMonth > 0 ? Math.floor(crossoverMonth / 12) : -1;
                  const cxCeil = crossoverMonth > 0 ? Math.ceil(crossoverMonth / 12) : -1;
                  const goalReachedFloor = mode === "goal" && goalData.reachedMonth > 0 ? Math.floor(goalData.reachedMonth / 12) : -1;
                  const goalReachedCeil = mode === "goal" && goalData.reachedMonth > 0 ? Math.ceil(goalData.reachedMonth / 12) : -1;
                  return displayData.filter(d => d.year >= 0).map(d => {
                    const isCxRow = mode === "liveoff" && (d.year === cxFloor || d.year === cxCeil) && d.year > 0;
                    const isGoalRow = mode === "goal" && (d.year === goalReachedFloor || d.year === goalReachedCeil) && d.year > 0;
                    const isHighlight = isCxRow || isGoalRow;
                    return (
                    <tr key={d.year} style={{ borderBottom:`1px solid ${t.bd2}`, background: d.year === 0 ? t.sf2 : isHighlight ? (dark?"rgba(255,149,0,0.06)":"rgba(255,149,0,0.05)") : "transparent", borderLeft: isHighlight ? `3px solid ${t.or}` : "3px solid transparent" }}>
                      <td style={{ padding:"11px 12px", fontWeight:600, color:d.year===0?t.tx3:t.ac }}>{d.year === 0 ? "Start" : d.year}</td>
                      <td style={{ padding:"11px 12px", color:t.tx2 }}>{fmtF(d.totalContrib)}</td>
                      <td style={{ padding:"11px 12px", fontWeight:600 }}>{fmtF(d.portfolioValue)}</td>
                      <td style={{ padding:"11px 12px", fontWeight:500 }}>{fmtShares(d.shares)}</td>
                      <td style={{ padding:"11px 12px" }}><div style={{ fontWeight:600, color:t.pu }}>{fmtF(d.netDivMonthly)}/mo</div><div style={{ fontSize:11, color:t.tx3 }}>{fmtF(d.netDivAnnual)}/yr</div></td>
                      <td style={{ padding:"11px 12px", color:t.gn, fontWeight:600 }}>{fmtF(d.walkAwayValue)}</td>
                      <td style={{ padding:"11px 12px", color:t.or, fontWeight:600 }}>{pct(d.yieldOnCost)}</td>
                      <td style={{ padding:"11px 12px", color:t.rd }}>{fmtF(d.totalTaxPaid)}</td>
                      <td style={{ padding:"11px 12px", color:t.rd }}>{fmtF(d.totalFees)}</td>
                      <td style={{ padding:"11px 12px", color:t.tx2 }}>${d.sharePrice.toFixed(2)}</td>
                      {mode==="liveoff" && <>
                        <td style={{ padding:"11px 12px" }}>{fmtF(d.monthlyCost)}</td>
                        <td style={{ padding:"11px 12px", fontWeight:600, color:d.canLiveOff?t.gn:t.rd }}>{d.canLiveOff?"Yes":"No"}</td>
                      </>}
                    </tr>
                  );})
                })()}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign:"center", padding:"32px 0 0", color:t.tx3, fontSize:11 }}>
          <p style={{ margin:0 }}>Projections are hypothetical. Dividends taxed at source before reinvestment. Expense ratio deducted monthly from NAV. Capital gains tax applied on unrealized gains for walk-away value. Past performance does not guarantee future results.</p>
          <p style={{ margin:"4px 0 0", letterSpacing:"0.02em" }}>DIVIDEND FORECASTER — V2.1</p>
        </div>
        </>
        )}
        </motion.div>
        )}
        </AnimatePresence>

        {/* Educational article — visible on every mode, sits below the mode-specific content */}
        {(() => {
          const sh = { fontSize:24, fontWeight:700, color:t.tx, margin:"36px 0 14px 0", letterSpacing:"-0.02em", fontFamily:FONT };
          const sh1 = { ...sh, marginTop:0 };
          const p = { fontSize:15, lineHeight:1.7, color:t.tx, margin:"0 0 14px 0", fontFamily:FONT };
          const b = { fontWeight:700, color:t.tx };
          const faqs = [
            { q:"Is this a real financial calculator or just an estimate?", a:"It's a projection tool. It does real math on the assumptions you give it, but those assumptions are yours. Markets don't grow at a steady rate, so treat the output as a model, not a promise." },
            { q:"What's the difference between Div Yield and Div Growth?", a:"Div Yield is what a fund pays right now as a percentage of its price. Div Growth is how fast that payout rises each year. Yield tells you today's income. Growth tells you tomorrow's." },
            { q:"Should I always turn DRIP on?", a:"For long-term growth, DRIP ON reinvests every dividend and compounds your returns faster. For income you need to spend now, DRIP OFF lets dividends pay out as cash. The tool lets you try both, so you can see the gap." },
            { q:"How do you handle dividend tax?", a:"If you set a Div Tax rate, the tool takes it out the moment each dividend is paid, before reinvesting. Set it to zero for a Roth IRA or other tax-free account." },
            { q:"Why doesn't my Walk-Away Value match my Portfolio Value?", a:"Walk-Away Value subtracts the capital gains tax you'd owe if you sold everything today. If your Cap Gains Tax is zero, the two numbers match. If you set a real rate, Walk-Away Value is lower." },
            { q:"What's a realistic Div Growth rate?", a:"It varies by fund. Established dividend payers often grow their payout in the mid-single digits to low double digits each year. Look up a fund's dividend growth history before assuming a number." },
            { q:"Can I use this for ETFs and REITs?", a:"Yes. Any dividend-paying investment works. Enter the Div Yield, Div Growth, and Price Appreciation that fit the fund you're modeling." },
            { q:"Does this account for inflation?", a:"The core projection shows nominal dollars. Use the Inflation Rate field under Advanced Options, then toggle \"Today's dollars\" above the Snapshot, to see the value in today's purchasing power." },
            { q:"Why does the income look so small in the early years?", a:"Dividends start small and compound. The early years are slow on purpose. The growth shows up in the later years, which is why running a longer timeline reveals the real story." },
            { q:"What is Freedom Date?", a:"In Live Off Dividends mode, Freedom Date is the year and month when your projected dividend income passes your monthly expenses. That's the moment your portfolio is paying for your life instead of you paying into it." },
          ];
          return (
            <section style={{ maxWidth:880, margin:"40px auto 0", padding:"40px 4px 0", borderTop:`1px solid ${t.bd2}` }}>
              <h2 style={sh1}>How to Use the Dividend Forecaster</h2>
              <p style={p}>Every input changes the projection. Here's what each one does.</p>
              <p style={p}><strong style={b}>Lump Sum</strong> is your starting amount. It's the money you're putting in today, before any contributions. Leave it at zero if you're starting from scratch and adding over time.</p>
              <p style={p}><strong style={b}>Contribution</strong> is what you add on a schedule, and <strong style={b}>Frequency</strong> is how often. Most people set Frequency to Monthly, but Daily, Weekly, Bi-Weekly, Quarterly, and Yearly all work. This is often the input that does the heavy lifting over long timelines.</p>
              <p style={p}><strong style={b}>Years</strong> is how long you stay invested. The default is thirty. Compounding rewards time more than almost anything else, so this number matters more than it looks.</p>
              <p style={p}><strong style={b}>Div Yield</strong> is the percentage a fund pays back to you each year. A 3.5% yield on $100 of shares is $3.50 a year. You can find this on any fund's page under its dividend or distribution data.</p>
              <p style={p}><strong style={b}>Div Growth</strong> is how fast that payout rises each year. A company raising its dividend 7% a year means a bigger payout per share next year, then bigger again the year after. This is the input people forget, and it's the one that compounds.</p>
              <p style={p}><strong style={b}>Price Appreciation</strong> is how much the share price itself grows each year. This is separate from dividends. It's the part of your return that comes from the stock going up.</p>
              <p style={p}><strong style={b}>DRIP ON / DRIP OFF</strong> controls dividend reinvestment. With it on, every dividend buys more shares automatically. With it off, dividends pay out as cash and your share count stays flat.</p>
              <p style={p}><strong style={b}>Div Payout Freq</strong> sets how often dividends are paid: Monthly, Quarterly, Semi-Annually, or Annually. Most US dividend funds pay quarterly.</p>
              <p style={p}>Under <strong style={b}>Advanced Options</strong>, you can set <strong style={b}>Expense Ratio</strong>, <strong style={b}>Div Tax</strong>, <strong style={b}>Cap Gains Tax</strong>, <strong style={b}>Inflation Rate</strong>, and a <strong style={b}>Share Split</strong> schedule. Set Div Tax and Cap Gains Tax to zero for a tax-free account like a Roth IRA. Set real rates if you want to see the after-tax picture in a taxable account.</p>
              <p style={p}>You don't have to fill in everything. The tool works with the basics and treats the rest as zero.</p>

              <h2 style={sh}>How Your Projection Is Calculated</h2>
              <p style={p}>Most calculators hide their math. This one doesn't, so here's exactly what happens under the hood.</p>
              <p style={p}>The tool runs your money forward one month at a time. Each month, it pays the dividend you've earned, applies any growth, and rolls the result into the next month.</p>
              <p style={p}><strong style={b}>Div Growth raises the payout, not the yield.</strong> Once a year, your dividend-per-share steps up by your growth rate. If a fund pays $3 a share and grows 7%, next year it pays $3.21 a share. The year after, $3.43. The yield you see drifts on its own as the share price moves, but the dollar payout per share is what actually grows. That's how real companies raise dividends, so that's how the tool models it.</p>
              <p style={p}><strong style={b}>DRIP buys shares at the current price.</strong> When reinvestment is on, each dividend buys more shares at whatever the share price is that month. Those new shares earn their own dividends next month. That's the compounding engine. More shares paying more dividends buying more shares.</p>
              <p style={p}><strong style={b}>Taxes come out before reinvestment.</strong> If you set a Div Tax rate, the tool takes that tax out the moment each dividend is paid. Only the after-tax amount gets reinvested. So a tax drag slows your compounding in real time, not just at the end.</p>
              <p style={p}><strong style={b}>Expense Ratio comes off the top.</strong> If you set one, the tool deducts it monthly from your portfolio value, the same way a real fund quietly deducts its expense ratio from NAV. Small numbers add up over thirty years.</p>
              <p style={p}><strong style={b}>Walk-Away Value is the hypothetical after-tax number.</strong> Your Portfolio Value is the full value of your shares. Walk-Away Value answers a different question: what would you keep if you sold everything today and paid capital gains tax? The tool figures your gain (your Portfolio Value minus what you put in), taxes only that gain, and subtracts it. This number is just a what-if. The tax never actually comes out of your projection, because you only owe capital gains tax when you sell.</p>
              <p style={p}>That's the whole model. No hidden assumptions beyond the ones you set.</p>

              <h2 style={sh}>A Worked Example</h2>
              <p style={p}>Say you start with a Lump Sum of $10,000 and a Contribution of $500 a month. You set Div Yield at 3.5%, Div Growth at 7%, and Price Appreciation at 6%. DRIP is on. Div Tax and Cap Gains Tax are zero, like a Roth IRA. You run it for thirty years.</p>
              <p style={p}>In year one, your dividends are modest. The Portfolio Value is still small, so a 3.5% yield doesn't pay much yet. Your Net Dividend Income card shows a small monthly number. Not life-changing.</p>
              <p style={p}>But watch what Div Growth does over time. The payout per share keeps stepping up each year. Your share count keeps climbing too, because DRIP buys more shares with every dividend and your monthly contributions add even more. Both numbers grow together for three decades straight.</p>
              <p style={p}>By year thirty, the Portfolio Value is many times what you put in. Most of that final number isn't your contributions. It's the market and the compounding doing the work across thirty years. Your job was to keep showing up.</p>
              <p style={p}>Look at the Yield on Cost card to see this from a different angle. Yield on Cost measures your current dividend income against what you originally paid, not today's price. With these inputs, a starting yield of 3.5% is projected to climb to roughly 31% by year thirty. That means your dividend income that year is projected to equal nearly a third of every dollar you ever put in, paid back to you annually. That's the reward for thirty years of Div Growth compounding on top of itself.</p>
              <p style={p}>That's the point of running thirty years instead of five. The early years look slow. The late years don't.</p>

              <h2 style={sh}>Understanding Your Results</h2>
              <p style={p}>The Snapshot section shows six cards. Here's what each one is telling you.</p>
              <p style={p}><strong style={b}>Portfolio Value</strong> is the full projected value of your shares. This is the headline number, but it's not what lands in your pocket each month.</p>
              <p style={p}><strong style={b}>Walk-Away Value</strong> is what you'd keep after capital gains tax if you sold today. If your Cap Gains Tax is zero, this matches your Portfolio Value, because there's no tax to pay.</p>
              <p style={p}><strong style={b}>Net Dividend Income</strong> is what your shares are projected to pay in dividends, after Div Tax. The card shows a monthly figure with the annual amount underneath. This is the number that matters if your goal is income you can live on.</p>
              <p style={p}><strong style={b}>Shares Owned</strong> is your share count. It climbs over time through DRIP and contributions. More shares means more dividends next year.</p>
              <p style={p}><strong style={b}>Total Cost</strong> adds up everything the projection cost you: capital gains tax if you sold, dividend tax paid along the way, and fund fees. It's shown in red because it's the drag on your returns.</p>
              <p style={p}><strong style={b}>Yield on Cost</strong> is your current annual dividend income measured against what you originally paid, not today's price. It climbs over time as Div Growth raises the payout. A fund yielding 3.5% today could be yielding 30% or higher on your original cost decades later, depending on Div Growth. That's the reward for holding through the growth.</p>
              <p style={p}>Read the year-by-year table above this section, not just the final number. The columns show Year, Contributed, Portfolio, Shares, Net Dividend, Walk-Away, YoC, Tax Paid, Fees, and Price. The shape of the climb tells you more than the endpoint. You'll see exactly when the compounding starts to outrun your contributions.</p>
              <p style={p}>If you switch to Live Off Dividends mode, you'll also see a <strong style={b}>Freedom Date</strong>: the year and month when your projected dividend income covers your monthly expenses. That's the moment your portfolio is paying for your life.</p>

              <h2 style={sh}>Frequently Asked Questions</h2>
              {faqs.map((f, i) => (
                <div key={i} style={{ marginBottom:20 }}>
                  <p style={{ ...p, fontWeight:700, margin:"0 0 6px 0" }}>{f.q}</p>
                  <p style={{ ...p, margin:0 }}>{f.a}</p>
                </div>
              ))}
            </section>
          );
        })()}

        {/* Ad Slot — Bottom Banner */}
        {ADS_ENABLED && (
          <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px" }}>
            <div style={{ background:t.sf2, borderRadius:10, padding:"10px 0", textAlign:"center", fontSize:11, color:t.tx3, border:`1px dashed ${t.bd}`, marginBottom:20 }}>Ad Space — Bottom Banner (728×90)</div>
          </div>
        )}
      </div>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${t.bd}`, background:t.sf, padding:"40px 24px", marginTop:0 }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div style={{ display:"flex", flexWrap:"wrap", gap:40, marginBottom:32 }}>
            <div style={{ flex:"1 1 280px", minWidth:200 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                <div style={{ width:24, height:24, borderRadius:7, background:`linear-gradient(135deg, ${t.ac}, ${t.pu})`, display:"flex", alignItems:"center", justifyContent:"center", color:"#FFF", fontWeight:700, fontSize:10 }}>DF</div>
                <span style={{ fontSize:14, fontWeight:600 }}>Dividend Forecaster</span>
              </div>
              <p style={{ fontSize:12, lineHeight:1.6, color:t.tx3, margin:0 }}>Free dividend projection calculator with DRIP modeling, portfolio builder, fund comparison, tax and fee tracking, and Live Off Dividends planning. Built for long-term investors.</p>
            </div>
            <div style={{ flex:"0 0 auto" }}>
              <div style={{ fontSize:11, fontWeight:700, color:t.tx2, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:10 }}>Tools</div>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {[{l:"Projection Calculator",m:"projection"},{l:"Live Off Dividends",m:"liveoff"},{l:"Goal Tracker",m:"goal"},{l:"Compare Funds",m:"compare"},{l:"CAGR Calculator",m:"cagr"}].map(item => (
                  <a key={item.m} href="/" onClick={e => { e.preventDefault(); navigate("calculator"); setMode(item.m); }} style={{ color:t.tx3, fontSize:12, cursor:"pointer", fontFamily:FONT, textAlign:"left", textDecoration:"none" }}>{item.l}</a>
                ))}
              </div>
            </div>
            <div style={{ flex:"0 0 auto" }}>
              <div style={{ fontSize:11, fontWeight:700, color:t.tx2, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:10 }}>Resources</div>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <a href="/methodology/" onClick={e => { e.preventDefault(); navigate("methodology"); }} style={{ color:t.tx3, fontSize:12, cursor:"pointer", fontFamily:FONT, textAlign:"left", textDecoration:"none" }}>How It Works</a>
                <a href="/learn/" onClick={e => { e.preventDefault(); navigate("learn"); }} style={{ color:t.tx3, fontSize:12, cursor:"pointer", fontFamily:FONT, textAlign:"left", textDecoration:"none" }}>Learn Dividend Investing</a>
                <a href="/about/" onClick={e => { e.preventDefault(); navigate("about"); }} style={{ color:t.tx3, fontSize:12, cursor:"pointer", fontFamily:FONT, textAlign:"left", textDecoration:"none" }}>About</a>
                <a href="/contact/" onClick={e => { e.preventDefault(); navigate("contact"); }} style={{ color:t.tx3, fontSize:12, cursor:"pointer", fontFamily:FONT, textAlign:"left", textDecoration:"none" }}>Contact</a>
                <a href="/privacy/" onClick={e => { e.preventDefault(); navigate("privacy"); }} style={{ color:t.tx3, fontSize:12, cursor:"pointer", fontFamily:FONT, textAlign:"left", textDecoration:"none" }}>Privacy Policy</a>
              </div>
            </div>
          </div>
          <div style={{ borderTop:`1px solid ${t.bd2}`, paddingTop:20 }}>
            <p style={{ fontSize:11, lineHeight:1.6, color:t.tx3, margin:"0 0 8px 0" }}>
              <strong>Disclaimer:</strong> Dividend Forecaster is for educational and informational purposes only. It is not financial advice. All projections are hypothetical and assume constant rates. Actual results will vary. Dividend payments are not guaranteed. Past performance does not guarantee future results. Consult a qualified financial advisor before making investment decisions.
            </p>
            <div style={{ display:"flex", justifyContent:"flex-start", alignItems:"center", flexWrap:"wrap", gap:8 }}>
              <p style={{ fontSize:11, color:t.tx3, margin:0 }}>© {new Date().getFullYear()} Dividend Forecaster. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
