# BlickStone Private Limited — website

Static marketing site for BlickStone Private Limited, a Zimbabwean multi-divisional
company operating out of Bulawayo. Registered 18 February 2019, Reg. No. 379/2019.

No build step. Open `index.html`, or serve the folder:

```sh
python -m http.server 8000
```

## Pages

| Page | What it covers |
| --- | --- |
| `index.html` | Company overview, the three divisions, on-site gallery, credentials, process, coverage, contact |
| `construction.html` | Construction Division — 11 services across three tabs, project brief builder |
| `marketing.html` | Marketing Division — 5 services, approach, who it serves |
| `sentinel.html` | Sentinel Group — 5 services, construction-site cover, approach |
| `pricing.html` | How work is priced, deposit tiers, deposit calculator, fees, FAQ |

## Scripts

All plain browser JS in `assets/js/`, no bundler.

| File | Role |
| --- | --- |
| `blickstone.js` | Single source of truth for contact details, registration and PRAZ data |
| `inquiry-utils.js` | Builds structured WhatsApp enquiries (service, site visit, division) |
| `project-brief.js` | Project brief builder on the construction page — select services, send one brief |
| `deposit-calculator.js` | Applies published deposit percentages to a client-supplied project value |
| `coverage-checker.js` | Service coverage by region |
| `hero-typewriter.js` | Homepage headline animation (respects `prefers-reduced-motion`) |
| `main.js` | Icon init, mobile nav, hero video handling |

Styling is Tailwind via CDN, configured in `assets/js/tailwind-config.js`. The
`blick` palette is taken from the corporate identity: navy `#0B2F6B`, red
`#E21B23`, blue `#0072CE`.

## Editing content

Contact details live in **one** place — `assets/js/blickstone.js` for anything used
in generated enquiries. Details shown on the page itself are in the contact card in
`index.html` and the page footers; change both together.

## Known gaps

Things deliberately left out rather than guessed at:

- **No site-visit turnaround times.** `coverage-checker.js` states coverage but no
  numbers, because any figure there is a commitment to a client. Add real windows
  when they are known.
- **No site visit or admin fee amounts.** `pricing.html` explains both fees and how
  they work, but the figures come from BlickStone on enquiry.
- **No project size thresholds.** The deposit calculator asks the visitor to pick a
  band; what separates small/medium/large is confirmed at BOQ stage.
- **No completed-project photography.** Every photo is work in progress.
- **Marketing and Sentinel have no photography** and no named client work, so both
  pages are icon-led.
- **The hero video is stock footage** and is ~5 MB, unoptimised. Re-encode with
  ffmpeg and add a WebM source before this gets heavy traffic.
- **Security wording is deliberately conservative** on `sentinel.html` — "support"
  and "assistance", matching the company profile. Do not upgrade it to licensing or
  armed-response claims without the registration to back it.

The PRAZ certificate verification code is intentionally **not** published; the site
says procuring entities are given it with each tender submission.
