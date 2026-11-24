# 0066 — Cada worker de E2E usa su propia caché de Vite

- **Fecha:** 2026-11-24
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (T6, S1); tarea de Notion "Layout con sidebar, header y layers vacías"; [0062](0062-e2e-contra-servidor-de-desarrollo.md), [0064](0064-e2e-con-tres-workers.md)

## Contexto

Con 3 workers (ADR 0064), algunas corridas seguían fallando 1 de 33 tests: la primera página de un worker se quedaba esperando la hidratación más de 30 s. Con un límite de 120 s, las primeras páginas cargaban en 10–18 s, así que la app no es lenta: algo interrumpía la carga.

Los logs nunca muestran que Vite descubra paquetes nuevos (`new dependencies optimized`), que es lo que arregla `optimizeDeps.include`. Muestran `Re-optimizing dependencies because vite config has changed`: los 3 servidores de desarrollo compartían una sola carpeta de caché (`node_modules/.cache/vite/client`), cada uno con una configuración algo distinta (puerto aleatorio), y al reconstruirla rompían la página que otro servidor estaba cargando.

## Opciones consideradas

1. **Pre-agrupar dependencias (`vite.optimizeDeps.include`)** — primera elección de Ronald / en contra: los logs indican que no ataca la causa (la caché compartida), así que el fallo podía seguir.
2. **Una carpeta de caché por worker** — a favor: ataca la causa; 33/33 en dos corridas / en contra: unas 3 veces más espacio en disco para la caché de Vite.
3. **Las dos** — en contra: más configuración que mantener; la parte de pre-agrupar no tenía evidencia de ayudar.

## Decisión

Una carpeta de caché de Vite por worker paralelo: `vite.cacheDir` = `node_modules/.cache/vite-e2e-<TEST_PARALLEL_INDEX>`, pasado con `nuxtConfig` en el fixture de `@nuxt/test-utils` (`playwright.config.ts`).

## Por qué

En palabras de Ronald: "Para que sea más rápido."

## Consecuencias

- Tiempos medidos: con caché compartida, 2,5–3,5 min (dos corridas con 1 fallo); con caché por worker, 2,6 y 2,8 min (sin fallos). La mejora comprobada es de fiabilidad; la de velocidad es pequeña o nula.
- Cada servidor sigue reoptimizando una vez al arrancar (puertos aleatorios), pero solo toca su propia caché.
- `TEST_PARALLEL_INDEX` se reutiliza cuando un worker se reinicia, así que siempre hay tantas carpetas como workers (3).
- La caché vive en `node_modules/.cache`, que git ignora.
