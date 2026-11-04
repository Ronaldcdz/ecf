# 0010 — Nombres de paquetes @ecf/*

- **Fecha:** 2026-11-04
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** Tarea de Notion "Crear monorepo con Bun, estructura base y CLAUDE.md"

## Contexto

Los paquetes del monorepo necesitan un nombre para sus imports y sus dependencias `workspace:*`. El repo se llama `ecf` y el proyecto en Notion, FacturaRD.

## Opciones consideradas

1. **`@ecf/*`** — a favor: coincide con el repo y el `package.json` raíz / en contra: no coincide con el nombre en Notion.
2. **`@facturard/*`** — a favor: coincide con el nombre en Notion / en contra: habría dos nombres en el repo.

## Decisión

Los paquetes se llaman `@ecf/web`, `@ecf/api` y `@ecf/shared`.

## Por qué

En palabras de Ronald: "porque es el nombre generico del proyecto, ya después se creará un nombre de negocio".

## Consecuencias

Cuando exista el nombre de negocio, se puede revisar si conviene renombrar los paquetes.
