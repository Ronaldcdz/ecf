# 0002 — Claude Code escribe el código; Ronald decide el cómo

- **Fecha:** 2026-11-03
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** Acta de Constitución v1.2 (Restricciones; Interesados y roles); CLAUDE.md ("Cómo trabajar conmigo")

## Contexto

El acta v1.1 decía: "Claude Code se usa como asistente, sin delegarle la lógica de negocio central". En cambio, CLAUDE.md permitía que Claude implementara esa lógica (ITBIS, totales, validación de RNC y e-CF). Quien leyera los dos documentos encontraría una contradicción.

## Opciones consideradas

1. **Ronald escribe la lógica de negocio a mano.** A favor: dominio directo del código fiscal. En contra: va contra el objetivo de aprendizaje (entender el sistema sin escribir el código) y contra el tiempo disponible (≈ 5 h por semana).
2. **Claude escribe todo el código, incluida la lógica de negocio, siguiendo el cómo que define Ronald.** A favor: Ronald controla las decisiones y puede explicarlas, y los ADR, las fuentes de la DGII y los tests legibles dejan la evidencia. En contra: exige revisar y entender cada regla antes de aprobarla.

## Decisión

Opción 2. Claude Code escribe el código, incluida la lógica de negocio central, según las decisiones de Ronald. Cada regla fiscal cita su fuente y tiene tests legibles.

## Por qué

En palabras de Ronald: "Recuerda que solo usaré a claude para escribir código. El puede escribir la lógica pero yo le diré el cómo."

## Consecuencias

- El acta pasa a la versión 1.2, con las restricciones y la fila de Claude Code corregidas.
- Si una regla de la DGII es ambigua o no tiene fuente en `docs/dgii/`, Claude pregunta antes de implementarla.
