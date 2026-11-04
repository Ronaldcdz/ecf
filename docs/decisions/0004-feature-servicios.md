# 0004 — La feature de catálogo se llama `servicios`

- **Fecha:** 2026-11-04
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `docs/alcance.md`; historia de Notion "Gestión de servicios con tasa de ITBIS"; tarea de Notion "Diagrama de arquitectura (contexto y contenedores) en Mermaid"

## Contexto

`CLAUDE.md` y la tarea del diagrama llamaban `productos` a la feature del catálogo, mientras que el alcance y la historia de Notion hablan de "servicios". La diferencia apareció al dibujar el diagrama de contenedores, antes de que existiera código con cualquiera de los dos nombres.

## Opciones consideradas

1. **`servicios`** — a favor: coincide con el alcance y con la historia de Notion. En contra: obliga a corregir `CLAUDE.md`.
2. **`productos`** — a favor: `CLAUDE.md` no cambia. En contra: el código usaría un nombre distinto al del alcance.

## Decisión

Opción 1. La layer de Nuxt, el módulo de Nest y el tipo compartido usan `servicios` y `Servicio`.

## Por qué

En palabras de Ronald: "Sí, se llama servicios".

## Consecuencias

`CLAUDE.md` y el diagrama de contenedores quedan actualizados. Si el negocio llega a vender productos, habrá que revisar este nombre.
