# 0033 — `text-dimmed` con el mismo tono que `text-muted`

- **Fecha:** 2026-11-17
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/sistema-de-diseno-base.md` (S1, L4); ADR 0026; `apps/web/layers/base/app/theme/theme.test.ts`; tarea de Notion "Configurar tokens y tema de Nuxt UI"

## Contexto

El test de contraste de T2 encontró que Nuxt UI v4.12 usa `text-dimmed` para el texto de ayuda dentro de los campos (`placeholder:text-dimmed` en input, textarea, select…). Con los valores por defecto da 2,58:1 en modo claro (`brand-gray-400`) y 4,01:1 en modo oscuro (`brand-gray-500`): no pasa AA. WCAG trata el placeholder como texto; solo los elementos deshabilitados están exentos.

## Opciones consideradas

1. **`text-dimmed` igual que `text-muted`** (600 en claro, 400 en oscuro: 7,82:1 y 6,58:1) — a favor: placeholders y texto deshabilitado pasan AA con una sola variable por modo. En contra: en modo claro `dimmed`, `muted` y `toned` se ven iguales.
2. **Solo los placeholders usan `text-muted`**, sobrescribiendo el tema de cada componente con placeholder en `app.config.ts` — a favor: `dimmed` sigue claro para lo deshabilitado. En contra: configuración extra en varios componentes.
3. **Dejar los valores por defecto y registrar una excepción** — a favor: sin cambios. En contra: los placeholders no pasan AA, contra S1.

## Decisión

`--ui-text-dimmed` usa `neutral-600` en modo claro y `neutral-400` en modo oscuro.

## Por qué

Ronald eligió "A" sin recomendación previa.

## Consecuencias

En modo claro hay menos niveles visuales de texto gris; la jerarquía se apoya en tamaño y peso de la fuente. El texto deshabilitado se verá menos "apagado" que en el Nuxt UI estándar; Nuxt UI también reduce la opacidad de los componentes deshabilitados.
