# Portfolio Website - AI Agent Instructions

## Architecture Overview

This is a **Next.js 15 static portfolio site** with a space/Unix terminal theme. The entire app is **client-rendered** (`'use client'`), deployed to **Azure Static Web Apps**, and uses **Turbopack** for development.

**Key architectural decisions:**
- Static export mode (`output: 'export'` in `next.config.ts`) - no SSR/ISR
- Single-page app with scroll-based section navigation using IntersectionObserver
- All content centralized in `src/data/portfolio.ts` for easy non-technical updates
- Terminal aesthetic with custom CSS animations (matrix rain, glitch effects)

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main orchestrator - manages sections & scroll state
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Theme variables, terminal/space effects
├── components/           # Self-contained section components
│   ├── TerminalHeader.tsx  # Sticky header with macOS-style dots
│   └── [Section].tsx       # Hero, About, Projects, etc.
└── data/
    └── portfolio.ts      # Single source of truth for ALL content
```

## Content Management Pattern

**All content lives in `src/data/portfolio.ts`** - this is intentional for easy updates without touching components.

**Exports:**
- TypeScript interfaces: `PersonalInfo`, `Project`, `AIAgent`, `Skill`, `Certification`, `Education`
- Data constants: `personalInfo`, `projects`, `aiAgents`, `skills`, `certifications`, `education`

**To add/update content:** Modify only `portfolio.ts`, never hardcode in components. Components import and map over these arrays.

## Development Commands

```bash
npm run dev        # Turbopack dev server (faster than webpack)
npm run build      # Static export to /out directory
npm run lint       # ESLint with Next.js config
```

**Key workflow:** Changes require page refresh since no HMR on client components with heavy animations.

## Styling Conventions

1. **Tailwind 4** with custom theme in `globals.css` using `@theme inline`
2. **Color palette:**
   - Background: `#0a0a0a` (near-black)
   - Primary text: `#00ff00` (matrix green)
   - Accent: `#ff6b35` (orange) for CTAs
   - Secondary: `#333333` (dark gray)
3. **Typography:** Monospace (`'Courier New'`) everywhere for terminal aesthetic
4. **Custom classes:** `.space-bg`, `.matrix-rain`, `.glitch` - defined in `globals.css`

## Animation Patterns

**Framer Motion usage:**
- `initial/animate/transition` for page load animations
- Stagger animations for lists (see `Projects.tsx`)
- Scroll-triggered reveals (use `whileInView` where applicable)

**Typing effect:** Implemented manually in `Hero.tsx` with `setInterval` - not a library

## Navigation System

**Scroll-based IntersectionObserver pattern** in `page.tsx`:
1. Each section has a ref (`sectionRefs`)
2. Observer tracks which section is in viewport (`-30% 0px -70% 0px` rootMargin)
3. Updates `activeSection` state
4. `TerminalHeader` receives state to highlight active nav item

**Scroll behavior:** Custom scrollbar in `.terminal-content` div, not browser default.

## Deployment to Azure

**Configuration files:**
- `staticwebapp.config.json` - Azure SWA settings (output location, cache headers)
- `.github/workflows/azure-static-web-apps-*.yml` - Auto-deploy on push to main

**Build process:** `npm run build` → exports to `/out` → Azure serves static files

**Important:** Images must be unoptimized (`images: { unoptimized: true }`) for static export.

## TypeScript Patterns

- Path alias: `@/*` maps to `src/*` (defined in `tsconfig.json`)
- Import data: `import { personalInfo } from '@/data/portfolio'`
- Import components: `import Hero from '@/components/Hero'`
- Strict mode enabled - all props/functions must be typed

## External Integrations

- **TryHackMe badge:** Embedded SVG via API (`tryhackme.com/api/v2/badges/public-profile?userPublicId={userId}`)
- **LinkedIn profile:** Data manually extracted and stored in `portfolio.ts`
- **GitHub projects:** Links to repos, no API integration

## Common Tasks

**Add a new project:**
1. Add entry to `projects` array in `portfolio.ts` with `featured: true` for homepage
2. Place image in `public/images/` if needed
3. Component auto-updates via `.map()`

**Add a new section:**
1. Create component in `src/components/`
2. Add ref to `sectionRefs` in `page.tsx`
3. Import and render in `page.tsx` with section ID
4. Update `TerminalNav.tsx` with new nav item

**Modify theme colors:**
Edit CSS variables in `globals.css` root (`:root` and `@theme inline`)

## Testing Notes

No test suite currently. Manual testing required for:
- Scroll navigation accuracy
- Mobile responsiveness (terminal design works down to 320px)
- Animation performance on low-end devices
