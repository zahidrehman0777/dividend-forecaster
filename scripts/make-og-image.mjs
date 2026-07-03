// One-shot generator for public/og-image.png. Run manually with `node scripts/make-og-image.mjs`
// — this does NOT run in the build pipeline; the resulting PNG is checked in.
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const outPath = path.resolve(__dirname, '../public/og-image.png')

const W = 1200, H = 630
const BG = '#1D1D1F'
const FG = '#FFFFFF'
const MUTED = '#AEAEB2'
const ACCENT = '#0071E3'
const FONT = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Segoe UI, Roboto, sans-serif"

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect x="80" y="180" width="60" height="6" rx="3" fill="${ACCENT}"/>
  <text x="80" y="300" font-family="${FONT}" font-size="86" font-weight="700" fill="${FG}" letter-spacing="-2">Dividend Forecaster</text>
  <text x="80" y="380" font-family="${FONT}" font-size="34" font-weight="500" fill="${MUTED}">Free dividend &amp; DRIP projection calculator</text>
  <text x="80" y="540" font-family="${FONT}" font-size="22" font-weight="500" fill="${MUTED}" opacity="0.7">thedividendforecaster.com</text>
</svg>`

await sharp(Buffer.from(svg)).png().toFile(outPath)
const stat = fs.statSync(outPath)
console.log(`wrote ${outPath} (${(stat.size / 1024).toFixed(1)} KB)`)
