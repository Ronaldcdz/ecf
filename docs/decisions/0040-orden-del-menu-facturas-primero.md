# 0040 — Orden del menú: Facturas, Clientes, Servicios

- **Fecha:** 2026-11-18
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (S4); tarea de Notion "Registrar decisiones de layout (ADRs)"

## Contexto

El menú tiene tres secciones del MVP. Había que decidir qué opciones muestra y en qué orden.

## Opciones consideradas

1. **Facturas, Clientes, Servicios** — a favor: facturar es la tarea diaria y va primero; los catálogos después. "Nueva factura" se abre desde Facturas / en contra: crear una factura necesita un clic más.
2. **"Nueva factura" + las 3 opciones** — a favor: acción directa arriba del menú, más rápido para crear una factura / en contra: una opción más en el menú.
3. **Clientes, Servicios, Facturas** — a favor: mismo orden que el texto de la historia y que la configuración inicial (primero clientes y servicios, después facturar) / en contra: la tarea diaria queda al final.

## Decisión

"Facturas, Clientes, Servicios", en ese orden.

## Por qué

En palabras de Ronald: "En mi opinión, las funcionalidades más usadas van arriba."

## Consecuencias

- La pantalla "Nueva factura" se abre desde la página de Facturas, no desde el menú.
