# 0016 — Una fase se puede cerrar con preguntas pendientes

- **Fecha:** 2026-11-06
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** sustituye a [0015](0015-responder-preguntas-antes-de-cerrar-fase.md); amplía [0003](0003-preguntas-de-comprobacion-en-notion.md); `.claude/skills/cerrar/`; propiedad "Preguntas respondidas el" de la base de Tareas

## Contexto

El ADR 0015 exigía responder todas las preguntas de una fase antes de marcarla como Realizada. El mismo día, mientras respondía las de Fase 0, Ronald cambió la regla: la fase se puede cerrar, pero debe quedar visible si sus preguntas ya se respondieron.

## Opciones consideradas

1. **Mantener el ADR 0015** — a favor: ninguna fase concluye sin comprobar lo aprendido. En contra: una fase con el trabajo terminado sigue En Progreso.
2. **Casilla "Preguntas respondidas" en la fase** — a favor: la más simple. En contra: no guarda cuándo se respondieron.
3. **Fecha "Preguntas respondidas el" en la fase** — a favor: vacía indica que faltan preguntas y llena indica cuándo se terminaron. En contra: la base de preguntas no tiene relación con la de Tareas, así que la fecha no se calcula sola.

## Decisión

Opción 3. Una fase puede pasar a Realizada con preguntas pendientes, y la propiedad "Preguntas respondidas el" de la base de Tareas distingue si ya se respondieron todas.

## Por qué

En palabras de Ronald: "Cambia la regla de que se necesitan responder todas las preguntas para cerrar la fase, mejor ponla que se pueda cerrar pero agrega una propiedad que permita distinguir cuando se respondieron las preguntas o algo así."

## Consecuencias

- `/cerrar` rellena la fecha en cada fase Realizada que la tenga vacía, cuando ya no le quedan preguntas Pendientes. Usa la Fecha respuesta más reciente de esas preguntas.
- Si Ronald responde desde el móvil, la fecha se rellena en el siguiente `/cerrar`.
- Una pregunta con nota "mal" cuenta como respondida y sigue su curso en `/repaso`.
