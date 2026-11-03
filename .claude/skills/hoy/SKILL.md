---
name: hoy
description: Elige la siguiente tarea de FacturaRD según los minutos disponibles hoy
argument-hint: [minutos disponibles]
disable-model-invocation: true
---

Minutos disponibles hoy: $ARGUMENTS

Sigue estos pasos usando el conector de Notion y las reglas de CLAUDE.md:

1. Si no se indicaron minutos, pregúntalos en una línea y espera la respuesta.
2. Calcula la fecha de hoy y el lunes de la semana actual.
3. Consulta la base de Tareas (`collection://16dfbf4e-fc63-4b6a-af1c-e961526cbbc0`) y obtén las tareas que cumplan todo esto:
   - Proyecto = FacturaRD (relación con la página https://app.notion.com/p/407ce09eb78b813db75cf00e147e4948)
   - Semana = el lunes de esta semana
   - Tipo = Tarea o Bug
   - Estado distinto de Realizado y Archivado
4. Si hay una tarea "En Progreso", propón continuarla primero. Lee la sección "Dónde quedé" de su página y resume en 2 líneas qué falta.
5. Si no hay ninguna en progreso, ordena por Orden (menor primero) y descarta las que tengan en "Bloqueado Por" alguna tarea que no esté Realizada. Elige la primera cuyo Estimado (min) quepa en los minutos disponibles.
   - Si sobra tiempo suficiente, propón también la siguiente que quepa.
   - Si ninguna cabe, propón dividir la tarea más pequeña en partes, o una tarea corta útil (escribir un test, documentar, revisar código).
6. Si no hay tareas para esta semana, dilo y propón tomar la siguiente historia sin empezar de la fase actual. Para empezarla, sigue "Precedencia sobre la configuración global" de CLAUDE.md: muestra el documento ODD (`odd/tasks/<historia>.md`) con sus tareas propuestas (estimado máximo 120 min, orden y dependencias) y espera la aprobación explícita de Ronald. Solo después crea las tareas en Notion como hijas de la historia (Parent-task), con el mismo nombre que su `T#`, y la rama de la historia.
7. Muestra, de forma breve:
   - La tarea, su historia padre y su estimado
   - Los criterios de aceptación de la historia que aplican a esta tarea
   - Un plan de 3 a 5 pasos
   - Quién escribe qué, según CLAUDE.md (Claude escribe el código, incluida la lógica de negocio; cada regla fiscal cita su fuente en `docs/dgii/` y lleva tests legibles; si la regla es ambigua o no tiene fuente, se pregunta antes)
   - Si la tarea depende de una "Decisión pendiente" de CLAUDE.md, dilo y no la propongas
8. Espera la confirmación de Ronald. Cuando confirme, cambia el Estado de la tarea a "En Progreso", cámbiate a la rama de su historia (nunca trabajes en `main`) y empieza.
