# 0058 — El selector de tipo de e-CF es una lista desplegable

- **Fecha:** 2026-11-20
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (T3, S10); tarea de Notion "Diseñar pantalla Nueva factura 31/32"; [0047](0047-selector-de-tipo-arriba-del-formulario.md); canvas de Claude Design "FacturaRD — Layout" (https://claude.ai/artifact/3g7JXRsoMDMz3JG8vZAunZ)

## Contexto

[0047](0047-selector-de-tipo-arriba-del-formulario.md) decidió que el tipo de e-CF se elige con un selector arriba del formulario, pero no fijó su forma visual. El primer diseño de T3 lo dibujó como un control segmentado (dos botones juntos: "31 · Crédito fiscal" | "32 · Consumo"). Ronald preguntó por qué había "dos pestañas", y con eso se vio que esa forma no estaba decidida. Con las notas de débito (33) y crédito (34) de la Fase 5 serían cuatro opciones, y cuatro segmentos no caben bien en un teléfono de 390 px.

## Opciones consideradas

1. **Control segmentado** — a favor: las opciones siempre se ven y se cambia con un toque / en contra: con cuatro tipos queda apretado en móvil.
2. **Lista desplegable** — a favor: ocupa lo mismo con 2 o con 10 tipos / en contra: las demás opciones no se ven hasta abrir la lista.
3. **Tarjetas de opción** — a favor: cada tipo explica cuándo usarlo / en contra: es lo que más espacio vertical ocupa.

## Decisión

El tipo de e-CF se elige con una lista desplegable con la etiqueta "Tipo de comprobante" y opciones "31 · Crédito fiscal" y "32 · Consumo", arriba del formulario.

## Por qué

En palabras de Ronald: "Es más fácil agregar más tipos de factura."

## Consecuencias

- Agregar el 33 y el 34 en la Fase 5 es agregar opciones a la lista. El control no cambia de tamaño.
- Los tipos y sus nombres se definen una sola vez en `packages/shared`, igual que los tipos de ingreso ([0054](0054-tipo-de-ingreso-por-defecto-01.md)).
- El diseño de T3 ya usa la lista en escritorio y en móvil (versión 20 del canvas).
