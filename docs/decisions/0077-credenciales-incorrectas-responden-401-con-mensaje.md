# 0077 — Credenciales incorrectas: 401 con un mensaje

- **Fecha:** 2026-11-25
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/login-con-sesion-simulada.md` (S2, T4); tarea de Notion "T4 Mock route /api/auth/login + useAuth composable + tests"

## Contexto

La ruta simulada `/api/auth/login` recibe un correo y una contraseña con formato válido que no son la cuenta demo. Había que decidir cómo responde (ADR 0073 define cómo se muestra el error).

## Opciones consideradas

1. **401 con `{ "message": "Correo o contraseña incorrectos." }`** — a favor: el formulario solo muestra `message`, el texto vive en un solo lugar / en contra: el servidor decide el texto.
2. **401 sin texto** — a favor: el servidor no conoce los textos de la interfaz / en contra: el formulario debe inventar el mensaje para cada caso.

## Decisión

Responde HTTP 401 con `{ "message": "Correo o contraseña incorrectos." }`. Si el cuerpo no cumple `loginSchema`, responde 400 con `{ campo: [mensajes] }`, el formato de errores de validación del `CLAUDE.md`.

## Por qué

Ronald eligió la opción 1 sin añadir un motivo propio.

## Consecuencias

- El 400 y el 401 tienen esquemas propios en `packages/shared` para que la web y la API de la Fase 3 hablen igual.
