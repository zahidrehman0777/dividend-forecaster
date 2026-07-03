// Static site generation step. Runs after `vite build` and `vite build --ssr`.
// For each route, renders the React tree to an HTML string, splices it into the
// built index.html template, rewrites <title>, <meta description>, canonical
// and og:url to be unique per route, then writes dist/<route>/index.html.
//
// IMPORTANT: this is purely the crawler-visible HTML. The client still does a
// fresh createRoot.render() over the top, so live behavior is identical to a
// vanilla SPA build.

import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const abs = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(abs('dist/index.html'), 'utf-8')
const { render } = await import('./dist-server/entry-server.js')

const SITE = 'https://thedividendforecaster.com'

const HOMEPAGE_TITLE = 'Dividend Forecaster — Free DRIP Calculator & Dividend Income Projector'
const HOMEPAGE_DESCRIPTION = 'Free dividend calculator with DRIP projections, portfolio builder, fund comparison, yield on cost tracking, and Live Off Dividends planning. Project 30 years of dividend income with tax, expense ratio, and inflation modeling. No signup required.'

const routes = {
  '/':            { title: HOMEPAGE_TITLE, description: HOMEPAGE_DESCRIPTION },
  '/learn':       { title: 'Dividend Investing Guide — Dividend Forecaster', description: 'Six in-depth dividend investing guides plus a plain-language glossary: dividends, yield, DRIP, compounding, taxes, expense ratios, and every number the free calculator shows.' },
  '/about':       { title: 'About — Dividend Forecaster', description: 'About Dividend Forecaster: a free dividend calculator built to show the real numbers — taxes, fees, walk-away value, and the year-by-year path to financial freedom. No accounts, no paywalls.' },
  '/methodology': { title: 'Methodology — How the Calculator Works', description: 'How the Dividend Forecaster math works: the monthly projection engine, how dividend growth is applied, how DRIP reinvests after tax, how the expense ratio drag is modeled, and how Walk-Away Value is computed.' },
  '/contact':     { title: 'Contact — Dividend Forecaster', description: 'How to reach Dividend Forecaster: general questions, bug reports, feedback, partnership and press inquiries. We do not provide personalized financial advice.' },
  '/privacy':     { title: 'Privacy Policy — Dividend Forecaster', description: 'Dividend Forecaster privacy policy: no personal data collected, no accounts, no server storage. Third-party cookies via Google AdSense for ad personalization; opt-out instructions included.' },
  '/learn/how-to-invest-in-etfs-for-beginners': { title: 'How to Invest in ETFs for Beginners — Dividend Forecaster', description: 'A plain-language guide to investing your first $5,000 in ETFs: what an ETF actually is, three filters for choosing funds, how to buy, what to do after you buy — and a 30-year worked projection you can rerun with your own assumptions in the free calculator.' },
  '/learn/what-drip-does-to-your-returns': { title: 'What DRIP Actually Does to Your Returns — Dividend Forecaster', description: 'What a DRIP (dividend reinvestment plan) actually changes: the same investment modeled with reinvestment on and off over 30 years, why the gap compounds, and when taking the cash is the smarter move.' },
  '/learn/what-is-a-dividend': { title: 'What Is a Dividend? How Dividends Work — Dividend Forecaster', description: 'A plain-language explainer: where dividends come from, the four dates that decide whether you get paid, why the share price drops on the ex-dividend date, and what to do with the cash.' },
  '/learn/dividend-yield-vs-dividend-growth': { title: 'Dividend Yield vs. Dividend Growth: Which Matters More? — Dividend Forecaster', description: 'High yield pays more now; fast dividend growth can overtake it decades later. A 30-year side-by-side showing when the crossover happens and which profile fits which investor.' },
  '/learn/fidelity-vs-schwab-index-funds': { title: 'Fidelity vs. Schwab Index Funds: Which Is Actually Better? — Dividend Forecaster', description: 'Fidelity and Schwab index funds tracking the same index are near-twins. What actually separates them: expense ratios, the Fidelity ZERO transfer catch, and which brokerage you already use — with a 30-year fee-gap demonstration.' },
  '/learn/how-dividends-are-taxed': { title: 'How Dividends Are Taxed (and What DRIP Does to the Bill) — Dividend Forecaster', description: 'How dividend taxes actually work: why the account type matters most, qualified vs. ordinary dividends, the 0% bracket many investors miss, the DRIP tax surprise, and how to model your own rates in the calculator.' },
  '/learn/how-much-to-live-off-dividends': { title: 'How Much Do You Need to Live Off Dividends? — Dividend Forecaster', description: 'The real math of living off dividends: the portfolio size your expenses require at different yields, a 30-year build-toward projection with a freedom date, and why inflation moves the target.' },
  '/learn/dividend-yield-traps': { title: 'Is a High Dividend Yield Good? Yield Traps Explained — Dividend Forecaster', description: 'A 12% yield looks like triple the income of a 4% one — until the dividend and the price are both falling. How yield traps work, a 15-year side-by-side, and the checks that catch them.' },
  '/learn/dividend-aristocrats-and-kings': { title: 'Dividend Aristocrats and Kings, Explained — Dividend Forecaster', description: 'Dividend Aristocrats have raised payouts 25+ straight years; Kings, 50+. What the streaks actually prove, what they don\'t, and how the lists held up in 2008.' },
  '/learn/how-much-to-invest-for-500-a-month': { title: 'How Much Do You Need to Invest for $500 a Month in Dividends? — Dividend Forecaster', description: '$500 a month in dividends takes about $171,000 at a 3.5% yield — or a $500 monthly contribution and thirteen years. Both paths, with the tables, and why builders cross the line early.' },
  '/learn/how-to-tell-if-a-dividend-is-safe': { title: 'How to Tell If a Dividend Is Safe — Dividend Forecaster', description: 'Five checks that catch most dividend cuts before they happen: payout ratio bands, the price-versus-payout warning, growth history, sector context, and what a 25-year streak does and doesn\'t prove.' },
  '/learn/monthly-vs-quarterly-dividends': { title: 'Monthly vs. Quarterly Dividends: Does Payout Frequency Matter? — Dividend Forecaster', description: 'Monthly payers compound slightly faster than quarterly — worth 0.47% over 30 years in a like-for-like test. What frequency actually changes, and the hidden cost of choosing funds by payday.' },
  '/learn/what-a-market-crash-does-to-dividends': { title: 'What a Market Crash Actually Does to Dividend Income — Dividend Forecaster', description: 'In 2008 the S&P 500 fell about 55% while its dividends fell 24% — the worst income hit since 1948. What crashes historically do to dividend income, why the screen lies, and where the real risks hide.' },
  '/learn/lump-sum-vs-monthly-investing': { title: 'Lump Sum vs. Monthly Investing: Which Builds More? — Dividend Forecaster', description: 'Investing $12,000 today beats spreading it over a year by about 4.5% in a steady-growth model — and the model is rigged in lump sum\'s favor. The honest math, the crash case, and why waiting in cash loses to both.' },
}

let count = 0
for (const [route, meta] of Object.entries(routes)) {
  const appHtml = render(route)
  // Cloudflare Pages serves subdir routes with a trailing slash (it 308-redirects
  // /foo -> /foo/). Canonical must point at the terminal URL, not the redirect.
  const canonical = SITE + (route === '/' ? '/' : `${route}/`)
  let html = template.replace('<!--app-html-->', appHtml)
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${meta.title}</title>`)
  html = html.replace(/(<meta name="title" content=")[\s\S]*?(" \/>)/, `$1${meta.title}$2`)
  html = html.replace(/(<meta name="description" content=")[\s\S]*?(" \/>)/, `$1${meta.description}$2`)
  html = html.replace(/(<link rel="canonical" href=")[\s\S]*?(" \/>)/, `$1${canonical}$2`)
  html = html.replace(/(<meta property="og:url" content=")[\s\S]*?(" \/>)/, `$1${canonical}$2`)
  html = html.replace(/(<meta property="og:title" content=")[\s\S]*?(" \/>)/, `$1${meta.title}$2`)
  html = html.replace(/(<meta property="og:description" content=")[\s\S]*?(" \/>)/, `$1${meta.description}$2`)
  html = html.replace(/(<meta property="twitter:url" content=")[\s\S]*?(" \/>)/, `$1${canonical}$2`)
  html = html.replace(/(<meta property="twitter:title" content=")[\s\S]*?(" \/>)/, `$1${meta.title}$2`)
  html = html.replace(/(<meta property="twitter:description" content=")[\s\S]*?(" \/>)/, `$1${meta.description}$2`)
  const outPath = route === '/' ? 'dist/index.html' : `dist${route}/index.html`
  fs.mkdirSync(path.dirname(abs(outPath)), { recursive: true })
  fs.writeFileSync(abs(outPath), html)
  console.log('pre-rendered', outPath)
  count++
}
console.log(`\n✓ wrote ${count} pre-rendered HTML files`)
