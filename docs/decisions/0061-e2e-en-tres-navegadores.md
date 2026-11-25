# 0061 — Los tests E2E corren en Chromium, Firefox y WebKit

- **Fecha:** 2026-11-24
- **Estado:** aceptada (WebKit en Docker: ver [0063](0063-webkit-en-docker.md))
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (T5, S1); tarea de Notion "Configurar Playwright"; [0059](0059-playwright-con-nuxt-test-utils.md)

## Contexto

Playwright puede correr los tests en tres motores: Chromium (Chrome, Edge), Firefox y WebKit (el motor de Safari y de todos los navegadores de iPhone).

## Opciones consideradas

1. **Solo Chromium** — a favor: una descarga (~150 MB) y tests más rápidos / en contra: un error propio de Safari o Firefox pasa sin verse.
2. **Chromium, Firefox y WebKit** — a favor: encuentra diferencias entre motores, por ejemplo para usuarios de iPhone / en contra: tres descargas (~400 MB) y el triple de tiempo.

## Decisión

Chromium, Firefox y WebKit, un proyecto de Playwright por motor.

## Por qué

En palabras de Ronald: "Para cubrir todos los casos borde posibles."

## Consecuencias

- `bunx playwright install chromium firefox` descarga Chromium y Firefox en cada máquina. WebKit viene en la imagen de Docker ([0063](0063-webkit-en-docker.md)).
- En Linux, Firefox puede necesitar librerías del sistema (`playwright install --with-deps`).
- Si los tests se vuelven lentos, se puede correr un solo proyecto mientras se escribe (`--project=chromium`). Así tampoco arranca Docker.
