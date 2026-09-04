# FalkTG — Institutional Transformation

Public site of **Falk Thore Gebhardt (FalkTG)**.

Positioning: institutional transformation on two desks.

- **FinT** — Financial Institution Transformation (yellow–gold)
- **PinT** — Public Institution Transformation (magenta–red)

Visual language: black–gray background with a quiet grid, magenta–red and gold highlights, Frankfurt skyline with the Main. Treatment is institutional: solid fills, tight type, little glow. CV falcons are angular symbolic SVG marks, not round drawings.

**AI / contributor rules:** start at [`AGENTS.md`](AGENTS.md); full rules in [`llms.txt`](llms.txt). After every update to those two files, commit and push on a feature-branch PR.

## Pages

| File | Role |
| --- | --- |
| `index.html` | Centered hero (EN intro + DE supplement), fact sheet, falcon + portrait, two desks, CV flight path |
| `fint.html` | Scroll scene: topics enter the assessment; results drop downward (risk map, compliance, process optimisation). Scope text from STRATEGY Anmerkungen, then existing house prices |
| `pint.html` | Administration (€490/h, process optimisation only) vs. politician (€290/h, strategy and communications counsel — a PinT rate, not a third desk) |
| `contact.html` | Desk and institution selectors (horizontal rows), name / email / message |
| `impressum.html` | German legal notice |
| `datenschutz.html` | GDPR notice |

## Homepage layout (top → bottom)

1. Hero — headline, English intro, optional German supplement, facts (centered)
2. Fact sheet — three proof points
3. Large falcon + portrait frame (directly under facts)
4. CTAs — Financial Institutions · Public Institutions
5. Two desks — FinT (gold) · PinT (magenta), side by side
6. CV flight path — Born with a static abstract egg mark at the bottom; angular life-stage falcon marks; no hatch animation; no separate About page

## Inquiry flow

Pricing cards on FinT and PinT columns link to `contact.html` with query parameters.

Examples:

- `contact.html?desk=fint&kind=bank`
- `contact.html?desk=fint&kind=ifpf`
- `contact.html?desk=fint&kind=fintech`
- `contact.html?desk=pint&kind=admin`
- `contact.html?desk=pint&kind=politician`

The contact page pre-selects matching cards. Submit opens the visitor’s mail client to `consulting@falk-gebhardt.de`. No backend stores the form.

## Assets

Configured in `js/media.js`:

- `mark` — nav falcon (`assets/falcon.jpg`)
- `portrait` — hero only (`assets/hero.jpg`)
- `skyline` — Frankfurt illustration (`assets/frankfurt-skyline.png`) drawn on `#skyline-canvas`

CV flight-path birds are inline angular SVG life stages (chick → perched adult → flight), not a scaled copy of `falcon.jpg`. Owner photos are not replaced without new source files from Falk. No new image files.

## Fonts

Inter is self-hosted as latin woff2 in `fonts/` (weights 400, 600, 700 — the weights `css/styles.css` actually sets). Pages load it only via local `@font-face`. There is no Google Fonts request.

## Design tokens (`css/styles.css`)

| Token | Use |
| --- | --- |
| `--bg` `#0b0b0b` | Black / gray background |
| `--bg-card` | Dark gray panels |
| `--mag` / `--mag-2` | Magenta–red (PinT) |
| `--gold` / `--gold-2` | Yellow–gold (FinT) |
| `--radius` `.3rem` | Tight corners; buttons use solid gold / magenta, not gradients |

## Local preview

```bash
npx serve .
```

Open `http://localhost:3000` (or the port shown).

## GitHub Pages

Pages is not enabled on this repository yet. When you switch it on, set the source to the `main` branch root.

## Still needed / gaps

**Owner decisions**
- Ladungsfähige Anschrift for a complete Impressum (and Datenschutz controller address)
- Confirmation of FinTech pricing (monthly retainer vs one-off; card already shows €900/month)

**Site / ops**
- Enable GitHub Pages (`main` branch root) — not live yet
- `assets/favicon.svg` is present (simple gold mark on black)
- `$$` logo: `assets/logo-falcon.svg` is still a stylized gold SVG, not a realistic falcon (nav already uses `falcon.jpg`)
- SEO: no `meta description` / Open Graph tags yet
- Home CV enrichment: official Bundesbank title, university, state-exam year, FDP council years (owner)
