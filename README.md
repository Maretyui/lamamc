# LamaMC

Website/frontend for the LamaMC Minecraft network — built with [Next.js](https://nextjs.org). Includes a news/team admin panel.

Live: https://lamamc.net

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- SWR for client-side data fetching (team roster, news)
- Vercel Analytics + `sonner` for toasts

## Content

`components/hero-section.tsx` is the landing hero with the server-IP copy button; `components/navbar.tsx` mirrors that same copy action in both the desktop CTA and the mobile menu. `components/team-section.tsx` and `components/news-section.tsx` fetch their content client-side via SWR rather than being statically bundled, so team/news updates from the admin panel show up without a redeploy. `components/site-footer.tsx` holds the footer nav (Impressum/Datenschutz/Login).

## Accessibility

Icon-only controls (scroll indicator, sort toggles, copy-IP buttons) carry descriptive `aria-label`s, and the news section's sort buttons use `aria-pressed` to expose their toggled state. The mobile navigation panel (`components/navbar.tsx`) is marked `inert` while collapsed, so its links and copy-IP button are excluded from the tab order and screen-reader navigation until the menu is actually opened — collapsing it with `max-h-0`/`overflow-hidden` alone hides it visually but does not remove it from focus.

## Spielmodi showcase

`components/spielmodi-section.tsx` renders the game-mode carousel as a scroll-driven `react-three-fiber` scene: a shared `Mac.glb` model is cloned once per entry in `spielmodiData`, each clone gets that mode's screenshot swapped onto its screen mesh as a texture, and scroll progress within the section drives which clone is centered versus stacked behind it. The whole `<Canvas>` is marked `aria-hidden` since it's purely decorative — the actual mode name, version and description are separate, real DOM text next to it, and a mobile fallback (`<Image>` crossfade, no WebGL) covers narrower viewports where the 3D canvas is hidden entirely.

## Admin panel

`/login` authenticates against `/api/auth/login` and redirects to `/admin` on success; `components/admin-dashboard.tsx` hosts the news and team editors (`components/admin/news-editor.tsx`, `components/admin/team-editor.tsx`), which write through `/api/news` and `/api/team` — the same endpoints the public news/team sections read from via SWR, so edits appear on the live site immediately without a redeploy.
