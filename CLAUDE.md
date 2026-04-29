# CLAUDE.md — Notes for AI agents working on this repo

This file captures conventions, gotchas, and anti-patterns that aren't obvious from reading the code. See `README.md` for setup and `PROJECT.md` (in the user's project folder) for the full project doc.

## Architecture quick-reference

- Next.js 14 App Router, TypeScript, Tailwind. Deployed to Vercel on push to `main`.
- Most content is hardcoded in `lib/data.ts` and surfaced via helpers in `lib/content.ts` (`getDoctrines`, `getQuotes`, `getLibraryItems`, `getReligions`, `getApologeticsQuestions`/`Categories`, `getDailyVerse`).
- Database (Neon) is currently used only for `email_subscribers` + admin-managed content.
- Theme: `data-theme` attribute on `<html>`, CSS variables in `app/globals.css`, toggle in `components/ThemeToggle.tsx`. Tailwind tokens in `tailwind.config.ts` reference the CSS variables, so colors auto-follow the theme — don't hardcode hex values in components when a token exists.

## Section components: dual-use on home page + dedicated page

The components in `components/sections/*` are used in **two places**:

1. As a section on the home page (`app/page.tsx`) — they need their own internal `<span className="section-label"> / <h2 className="section-title"> / <p>` heading block so the home page reads as a sequence of titled sections.
2. As the body of their dedicated route (`app/library/page.tsx`, `app/quotes/page.tsx`, `app/scripture/page.tsx`) — these pages already render a full-width hero with the same label, title, and subtitle. If the section component **also** renders its heading block, the page shows the title twice.

**Pattern:** section components that are reused on a dedicated page accept an optional `hideHeader?: boolean` prop. The dedicated page passes `hideHeader`; the home page omits it.

```tsx
// LibrarySection.tsx
interface Props { items: LibraryItem[]; hideHeader?: boolean; }
export default function LibrarySection({ items, hideHeader = false }: Props) {
  return (
    <section ...>
      {!hideHeader && (<>
        <span className="section-label">Curated Resources</span>
        <h2 className="section-title">The Library</h2>
        <p>Trusted tools, theologians, and materials...</p>
      </>)}
      ...
    </section>
  );
}
```

```tsx
// app/library/page.tsx — hero + body, suppress duplicate
<LibrarySection items={items} hideHeader />
```

**Anti-pattern to avoid:** adding a new `app/<thing>/page.tsx` that wraps a `<ThingSection>` without auditing whether the section already has its own heading. If it does, either pass `hideHeader` or drop the page-level hero — never ship both.

Currently using this pattern: `LibrarySection`, `QuotesSection`, `ScriptureSection`. `DoctrineSection`, `ApologeticsSection`, `ReligionsSection` aren't reused on dedicated pages — those routes render their own grid/list directly.

## Nav (`components/Nav.tsx`)

- Fixed top, full width, gold-on-navy.
- Wordmark "CHRIST · CORNERSTONE" uses responsive font size + tracking. **Never** set the wordmark to a fixed `text-xl` without breakpoints — at iPhone width (393px) the wordmark crowds the right-side controls (theme toggle + hamburger) and the hamburger gets clipped off-screen. Current scale: `text-[0.95rem] tracking-[0.08em]` → `sm:text-base sm:tracking-[0.12em]` → `lg:text-xl lg:tracking-[0.15em]`.
- Right-side mobile cluster (theme toggle + hamburger) MUST be `flex-shrink-0` so it can never be squeezed by a wide wordmark.
- Mobile breakpoint is `lg` (1024px). The desktop nav (`hidden lg:flex`) hides below that; the hamburger group (`lg:hidden`) shows below that.
- Padding: `px-3 sm:px-4 lg:px-16` — tighter on mobile to reclaim horizontal space.

## Verifying mobile changes

The most important viewport to check is **iPhone 14 / 393px**. When changing `Nav.tsx` or any page hero, run an iPhone-width Playwright check (or just resize Chrome devtools) and confirm:

- Hamburger `getBoundingClientRect().right <= window.innerWidth` (i.e., not clipped).
- Wordmark and right cluster don't overlap (`wordmark.right <= right.left`).
- Title block on `/library`, `/quotes`, `/scripture` appears once, not twice.

## Files NOT to touch without thinking

- `app/globals.css` `:root[data-theme=...]` blocks — changing CSS variables here cascades through every component.
- `tailwind.config.ts` color tokens — they reference CSS variables; replacing with hex breaks dark/light parity.
- `middleware.ts` — handles admin auth + www → apex redirect. Don't change matcher patterns casually.
