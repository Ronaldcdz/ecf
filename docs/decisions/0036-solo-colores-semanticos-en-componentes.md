# 0036 — Solo colores semánticos en los componentes

- **Fecha:** 2026-11-18
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/sistema-de-diseno-base.md` (S3); ADR 0018, 0028; `apps/web/eslint.config.mjs`; tarea de Notion "Regla de lint contra valores sueltos"

## Contexto

S3 pide que ningún color ni espaciado quede fuera de los tokens, y lo hace cumplir con lint. Ya estaba decidido prohibir los valores arbitrarios (`p-[13px]`) y las paletas por defecto de Tailwind (`red-500`). Faltaba decidir si los componentes pueden usar directamente las escalas de marca (`brand-blue-200`) o las escalas semánticas con tono (`primary-100`).

## Opciones consideradas

1. **Permitir `brand-*`** — a favor: más libertad para fondos suaves y detalles. En contra: se puede elegir un tono que no pasa AA, y `brand-*` es fijo, no cambia entre modo claro y oscuro.
2. **Solo nombres semánticos** (`primary`, `neutral`, `success`… y las utilidades de Nuxt UI como `text-muted`, `bg-elevated`, `border-default`) — a favor: todo lo pintado ya pasó el test de contraste y cambia solo con el modo. En contra: menos libertad; si falta un tono hay que crear antes un token semántico.
3. **Intermedio: escalas semánticas con tono** (`bg-primary-100`) pero no `brand-*` — a favor: cambian con el modo. En contra: el tono elegido no pasa por el test de contraste.

## Decisión

Los componentes solo usan nombres semánticos sin tono. El lint rechaza cualquier color con tono (`*-500`, `brand-*-200`, `primary-100`), `black`/`white` y los valores arbitrarios (`[...]` y `(...)`).

## Por qué

Ronald: "I choose B, only semantic names but If in a near future we need more freedom we do something".

## Consecuencias

Si una pantalla necesita un tono que no existe, primero se agrega un token semántico en la layer `base` (cubierto por el test de contraste) o se relaja la regla con un nuevo ADR. Las variantes arbitrarias como `data-[state=open]:` también quedan bloqueadas; los estados se resuelven con los componentes de Nuxt UI.
