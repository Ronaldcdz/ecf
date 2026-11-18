# 0031 — Fondo blanco en modo claro

- **Fecha:** 2026-11-17
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/sistema-de-diseno-base.md` (S1, L4); `docs/sistema-de-diseno.md` (sección 7); ADR 0025 y 0026; tarea de Notion "Configurar tokens y tema de Nuxt UI"

## Contexto

La paleta incluye `#f1f2ee` (blanco hueso) como extremo claro de `brand-gray` (tono 100). Nuxt UI v4.12 usa blanco puro como `--ui-bg` en modo claro. El fondo afecta el contraste de todos los textos.

## Opciones consideradas

1. **Blanco** (`#ffffff`, por defecto) — a favor: mayor contraste (texto principal 10,37:1, `text-muted` 7,82:1, azul `primary` 4,76:1). En contra: el blanco hueso de marca no se usa como fondo.
2. **Tono 50 de `brand-gray`** (≈ `#f9fafc`) — a favor: un tinte frío sutil. En contra: el azul `primary` queda en 4,55:1, casi sin margen.
3. **Blanco hueso** (`#f1f2ee`) — a favor: página más cálida, color de marca visible. En contra: el azul `primary` da 4,23:1 y no pasa AA; obligaría a revisar el ADR 0025.

## Decisión

`--ui-bg` en modo claro es blanco (valor por defecto de Nuxt UI).

## Por qué

Ronald eligió "A" sin recomendación previa.

## Consecuencias

`#f1f2ee` queda en la escala `brand-gray` (tono 100) para superficies secundarias si hiciera falta, sin texto azul encima. El test de contraste mide los textos sobre blanco.
