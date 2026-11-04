# 0013 — oxlint en apps/api

- **Fecha:** 2026-11-04
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** Tarea de Notion "Crear monorepo con Bun, estructura base y CLAUDE.md"

## Contexto

El starter oficial de NestJS trae `oxlint` y `CLAUDE.md` fijaba ESLint para todo el repo. La configuración de lint por paquete (ADR [0008](0008-eslint-por-paquete.md)) permite usar otra herramienta en `apps/api`.

## Opciones consideradas

1. **`oxlint` en `apps/api`** — a favor: es lo que trae el starter de NestJS y permite probar una herramienta nueva / en contra: dos linters y las reglas comunes se repiten a mano.
2. **ESLint en todo el repo** — a favor: una sola herramienta / en contra: se aparta del starter de NestJS.

## Decisión

`apps/api` usa `oxlint`, con `no-explicit-any` en `error` porque `any` está prohibido en el proyecto. El resto del repo usa ESLint.

## Por qué

En palabras de Ronald: "Prefiero que nest use oxlint para probar nuevas herramientas."

## Consecuencias

Las reglas comunes se mantienen en dos sitios. `no-floating-promises` no se activó: no marcó nada en una prueba sin información de tipos, y `oxlint-tsgolint` queda por probar en la Fase 3. La configuración del starter trae `no-explicit-any` apagado, así que hay que mantenerlo activo al generar la API.
