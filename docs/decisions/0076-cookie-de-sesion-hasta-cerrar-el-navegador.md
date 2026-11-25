# 0076 — La cookie de sesión dura hasta cerrar el navegador

- **Fecha:** 2026-11-25
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/login-con-sesion-simulada.md` (S3, T4); tarea de Notion "T4 Mock route /api/auth/login + useAuth composable + tests"

## Contexto

La sesión simulada se guarda en una cookie (ADR 0069). Había que decidir cuánto dura.

## Opciones consideradas

1. **Hasta cerrar el navegador (cookie de sesión)** — a favor: una demo nunca queda abierta en un computador compartido / en contra: el usuario entra de nuevo cada día.
2. **7 días** — a favor: no hay que volver a entrar entre visitas / en contra: la sesión queda abierta aunque otra persona use el computador.

## Decisión

La cookie no lleva `maxAge` ni `expires`: dura hasta que se cierra el navegador.

## Por qué

Ronald eligió la opción 1 sin añadir un motivo propio.

## Consecuencias

- Es lo más seguro para una demo pública que ven reclutadores; el único costo es volver a entrar.
- Si se cambia a una sesión larga con la API real, hay que decidir también su renovación y su cierre por inactividad.
