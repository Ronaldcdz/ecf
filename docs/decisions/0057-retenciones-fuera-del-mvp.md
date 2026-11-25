# 0057 — Las retenciones de ITBIS e ISR no entran en el MVP

- **Fecha:** 2026-11-20
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (T3, S10); tarea de Notion "Diseñar pantalla Nueva factura 31/32"; `docs/alcance.md` ("Incluido en el proyecto completo"); `docs/dgii/formato-e-cf-v1.0.pdf`, p. 27 y 36

## Contexto

Algunos compradores, como las empresas que son agentes de retención, se quedan con una parte del ITBIS o del ISR al pagar y la entregan ellos mismos a la DGII. El e-CF lo informa en cada línea con `MontoITBISRetenido` ("retención que será realizado por el comprador") y `MontoISRRetenido`, y en el encabezado con `TotalITBISRetenido` y `TotalISRRetencion`. Estos campos son condicionales en el tipo 31 y no se permiten en el 32 (Formato, p. 27 y 36). Los porcentajes de retención vienen de otras normas de la DGII que aún no están en `docs/dgii/`. Había que decidir si "Nueva factura" maneja retenciones.

## Opciones consideradas

1. **Fuera del MVP** — a favor: el formulario más simple, sin reglas fiscales nuevas que documentar / en contra: una factura a un agente de retención no puede informar los montos retenidos hasta que se agregue.
2. **Montos manuales en el 31** — a favor: no hace falta documentar porcentajes / en contra: el usuario calcula los montos a mano.
3. **Automático según el cliente** — a favor: menos trabajo en cada factura / en contra: requiere agregar antes las normas de retención a `docs/dgii/` y marcar los clientes como agentes de retención.

## Decisión

"Nueva factura" no tiene campos de retención. Ningún e-CF del MVP envía `Retencion`, `TotalITBISRetenido` ni `TotalISRRetencion`.

## Por qué

En palabras de Ronald: "No está incluido en el MVP."

Comprobado: la lista "Incluido en el proyecto completo" de `docs/alcance.md` no menciona retenciones. Tampoco aparecen en "Fuera de alcance".

## Consecuencias

- Si un cliente es agente de retención, la retención se maneja fuera del sistema hasta que se agregue.
- Agregarlas después es una decisión nueva. Antes hace falta llevar a `docs/dgii/` la norma con los porcentajes, y probablemente un campo "agente de retención" en el cliente.
