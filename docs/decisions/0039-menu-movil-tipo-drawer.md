# 0039 — Menú móvil tipo drawer (hamburguesa)

- **Fecha:** 2026-11-18
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (S3); tarea de Notion "Registrar decisiones de layout (ADRs)"

## Contexto

Uno de los criterios de la historia es "Layout responsivo (escritorio y móvil)". En pantallas pequeñas el sidebar de escritorio ([0038](0038-sidebar-colapsable-que-se-recuerda.md)) no cabe, así que hace falta otra forma de navegar.

## Opciones consideradas

1. **Drawer (hamburguesa)** — a favor: mismas opciones que en escritorio; un botón ≡ en el header abre el menú sobre el contenido / en contra: un toque más para navegar.
2. **Barra de pestañas inferior** — a favor: iconos fijos abajo, siempre visibles, un solo toque / en contra: solo caben pocas opciones (3–5).

## Decisión

Drawer ("Drawer (hamburger)"): el botón ≡ del header abre el menú sobre el contenido y se cierra al cambiar de ruta.

## Por qué

En palabras de Ronald: "Porque es más fácil mostrar todos los botones, pero puede cambiar en el futuro."

## Consecuencias

- Ronald deja abierta la opción de cambiarlo más adelante (por ejemplo, a la barra de pestañas inferior); si cambia, se registra en un ADR nuevo que sustituya a este.
- `UDashboardSidebar` ya abre como slideover en móvil y se cierra al cambiar de ruta, así que no hace falta un componente propio.
- Los tests E2E de T6 deben abrir el drawer en un ancho de móvil.
