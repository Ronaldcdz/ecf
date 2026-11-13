# 0024 — Diseño por módulos, con la pantalla de factura adelantada

- **Fecha:** 2026-11-13
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** [0023](0023-diseno-en-claude-design-antes-del-codigo.md); `odd/tasks/sistema-de-diseno-base.md` (S5); historia de Notion "Layout y navegación"

## Contexto

Con el flujo de ADR 0023, Ronald preguntó si primero se diseña toda la app del alcance o si se diseña y programa por módulos. Las fases de Notion ya tienen fechas (Fase 1 hasta el 29 de noviembre) que Claude no puede cambiar.

## Opciones consideradas

1. **Todo el diseño primero** — a favor: coherencia total. En contra: semanas sin código y choca con las fechas de las fases.
2. **Diseño y código por módulos** — a favor: encaja con las historias y cada diseño aprovecha lo aprendido. En contra: una pantalla tardía puede obligar a retocar otra ya programada.
3. **Por módulos, con la factura adelantada** — como la opción 2, pero la pantalla de crear factura 31/32 se diseña junto al layout, como un *spike* de diseño, porque condiciona qué datos necesitan clientes y servicios.

## Decisión

Opción 3: "por módulos con la factura adelantada".

## Por qué

Encaja con el calendario y reduce el riesgo más grande: descubrir tarde que clientes o servicios necesitan un campo que pide la factura.

## Consecuencias

La historia "Layout y navegación" incluye el diseño de la pantalla de crear factura. Su código sigue en la Fase 2.
