Version: 1.5.0

# Om Patel — Production Portfolio

A production-ready, **multi-page React + TypeScript + Vite** portfolio for a Software Developer.

## Run locally

```bash
npm install
npm run dev
```

For a production bundle:

```bash
npm run build
npm run preview
```

The deployable output is generated in `dist/`.

## Architecture

This is intentionally **MPA, not SPA**. Each primary page has its own HTML entry point and shares the same React component system and data modules.

- `/` — home
- `/work/` — selected work
- `/work/<slug>/` — case studies
- `/services/`
- `/about/`
- `/writing/` — technical notes
- `/writing/<slug>/` — article pages
- `/contact/`
- `/404.html`

## Visual / interaction system

The current finishing pass adds:

- animated hero and menu transitions
- cream/off-white editorial palette instead of pure white
- morphing full-screen navigation
- desktop navigation pills with 3D pointer tilt
- magnetic/3D hover on important controls
- animated hero typography, grid, orbit elements and signal bars
- mouse-parallax 3D hero title
- scroll reveal animations with IntersectionObserver
- animated terminal/demo states
- richer footer with giant OM·PATEL wordmark
- compact custom cursor dot/ring and context label on fine pointers
- reduced-motion support

All interaction is dependency-light and implemented in TypeScript/CSS rather than requiring a heavy animation framework.

## Windows quick start

Double-click `start-local.bat`. It will install dependencies on the first run and then start the Vite development server.


## Navigation / local development

Vite is explicitly configured as an MPA so `/work/`, `/about/`, `/services/`, `/writing/` and nested case-study/article URLs resolve to their own HTML entry points during development and production preview. Keep the dev terminal running while navigating between pages.


## v1.4 refinement
- Stable primary navigation: active page is orange without a moving/white pill.
- Menu remains closed as “Menu”; the orange morph is confined to the menu control and expands only when opened.
- Home hero geometry and inner-page grid now animate.
- Dark mode inner-page heroes retain a deep burnt-orange visual treatment.
- Contact page is a single dark “Let’s talk” composition with the original quote on the left and the compose-email form on the right.
- The exact supplied résumé PDF remains at `public/om-patel-resume.pdf`.


## v1.5 finishing pass
- Removed the duplicate contact eyebrow in the contact footer note.
- Moved the floating “Let’s talk” chip to the lower-left and suppresses it on the Contact page to avoid repetition.
- Fixed the primary navigation active-state layering so the active label remains visible; the active state is orange and the navbar geometry stays stable.
- Added a compact trailing cursor with subtle hover expansion.
- Added a deterministic 3D particle field with different motion treatments for Home, Work, Services, About, Writing, article/project detail pages and Contact.
- Upgraded the work terminal rail with previous/next controls, progress indicator, smooth movement and auto-advance.
- Added a four-stage animated Dispatcher pipeline (Redirect → Rewrite → Filter → Cache) and animated request output.
- Reduced the footer OM·PATEL signature so it reads as a footer mark rather than a second hero.
- Strengthened hero/page geometry motion and dark-mode atmospheric color without introducing an opaque page curtain.


## v1.7 notes
- Native cursor (custom cursor and labels removed). Smooth scroll via `lenis`: run `npm install`.
- Mascot "Byte" is in `src/components/mascot.tsx` (moods: code, wave, lost).
- Per-page footer quotes live in `src/data/quotes.ts`. The email shows only on /contact/.
- Multi-page via Vite MPA; the cross-page fade uses CSS `@view-transition`.
- Motion is ON by default (ignores the OS "reduce animations" flag); Menu > Motion toggles it off.
- Fonts are self-hosted via @fontsource (no Google Fonts request).
- Particle canvases and 3D tilt were removed for performance.
