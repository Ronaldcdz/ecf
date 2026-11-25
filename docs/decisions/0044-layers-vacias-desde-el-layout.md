# 0044 — Crear las layers de funcionalidad vacías con el layout

- **Fecha:** 2026-11-18
- **Estado:** aceptada (cambia el momento decidido en [0009](0009-solo-layer-base.md))
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (S8); tarea de Notion "Registrar decisiones de layout (ADRs)"

## Contexto

El ADR 0009 decidió crear cada layer de funcionalidad con su historia. El menú del layout necesita que `/facturas`, `/clientes` y `/servicios` existan para probar la redirección de `/` y la sección activa, pero sus historias vienen después.

## Opciones consideradas

1. **Crear las layers vacías ahora** — a favor: cada historia posterior llena su propia layer / en contra: cambia el momento decidido en el ADR 0009.
2. **Páginas temporales en `base`** — a favor: mantiene el ADR 0009 / en contra: `base` guarda páginas de funcionalidad por un tiempo y cada historia debe borrar la suya.
3. **Sin páginas provisionales** — a favor: menos código / en contra: los enlaces del menú dan 404 y no se pueden probar ahora la redirección ni la sección activa.

## Decisión

Esta historia crea las layers `facturas`, `clientes` y `servicios`, cada una solo con una página provisional ("Create empty layers now").

## Por qué

En palabras de Ronald: "Porque más adelante será más difícil mover las páginas a las layers. Ahora mismo estamos construyendo el esqueleto de las funcionalidades."

## Consecuencias

- El ADR 0009 sigue vigente para la layer `auth`, que se crea con la historia de Login.
- Cada historia de funcionalidad reemplaza la página provisional de su layer.
