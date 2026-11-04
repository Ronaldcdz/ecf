# 0009 — Crear solo la layer base al inicio

- **Fecha:** 2026-11-04
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** Tarea de Notion "Crear monorepo con Bun, estructura base y CLAUDE.md"

## Contexto

`CLAUDE.md` define cinco layers en `apps/web/layers/`: `base`, `auth`, `clientes`, `servicios` y `facturas`. Esta tarea solo prepara la estructura base.

## Opciones consideradas

1. **Solo `base`** — a favor: no hay carpetas sin contenido / en contra: la estructura completa aún no se ve en el repo.
2. **Las cinco ahora** — a favor: la arquitectura se ve completa desde el inicio / en contra: cuatro layers quedan sin contenido hasta sus historias.

## Decisión

Se crea solo `layers/base`. Cada layer de funcionalidad se crea con su historia.

## Por qué

En palabras de Ronald: "Porque solamente necesitamos la base para iniciar."

## Consecuencias

Cada historia que abra una funcionalidad nueva debe crear su layer.
