# FalkTG — Institutional Transformation

Public site of **Falk Thore Gebhardt (FalkTG)**.

Positioning: institutional transformation on two desks.

- **FinT** — Financial Institution Transformation (magenta)
- **PinT** — Public Institution Transformation (gold)

The visual language mixes FDP gold, German-flag black-to-navy and red-to-magenta, and a Frankfurt riverfront with the Main.

## Pages

| File | Role |
| --- | --- |
| `index.html` | Hero with portrait over Frankfurt / Main, proof points, falcon flight-path CV, two desks |
| `fint.html` | Scroll scene *FinReg Assessment & Transformation*, then pricing CTAs |
| `pint.html` | Split: administration (polis) vs politician (person), hourly fee, CTAs |
| `contact.html` | Card selector for desk and institution, then name / email / message |
| `impressum.html` | German legal notice |
| `datenschutz.html` | GDPR notice |

## How the inquiry flow works

Pricing cards on FinT and the two PinT columns link to `contact.html` with query parameters.

Examples:

- `contact.html?desk=fint&kind=bank`
- `contact.html?desk=fint&kind=ifpf`
- `contact.html?desk=fint&kind=fintech`
- `contact.html?desk=pint&kind=admin`
- `contact.html?desk=pint&kind=politician`

The contact page reads those values and pre-selects the matching cards. Submit opens the visitor’s mail client to `consulting@falk-gebhardt.de`. No backend stores the form.

## Visual assets

Images are embedded in `js/media.js` as data URIs so GitHub Pages works without a separate binary commit.

- `hero` — portrait of Falk Thore Gebhardt, falcon, Frankfurt skyline, river Main
- `portrait` — source headshot
- `mark` — falcon mark used in the nav

The canvas (`js/main.js`) draws a second Frankfurt bank-and-Main layer behind inner pages and animates a falcon across the sky plus gold/magenta wind streaks.

To replace the hero later: compress a new JPEG and regenerate `js/media.js`, or drop files into `assets/` and point CSS at them.

## Local preview

```bash
npx serve .
```

Open `http://localhost:3000`.

## GitHub Pages

Pages is not enabled on this repository yet. When you switch it on, set the source to the `main` branch root.

## Still needed from the owner

- Ladungsfähige Anschrift for a complete Impressum
- Confirmation of FinTech pricing (monthly retainer vs one-off)
- Optional: live photo session on the Main if the composite should be replaced by a single location shoot
