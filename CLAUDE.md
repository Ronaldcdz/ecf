# Facturación Electrónica (e-CF) — Monorepo

Sistema para emitir y gestionar comprobantes fiscales electrónicos (e-CF) de la DGII (República Dominicana) para un negocio pequeño. Primero se construye el frontend con datos simulados; el backend en NestJS se conecta en la Fase 3.

Objetivo de aprendizaje: Ronald quiere entender todo el sistema sin escribir el código a mano. Claude escribe el código; Ronald aprueba los planes y debe poder explicar lo construido.

## Estructura del monorepo (Bun workspaces)
- `apps/web` → Nuxt (frontend)
- `apps/api` → NestJS (backend, Fase 3)
- `packages/shared` → tipos y esquemas Zod compartidos entre web y api (Cliente, Producto, Factura, respuestas de la API)
- `docs/` → alcance, diagrama de arquitectura, decisiones (`docs/decisions/`), documentación DGII (`docs/dgii/`)
- `odd/tasks/` → documentos ODD, uno por historia (ver "Precedencia sobre la configuración global")
- Las dependencias entre paquetes usan `workspace:*`. `apps/web` y `apps/api` nunca se importan entre sí; solo comparten a través de `packages/shared`.

## Stack
- Nuxt (versión estable actual), Vue 3 con `<script setup lang="ts">`
- TypeScript en modo estricto en todos los paquetes. Prohibido `any`.
- Nuxt UI como librería de componentes, con Tailwind CSS (el que trae Nuxt UI; no instalar otro aparte)
- Pinia solo para estado global (sesión, empresa activa)
- Zod para validar formularios y respuestas de la API (esquemas en `packages/shared`)
- Vitest para lógica y composables, Playwright para flujos
- Bun solo como gestor de paquetes y para correr scripts (`bun install`, `bun run`). Runtime: Node LTS para Nuxt y NestJS, en desarrollo y producción. No usar `npm install` ni otro gestor: un solo lockfile (`bun.lock`).
- Workspaces declarados en el campo `workspaces` del `package.json` raíz. Cada paquete declara en su propio `package.json` todo lo que importa, aunque Bun lo tenga instalado en la raíz.
- Backend (Fase 3): NestJS 12.3 o superior con el adaptador `@nestjs/platform-node` (sin Express). PostgreSQL como base de datos.
- Calidad: ESLint, Prettier, commitlint + husky, GitHub Actions (lint, typecheck, test en cada push).
- Despliegue previsto: Vercel para `apps/web`; el hosting de la API y la base de datos sigue pendiente.

## Arquitectura de `apps/api` (Fase 3)
- Módulos de Nest por funcionalidad (`clientes`, `productos`, `facturas`, `auth`), igual que las layers del frontend.
- Validación con los esquemas Zod de `packages/shared`, usando la opción `schema` de los decoradores (`@Body({ schema })`) o un `ZodValidationPipe` propio. No usar `class-validator`.
- Solo abstracciones de Nest: no usar `@Req()`/`@Res()` con tipos de Express ni middlewares de Express. Si una librería exige Express, detente y avisa; se registra como decisión.
- Errores de validación con el mismo formato que consume el frontend (`{ campo: [mensajes] }`), definido en `packages/shared`.
- `packages/shared` se compila (por ejemplo con `tsup`) para que la API lo consuma; Nuxt puede seguir importando el código fuente.
- Swagger/OpenAPI queda fuera del MVP; los contratos viven en `packages/shared`.

## Arquitectura de `apps/web`
- Organización por funcionalidad con Nuxt Layers en `apps/web/layers/`:
  - `base` → sistema de diseño (tema de Nuxt UI y tokens de Tailwind, componentes propios solo cuando Nuxt UI no tenga uno), layout, utilidades
  - `auth`, `clientes`, `productos`, `facturas`
- Cada layer contiene sus propios `components/`, `composables/`, `pages/`.
- Flujo de datos: Componente → composable (`useClientes`) → cliente API tipado → server routes de Nuxt (mock). Nunca llamar `$fetch` ni `useFetch` directamente desde un componente.
- Los mocks viven en `apps/web/server/api/` y responden con los tipos de `packages/shared`, igual que lo hará la API real.
- Una layer no importa archivos internos de otra; solo usa lo que expone `base`.

## Convenciones
- Código, nombres y commits en inglés. Textos de la interfaz en español.
- Componentes en PascalCase, composables con prefijo `use`.
- Usa primero los componentes de Nuxt UI (`UButton`, `UInput`, `UForm`, `UTable`, `UModal`…). No recrees un componente que Nuxt UI ya tiene.
- Los tokens (colores, tipografía, radios) se definen en la layer `base`: colores semánticos de Nuxt UI en `app.config.ts` y el tema de Tailwind en el CSS principal (`@theme`). Sin colores hex ni valores arbitrarios de Tailwind (`text-[#123456]`, `p-[13px]`) en los componentes.
- Formularios con `UForm` y los esquemas Zod de `packages/shared`.
- Cada vista maneja los estados de carga, vacío, error y éxito.
- Accesibilidad: navegación por teclado, `label` en todos los inputs, contraste WCAG AA.
- Commits pequeños con Conventional Commits y el paquete como scope: `feat(web):`, `feat(shared):`, `fix(api):`, `docs:`.

## Precedencia sobre la configuración global
En este repositorio, estas reglas sustituyen a las globales (gentle-ai / ODD) cuando chocan:
- Notion es la fuente de verdad de las tareas: qué se hace, cuándo, estimados, tiempos y estado. El documento ODD (`odd/tasks/<historia>.md`) es solo la especificación técnica de una historia; sus tareas (`T#`) llevan el mismo nombre que la tarea de Notion correspondiente. No se crean tareas que existan en un sistema y no en el otro.
- Antes de la primera escritura de cada historia, Claude muestra el documento ODD con sus tareas propuestas y espera la aprobación explícita de Ronald. Solo después crea las tareas en Notion, la rama y el código.
- Los commits por unidad de trabajo de ODD se hacen en la rama de la historia; nunca `git push` ni PR sin permiso.

## Cómo trabajar conmigo (Claude)
- Antes de una funcionalidad nueva, propón el plan (documento ODD) y espera aprobación. No escribas código en modo plan.
- Puedes implementar todo, incluida la lógica de negocio central (cálculo de ITBIS, totales, validación de RNC y e-CF), con dos condiciones:
  - Cada regla de negocio cita su fuente (documento de `docs/dgii/` o norma de la DGII) en un comentario o en `docs/`.
  - Cada regla tiene tests legibles que Ronald pueda usar para entender su comportamiento, incluidos los casos borde.
- Si una regla de la DGII es ambigua o no tiene fuente en `docs/dgii/`, pregunta antes de implementarla; no la inventes.
- Al cerrar cada tarea, explica en 5 líneas o menos qué hiciste y por qué.
- Explica brevemente el porqué de cada decisión no obvia.
- Las decisiones de arquitectura importantes se registran en `docs/decisions/` (una página corta por decisión).
- Corre `bun run lint`, `bun run typecheck` y `bun run test` antes de dar algo por terminado.

## Proyecto y flujo de trabajo
- Acta de constitución (fuente del alcance, objetivos y fechas): https://docs.google.com/document/d/1G5PkY08gvjFfSKiamYM32hfvI2oFc9-EJu65z7zXJx0/edit
- Proyecto en Notion: https://app.notion.com/p/407ce09eb78b813db75cf00e147e4948
- Base de datos de tareas en Notion: data source `collection://16dfbf4e-fc63-4b6a-af1c-e961526cbbc0` (Tareas). Propiedades clave: Tipo, Estado, Semana, Orden, Estimado (min), Tiempo real (min), Bloqueado Por, Parent-task, Commit / PR.
- Jerarquía: Fase → Historia → Tarea. Las fases y las historias ya están en Notion; las tareas técnicas se crean al empezar cada historia.
- Hitos: demo del MVP frontend el 13 de diciembre de 2026; producción el 1 de marzo de 2027; cierre el 2 de abril de 2027.
- Horario de Ronald: sesiones cortas (20–30 min) lunes, miércoles y viernes; bloques de hasta 2 h sábado y domingo. Los días pueden cambiar.

### Reglas del flujo
- Cada sesión empieza con `/hoy` y termina con `/cerrar` (skills del proyecto en `.claude/skills/hoy/` y `.claude/skills/cerrar/`).
- Solo se trabaja en tareas de la semana actual. Para tomar otra, pregunta primero.
- Al empezar una historia, propón sus tareas técnicas en el documento ODD: cada una con estimado de máximo 120 minutos, orden y dependencias. Créalas en Notion como hijas de la historia (Parent-task) solo después de que Ronald las apruebe.
- Al terminar una tarea, actualiza en Notion su Estado, Tiempo real (min) y Commit / PR.
- Nunca cambies en Notion fechas de fases, prioridades ni el alcance del proyecto.
- No hagas `git push` ni publiques nada sin permiso.

### Decisiones pendientes (no las tomes tú)
- Proveedor de e-CF y su API.
- Hosting de la API y de la base de datos, y ORM para NestJS (Prisma, Drizzle o TypeORM).
- Cómo cancelar facturas entre el 1 de marzo y el 2 de abril de 2027, y si la anulación de secuencias no usadas entra en el alcance.
Si una tarea depende de alguna de estas, detente y avisa.

### Documentación en `docs/`
- `docs/alcance.md` → resumen del alcance del MVP, generado desde el acta.
- `docs/decisions/` → una página corta por decisión de arquitectura.
- `docs/dgii/` → documentación técnica de e-CF (formatos XML, códigos de estado). Consúltala antes de escribir cualquier cosa relacionada con comprobantes, ITBIS o secuencias e-NCF; no inventes reglas fiscales.
