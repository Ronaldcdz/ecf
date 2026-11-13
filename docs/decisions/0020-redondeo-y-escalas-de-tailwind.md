# 0020 — Redondeo medio y escalas de espaciado y breakpoints de Tailwind

- **Fecha:** 2026-11-13
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/sistema-de-diseno-base.md` (S1); tarea de Notion "Registrar decisiones de diseño (ADRs)"

## Contexto

Los criterios de la historia piden tokens de espaciado y breakpoints. En Nuxt UI, el redondeo de todos los componentes sale de la variable `--ui-radius` (por defecto `0.25rem`).

## Opciones consideradas

Redondeo:

1. **Recto (`0`)** — serio, tipo documento.
2. **Sutil (`0.25rem`)** — el valor por defecto, profesional.
3. **Medio (`0.5rem`)** — moderno, algo más amable.
4. **Redondeado (`0.75rem` o más)** — informal, tipo app móvil.

Espaciado y breakpoints:

1. **Escalas por defecto de Tailwind** (múltiplos de `0.25rem`; `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536 px) — a favor: conocidas y mantenibles. En contra: ninguna para este proyecto.
2. **Escalas propias en `@theme`** — a favor: control total. En contra: obliga a aprender una escala nueva sin una razón de diseño.

## Decisión

Redondeo "Medio" (`--ui-radius: 0.5rem`) y "Las por defecto de Tailwind" para espaciado y breakpoints, documentadas como los tokens del proyecto.

## Por qué

Ronald eligió el redondeo medio y las escalas por defecto. El criterio de aceptación prohíbe los valores sueltos (`p-[13px]`), no la escala de Tailwind.

## Consecuencias

Un valor fuera de la escala se considera "suelto" y lo marca la regla de lint (ADR 0021).
