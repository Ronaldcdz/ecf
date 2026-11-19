# 0041 — Área de usuario en el header, arriba a la derecha

- **Fecha:** 2026-11-18
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (S5); tarea de Notion "Registrar decisiones de layout (ADRs)"

## Contexto

El layout debe mostrar el nombre de la empresa activa, el botón de modo claro/oscuro y el menú del usuario. Había que decidir dónde ponerlos.

## Opciones consideradas

1. **Header, arriba a la derecha** — a favor: el título de la página a la izquierda y empresa + botón + menú de usuario a la derecha; siempre visibles, también en móvil / en contra: el header tiene más elementos.
2. **Parte inferior del sidebar** — a favor: empresa arriba del sidebar y botón + menú de usuario abajo; header mínimo / en contra: en móvil quedan escondidos dentro del drawer.

## Decisión

Header, arriba a la derecha ("Header, top right"), también en móvil.

## Por qué

En palabras de Ronald: "Porque me gusta."

## Consecuencias

- En móvil el header debe tener espacio para el botón ≡, el título, la empresa, el botón de modo y el menú de usuario; el diseño de T2 debe comprobar que caben.
