# 0083 — Rutas públicas: `/login` y `/design`

- **Fecha:** 2026-11-25
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/login-con-sesion-simulada.md` (S5, T6); tarea de Notion "T6 Route protection middleware and redirects + E2E"

## Contexto

Las rutas están protegidas por middleware (criterio de la historia). Había que decidir qué rutas se pueden abrir sin sesión. `/design` es la página del sistema de diseño; solo muestra datos de ejemplo (ADR 0022).

## Opciones consideradas

1. **Solo `/login` es pública** — a favor: la regla más simple, todo lo demás pide sesión / en contra: la página de diseño tampoco se puede enseñar sin entrar.
2. **`/login` y `/design` son públicas** — a favor: la página de diseño se puede enseñar, por ejemplo a un reclutador, sin iniciar sesión; no tiene datos reales / en contra: hay una segunda excepción que mantener.

## Decisión

`/login` y `/design` son públicas. Cualquier otra ruta pide sesión.

## Por qué

Ronald eligió la opción 2 sin añadir un motivo propio.

## Consecuencias

- Una página pública nueva debe mostrar solo datos de ejemplo.
- Cómo se declara una ruta pública está en el ADR 0084.
