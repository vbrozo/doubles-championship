# Doubles Championship

Scoring app za disc golf prvenstvo u parovima (doubles), teren Toplice Sveti Martin.

PWA (Progressive Web App) — instalira se na home screen telefona, radi i offline. Rezultati se spremaju lokalno u pregledniku.

## Funkcionalnosti

- **Scoring** — unos rezultata po rupi za svaki par, navigacija kroz 18 rupa.
- **Tee shot** — ručni odabir/zapis tko je od para bacio tee shot na svakoj rupi (Alternate Shot format).
- **Ljestvica** — live rang lista parova prema rezultatu u odnosu na par terena.
- **Parovi** — dodavanje, uređivanje i brisanje parova (igrača po dvoje).
- **Teren** — uređivanje para po rupi za teren Toplice Sveti Martin (18 rupa).

## Razvoj

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

Statički build (`npm run build` → `dist/`) može se deploy-ati na GitHub Pages, Vercel ili Netlify.
