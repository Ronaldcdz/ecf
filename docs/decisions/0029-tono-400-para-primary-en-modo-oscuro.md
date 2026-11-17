# 0029 — Tono 400 para `primary` en modo oscuro

- **Fecha:** 2026-11-17
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/sistema-de-diseno-base.md` (S1, L4); `docs/sistema-de-diseno.md` (sección 7); ADR 0025; tarea de Notion "Configurar tokens y tema de Nuxt UI"

## Contexto

En modo oscuro el fondo es el gris oscuro de marca `#1c1c1c` (ADR 0018). Nuxt UI v4.12 usa el tono 400 de `primary` en modo oscuro, y un botón sólido pone texto oscuro sobre el azul. La pareja que debe pasar AA es azul frente a `#1c1c1c`.

## Opciones consideradas

1. **Dejar el 400 por defecto** (≈ `#5aacd3`) — a favor: 6,72:1; no hay que sobrescribir nada. En contra: más claro que el azul de marca.
2. **Usar el 300** (≈ `#7bccf5`) — a favor: 9,57:1, el mayor contraste. En contra: azul pastel, más lejos del de marca.
3. **Usar el 500** (≈ `#3e91b7`) — a favor: el más cercano al azul de marca que pasa. En contra: 4,82:1, casi sin margen.
4. **Usar el 600** (`#247ba0`, igual que en modo claro) — a favor: mismo azul en los dos modos. En contra: 3,58:1, no pasa AA.

## Decisión

`primary` usa el tono 400 (valor por defecto de Nuxt UI) en modo oscuro.

## Por qué

Ronald eligió "A" sin recomendación previa: pasa AA con margen y no requiere configuración extra.

## Consecuencias

El azul cambia de tono entre modos (600 en claro, 400 en oscuro); es lo esperado, porque el contraste depende del fondo. El test de contraste mide `primary-400` frente al fondo oscuro.
