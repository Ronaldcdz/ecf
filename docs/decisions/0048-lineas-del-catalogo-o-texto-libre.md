# 0048 — Líneas de factura: del catálogo o texto libre, con opción de guardar

- **Fecha:** 2026-11-20
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (T3, S10); tarea de Notion "Diseñar pantalla Nueva factura 31/32"; `docs/dgii/formato-e-cf-v1.0.pdf`, p. 34–36 y 43; `docs/alcance.md`

## Contexto

Cada línea de un e-CF lleva, entre otros, el nombre del ítem (`NombreItem`), si es bien o servicio (`IndicadorBienoServicio`), la cantidad, el precio unitario y el indicador de facturación, que es su tasa de ITBIS (Formato, p. 35–36). Un e-CF debe tener al menos una línea y hasta 100 (p. 34). El alcance del MVP incluye un catálogo de servicios con su tasa de ITBIS, y la migración de 30 servicios desde el Excel actual. Había que decidir cómo se agrega una línea en "Nueva factura".

Antes de decidir, Ronald preguntó qué pasaría si más adelante quisiera vender productos, o un punto de venta (POS). Se aclaró que FacturaRD es una aplicación de facturación de servicios, que el inventario está fuera del alcance, y que un POS sería una decisión futura y aparte.

## Opciones consideradas

1. **Solo del catálogo** — a favor: datos consistentes, sin errores de escritura / en contra: para facturar algo nuevo hay que crearlo antes en el catálogo.
2. **Del catálogo o texto libre** — a favor: permite líneas puntuales / en contra: lo que se escribe a mano no queda disponible para la próxima vez.
3. **Del catálogo o texto libre, con opción de guardar en el catálogo** — a favor: flexible, y lo que se repite puede guardarse sin salir de la factura / en contra: el formulario de línea es más complejo, y guardar en el catálogo desde la factura debe validar lo mismo que el formulario de servicios.
4. **Del catálogo, editable** — a favor: se puede ajustar el precio o el nombre en una factura concreta / en contra: no permite líneas sin un servicio del catálogo.

## Decisión

El usuario elige un servicio del catálogo, que llena la línea, o la escribe a mano. Una línea escrita a mano tiene la opción "guardar en el catálogo", para poder elegirla la próxima vez.

## Por qué

En palabras de Ronald: "Por lo flexible que quiero que sea. Con esta opción, los usuarios pueden escribir un servicio o elegirlo si ya existe."

## Consecuencias

- Cada línea guarda su propia copia de los datos (nombre, cantidad, precio, tasa de ITBIS) y, opcionalmente, el servicio del catálogo del que salió. Un e-CF emitido no cambia si después cambia el catálogo, y más adelante se podrían agregar productos al mismo selector.
- Cada línea lleva `IndicadorBienoServicio = 2` (Servicio), porque el negocio solo vende servicios (alcance).
- "Guardar en el catálogo" usa el mismo esquema Zod y la misma lógica de creación que la historia "Gestión de servicios con tasa de ITBIS", sin repetirla.
- El diseño de T3 debe mostrar los dos caminos (elegir y escribir) y la opción de guardar.
