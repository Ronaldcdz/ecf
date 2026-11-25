# 0050 — Tipo de pago y una forma de pago opcional

- **Fecha:** 2026-11-20
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (T3, S10); tarea de Notion "Diseñar pantalla Nueva factura 31/32"; `docs/dgii/formato-e-cf-v1.0.pdf`, p. 7–8

## Contexto

En los e-CF 31 y 32, el tipo de pago (`TipoPago`) es obligatorio: "1: Contado 2: Crédito 3: Gratuito". La fecha límite de pago (`FechaLimitePago`) es condicional: "Solo para facturas a crédito", y "debe ser ≥ Fecha de emisión". La forma de pago (`FormaPago`) es opcional en el 31 y el 32, admite hasta 7 repeticiones, cada una con su monto (`MontoPago`), y no se permite en los tipos 34 y 43 (Formato, p. 7–8). Había que decidir qué campos de pago muestra "Nueva factura".

## Opciones consideradas

1. **Solo el tipo de pago** — a favor: el formulario más corto / en contra: no queda registrado cómo pagó el cliente.
2. **Tipo de pago y una forma de pago** — a favor: registra cómo se pagó sin complicar el formulario / en contra: no representa pagos divididos (por ejemplo, parte en efectivo y parte con tarjeta).
3. **Tipo de pago y varias formas, cada una con su monto** — a favor: representa cualquier combinación de pagos / en contra: más campos, y la suma de los montos debe cuadrar con el total.

## Decisión

El formulario muestra el tipo de pago (Contado / Crédito / Gratuito), una forma de pago opcional por el monto total, y la fecha límite de pago cuando el tipo es Crédito.

## Por qué

En palabras de Ronald: "Solo para fines de análisis, y es opcional."

## Consecuencias

- La forma de pago se guarda para reportes, no es obligatoria y cubre el monto total de la factura.
- Las reglas de la DGII que aplican: la fecha límite de pago es ≥ a la fecha de emisión, y la forma "Bonos o Certificados de regalo" (código 5) solo vale en el 32 (p. 7–8). El formulario la oculta o la rechaza en el 31.
- Cuando llegue el tipo 34 (Fase 5), el formulario oculta la forma de pago para ese tipo, porque la DGII no la permite.
- Si más adelante se necesitan pagos divididos, se pasa de una forma a una lista. El formato de la DGII ya lo admite (hasta 7).
