# 0052 — Cambiar el tipo de e-CF conserva los datos y adapta el formulario

- **Fecha:** 2026-11-20
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (T3, S10); tarea de Notion "Diseñar pantalla Nueva factura 31/32"; [0047](0047-selector-de-tipo-arriba-del-formulario.md); `docs/dgii/formato-e-cf-v1.0.pdf`, p. 5 y 11–12

## Contexto

Con el selector de tipo arriba del formulario ([0047](0047-selector-de-tipo-arriba-del-formulario.md)), el usuario puede cambiar entre 31 y 32 después de escribir datos. Los tipos no piden lo mismo. Por ejemplo, la fecha de vencimiento de la secuencia es obligatoria en el 31 y no se permite en el 32 (Formato, p. 5). El comprador es obligatorio en el 31 y condicional en el 32 (p. 11–12). Había que decidir qué hace el formulario al cambiar de tipo.

## Opciones consideradas

1. **Conservar los datos y adaptar** — a favor: flexible, y no se pierde nada si el cambio fue un error / en contra: puede haber datos ocultos que el usuario no ve.
2. **Confirmar primero** — a favor: el usuario sabe qué cambia antes de aceptar / en contra: un paso más cada vez que cambia el tipo.
3. **Bloquear el tipo después de la primera línea** — a favor: evita cambios a mitad de la factura / en contra: si el tipo estaba mal, hay que empezar una factura nueva.

## Decisión

Al cambiar de tipo, todos los datos escritos se conservan. Los campos que no aplican al nuevo tipo se ocultan y no se envían, y las marcas de obligatorio u opcional se actualizan al instante.

## Por qué

En palabras de Ronald: "Es más flexible, y cubre el caso en que un usuario lo cambia por accidente."

## Consecuencias

- Si el usuario vuelve al tipo anterior, recupera lo que había escrito.
- Al emitir, solo se validan y se envían los campos del tipo elegido. Un campo oculto nunca llega al e-CF, aunque tenga datos.
- El diseño de T3 muestra el mismo formulario en 31 y en 32, para que se vea qué campos cambian.
