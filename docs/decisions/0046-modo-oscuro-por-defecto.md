# 0046 — Modo oscuro por defecto

- **Fecha:** 2026-11-19
- **Estado:** aceptada (sustituye el modo inicial de [0018](0018-paleta-y-modo-claro-oscuro.md); la paleta y el soporte de los dos modos siguen vigentes)
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (S6); tarea de Notion "Registrar decisiones de layout (ADRs)"

## Contexto

El ADR 0018 fijó el modo inicial en "Seguir al sistema". Al explicar el botón de dos estados ([0042](0042-boton-de-dos-estados-claro-oscuro.md)), Ronald dijo que quería "dark theme as default", lo que contradecía el ADR 0018, así que se le preguntó cuál de los dos aplica.

## Opciones consideradas

1. **Seguir al sistema (mantener 0018)** — a favor: respeta la preferencia del sistema operativo de cada usuario / en contra: el modo inicial cambia según el equipo.
2. **Oscuro por defecto (cambiar 0018)** — a favor: todos empiezan con el mismo modo, encaja con un control simple de dos estados / en contra: ignora la preferencia del sistema operativo hasta que el usuario pulse el botón.

## Decisión

Oscuro por defecto ("Dark by default"). El usuario cambia a claro con el botón de dos estados, y su elección se guarda.

## Por qué

En palabras de Ronald: "Como prefiero la simplicidad, es más fácil tener solo dos estados, con el tema oscuro por defecto."

## Consecuencias

- La tarea T6 configura el modo inicial en la layer `base` (`colorMode.preference: 'dark'` del módulo de color mode que usa Nuxt UI; se verifica la opción exacta en la documentación al implementarlo) y un test E2E comprueba que una visita nueva empieza en oscuro.
- El test de contraste AA de los dos modos (ADR 0018) sigue siendo necesario, porque el modo claro sigue disponible.
