# 0055 — El e-NCF no se muestra hasta que la factura se emite

- **Fecha:** 2026-11-20
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (T3, S10); tarea de Notion "Diseñar pantalla Nueva factura 31/32"; `docs/dgii/informe-tecnico-e-cf-v1.0.pdf`, §7 y §8; `docs/dgii/formato-e-cf-v1.0.pdf`, p. 5; `docs/alcance.md`

## Contexto

Cada e-CF lleva un número de comprobante (e-NCF) de 13 posiciones: E, el tipo y 10 dígitos. La DGII autoriza un rango de secuencias al emisor, y cada secuencia "estará vigente desde la fecha de autorización hasta el 31 de diciembre del año siguiente" (Informe, §7). El emisor debe "colocar la secuencia autorizada por la DGII" y su fecha de vencimiento en el comprobante. La DGII rechaza el e-CF si la secuencia tiene un error o no está autorizada. FacturaRD "gestiona las secuencias e-NCF" (`docs/alcance.md`): toma el siguiente número sin usar del rango, sin saltos ni repeticiones, y el proveedor de e-CF firma y envía el comprobante. Había que decidir si "Nueva factura" muestra el e-NCF mientras se llena el formulario.

## Opciones consideradas

1. **Oculto hasta emitir** — a favor: el usuario nunca ve un número que podría cambiar / en contra: no sabe qué número tendrá la factura hasta emitirla.
2. **Vista previa del próximo número** — a favor: el usuario ve el número antes de emitir / en contra: si otra factura se emite antes, el número mostrado ya no es el correcto.
3. **Número editable** — a favor: control total del usuario / en contra: riesgo de saltos o números repetidos, que la DGII rechaza.

## Decisión

El formulario no muestra el e-NCF. El número aparece solo después de emitir la factura, cuando el proveedor de e-CF confirma el envío.

## Por qué

En palabras de Ronald: "Para mostrarlo una vez que nuestra API de terceros lo confirme."

## Consecuencias

- El e-NCF se asigna en el backend (`apps/api`, Fase 3) al emitir, nunca en el navegador. Asignar el siguiente número sin repetirlo cuando se emiten dos facturas a la vez requiere una transacción o un bloqueo en la base de datos.
- La pantalla de la factura emitida muestra el e-NCF y la fecha de vencimiento de la secuencia (`FechaVencimientoSecuencia`, obligatoria en el 31 y no permitida en el 32; Formato, p. 5).
- La anulación de secuencias no usadas sigue como decisión pendiente en `CLAUDE.md`. Esta decisión no la toma.
- El proveedor de e-CF sigue pendiente. Si el proveedor elegido asigna los números por su cuenta, esta pantalla no cambia: el número se sigue mostrando después de la confirmación.
