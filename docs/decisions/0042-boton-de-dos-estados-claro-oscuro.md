# 0042 — Botón de dos estados para modo claro/oscuro

- **Fecha:** 2026-11-18
- **Estado:** aceptada (complementa [0018](0018-paleta-y-modo-claro-oscuro.md))
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (S6); tarea de Notion "Registrar decisiones de layout (ADRs)"

## Contexto

El ADR 0018 decidió que el modo inicial sigue al sistema. Faltaba decidir qué control usa el usuario para cambiarlo.

## Opciones consideradas

1. **Botón de dos estados** — a favor: un solo botón de icono (☀/☾) que alterna claro ↔ oscuro (`UColorModeButton` de Nuxt UI) / en contra: después del primer clic la app ya no sigue al sistema hasta que se borre la preferencia guardada.
2. **Selector de tres estados** — a favor: un menú con Sistema / Claro / Oscuro; el usuario puede volver a "Sistema" / en contra: un clic más para cambiar.
3. **Dentro del menú de usuario** — a favor: header más limpio / en contra: el control es menos visible.

## Decisión

Botón de dos estados ("Two-state button") con `UColorModeButton`. El modo inicial pasa a ser oscuro ([0046](0046-modo-oscuro-por-defecto.md)).

## Por qué

En palabras de Ronald: "Como prefiero la simplicidad, es más fácil tener solo dos estados, con el tema oscuro por defecto."

## Consecuencias

- No hay forma desde la interfaz de volver a "Seguir al sistema". Si se necesita, habría que cambiar a la opción 2.
