# Login con sesión simulada

Objective: a simulated login (one fixed demo account) and a protected app, in the `auth` layer; the user area moves to the sidebar footer.
Branch: `feat/login-sesion-simulada` · Delivery: one PR for the story · Test runners: Vitest (`bun run test`) and Playwright (`bun run test:e2e`).
Notion story: "Login con sesión simulada" (Fase 1 · Base del sistema).

## Specs

- **S1** — `/login` is its own page, without the dashboard layout (no sidebar, no header).
- **S2** — Story criterion, verbatim from Notion: "Formulario validado con Zod y mensajes de error claros". Form with email + password; the Zod schema lives in `packages/shared`; field errors show under each field. Only one demo account works. Any other valid pair shows an alert above the form: "Correo o contraseña incorrectos."
- **S3** — The session is kept in a cookie (`useCookie`), so it survives a reload and the middleware can read it on the server.
- **S4** — Story criterion, verbatim: "Botón \"Entrar como demo\" para reclutadores". The button only fills the form with the demo email and password; the visitor presses "Entrar".
- **S5** — Story criterion, verbatim: "Rutas protegidas por middleware". A logged-out visitor goes to `/login`. After login they return to the page they first asked for, or `/facturas` if there was none.
- **S6** — A logged-in user who opens `/login` goes to `/facturas`.
- **S7** — The whole user area (name + "Cerrar sesión") moves to the sidebar footer; the header dropdown goes away. Logout clears the cookie and the Pinia store, then goes to `/login`. It replaces ADR 0041.
- **S8** — The login screen and the new sidebar footer are designed in Claude Design and approved before code (ADR 0023).
- Demo account (approved by Ronald, L3): `demo@facturard.do` / `demo1234`.

## Tasks

| ID | Task | Specs | Est. | Depends | Route | Status | Commit |
|---|---|---|---|---|---|---|---|
| T1 | Register decisions (ADRs 0067–0073) | S1–S7 | 60 min | — | inline | done (7 ADRs; 0041 marked as replaced) | `2b8df6e` |
| T2 | Design login page + sidebar user area in Claude Design | S1, S2, S4, S7, S8 | 90 min | T1 | inline | done ([canvas](https://claude.ai/artifact/3g7JXRsoMDMz3JG8vZAunZ), 8 login boards) | `1650883` |
| T3 | Login schemas in `packages/shared` (request and response) + tests | S2 | 45 min | T1 | inline | done (RED → GREEN, 18 tests; ADR 0074) | `b02abaa` |
| T4 | Mock route `/api/auth/login` + `useAuth` composable (cookie, login, logout) + tests | S2, S3, S7 | 90 min | T3 | inline | done (RED → GREEN, 57 new tests; ADRs 0075–0079) | `9b73be8`, `353b18f` |
| T5 | Login page and form (demo button, errors) + E2E | S1, S2, S4 | 120 min | T2, T4 | inline | pending | — |
| T6 | Route protection middleware and redirects + E2E | S5, S6 | 90 min | T4, T5 | inline | pending | — |
| T7 | Move user area and logout to the sidebar footer + update layout E2E | S7 | 90 min | T2, T4 | inline | pending | — |

Notes:
- Tests are written RED first; each business rule gets a readable test.
- T1: one ADR per decision; decisions 6 and 6b become one ADR that replaces ADR 0041.
- Layers do not import each other; the session store stays in `base`.

## Log

- **L1** (2026-11-25) — Original request, from the Notion story: "Como usuario, quiero iniciar sesión, para que solo yo acceda a la facturación del negocio." Criteria: "Formulario validado con Zod y mensajes de error claros", "Rutas protegidas por middleware", "Botón \"Entrar como demo\" para reclutadores".
- **L2** (2026-11-25) — `/hoy`: no tasks for the week of 2026-11-23. Layout story merged (PR #3). Ronald chose to start this story. Decisions asked one at a time, options without recommendation (ADR 0034): own page `/login` without layout; email + password with one fixed demo account; session in a cookie; demo button fills the form only; return to the requested page after login; logout and user area (name + logout) in the sidebar footer, replacing ADR 0041; logged-in users go to `/facturas`; wrong credentials shown in an alert above the form. Document and 7 tasks approved ("Go ahead").
- **L3** (2026-11-25) — T1 done, committed as `2b8df6e`. Ronald approved the demo account values: `demo@facturard.do` / `demo1234`.
- **L4** (2026-11-25) — T2 done; Ronald approved the boards ("Approved"). Canvas "FacturaRD — Layout" (https://claude.ai/artifact/3g7JXRsoMDMz3JG8vZAunZ), version 27: login in 8 boards (desktop dark: empty, demo filled, field errors, wrong credentials; desktop light: empty, wrong credentials; mobile: dark empty, light with field errors). The sidebar footer (avatar, name, "Cerrar sesión"; collapsed: avatar and logout icon) replaces the header user menu in the layout and both "Nueva factura" boards. Approved assumptions: subtitle "Entra para emitir y revisar tus facturas electrónicas."; no show-password button, no forgot-password link, no logo; 44 px inputs and buttons; helper text "Rellena el formulario con una cuenta de prueba." under the demo button. Field error texts: "Escribe un correo válido", "Escribe tu contraseña". On mobile the user area lives only in the drawer (ADR 0072). A stray paragraph "Una tira de go" remains at the end of `Main.dc.html` (not ours; left alone).
- **L5** (2026-11-25) — T3 started. One decision asked: should the login email be cleaned before it is validated? Ronald chose "1": trim spaces and lowercase (ADR 0074, no reason added). `zod@4.6.7` added to `packages/shared`. RED: `login.test.ts` failed because `./login` did not exist; GREEN: `loginSchema` (`z.string().trim().toLowerCase().pipe(z.email())`, so cleaning runs before the format check; messages "Escribe un correo válido" and "Escribe tu contraseña", also for missing fields) and `loginResponseSchema` (`user.name`, `company.name`), exported from `src/index.ts`. 18 tests. The demo account values stay in `apps/web` (T4): the real API must not know them.
- **L6** (2026-11-25) — T4 started. Five decisions asked one at a time, no reasons added (ADRs 0075–0079): the cookie stores the whole session (`user` and `company`); it lasts until the browser closes; wrong credentials answer 401 with `{ "message": "Correo o contraseña incorrectos." }`; the route waits 600 ms; the demo account lives in `layers/auth/shared/utils/demo-account.ts`. Built (RED first, then GREEN): `errors.ts` in `packages/shared` (`validationErrorsSchema`, `errorMessageSchema`, `validationErrorsFrom`, the `{ campo: [mensajes] }` format of CLAUDE.md); `loginAttempt` (what the route answers: 200, 400, 401); `requestLogin` + `AuthError` (typed client); `createAuth` (login, logout, restore; browser pieces injected, so it is tested with fakes); `useAuth`; a plugin that restores the session from the cookie at app start; the new `auth` layer. Changes outside the plan: `useSessionStore` now starts signed out (`user` and `activeCompany` are `null`, plus `signIn`, `signOut`, `isSignedIn`); the layout reads them with `?.`; layout E2E tests sign in through the session cookie (`playwright/sign-in.ts`) so they stay green until T6. A test found a real gap: with no body, Zod reports an error on the whole object and the route would have answered 400 with `{}`; `loginAttempt` now reads a non-object body as an object with every field missing. Checked: the real route against `nuxt dev` (200, 401, 400 for bad format, text and no body; about 0.6 s each; `" Demo@FacturaRD.do "` signs in); layout E2E 11/11 in Chromium and Firefox (WebKit needs Docker, not run); lint, typecheck and 27 + 119 unit tests pass. Vite warning about `zod` found late fixed with `optimizeDeps.include: ['@ecf/shared > zod']` in the auth layer.
