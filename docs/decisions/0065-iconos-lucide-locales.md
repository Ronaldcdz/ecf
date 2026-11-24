# 0065 — Los iconos de Lucide se instalan dentro de la app

- **Fecha:** 2026-11-24
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (T6); tarea de Notion "Layout con sidebar, header y layers vacías"

## Contexto

Nuxt UI trae el componente de iconos (`@nuxt/icon`) y usa el set Lucide (`i-lucide-*`), pero no trae los dibujos SVG. `@iconify/collections` solo es un catálogo con los nombres de los sets. Sin un paquete `@iconify-json/<set>` instalado, `@nuxt/icon` descarga cada icono de `https://api.iconify.design` (`fallbackToApi`).

## Opciones consideradas

1. **Dejar los iconos en la API de Iconify** — a favor: no se añade nada / en contra: la app depende de un servicio externo; si Iconify falla, está lento o bloqueado, los iconos no se ven.
2. **Instalar `@iconify-json/lucide` como dependencia de desarrollo** — a favor: `nuxt build` copia los iconos dentro de `.output/`, así que producción no necesita el paquete ni internet para mostrarlos / en contra: un paquete más en el proyecto.
3. **Instalarlo como dependencia normal** — mismo resultado para el usuario, pero `package.json` diría que la app lo necesita al ejecutarse, y no es cierto; una instalación solo de producción lo instalaría sin usarlo.

## Decisión

Instalar `@iconify-json/lucide` como dependencia de desarrollo de `apps/web`.

## Por qué

En palabras de Ronald: "Para que nuestra app no dependa de ningún servicio de terceros."

## Consecuencias

- Comprobado con `nuxt build`: el log dice `Nuxt Icon discovered local-installed 1 collections: lucide`, los iconos quedan en `.output/server/chunks/_/icons.mjs` (678 kB, 104 kB gzip) y `.output/` no contiene una copia de `@iconify-json/lucide`.
- El servidor incluye el set Lucide completo; el navegador solo recibe los iconos que usa cada página, desde nuestro propio servidor.
- Un icono de otro set (no Lucide) volvería a pedirse a la API de Iconify, salvo que se instale también su paquete.
