# 0078 — La ruta simulada tarda unos 600 ms

- **Fecha:** 2026-11-25
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/login-con-sesion-simulada.md` (S2, T4); tarea de Notion "T4 Mock route /api/auth/login + useAuth composable + tests"

## Contexto

La ruta simulada `/api/auth/login` podía responder al instante o imitar el tiempo de un servidor. Cada vista debe manejar el estado de carga (`CLAUDE.md`).

## Opciones consideradas

1. **Retraso fijo de unos 600 ms** — a favor: el botón "Entrar" muestra su estado de carga de verdad y los tests E2E pueden comprobarlo / en contra: cada login simulado es un poco más lento.
2. **Sin retraso** — a favor: respuesta inmediata / en contra: el estado de carga casi no se ve.

## Decisión

La ruta espera unos 600 ms antes de responder, tanto si el login es correcto como si no.

## Por qué

Ronald eligió la opción 1 sin añadir un motivo propio.

## Consecuencias

- El retraso vive solo en la ruta simulada; desaparece cuando se conecte la API real.
