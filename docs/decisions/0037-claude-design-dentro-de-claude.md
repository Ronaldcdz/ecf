# 0037 — Sistema de diseño como artifact de Claude

- **Fecha:** 2026-11-18
- **Estado:** aceptada (precisa el "dónde" de [0023](0023-diseno-en-claude-design-antes-del-codigo.md))
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/sistema-de-diseno-base.md` (S5); tarea de Notion "Sistema de diseño en Claude Design"; [Move from standalone Claude Design to Claude](https://support.claude.com/en/articles/17440474-move-from-standalone-claude-design-to-claude)

## Contexto

El ADR 0023 decidió diseñar cada pantalla en Claude Design antes del código. Al empezar la tarea T5 se supo que la web independiente de Claude Design (claude.ai/design) cierra el 14 de diciembre de 2026, un día después de la demo del MVP. Claude Design pasa a vivir dentro de Claude como artifacts: el tipo "Design System" (tokens, guía y componentes) y el tipo "Design" (un lienzo con pantallas).

## Opciones consideradas

1. **Claude Design independiente (claude.ai/design)** — a favor: es lo que imaginó el ADR 0023. En contra: deja de funcionar en menos de un mes y habría que migrarlo; los chats y comentarios no se migran.
2. **Artifact "Design System" dentro de Claude** — a favor: sigue existiendo después del cierre, es privado hasta que se comparta y Claude Code puede leerlo al programar cada pantalla. En contra: no está verificado si el lienzo "Design" permite mover elementos a mano como la web anterior.
3. **Pausar T5 y replantear el ADR 0023** — a favor: decidir con calma dónde viven los diseños. En contra: retrasa la historia sin una alternativa concreta.

## Decisión

Opción 2: "B". El sistema de diseño vive en el artifact [FacturaRD](https://claude.ai/artifact/FuXmDC2NzoLkAfHksjykWD), creado desde los tokens del código.

## Por qué

"Porque así no tendremos que migrar nada para ningún lado". La opción A obligaba a mover todo antes del 14 de diciembre, y la C retrasaba la tarea para llegar al mismo lugar.

## Consecuencias

- El código sigue siendo la fuente de verdad: si cambia un token, se actualiza también el artifact.
- Las pantallas (empezando por la de crear factura, ADR 0024) se diseñarán con el tipo "Design" en Claude, usando este sistema de diseño.
- Los componentes del artifact son reproducciones estáticas de Nuxt UI; la referencia viva es la página `/design`.
