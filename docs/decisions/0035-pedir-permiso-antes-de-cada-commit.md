# 0035 — Claude pide permiso antes de cada commit

- **Fecha:** 2026-11-17
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** commits `5d3b963`, `f4130c2` y `5326865` (T2 de `odd/tasks/sistema-de-diseno-base.md`); sección "Precedencia sobre la configuración global" de `CLAUDE.md`

## Contexto

La configuración global (ODD) permite que Claude haga commits por unidad de trabajo en la rama de la historia sin preguntar. Al cerrar T2, Claude hizo tres commits sin que Ronald revisara antes los cambios.

## Opciones consideradas

1. **Pedir permiso antes de cada commit** — a favor: Ronald revisa todo antes de que entre al historial y entiende lo que se versiona. En contra: un paso más al cerrar cada unidad.
2. **Commits automáticos por unidad de trabajo** (regla global de ODD) — a favor: más rápido. En contra: Ronald revisa después, cuando el cambio ya está en el historial.

## Decisión

Claude no hace ningún commit sin permiso. Al terminar una unidad, muestra los archivos, un resumen de los cambios y el mensaje propuesto, y espera la aprobación de Ronald.

## Por qué

Ronald: "I prefer you to ask me before committing so I can review whatever you did."

## Consecuencias

Sustituye la regla global de commits automáticos de ODD en este repositorio. Los commits de T2 ya hechos se quedan; Ronald puede revisarlos con `git show`. `git push` y PR siguen necesitando permiso aparte.
