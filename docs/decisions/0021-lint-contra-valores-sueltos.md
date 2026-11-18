# 0021 — Regla de lint contra colores y espaciados sueltos

- **Fecha:** 2026-11-13
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/sistema-de-diseno-base.md` (S3); tarea de Notion "Regla de lint contra valores sueltos"

## Contexto

El criterio "Ningún color ni espaciado suelto fuera de los tokens" necesita una forma de comprobarse; si no, depende de que nadie se despiste.

## Opciones consideradas

1. **Regla de lint** — a favor: falla en el editor, en el hook de commit y en CI. En contra: una dependencia más.
2. **Test propio de Vitest** que busque hex y valores arbitrarios en los `.vue` — a favor: sin dependencias. En contra: busca texto, no entiende el código.
3. **Solo revisión** — a favor: cero trabajo. En contra: no es fiable.

## Decisión

"La de lint": `eslint-plugin-better-tailwindcss` con `no-restricted-classes` (valores arbitrarios `[...]` y paletas de Tailwind que no son tokens) y `no-unknown-classes`.

## Por qué

Ronald eligió el lint. Se verificó en npm que la versión 4.11.0 soporta ESLint ^10 (el del proyecto) y Tailwind ^4.1.17 (el proyecto usa 4.3.4).

## Consecuencias

Si el plugin deja de mantenerse o no soporta una versión futura de Tailwind, la alternativa es el test propio (opción 2).
