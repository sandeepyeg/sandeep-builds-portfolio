# Sandeep Johal — Portfolio

Professional software engineering portfolio for **Sandeep Johal** — a full-stack developer based in Edmonton, Alberta, specializing in .NET, Angular, Azure, AWS, and AI-assisted development.

**Live:** [sandeepbuilds.com](https://sandeepbuilds.com)

![Social Preview](public/og/sandeep-builds-og.svg)

## Technology Stack

- **Framework:** Angular 22 (standalone components, signals, OnPush change detection)
- **Language:** TypeScript (strict mode)
- **Styling:** SCSS with CSS custom properties design system
- **Animation:** GSAP + ScrollTrigger + Lenis smooth scrolling
- **Icons:** Lucide Angular
- **Fonts:** Space Grotesk Variable, Inter Variable (self-hosted via Fontsource)
- **Testing:** Vitest (unit) + Playwright (e2e) + axe-core (accessibility)
- **CI/CD:** GitHub Actions → Azure Static Web Apps
- **Hosting:** Azure Static Web Apps (static prerendering)

## Local Setup

### Prerequisites

- **Node.js:** 22.22.3 (managed via `.nvmrc`)
- **npm:** 10+

```bash
nvm use                # switch to correct Node version
```

### Development

```bash
npm ci                 # install dependencies
npm start              # start dev server at http://localhost:4200
```

### Available Commands

| Command                    | Description                                    |
| -------------------------- | ---------------------------------------------- |
| `npm start`                | Start development server                       |
| `npm run build`            | Development build                              |
| `npm run build:production` | Production build (static prerendering)         |
| `npm test`                 | Run unit tests (Vitest)                        |
| `npm run lint`             | ESLint                                         |
| `npm run format:check`     | Prettier format check                          |
| `npm run format`           | Prettier auto-format                           |
| `npm run e2e`              | Playwright end-to-end tests                    |
| `npm run check`            | Full validation (lint + format + test + build) |

### Production Build

```bash
npm run build:production
```

Output: `dist/sandeep-builds/browser/`

## Project Structure

```
src/
  app/
    core/
      data/portfolio.data.ts       # All site content as typed constants
      models/portfolio.models.ts   # TypeScript interfaces
      services/metadata.service.ts # SEO metadata management
    layout/
      page-shell/                  # Skip link, header, main, footer wrapper
      site-header/                 # Fixed header, scroll spy, mobile menu
      site-footer/                 # Contact links, back-to-top
    shared/components/             # Reusable: button-link, project-card, etc.
    features/
      home/                        # Hero, marquee, intro, work, capabilities, etc.
      work/work-detail-page/       # Enterprise Payments case study
      not-found/                   # 404 page
  styles/                          # Design tokens, reset, typography, layout, motion
```

## Animation Architecture

- `services/animation.service.ts` — GSAP ScrollTrigger registration and lifecycle
- `services/scroll.service.ts` — Lenis initialization and ScrollTrigger sync
- CSS reveal utilities for non-JS fallback
- All animations respect `prefers-reduced-motion: reduce`
- DestroyRef-based cleanup prevents memory leaks

## Accessibility

- Skip-to-content link
- Semantic HTML (`header`, `nav`, `main`, `section`, `footer`)
- Keyboard-operable navigation with visible focus states
- Mobile menu: Escape closes, body scroll lock, focus management
- `aria-current` on active navigation items
- All SVGs marked `aria-hidden="true"`
- Axe accessibility testing in Playwright

## Content Update Instructions

See [`docs/content-guide.md`](docs/content-guide.md).

## Project Status Rules

This portfolio follows strict honesty rules:

- Only published projects show GitHub/demo links
- AI projects labeled `In Development` or `Planned` — no fake links
- Enterprise Payments case study is sanitized per professional obligations

To publish a new AI project later:

1. Build the real project with a public repository
2. Update `portfolio.data.ts`: change `status` to `'published'`, add `repositoryUrl`
3. Add its case-study route in `app.routes.ts`
4. Update `sitemap.xml`
5. Update metadata

## Resume PDF

When a resume PDF is available, place it at `public/documents/SANDEEP JOHAL RESUME.pdf` and set `HAS_RESUME_PDF = true` in `portfolio.data.ts`.

## Deployment

See [`docs/deployment.md`](docs/deployment.md).

## Domain

**Primary:** [https://sandeepbuilds.com](https://sandeepbuilds.com)  
**www:** Redirects to primary via Azure configuration

## Architecture Documentation

See [`docs/architecture.md`](docs/architecture.md).
