# 0005 — `/cerrar` calcula el tiempo y asume la tarea terminada

- **Fecha:** 2026-11-04
- **Estado:** aceptada; la parte de dar la tarea por Realizada fue sustituida por [0007](0007-cerrar-determina-estado-de-tarea.md)
- **Decidido por:** Ronald Cadiz
- **Referencias:** `.claude/skills/hoy/SKILL.md`, `.claude/skills/cerrar/SKILL.md`

## Contexto

`/cerrar` preguntaba en cada sesión los minutos trabajados y si la tarea había quedado terminada. Esas preguntas frenaban el cierre aunque casi siempre se pudieran deducir.

## Opciones consideradas

1. **Calcular y asumir, avisando al final** — a favor: el cierre no necesita respuestas. En contra: el tiempo incluye las pausas y una tarea sin terminar podría quedar como Realizada si Ronald no corrige el aviso.
2. **Seguir preguntando** — a favor: los datos los confirma Ronald. En contra: añade pasos a cada sesión.

## Decisión

Opción 1. `/hoy` guarda la hora de inicio en `.atl/hoy-inicio` y `/cerrar` calcula los minutos desde esa hora. Si Ronald no indica lo contrario, la tarea queda como Realizada y `/cerrar` lo avisa al final.

## Por qué

En palabras de Ronald: "Quiero que saques el tiempo de forma automática si no se especifica desde que iniciamos con el comando "hoy" hasta que le dí a "cerrar". Lo de terminada dalo por hecho si no se especifica pero recuerda avisarlo al final tipo "se puso como default realizada si no lo es dimelo y lo ajusto"."

## Consecuencias

Si falta `.atl/hoy-inicio` o el cálculo supera 240 minutos, `/cerrar` pregunta los minutos, porque el dato sería poco fiable. Ese límite lo añadió Claude y se puede cambiar.
