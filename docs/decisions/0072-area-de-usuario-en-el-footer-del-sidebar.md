# 0072 — Área de usuario y cierre de sesión en el footer del sidebar

- **Fecha:** 2026-11-25
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/login-con-sesion-simulada.md` (S7, S8); sustituye a [0041](0041-area-de-usuario-en-el-header.md); tarea de Notion "T1 Register decisions (ADRs 0067–0073)"

## Contexto

Con el login hace falta un botón "Cerrar sesión". El nombre del usuario estaba en un menú desplegable del header (ADR 0041). Había que decidir dónde poner el cierre de sesión y si el nombre se mueve con él.

## Opciones consideradas

1. **Item "Cerrar sesión" en el menú del header** — a favor: no cambia el diseño aprobado / en contra: queda escondido dentro de un menú.
2. **Botón separado en el footer del sidebar, con el nombre del usuario** — a favor: patrón común en apps de este tipo, siempre visible en escritorio / en contra: en móvil queda dentro del drawer; cambia el diseño aprobado.
3. **Solo el botón en el footer, nombre en el header** — a favor: cambio pequeño / en contra: el área de usuario queda partida en dos lugares.

## Decisión

Toda el área de usuario (nombre + "Cerrar sesión") pasa al footer del sidebar. El menú del header desaparece.

## Por qué

En palabras de Ronald: la mayoría de las apps de este tipo lo tienen justo ahí, y mover también el nombre es la mejor UI/UX.

## Consecuencias

- Sustituye la parte de usuario de ADR 0041; el botón de modo claro/oscuro y la empresa activa se quedan donde estaban.
- Según ADR 0023, la historia gana una tarea de diseño (T2) antes del código (T7).
- En móvil el área de usuario queda dentro del drawer; el diseño de T2 debe comprobar que se encuentra fácil.
- "Cerrar sesión" borra la cookie y el store de Pinia y lleva a `/login`.
