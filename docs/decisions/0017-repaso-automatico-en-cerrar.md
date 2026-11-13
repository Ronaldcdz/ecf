# 0017 — Repaso automático al final de `/cerrar`

- **Fecha:** 2026-11-06
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** [0003](0003-preguntas-de-comprobacion-en-notion.md); `.claude/skills/cerrar/`, `.claude/skills/repaso/`

## Contexto

`/repaso` solo corría cuando Ronald lo pedía, y ni `/hoy` ni `/cerrar` avisaban cuando tocaban preguntas. P1 y P2 llevaban días esperando sin que nada lo indicara.

## Opciones consideradas

1. **Al final de `/cerrar`** — a favor: no corta el desarrollo y no depende de acordarse. En contra: alarga el cierre unos minutos.
2. **Al inicio de `/hoy`** — a favor: se responde con la mente fresca. En contra: quita tiempo a sesiones de 20–30 min antes de empezar a trabajar.
3. **Rutina programada con aviso al móvil** — a favor: funciona sin abrir Claude Code. En contra: es otro sistema que mantener, y solo avisa.

## Decisión

Opción 1. `/cerrar` hace hasta 4 preguntas de repaso antes del commit: 2 viejas (de fases anteriores) y 2 actuales (de la fase de la tarea que se cierra). Si un grupo no llega, se completa con el otro. `/cerrar sin repaso` lo omite y `/cerrar repaso N` cambia la cantidad.

## Por qué

En palabras de Ronald: "Quiero que sea automático." Y sobre poder omitirlo: "Me gustaría poder avisar a cerrar que no haga las preguntas puesto que puedo estar haciendo varias tareas a la vez de forma fluida". Sobre la cantidad: "Quiero que sean 4. Dos viejas y dos actuales".

## Consecuencias

- Los minutos de la sesión se calculan antes del repaso, así que no cuentan en el Tiempo real de la tarea.
- Las preguntas creadas en ese mismo cierre no entran en el repaso; quedan Pendientes para el siguiente.
- `/repaso` se puede seguir corriendo a mano, con sus 3 preguntas por defecto y sin este reparto.
