# 0064 — Los tests E2E corren con tres workers

- **Fecha:** 2026-11-24
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (T6, S1); tarea de Notion "Layout con sidebar, header y layers vacías"; [0059](0059-playwright-con-nuxt-test-utils.md), [0062](0062-e2e-contra-servidor-de-desarrollo.md)

## Contexto

Playwright reparte los tests entre *workers*: procesos separados que corren en paralelo. Por defecto usa la mitad de los núcleos de la CPU (6 en la máquina de Ronald). `@nuxt/test-utils` arranca un servidor de desarrollo de Nuxt por cada worker, así que 6 workers significan 6 servidores compilando a la vez.

Con los 33 tests de T6, la primera página de 4 a 6 workers tardó más de 30 s y falló por tiempo; Vite además avisó de un choque en el puerto de HMR (`Port 24678 is already in use`). Con 3 workers pasaron los 33 tests en 2,5 min, más rápido que con 6.

## Opciones consideradas

1. **Limitar a 3 workers** — a favor: una línea en `playwright.config.ts`, mantiene un servidor por worker (ADR 0059 y 0062 sin cambios) y ya se comprobó que pasa / en contra: quizá haya que ajustar el número en otra máquina o en CI.
2. **Un solo servidor de desarrollo compartido** — a favor: menos servidores y sin choque de puertos / en contra: cambia cómo se usa el ADR 0059 y exige más trabajo.
3. **Más tiempo para la primera carga** — a favor: el cambio más pequeño / en contra: esconde el arranque lento y mantiene el choque del puerto de HMR.

## Decisión

Limitar Playwright a 3 workers (`workers: 3`).

## Por qué

En palabras de Ronald: "Para que mi máquina no se ponga lenta."

## Consecuencias

- Más archivos de tests no suben el número de servidores: siguen siendo 3.
- El aviso del puerto de HMR puede aparecer aún con 3 workers; hoy no hace fallar ningún test.
- Revisar el número al configurar los E2E en GitHub Actions, porque esa máquina tiene otros núcleos.
