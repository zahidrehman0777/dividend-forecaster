# The Dividend Forecaster

A free, no-signup dividend projection tool that models compound growth with DRIP, tax drag, inflation, and share splits over up to 100 years.

Live at: https://thedividendforecaster.com

## Features

- **Projection** — Model a single holding or build a multi-fund portfolio with custom allocations.
- **Live Off Dividends** — Find your Freedom Date: the year and month your dividend income crosses above inflation-adjusted expenses.
- **Goal Tracker** — Set a target amount with an optional growth rate and track progress toward it.
- **CAGR Calculator** — Four modes: price return, dividend growth, total return, and goal-based (what rate do you need?).
- **Compare** — Head-to-head fund comparison with a line chart and an animated bar race.
- **Shareable Links** — Every scenario generates a copyable URL with all inputs encoded as query parameters.

## Tech Stack

- React + Vite
- Recharts (data visualization)
- Framer Motion (animations)
- Tailwind CSS v4
- Cloudflare Pages (hosting)

## Local Development

```bash
npm install
npm run dev
```

Opens at http://localhost:5173.

## Build

```bash
npm run build
```

Output goes to `dist/`. Cloudflare Pages auto-deploys on push to `main`.

## License

Personal project. Not open for contributions.
