# 0069 — La sesión se guarda en una cookie

- **Fecha:** 2026-11-25
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/login-con-sesion-simulada.md` (S3); tarea de Notion "T1 Register decisions (ADRs 0067–0073)"

## Contexto

Después del login, la app debe recordar quién entró, y el middleware de rutas debe poder leerlo. Nuxt renderiza en el servidor y en el navegador.

## Opciones consideradas

1. **Cookie (`useCookie`)** — a favor: sobrevive a recargar la página y el middleware la lee en servidor y navegador, sin parpadeos / en contra: hay que cuidar su contenido (nada sensible).
2. **`localStorage`** — a favor: sobrevive a recargar / en contra: solo el navegador lo lee; una página protegida podría mostrarse un instante antes de redirigir.
3. **Solo Pinia (memoria)** — a favor: lo más simple / en contra: se pierde en cada recarga.

## Decisión

La sesión se guarda en una cookie con `useCookie`.

## Por qué

En palabras de Ronald: es la opción más segura para evitar que la página parpadee.

## Consecuencias

- Es el mismo mecanismo que ya usa el estado del sidebar colapsado.
- La cookie solo guarda lo mínimo para identificar la sesión simulada; con la API real (Fase 3) habrá que revisar sus atributos (`httpOnly`, `secure`).
- El store de Pinia de la sesión se rellena desde la cookie y se limpia al cerrar sesión (ADR 0072).
