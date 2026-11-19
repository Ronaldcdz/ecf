# 0038 — Sidebar colapsable que recuerda su estado

- **Fecha:** 2026-11-18
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (S2); tarea de Notion "Registrar decisiones de layout (ADRs)"

## Contexto

La historia "Layout y navegación" necesita un menú principal en escritorio para moverse entre Facturas, Clientes y Servicios. Nuxt UI v4 ofrece `UDashboardSidebar` con la opción `collapsible`, y `UDashboardGroup` guarda el estado en una cookie por defecto.

Se tomaron dos decisiones relacionadas: qué tipo de menú usar y si recordar cuándo el usuario lo colapsa.

## Opciones consideradas

Tipo de menú en escritorio:

1. **Sidebar fijo** — a favor: siempre visible a la izquierda, muy claro para una app pequeña / en contra: ocupa espacio horizontal todo el tiempo.
2. **Sidebar colapsable** — a favor: puede reducirse a solo iconos y deja más espacio para las tablas / en contra: un control más que construir y probar.
3. **Barra superior** — a favor: todo el ancho para el contenido / en contra: menos espacio si el menú crece.

Estado colapsado:

1. **Recordarlo** — a favor: se guarda en una cookie y se mantiene al recargar o en la siguiente visita / en contra: hay estado guardado que probar.
2. **Empezar siempre expandido** — a favor: más simple, sin estado guardado / en contra: el usuario tiene que colapsarlo cada vez.

## Decisión

Sidebar colapsable ("Collapsible sidebar"); al colapsarse muestra solo iconos y la etiqueta de cada opción aparece en un tooltip. El estado se recuerda en una cookie ("Remember it").

## Por qué

En palabras de Ronald: "Porque me gusta cómo se ve, pero el estado colapsado siempre debe recordarse para una gran experiencia de usuario."

## Consecuencias

- Los tests E2E de la tarea T6 deben comprobar que el estado colapsado se mantiene después de recargar.
- Se usa la cookie que `UDashboardGroup` ya maneja (`storage: 'cookie'`), sin código propio de persistencia.
