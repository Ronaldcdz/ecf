# 0053 — Los precios de las líneas se escriben sin ITBIS

- **Fecha:** 2026-11-20
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (T3, S10); tarea de Notion "Diseñar pantalla Nueva factura 31/32"; `docs/dgii/formato-e-cf-v1.0.pdf`, p. 6 y 18–20; captura del Facturador Gratuito de la DGII (2026-11-20)

## Contexto

El e-CF indica una sola vez por factura si los montos de las líneas incluyen ITBIS: `IndicadorMontoGravado`, "Valor 0 si los montos en las líneas … no tienen ITBIS incluido" y "Valor 1 si … se encuentran con ITBIS incluido" (Formato, p. 6). Por eso una factura no puede mezclar las dos formas. Con el valor 1, el monto gravado se calcula dividiendo entre (1 + tasa) (p. 18). Había que decidir cómo escribe el usuario los precios.

## Opciones consideradas

1. **Sin ITBIS** — a favor: el ITBIS se suma encima y el cálculo es directo / en contra: el usuario que piensa en el precio final tiene que restar el impuesto.
2. **Con ITBIS incluido** — a favor: el precio escrito es lo que paga el cliente / en contra: hay que calcular la base hacia atrás, con más riesgo de diferencias de redondeo.
3. **Elegir en cada factura** — a favor: cubre los dos casos / en contra: un interruptor más, y precios del catálogo que pueden no coincidir con la elección.

## Decisión

Los precios se escriben sin ITBIS, y el ITBIS se suma encima. `IndicadorMontoGravado` es siempre 0.

## Por qué

En palabras de Ronald: "Es más fácil de entender, y tomé como referencia el portal gratuito de la DGII."

La referencia se comprobó con una captura del Facturador Gratuito: una línea con precio 26,500 al 18 % da Monto Gravado 18 % = 26,500.00, ITBIS 18 % = 4,770.00 y Monto Total = 31,270.00. El precio escrito es la base, y el ITBIS se suma encima.

## Consecuencias

- El catálogo de servicios guarda el precio sin ITBIS. Esto afecta a la historia "Gestión de servicios con tasa de ITBIS".
- Total ITBIS por tasa = monto gravado de esa tasa × tasa (Formato, p. 18–20). Los montos se redondean a 2 decimales con la regla de redondeo del Informe Técnico (§13).
- Si más adelante se necesitan precios con ITBIS incluido, el formato de la DGII ya lo admite (valor 1). Sería una decisión nueva.
