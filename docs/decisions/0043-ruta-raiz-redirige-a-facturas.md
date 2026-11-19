# 0043 — La ruta raíz redirige a /facturas

- **Fecha:** 2026-11-18
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (S7); tarea de Notion "Registrar decisiones de layout (ADRs)"

## Contexto

Había que decidir qué muestra `/` después de iniciar sesión. La sección de Facturas no tiene contenido hasta la Fase 2.

## Opciones consideradas

1. **Redirigir a /facturas** — a favor: lleva directo a la tarea diaria / en contra: hasta la Fase 2, `/facturas` es una página provisional ("Próximamente").
2. **Redirigir a /clientes** — a favor: Clientes ya existe en la Fase 1 / en contra: habría que cambiarlo a `/facturas` en la Fase 2 (una tarea más).
3. **Página de bienvenida** — a favor: saludo y accesos a las tres secciones / en contra: una pantalla más que diseñar y mantener.

## Decisión

`/` redirige a `/facturas` ("Redirect to /facturas"). Hasta la Fase 2, `/facturas` es una página provisional.

## Por qué

En palabras de Ronald: "Porque es la página principal en la que van a estar los usuarios."

## Consecuencias

- Los tests E2E de T6 comprueban que `/` lleva a `/facturas`.
