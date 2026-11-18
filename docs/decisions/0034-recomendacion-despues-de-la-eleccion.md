# 0034 — Claude recomienda después de que Ronald elige

- **Fecha:** 2026-11-17
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/sistema-de-diseno-base.md` (L5); ADR 0026–0033

## Contexto

Al decidir los tonos del tema (T2), Claude presentaba cada decisión con su recomendación. Ronald quiere razonar las opciones por su cuenta antes de conocer la opinión de Claude, porque el objetivo del proyecto es aprender.

## Opciones consideradas

1. **Opciones sin recomendación; Claude opina después de la elección** — a favor: Ronald razona solo y luego compara su criterio con el de Claude. En contra: decidir lleva un poco más de tiempo.
2. **Opciones con recomendación** (como antes) — a favor: decisiones más rápidas. En contra: la recomendación sesga la elección y se aprende menos.

## Decisión

Claude presenta las opciones con evidencia y consecuencias, sin recomendación ni lenguaje que incline la balanza. Después de que Ronald elige, Claude da su opinión y dice si está de acuerdo, con evidencia.

## Por qué

Ronald: "For learning purposes I don't want you to give me recommendations. I prefer you to recommend me after I make a choice."

## Consecuencias

Si una opción tiene un problema real (seguridad, accesibilidad, mala práctica), sigue apareciendo como consecuencia en la descripción de la opción, sin calificarla como recomendada o no. Se aplica desde el ADR 0026.
