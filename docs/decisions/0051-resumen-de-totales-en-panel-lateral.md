# 0051 — Resumen de totales en un panel lateral fijo

- **Fecha:** 2026-11-20
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (T3, S10); tarea de Notion "Diseñar pantalla Nueva factura 31/32"; `docs/dgii/formato-e-cf-v1.0.pdf`, p. 17–24

## Contexto

"Nueva factura" muestra los totales que exige el e-CF: monto gravado por tasa (18 %, 16 %, 0 %), ITBIS por tasa, monto exento y monto total. Este último es "Monto Gravado Total + Monto exento + Total ITBIS + Monto del Impuesto adicional" (Formato, p. 24). Los totales cambian con cada línea que se agrega o edita. Había que decidir dónde se ubica ese resumen en escritorio.

## Opciones consideradas

1. **Panel lateral fijo** — a favor: los totales y el botón "Emitir" siempre se ven mientras se editan las líneas / en contra: el formulario y la tabla de líneas tienen menos ancho.
2. **Debajo de las líneas** — a favor: se parece a una factura impresa y usa todo el ancho / en contra: con muchas líneas, hay que bajar para ver el total.
3. **Barra fija abajo** — a favor: el total siempre se ve sin quitar ancho / en contra: el desglose por tasa queda oculto hasta que se expande la barra.

## Decisión

En escritorio, un panel de resumen a la derecha que queda fijo al hacer scroll, con el desglose, el total y el botón "Emitir". El formulario y las líneas van a la izquierda. En móvil, el resumen pasa a una barra en la parte de abajo.

## Por qué

En palabras de Ronald: "Se ve mejor."

## Consecuencias

- La tabla de líneas tiene menos ancho en escritorio. El diseño de T3 debe comprobar que las columnas (servicio, cantidad, precio, ITBIS, monto) caben sin scroll horizontal a 1280 px.
- El panel solo muestra las tasas que tienen líneas, porque cada monto gravado e ITBIS por tasa es condicional a que existan líneas con esa tasa (p. 18–20).
- En móvil, la barra de abajo muestra el total y "Emitir", y el desglose se abre desde ella.
