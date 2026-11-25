# 0075 — La cookie de sesión guarda la sesión completa

- **Fecha:** 2026-11-25
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/login-con-sesion-simulada.md` (S3, T4); tarea de Notion "T4 Mock route /api/auth/login + useAuth composable + tests"

## Contexto

Después de un login correcto la app debe recordar quién entró (ADR 0069). Había que decidir qué guarda la cookie.

## Opciones consideradas

1. **La sesión completa (nombre del usuario y de la empresa)** — a favor: al recargar, el store se llena desde la cookie sin ninguna petición extra / en contra: la cookie contiene datos visibles; son datos simulados, sin secretos.
2. **Solo una marca (`demo-session`)** — a favor: la cookie no tiene datos / en contra: cada recarga necesita una segunda ruta simulada (`/api/auth/me`) para saber el usuario y la empresa.

## Decisión

La cookie guarda la sesión completa, con la forma de `loginResponseSchema` (usuario y empresa).

## Por qué

Ronald eligió la opción 1 sin añadir un motivo propio.

## Consecuencias

- La cookie se lee y se valida con Zod; si alguien la cambia a mano y deja de cumplir el esquema, se trata como sesión cerrada.
- Con la API real (Fase 3) la sesión será un identificador opaco en una cookie `httpOnly`; esta decisión se revisa entonces.
