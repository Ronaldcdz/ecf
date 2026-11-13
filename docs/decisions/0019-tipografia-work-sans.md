# 0019 — Tipografía Work Sans

- **Fecha:** 2026-11-13
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/sistema-de-diseno-base.md` (S1); tarea de Notion "Registrar decisiones de diseño (ADRs)"

## Contexto

La app muestra montos en tablas y totales de ITBIS. Para que se alineen en columna, la fuente necesita cifras tabulares (característica OpenType `tnum`). También debe distinguir `0`/`O` y `1`/`l`/`I` (RNC, e-NCF) y tener los pesos que usa Nuxt UI (400 a 700).

## Opciones consideradas

1. **Sansation** — primera elección de Ronald. En contra: sin `tnum` (solo `liga`), dígitos de ancho muy distinto (el `1` mide 645 unidades y el `0`, 1445) y solo pesos 300, 400 y 700.
2. **Una de las 14 fuentes de Google Fonts verificadas con `tnum`** (Inter, IBM Plex Sans, Public Sans, Geist, Manrope, Work Sans…) — a favor: montos alineados. Se descartaron DM Sans, Lexend, Albert Sans y Urbanist por no tener `tnum`.

## Decisión

Work Sans, con `tabular-nums` en los montos.

## Por qué

Ronald quería elegir una fuente de Google Fonts. Al ver que Sansation desalineaba los montos, pidió una lista filtrada y eligió Work Sans de entre las verificadas.

## Consecuencias

La fuente se descarga desde Google Fonts. Si se cambia, la nueva debe tener `tnum`; si no, `tabular-nums` no tiene efecto.
