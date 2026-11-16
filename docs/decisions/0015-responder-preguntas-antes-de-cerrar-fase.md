# 0015 — Responder las preguntas de una fase antes de concluirla

- **Fecha:** 2026-11-06
- **Estado:** sustituida por [0016](0016-cerrar-fase-con-preguntas-pendientes.md)
- **Decidido por:** Ronald Cadiz
- **Referencias:** amplía [0003](0003-preguntas-de-comprobacion-en-notion.md); `.claude/skills/cerrar/`; base de Notion "Preguntas de comprobación"

## Contexto

El ADR 0003 fija cuándo se crean las preguntas de comprobación (al cerrar una fase, una historia o un hito), pero no exige responderlas. Al terminar las tareas de Fase 0 quedaron P5 a P9 en Pendiente, y nada impedía marcar la fase como Realizada.

## Opciones consideradas

1. **Dejar las preguntas sin relación con el cierre** — a favor: el avance nunca se detiene por ellas. En contra: una fase puede concluir sin comprobar que Ronald entiende lo construido.
2. **Exigir que estén respondidas antes de concluir la fase** — a favor: el objetivo de aprendizaje se comprueba en cada fase. En contra: una fase con el trabajo terminado puede seguir En Progreso hasta que Ronald responda.

## Decisión

Opción 2. Una fase solo pasa a Realizada cuando todas sus preguntas en la base de Notion (propiedad Fase) tienen Estado = Respondida.

## Por qué

En palabras de Ronald: "Pongamos esa regla. Tenemos que responder todas las preguntas de las tareas antes de concluir una fase".

## Consecuencias

- `/cerrar` comprueba las preguntas de la fase antes de proponer marcarla como Realizada.
- La regla pide que estén respondidas, no que estén bien: una pregunta con nota "mal" cuenta como respondida y sigue su curso en `/repaso`.
- La regla se aplica a concluir la fase, no a empezar la siguiente.
- Fase 0 sigue En Progreso hasta que P5 a P9 estén respondidas.
