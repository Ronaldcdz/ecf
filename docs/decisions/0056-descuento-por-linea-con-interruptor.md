# 0056 — Descuento por línea, oculto detrás de un interruptor

- **Fecha:** 2026-11-20
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (T3, S10); tarea de Notion "Diseñar pantalla Nueva factura 31/32"; [0048](0048-lineas-del-catalogo-o-texto-libre.md); [0053](0053-precios-sin-itbis.md); `docs/dgii/formato-e-cf-v1.0.pdf`, p. 40, 44 y 48

## Contexto

El formato de la DGII admite dos clases de descuento, las dos opcionales en los e-CF 31 y 32. La primera es el descuento por línea: cada ítem puede llevar hasta 12 subdescuentos, cada uno en monto (`$`) o en porcentaje (`%`), y su suma es el `DescuentoMonto` del ítem (Formato, p. 40). La segunda es el descuento global, que afecta al total del e-CF y debe repartirse entre los montos gravados por tasa (p. 48). El monto de cada línea es "(Precio Unitario del ítem * Cantidad) – Monto Descuento + Monto Recargo" (p. 44). Había que decidir qué descuentos admite "Nueva factura" y cómo se muestran.

## Opciones consideradas

Qué descuento admitir:

1. **Sin descuentos** — a favor: el formulario y el cálculo más simples / en contra: para hacer un descuento hay que bajar el precio a mano.
2. **Descuento por línea** — a favor: cada línea conserva su tasa de ITBIS, así que el cálculo es directo / en contra: un campo más por línea.
3. **Descuento global** — a favor: un solo campo para toda la factura / en contra: hay que repartir el descuento entre las tasas 18 %, 16 % y 0 %.
4. **Los dos** — a favor: cubre todos los casos / en contra: más campos, más reglas y más tests.

Cómo mostrar el campo:

1. **Enlace en cada línea** ("+ Descuento") — a favor: solo la línea con descuento cambia / en contra: un enlace repetido en cada línea.
2. **Un interruptor para todas las líneas** ("Aplicar descuentos") — a favor: un solo clic, y la tabla queda limpia mientras está apagado / en contra: al encenderlo, todas las líneas muestran la columna.
3. **Menú ⋯ de la línea** — a favor: el aspecto más limpio / en contra: la opción se ve menos.

## Decisión

Solo descuento por línea, en `$` o en `%`. Un interruptor "Aplicar descuentos" arriba de las líneas, apagado por defecto, muestra la columna Descuento en todas las líneas. Sin descuento global.

## Por qué

En palabras de Ronald: "Porque sí, pero lo quiero oculto por estética."

## Consecuencias

- Cada línea usa un solo subdescuento, aunque la DGII admite hasta 12 (p. 40).
- Con `%`, el monto del descuento es precio unitario × porcentaje × cantidad (p. 40). Monto de la línea = precio × cantidad − descuento (p. 44). El ITBIS se calcula sobre ese monto, con precios sin ITBIS ([0053](0053-precios-sin-itbis.md)).
- El descuento no puede ser negativo ni mayor que precio × cantidad, porque el monto de la línea debe ser ≥ 0 (p. 44).
- Si el usuario apaga el interruptor con descuentos escritos, falta definir qué pasa con esos valores. Se decide al programar la pantalla y queda como pregunta abierta.
- El descuento global (sección `DescuentoORecargo`, p. 48) queda fuera. Agregarlo después sería una decisión nueva.
