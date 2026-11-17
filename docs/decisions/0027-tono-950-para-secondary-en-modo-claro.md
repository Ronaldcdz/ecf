# 0027 — Tono 950 para `secondary` en modo claro

- **Fecha:** 2026-11-17
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/sistema-de-diseno-base.md` (S1, L4); `docs/sistema-de-diseno.md` (sección 7); tarea de Notion "Configurar tokens y tema de Nuxt UI"

## Contexto

El morado de marca `#2f0147` (ADR 0018) tiene una luminosidad OKLCH de 23,7 %, que corresponde al tono 950 de la escala. Nuxt UI v4.12 usa el tono 500 de `secondary` en modo claro.

## Opciones consideradas

1. **Usar el 950** (`#2f0147`) — a favor: color de marca exacto; texto blanco 17,27:1; 3,63:1 frente al azul `primary`, así que se distinguen en luminosidad. En contra: como botón se ve casi negro.
2. **Dejar el 500 por defecto** (≈ `#9c72bd`) — a favor: morado claramente visible, sin cambios. En contra: texto blanco 3,78:1, no pasa AA; el morado de marca no aparece; 1,26:1 frente al azul.
3. **Usar el 700** (≈ `#744a92`) — a favor: morado visible y texto blanco 6,69:1. En contra: no es el color de marca exacto; 1,41:1 frente al azul.

## Decisión

`secondary` usa el tono 950 en modo claro.

## Por qué

Ronald eligió "A, use the 950" sin recomendación previa: conserva el color de marca exacto y pasa AA con amplio margen.

## Consecuencias

`secondary` se reserva para acentos y se usa con moderación, porque se parece al texto oscuro. En modo oscuro el 950 sobre un fondo oscuro no se vería; ese modo se decide aparte.
