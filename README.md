# FalkTG — Institutional Transformation

Public site of **Falk Thore Gebhardt (FalkTG)**.

Positioning: institutional transformation on two desks.

- **FinT** — Financial Institution Transformation (yellow–gold)
- **PinT** — Public Institution Transformation (magenta–red)

Visual language: blue-black background, magenta–red and gold highlights, Frankfurt skyline with the Main.

**AI / contributor rules:** see [`llms.txt`](llms.txt).

## Pages

| File | Role |
| --- | --- |
| `index.html` | Centered hero, fact sheet, falcon + portrait, two desks (horizontal), CV flight path |
| `fint.html` | Scroll scene *FinReg Assessment & Transformation*, pricing CTAs |
| `pint.html` | Administration (€990/h) vs. politician (€290/h), CTAs |
| `contact.html` | Desk and institution selectors (horizontal rows), name / email / message |
| `impressum.html` | German legal notice |
| `datenschutz.html` | GDPR notice |

## Homepage layout (top → bottom)

1. Hero — headline, tagline, lead (centered)
2. Fact sheet — three proof points
3. Large falcon + portrait frame (directly under facts)
4. CTAs — Financial Institutions · Public Institutions
5. Two desks — FinT (gold) · PinT (magenta), side by side
6. CV flight path — summit (falcon + portrait) at top; Born with egg hatch at bottom; growing falcon icon per station

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
- `portrait` — hero / CV summit (`assets/hero.jpg`)
- `falcon` — CV flight-path bird (`assets/falcon.jpg`), scaled larger each station

The canvas (`js/main.js`) draws a Frankfurt skyline (Messeturm, Main Tower, Commerzbank, Deutsche Bank, Dom, ECB, Main, bridges) and animates a falcon across the sky.

## Design tokens (`css/styles.css`)

| Token | Use |
| --- | --- |
| `--bg` `#050a18` | Blue-black background |
| `--mag` / `--mag-2` | Magenta–red (PinT) |
| `--gold` / `--gold-2` | Yellow–gold (FinT) |

## Local preview

```bash
npx serve .
```

Open `http://localhost:3000` (or the port shown).

## GitHub Pages

Pages is not enabled on this repository yet. When you switch it on, set the source to the `main` branch root.

## Still needed from the owner

- Ladungsfähige Anschrift for a complete Impressum
- Confirmation of FinTech pricing (monthly retainer vs one-off)
