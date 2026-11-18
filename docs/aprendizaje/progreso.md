# Progreso de aprendizaje

Copia de solo lectura de las preguntas de comprobación **respondidas** (ADR 0003). La fuente de verdad es la base de Notion [Preguntas de comprobación](https://app.notion.com/p/6723226504304b6695b850f7581f6a7c): ahí se crean al cerrar cada fase, historia o hito, y ahí se responden, también desde el móvil. `/cerrar` y `/repaso` sincronizan este archivo; no lo edites a mano.

## Resumen

| Preguntas | Bien | Parcial | Mal | Repasos |
|-----------|------|---------|-----|---------|
| 9         | 2    | 5       | 2   | 4       |

## Cómo se registra

- Una entrada por pregunta respondida, numerada `P1`, `P2`… igual que su ID en Notion.
- **Formato:** predecir, seguir el recorrido, explicar de vuelta, depurar o concepto.
- **Nota:** bien (completa y correcta), parcial (idea correcta, faltan piezas) o mal (idea equivocada).
- Los repasos se anotan en la línea **Repasos** de la pregunta original, y el resumen se actualiza en cada entrada.

## Preguntas

### P1 — 2026-10-30 — Predecir

- **Pregunta:** Si escribes `/hoy` sin número, ¿qué hace la skill?
- **Respuesta de Ronald:** Toma el tiempo que tiene la tarea por defecto en Notion.
- **Nota:** mal
- **Explicación:** El paso 1 de `/hoy` pregunta los minutos y espera. No puede usar el Estimado (min) porque el paso 5 compara ese estimado con los minutos disponibles: si fueran el mismo valor, toda tarea "cabría".
- **Referencia:** `.claude/skills/hoy/SKILL.md`, pasos 1 y 5; `docs/decisions/0006`
- **Repasos:** 2026-11-13 — mal

### P2 — 2026-10-30 — Seguir el recorrido

- **Pregunta:** Si la tarea no quedó terminada, ¿qué guarda `/cerrar` en Notion para que la siguiente sesión sepa por dónde seguir?
- **Respuesta de Ronald:** Lo último en lo que nos quedamos.
- **Nota:** parcial
- **Explicación:** Guarda la sección "Dónde quedé" con qué se hizo, qué falta y el siguiente paso concreto; además deja el Estado en "En Progreso" y suma el Tiempo real. El siguiente paso es la pieza clave, y `/hoy` la lee en su paso 4.
- **Referencia:** `.claude/skills/cerrar/SKILL.md`, paso 5; `.claude/skills/hoy/SKILL.md`, paso 4
- **Repasos:** 2026-11-13 — parcial

### P3 — 2026-10-31 — Concepto

- **Pregunta:** ¿Por qué Mermaid CLI se instala como dependencia de desarrollo (`-d`)?
- **Respuesta de Ronald:** Porque solo se usa mientras se desarrolla, no cuando la aplicación está publicada.
- **Nota:** bien
- **Explicación:** Además, `bun install --production` la omite, lo que evita descargar Chromium en producción.
- **Referencia:** `CLAUDE.md`, Stack
- **Repasos:** —

### P4 — 2026-11-02 — Predecir

- **Pregunta:** Hoy es 2 de noviembre y corres `/repaso`. P1 está en "mal" desde el 30 de octubre y P2 en "parcial" desde el mismo día. ¿Cuáles te preguntaría y por qué?
- **Respuesta de Ronald:** Solo P1, porque P2 necesita 4 días.
- **Nota:** bien
- **Explicación:** Han pasado 3 días: P1 ("mal") cumple el mínimo de 2; P2 ("parcial") necesita 4 y aún no toca.
- **Referencia:** `.claude/skills/repaso/SKILL.md`, paso 2
- **Repasos:** —

### P5 — 2026-11-03 — Seguir el recorrido

- **Pregunta:** En la Fase 3 un usuario crea una factura desde Nuxt. Según el ADR 0001, ¿por qué piezas pasa ese dato hasta llegar a PostgreSQL? ¿Y qué problema concreto se evita al no usar Prisma en Nuxt?
- **Respuesta de Ronald:** A la hora de crear una factura, se validan los datos según las reglas de negocio y una vez validados esos datos van a la API de nestjs de la cual nestjs las guarda en PostgreSQL por lo que al tener un backend dedicado no tenemos la necesidad de usar Prisma en NUXT
- **Nota:** parcial
- **Explicación:** Bien: NestJS es quien guarda en PostgreSQL y Nuxt no necesita ORM. Faltó el recorrido en Nuxt (componente → composable `useFacturas` → cliente API tipado) y TypeORM entre NestJS y PostgreSQL. La validación no termina antes de la API: NestJS valida otra vez con los esquemas Zod de `packages/shared`. Faltó el problema concreto del ADR 0001: dos backends escribiendo en la misma base, con dos juegos de migraciones, y reglas fiscales (ITBIS, secuencias e-NCF) que podrían saltarse la API.
- **Referencia:** `docs/decisions/0001-typeorm-para-nestjs.md`; `CLAUDE.md`, Arquitectura de `apps/web` y de `apps/api`
- **Repasos:** 2026-11-13 — parcial

### P6 — 2026-11-06 — Predecir

- **Pregunta:** Con `scope-enum` limitado a `web`, `api` y `shared`, ¿qué pasa con cada uno de estos commits y por qué?: `feat(pagos): add form`, `docs: add notes`, `feat(web,api): share types`.
- **Respuesta de Ronald:** 1 - no pasa porque no tiene el scope de web, api o shared. 2 - tampoco especifica no pasa. 3 -es el único que pasa porque sí especifíca
- **Nota:** parcial
- **Explicación:** Acertó 1 y 3. Falló 2: `docs: add notes` pasa porque el scope es opcional y `scope-enum` solo lo valida cuando existe. Comprobado con commitlint: `feat(pagos)` sale con código 1; `docs` y `feat(web,api)` salen con código 0. Evidencia: comentario de `commitlint.config.mjs`, "Scope is optional (docs: ...), but when present it must name a package". En `feat(web,api)` cada scope se valida por separado (ADR 0014).
- **Referencia:** `commitlint.config.mjs`; `docs/decisions/0014-varios-scopes-por-commit.md`
- **Repasos:** —

### P7 — 2026-11-06 — Seguir el recorrido

- **Pregunta:** Escribes `git commit -m "arreglos varios"`. ¿Por qué piezas pasa ese mensaje hasta que el commit se cancela, y qué señal le indica a Git que debe cancelarlo?
- **Respuesta de Ronald:** No lo sé
- **Nota:** mal
- **Explicación:** Recorrido: Git guarda el mensaje en un archivo y dispara el hook `commit-msg`, que busca en `core.hooksPath` (`.husky/_`). Husky ejecuta `.husky/commit-msg`, que corre commitlint con la ruta del archivo en `$1`. commitlint falla y sale con un código distinto de 0; esa es la señal que hace que Git cancele el commit. Evidencia: `bunx --no-install commitlint --edit "$1"`.
- **Referencia:** `.husky/commit-msg`; `commitlint.config.mjs`
- **Repasos:** 2026-11-13 — parcial

### P8 — 2026-11-06 — Depurar

- **Pregunta:** Un compañero clona el repo y, sin correr `bun install`, hace un commit con el mensaje "foo bar". El commit entra sin error. ¿Por qué no funcionó el hook, si `.husky/commit-msg` está en el repo?
- **Respuesta de Ronald:** Le falta instalar esa dependecia para que se pueda ejecutar en git
- **Nota:** parcial
- **Explicación:** Bien: falta la instalación, y husky y commitlint no están en `node_modules`. Faltó la causa principal: Git no sabe dónde buscar los hooks. `core.hooksPath` se configura en el clon local cuando corre el script `prepare` durante `bun install`, y esa configuración no viaja con el repo. Sin ella, Git busca en `.git/hooks`, no encuentra `commit-msg` y crea el commit. Evidencia: `"prepare": "husky"` en `package.json`.
- **Referencia:** `package.json`, script `prepare`; `.husky/commit-msg`
- **Repasos:** —

### P9 — 2026-11-06 — Concepto

- **Pregunta:** ¿Por qué el script `prepare`, que llama a husky, fallaría en una instalación que omite las dependencias de desarrollo? ¿Y por qué husky se instala como dependencia de desarrollo?
- **Respuesta de Ronald:** Porque husky es una dependencia de desarrollo y por ende solo se ejecuta cuando se instalan estas. Husky es una dependencia de desarrollo porque no es una herramienta que se va a compilar para subir con el proyecto.
- **Nota:** parcial
- **Explicación:** Bien: husky es devDependency porque solo se usa al desarrollar y no llega a producción. Faltó el mecanismo del fallo: `prepare` no depende del tipo de instalación y corre igual. Como husky no se instaló, el comando no existe y falla con `command not found` (código 127). Si husky simplemente no se ejecutara, no habría error. Evidencia: `"prepare": "husky"` en `scripts` y husky en `devDependencies` de `package.json`.
- **Referencia:** `package.json`, `scripts` y `devDependencies`
- **Repasos:** —
