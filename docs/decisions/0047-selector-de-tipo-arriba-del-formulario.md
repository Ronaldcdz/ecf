# 0047 — Selector de tipo de e-CF arriba del formulario

- **Fecha:** 2026-11-20
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (T3, S10); tarea de Notion "Diseñar pantalla Nueva factura 31/32"; `docs/dgii/formato-e-cf-v1.0.pdf`, p. 3–5

## Contexto

La pantalla "Nueva factura" emite dos tipos de e-CF en el MVP: 31 (Factura de Crédito Fiscal Electrónica) y 32 (Factura de Consumo Electrónica). Según el Formato e-CF de la DGII, "los documentos electrónicos tienen un formato único, en que la principal diferencia radica en la obligatoriedad o no de algunos datos" (p. 3). Por ejemplo, el RNC del comprador es obligatorio en el 31 y solo condicional en el 32 (p. 11). Había que decidir cómo elige el usuario el tipo. Las notas de débito (33) y crédito (34) llegan en la Fase 5.

## Opciones consideradas

1. **Selector arriba del formulario** — a favor: un solo formulario, y el tipo se ve y se cambia en un lugar claro / en contra: el usuario tiene que elegir el tipo antes de llenar los datos.
2. **Según el cliente** — a favor: menos pasos, porque el formulario sugiere el tipo a partir de los datos del cliente / en contra: hace falta una regla para sugerir el tipo, y el usuario puede no notar qué tipo se eligió.
3. **Dos puntos de entrada** — a favor: el tipo queda fijo desde el principio / en contra: dos botones o rutas, y una más por cada tipo nuevo.

## Decisión

Un control de selección (31 / 32) arriba del formulario. El usuario elige el tipo primero, y el formulario muestra u oculta los campos según la obligatoriedad de ese tipo.

## Por qué

En palabras de Ronald: "Porque es más fácil agregar más tipos de factura."

## Consecuencias

- Añadir un tipo (33 y 34 en la Fase 5) es añadir una opción al selector y sus reglas de obligatoriedad, no una pantalla nueva.
- Cambiar de tipo con datos ya escritos puede ocultar campos (por ejemplo, la fecha de vencimiento de la secuencia, que no aplica al 32). El diseño de T3 debe mostrar qué pasa en ese caso.
- La forma visual del selector (lista desplegable) se decidió en [0058](0058-selector-de-tipo-como-lista-desplegable.md).
