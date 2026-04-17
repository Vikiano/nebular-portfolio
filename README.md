# Nebular Portfolio

Photography portfolio for Nebular Labs. Obsidian-dark craft-forward gallery surface with a licensing waitlist, series curation, and EXIF transparency.

## Stack

- Next.js 15.5.15 (App Router, TypeScript)
- Tailwind 3.4.14 (obsidian + warm palette)
- Supabase (seven-table RLS schema: photos, galleries, series, series_photos, tags, licensing_inquiries, newsletter_subscribers)
- Cloudflare R2 (optional, graceful fallback to Supabase Storage then static public/)
- exifr for metadata sidecars
- yet-another-react-lightbox for accessible gallery viewer
- next-themes for dark-default theming with toggle

## Brand

Anonymous umbrella. No real-name attribution. Nebular Labs only.

## Run

```
cp .env.example .env.local
npm install
npm run dev
```

## Gauntlet

See `scripts/gauntlet/` for the 18-dimension hardening pipeline. Gate enforced via `~/.claude/hooks/gauntlet-enforce.sh` before any LIVE claim.

## License

Code: MIT. Photos: per-asset license (see `public/placeholders/<slug>.json` sidecars + `/licensing` page).
