# 0045 — Store de sesión con Pinia y datos simulados

- **Fecha:** 2026-11-18
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (S9); tarea de Notion "Registrar decisiones de layout (ADRs)"

## Contexto

El header muestra el nombre del usuario y de la empresa activa ([0041](0041-area-de-usuario-en-el-header.md)), pero la historia de Login todavía no existe. `CLAUDE.md` ya fija Pinia solo para estado global (sesión, empresa activa).

## Opciones consideradas

1. **Store de Pinia con datos simulados** — a favor: el layout lee la sesión del mismo lugar que usará Login / en contra: instalar Pinia y escribir el store ahora.
2. **Texto fijo en el layout** — a favor: menos código ahora / en contra: la historia de Login tiene que reemplazarlo por el store (una refactorización después).
3. **Dejarlos fuera por ahora** — a favor: el header solo muestra el título y el botón de modo / en contra: el diseño los muestra y Login tendría que añadirlos.

## Decisión

Store de sesión con Pinia (usuario + empresa activa) con valores simulados fijos ("Pinia store with mock data"). La historia de Login lo llena de verdad y añade "Cerrar sesión".

## Por qué

En palabras de Ronald: "Es más fácil manipular datos almacenados."

## Consecuencias

- La tarea T4 instala `@pinia/nuxt` en `apps/web` y crea el store en la layer `base`, con tests de Vitest de su estado inicial.
