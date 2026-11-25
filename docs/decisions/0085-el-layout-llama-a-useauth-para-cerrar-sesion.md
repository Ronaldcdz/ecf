# 0085 — El layout llama a `useAuth().logout()` para cerrar sesión

- **Fecha:** 2026-11-25
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/login-con-sesion-simulada.md` (S7, T7); [0072](0072-area-de-usuario-en-el-footer-del-sidebar.md); tarea de Notion "T7 Move user area and logout to the sidebar footer + E2E"

## Contexto

El botón "Cerrar sesión" vive en el footer del sidebar, que es parte del layout de la capa `base` (ADR 0072). El cierre de sesión (borrar la cookie y el store, ir a `/login`) vive en la capa `auth`, en `useAuth()`. Había que decidir cómo el botón dispara el cierre de sesión.

## Opciones consideradas

1. **El layout llama a `useAuth().logout()` directamente** — a favor: simple y explícito, se ve en el propio layout qué hace el botón / en contra: la capa `base` depende de `auth`, contra la regla de CLAUDE.md ("una layer solo usa lo que expone `base`").
2. **El layout solo llama a `session.signOut()` (store de `base`) y la capa `auth` reacciona con un plugin** — a favor: `base` no sabe nada de `auth` / en contra: el cierre de sesión ocurre "por reacción", menos visible.
3. **El área de usuario es un componente de la capa `auth` (`UserArea.vue`) y el layout solo lo coloca en el footer** — a favor: la lógica queda en `auth` y es explícita / en contra: `base` tiene que conocer que ese componente existe.

## Decisión

El layout llama a `useAuth().logout()` y después lleva a `/login`.

## Por qué

En palabras de Ronald: porque seguimos la estructura modular.

## Consecuencias

- Es una excepción a la regla de CLAUDE.md "una layer no importa archivos internos de otra; solo usa lo que expone `base`". Nuxt auto-importa los composables de todas las capas, así que no hay una línea `import`, pero la dependencia existe.
- `auth` ya usa `useSessionStore` de `base` (ver `useAuth.ts`), así que ahora hay una dependencia circular entre las dos capas.
- Si la capa `auth` se quita o se renombra `useAuth`, el layout falla en ejecución con "useAuth is not defined"; TypeScript no lo avisa. Los tests E2E del layout (que ahora prueban el cierre de sesión) son la red de seguridad.
