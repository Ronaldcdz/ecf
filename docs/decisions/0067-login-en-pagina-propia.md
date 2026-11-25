# 0067 — El login es una página propia, sin layout

- **Fecha:** 2026-11-25
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/login-con-sesion-simulada.md` (S1); tarea de Notion "T1 Register decisions (ADRs 0067–0073)"

## Contexto

La historia "Login con sesión simulada" necesita una pantalla de entrada. El layout actual (sidebar y header) es para la app ya autenticada. Había que decidir dónde vive el formulario.

## Opciones consideradas

1. **Página `/login` propia, fuera del layout del dashboard** — a favor: sin sidebar ni header, formulario centrado, no mezcla la entrada con la app / en contra: necesita un layout propio (o ninguno).
2. **Modal sobre el layout del dashboard** — a favor: el sidebar queda visible detrás / en contra: mostrar el menú de la app a alguien que aún no entró no tiene sentido.

## Decisión

Página `/login` propia, sin el layout del dashboard.

## Por qué

En palabras de Ronald: es una página que no tiene nada que ver con las otras páginas de la app, así que no necesita ningún layout.

## Consecuencias

- La página usa un layout vacío (o `layout: false`); el diseño de T2 define cómo se ve.
- Las rutas del dashboard y `/login` se tratan distinto en el middleware (ADR 0071).
