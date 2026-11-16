# 0012 — Declarar Tailwind en apps/web

- **Fecha:** 2026-11-04
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** Tarea de Notion "Crear monorepo con Bun, estructura base y CLAUDE.md"

## Contexto

`CLAUDE.md` decía que no se instalara Tailwind aparte del que trae Nuxt UI. El build falló con `Can't resolve 'tailwindcss'`, porque `main.css` lo importa y la instalación aislada de Bun solo se lo expone a `@nuxt/ui`. La guía oficial de Nuxt UI indica instalar `@nuxt/ui tailwindcss`.

## Opciones consideradas

1. **Declararlo en `apps/web`** — a favor: es lo que indica la guía oficial y cumple la regla de declarar lo que se importa / en contra: el rango de versión podría separarse del de Nuxt UI.
2. **Cambiar Bun a `hoisted`** — a favor: no hay que declararlo / en contra: un paquete puede importar algo que no declaró y funcionar igual.

## Decisión

`tailwindcss` se declara en `apps/web`, y `CLAUDE.md` se ajusta para reflejarlo.

## Por qué

En palabras de Ronald: "tenemos que seguir las recomendaciones oficiales de nuxt".

## Consecuencias

Hay que vigilar que siga habiendo una sola versión de Tailwind al actualizar Nuxt UI.
