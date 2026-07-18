# Architecture

## Angular Architecture

- **Angular 22** with standalone components and `ChangeDetectionStrategy.OnPush`
- **SSR/SSG**: Angular prerendering with `outputMode: "static"` — all published routes are pre-built as static HTML
- **Builder**: `@angular/build:application` (esbuild-based)
- **Styling**: SCSS with CSS custom properties design system

## Routing

```
/                              Home page (lazy-loaded)
/work/enterprise-payments      Sanitized case study (lazy-loaded)
**                             404 Not Found (lazy-loaded)
```

All routes use lazy loading via `loadComponent`. Static prerendering is configured for all routes.

## Content Data

All portfolio content lives in `src/app/core/data/portfolio.data.ts` as typed, readonly constants. No API or CMS is required. The data follows interfaces defined in `portfolio.models.ts`.

## Animation Lifecycle

GSAP and Lenis are initialized once in centralized services:

- `animation.service.ts` — GSAP ScrollTrigger registration and teardown
- `scroll.service.ts` — Lenis smooth scrolling with ScrollTrigger synchronization

Both services guard against browser-only code during prerendering and use `DestroyRef` for cleanup. Reduced-motion users receive instant transitions with no animation delay.

## Reduced Motion

When `prefers-reduced-motion: reduce` is active:

- Lenis is disabled (native scroll)
- Scroll-triggered animations are disabled
- Marquee animation is stopped
- All CSS transitions and animations are set to `0.001ms` duration

## SEO Metadata

`MetadataService` manages title, meta tags, Open Graph, Twitter Cards, canonical URLs, and JSON-LD structured data. It uses Angular's `Meta` and `Title` services, plus `DOCUMENT` and `Renderer2` for dynamic element creation.

## Deployment Flow

1. Push to `main` triggers CI verification (lint, format, test, build, e2e)
2. Azure Static Web Apps picks up the production build from `dist/sandeep-builds/browser`
3. Static files are served from Azure CDN with HTTPS
4. Custom domain `sandeepbuilds.com` is configured via Azure portal
