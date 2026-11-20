# 0054 — Tipo de ingreso visible, con 01 por defecto

- **Fecha:** 2026-11-20
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (T3, S10); tarea de Notion "Diseñar pantalla Nueva factura 31/32"; `docs/dgii/formato-e-cf-v1.0.pdf`, p. 6

## Contexto

El tipo de ingresos (`TipoIngresos`) es obligatorio en los e-CF 31 y 32, con estos códigos: "01: Ingresos por operaciones (No financieros)", "02: Ingresos Financieros", "03: Ingresos Extraordinarios", "04: Ingresos por Arrendamientos", "05: Ingresos por Venta de Activo Depreciable" y "06: Otros Ingresos" (Formato, p. 6). El negocio vende servicios, que son ingresos por operaciones. En el Facturador Gratuito de la DGII, este campo empieza vacío. Había que decidir cómo lo maneja "Nueva factura".

## Opciones consideradas

1. **Lista con 01 por defecto** — a favor: el caso común no pide ningún paso, y el usuario aún puede cambiarlo / en contra: un valor por defecto se puede dejar sin revisar cuando no aplica.
2. **Lista sin valor por defecto** — a favor: el usuario decide de forma consciente en cada factura / en contra: un paso más en cada factura, casi siempre con la misma respuesta.
3. **Oculto, siempre 01** — a favor: el formulario más corto / en contra: no permite facturar otro tipo de ingreso.

## Decisión

Una lista visible con "01 Ingresos por operaciones (No financieros)" seleccionado por defecto. El usuario puede cambiarlo.

## Por qué

En palabras de Ronald: "Porque la mayoría de las facturas van a usar esa opción por defecto."

## Consecuencias

- El campo nunca va vacío al emitir, así que la regla de obligatoriedad de la DGII se cumple siempre.
- Los seis códigos y sus textos vienen del Formato (p. 6) y se definen una sola vez en `packages/shared`.
