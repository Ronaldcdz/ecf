# 0007 — `/cerrar` determina cómo quedó la tarea

- **Fecha:** 2026-11-04
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `.claude/skills/cerrar/SKILL.md`, [ADR 0005](0005-cierre-automatico-de-sesion.md)

## Contexto

Según el ADR 0005, `/cerrar` daba la tarea por Realizada si Ronald no decía lo contrario. Desde el ADR 0006, `/hoy` puede proponer tareas que no quepan en la sesión, así que quedar a medias es más probable.

## Opciones consideradas

1. **Determinar el estado y preguntar al final si se ajusta** — a favor: el cierre no se detiene y el estado refleja el trabajo real. En contra: Claude puede equivocarse al evaluar la tarea.
2. **Seguir dando la tarea por Realizada** — a favor: es lo más simple. En contra: una tarea a medias queda como Realizada si Ronald no la corrige.

## Decisión

Opción 1. Si Ronald no indica el estado, `/cerrar` compara lo que pide la tarea con lo que hay en el repo y lo hecho en la sesión. Al final dice qué estado puso y por qué, y pregunta si Ronald quiere ajustarlo.

## Por qué

En palabras de Ronald: "Ajusta la skill de cerrar para que determine de manera automatica como quedó la tarea pero que siga preguntando al final si se desea ajustar."

## Consecuencias

Si falta algo o no se puede comprobar, la tarea queda En Progreso. Esa regla la añadió Claude y se puede cambiar: es más fácil cerrar después una tarea abierta que notar una marcada como Realizada por error.
