# 0018 — Paleta de colores y modo claro y oscuro

- **Fecha:** 2026-11-13
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/sistema-de-diseno-base.md` (S1); tarea de Notion "Registrar decisiones de diseño (ADRs)"

## Contexto

La historia "Sistema de diseño base" pide tokens de color con contraste WCAG AA. Nuxt UI usa colores semánticos (`primary`, `secondary`, `neutral`, `success`, `warning`, `info`, `error`), cada uno con una escala de 11 tonos. La app muestra estados de e-CF (aceptado, rechazado), así que el rojo y el verde ya tienen significado.

## Opciones consideradas

1. **Modo claro y oscuro** — a favor: Nuxt UI lo trae casi listo y es lo que esperan los usuarios. En contra: cada pareja de colores debe pasar AA en los dos modos.
2. **Solo modo claro** — a favor: menos trabajo ahora. En contra: añadirlo después obliga a revisar todos los tokens.

Para la paleta, Ronald partió de una de Coolors (`#1c1c1c`, `#f25f5c`, `#f1f2ee`, `#247ba0`, `#717c89`) y se midió el contraste de cada color:

- **Coral `#f25f5c`** — descartado: 3.2:1 sobre blanco (no pasa AA) y se confunde con `error`.
- **Vino `#88292f`** — Ronald quería un color "mas o menos rojo"; pasaba AA (8.73:1), pero seguía en la familia de `error`.
- **Morado `#2f0147`** — 17.27:1 sobre blanco y sin conflicto con los estados.

## Decisión

Modo claro y oscuro, y modo inicial "Seguir al sistema". Paleta: `primary` azul `#247ba0`, `secondary` morado `#2f0147`, `neutral` gris pizarra `#717c89` con `#1c1c1c` y `#f1f2ee` como extremos. Los colores de estado usan las paletas estándar de Tailwind.

## Por qué

Ronald eligió "Si, claro y oscuro" y "Seguir al sistema". Cambió el vino por el morado ("el vino, el gris se queda") y eligió "azul como primary". El morado es tan oscuro que, como botón principal, se vería casi negro.

## Consecuencias

- Cada color de marca se convierte en una escala 50–950; en modo oscuro se usan tonos claros de la misma escala (el morado sobre `#1c1c1c` da 1.01:1).
- Un test de Vitest comprueba el contraste AA de los tokens en los dos modos.
- Los estados nunca dependen solo del color: llevan texto e icono (WCAG 1.4.1).
