# 0003 — Preguntas de comprobación al cerrar fases, guardadas en Notion

- **Fecha:** 2026-11-03
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** base de Notion "Preguntas de comprobación"; página "Instrucciones: preguntas de comprobación (Claude móvil)"; `.claude/skills/repaso/`, `.claude/skills/cerrar/`; ampliada por [0016](0016-cerrar-fase-con-preguntas-pendientes.md)

## Contexto

Claude hacía una pregunta de comprobación después de cada unidad de trabajo y esperaba la respuesta, lo que cortaba las sesiones cortas (20–30 min). Además, las preguntas solo vivían en `docs/aprendizaje/progreso.md`, así que no se podían responder fuera del ordenador.

## Opciones consideradas

1. **Notion + Claude móvil.** Las preguntas viven en una base de Notion; Ronald pide a Claude en el teléfono que se las haga, y Claude califica y guarda. A favor: Notion ya es la fuente de verdad de las tareas, y no suma herramientas. En contra: en el móvil Claude no ve el repo, así que cada pregunta debe traer su respuesta esperada y su evidencia.
2. **Página web (Artifact) con formulario.** A favor: interfaz a medida para el móvil. En contra: un sistema más que mantener aparte de Notion y del repo.
3. **Claude Code en el teléfono.** A favor: calificación con el código a la vista. En contra: el repo tiene que estar en GitHub, y hoy no hay permiso para hacer push.

## Decisión

Opción 1. Las preguntas se crean al cerrar una fase, una historia o un hito, en la base de Notion, que es la fuente de verdad. `progreso.md` pasa a ser una copia de solo lectura que sincronizan `/cerrar` y `/repaso`.

## Por qué

En palabras de Ronald: "Mejor esta tematica de las preguntas dejemosla para cuando terminemos alguna fase o algo en concreto para evitar interrumpir la velocidad de desarrollo. También en caso de que no me de tiempo me gustaría poder responder esas preguntas desde el telefono." Y sobre el canal: "Prefiero que la guardes en notion y yo preguntarle a Claude desde el móvil para que me las diga y así el las guarda ahí."

## Consecuencias

- Una sola fuente de verdad (Notion); el archivo del repo se sincroniza en una sola dirección.
- La calidad de la calificación en el móvil depende de la Respuesta esperada que se guarde al crear cada pregunta.
- Si el código cambia, `/repaso` actualiza la Respuesta esperada y la Referencia antes de preguntar.
