---
name: cerrar
description: Cierra la sesión de trabajo y registra el avance en Notion
argument-hint: [minutos trabajados]
disable-model-invocation: true
---

Minutos trabajados en esta sesión: $ARGUMENTS

Sigue estos pasos usando el conector de Notion y las reglas de CLAUDE.md:

1. Identifica la tarea en curso (Estado = "En Progreso" en la base de Tareas, semana actual). Si hay más de una, pregunta cuál se cierra.
2. Si no se indicaron minutos, pregúntalos en una línea.
3. Pregunta a Ronald, en un solo mensaje:
   - ¿La tarea quedó terminada? (sí / no)
4. Revisa el estado del repo:
   - Los commits van en la rama de la historia, nunca en `main`.
   - Si hay cambios sin commit, propón el mensaje (Conventional Commits con scope) y pide permiso antes de hacer el commit. Si mezcla código escrito por Ronald y por Claude, propón commits separados.
   - Obtén el hash del último commit de la sesión. Si hay remoto en GitHub, arma el enlace al commit; si no, usa el hash corto.
   - Si se terminó la tarea, corre antes `bun run lint`, `bun run typecheck` y `bun run test`. Si algo falla, avisa y no la marques como terminada.
5. Actualiza la tarea en Notion:
   - Tiempo real (min): suma los minutos de esta sesión al valor que ya tenga.
   - Commit / PR: el enlace o hash.
   - Si terminó: Estado = "Realizado" y "Realizado el" = hoy.
   - Si no terminó: deja Estado = "En Progreso" y escribe o actualiza en la página una sección "Dónde quedé" con 2 o 3 líneas: qué se hizo, qué falta y el siguiente paso concreto.
6. Si la tarea terminó y todas las tareas hermanas de la historia están Realizadas, pregunta si se marca la historia como Realizada.
7. Si la tarea tiene documento ODD, marca su `T#` y anota el commit en `odd/tasks/<historia>.md`.
8. Preguntas y decisiones, antes del commit:
   - Si con esta tarea se cierra una fase, una historia o un hito, crea de 3 a 5 preguntas en la base de Notion "Preguntas de comprobación" (`collection://04fa9bf1-44ab-4070-9799-b925ae13e3e6`) con Estado = Pendiente, Respuesta esperada con evidencia del código y Referencia, siguiendo CLAUDE.md. Avísale a Ronald que puede responderlas desde el móvil.
   - Sincroniza `docs/aprendizaje/progreso.md` desde Notion: copia las preguntas Respondidas que falten y los repasos nuevos, con el formato del archivo, y recalcula el resumen. Nunca edites en el archivo algo que no esté en Notion.
   - Comprueba que cada decisión de Ronald tiene su ADR en `docs/decisions/`. Si falta alguno, créalo.
9. Termina con un resumen de 3 líneas: qué se hizo y por qué, tiempo estimado vs. real con el puntaje de la sesión, y cuál es la siguiente tarea de la semana.

No hagas `git push` sin permiso.
