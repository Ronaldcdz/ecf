# Sistema de diseño base: tokens y componentes UI

Objective: design tokens and the Nuxt UI theme in the `base` layer, mirrored in Claude Design.
Branch: `feat/sistema-de-diseno-base` · Delivery: one PR for the story · Test runner: Vitest (`bun run test`).
Notion story: "Sistema de diseño base: tokens y componentes UI" (Fase 1 · Base del sistema).

## Specs

- **S1** — "Tokens de color, tipografía, espaciado y breakpoints con contraste WCAG AA".
  - Color mode: "Si, claro y oscuro".
  - Palette: `primary` = blue `#247ba0` ("azul como primary"); `secondary` = purple `#2f0147` (replaces the wine red: "el vino, el gris se queda"); `neutral` = slate gray `#717c89`, with `#1c1c1c` and `#f1f2ee` as the dark and light ends.
  - Each brand color becomes an 11-step scale (50–950); the original hex sits on the step that matches its lightness. `success`, `warning`, `info` and `error` use standard Tailwind palettes; `error` must stay visually distinct from the brand colors.
  - Every text/background token pair passes WCAG AA (4.5:1 for normal text) in light and dark mode.
  - Typography: "Work Sans" (verified: has tabular figures `tnum`); amounts use `tabular-nums`.
  - Radius: "Medio" → `--ui-radius: 0.5rem`.
  - Spacing and breakpoints: "Las por defecto de Tailwind", documented as the project tokens.
  - Initial color mode: "Seguir al sistema".
- **S2** — "Nuxt UI instalado y su tema configurado (colores semánticos en app.config.ts, tokens de Tailwind con @theme); componentes propios solo si Nuxt UI no tiene uno".
- **S3** — "Ningún color ni espaciado suelto fuera de los tokens". Enforced with lint ("La de lint"): `eslint-plugin-better-tailwindcss` with `no-restricted-classes` (arbitrary values `[...]` and non-token Tailwind palettes) and `no-unknown-classes`.
- **S4** — `/design` showcase page, "Hazla para ambos" (development and production): color scales, Work Sans weights, amounts with tabular figures, and the Nuxt UI components the app uses, in light and dark mode.
- **S5** — Claude Design design system with the same tokens as the code: "despues para hacer todo el diseno lo haremos en claude design para yo verlo antes de que llegue al codigo". Design cadence: "por módulos con la factura adelantada".

Out of scope: the color mode toggle and the invoice design spike belong to the "Layout y navegación" story.

## Tasks

| ID | Task (same name in Notion) | Specs | Est. | Depends on | Route | Status | Commit |
|---|---|---|---|---|---|---|---|
| T1 | Registrar decisiones de diseño (ADRs) | S1–S5 | 45 min | — | inline | done | `ebed9bf` |
| T2 | Configurar tokens y tema de Nuxt UI | S1, S2 | 120 min | T1 | inline | pending | |
| T3 | Regla de lint contra valores sueltos | S3 | 60 min | T2 | inline | pending | |
| T4 | Página /design de muestra | S4 | 120 min | T2 | inline | pending | |
| T5 | Sistema de diseño en Claude Design | S5 | 60 min | T2 | inline | pending | |

- T1: ADRs for palette and dark mode, typography, radius and scales, the `/design` page, the Claude Design → code workflow and the per-module cadence. Adds the design workflow to `CLAUDE.md`.
- T2: AA contrast is checked by a readable Vitest test that computes the ratio of each token pair in light and dark mode.

## Log

- **L1** (2026-11-13) — Ronald approved starting the story from `/hoy`: "Haz commit primero y crea la nueva rama correspondiente".
- **L2** (2026-11-13) — Decisions asked one at a time. Contrast checked numerically: coral `#f25f5c` rejected (3.2:1 on white, clashes with `error`); wine `#88292f` passed (8.73:1) but was replaced by `#2f0147` (17.27:1 on white). Sansation rejected: no `tnum`, only weights 300/400/700. `eslint-plugin-better-tailwindcss` 4.11.0 verified: peers ESLint ^10 and Tailwind ^4.1.17.
- **L3** (2026-11-13) — ODD document and its 5 tasks approved ("SI"). Notion tasks created as children of the story, week of 2026-11-09. ODD docs are versioned in the public repo ("Subelos a github").
- **L4** (2026-11-17) — T2 started. Ronald asked what the tokens are based on: "I want to really understand". He chose "The guide first": `docs/sistema-de-diseno.md` explains the token layers, the OKLCH scale method and WCAG contrast before any code. Measured: `#247ba0` sits on step 600 (Nuxt UI uses 500 in light mode), `#2f0147` on 950, and `--ui-text-muted` (`#717c89`, 4.25:1 on white) fails AA. Ronald decides these three points during T2.
