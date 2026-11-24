# 0060 — Los tests E2E viven en la layer de su objetivo principal

- **Fecha:** 2026-11-24
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (T5, S1); tarea de Notion "Configurar Playwright"; [0059](0059-playwright-con-nuxt-test-utils.md)

## Contexto

`apps/web` se organiza por funcionalidad con Nuxt Layers (`base`, `auth`, `clientes`, `servicios`, `facturas`). Había que decidir dónde guardar los tests E2E, y qué hacer con un flujo que cruza layers (por ejemplo, crear una factura con un cliente y un servicio).

## Opciones consideradas

1. **Una carpeta: `apps/web/e2e/`** — a favor: un solo lugar y una configuración simple / en contra: los tests quedan lejos de la layer que prueban.
2. **Dentro de cada layer: `layers/<layer>/e2e/`** — a favor: sigue la organización por funcionalidad / en contra: Playwright busca en todas las layers, y un flujo que cruza layers no tiene un dueño claro.

Para los flujos que cruzan layers se consideraron la layer `base` y una carpeta aparte (`apps/web/e2e/`). Ronald no eligió ninguna de las dos.

## Decisión

Cada layer guarda sus tests E2E en `layers/<layer>/e2e/`. Un flujo que cruza layers va en la layer de su objetivo principal: crear una factura con un cliente y un servicio va en `layers/facturas/e2e/`.

## Por qué

En palabras de Ronald: "Es más legible guardar los tests siguiendo la estructura modular." Sobre los flujos que cruzan layers: "Prefiero guardarlo donde está el objetivo principal. Si hablamos de crear una factura que usa un cliente y un servicio, ¿qué tiene más prioridad? La factura, así que va ahí."

## Consecuencias

- La configuración de Playwright busca `layers/*/e2e/**/*.spec.ts`.
- Vitest no debe leer esos archivos: sus tests usan `*.test.ts` y los E2E `*.spec.ts`.
- Los tests del layout (sidebar, header) van en `layers/base/e2e/`, porque el layout es de `base`.
