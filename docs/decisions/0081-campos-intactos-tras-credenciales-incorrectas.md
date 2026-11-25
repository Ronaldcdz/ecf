# 0081 — Tras credenciales incorrectas, los campos quedan como estaban

- **Fecha:** 2026-11-25
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/login-con-sesion-simulada.md` (S2, T5); tarea de Notion "T5 Login page and form (demo button, errors) + E2E"

## Contexto

Con un par de credenciales válido en formato pero incorrecto, la página muestra una alerta sobre el formulario (ADR 0073). Había que decidir qué pasa con los campos.

## Opciones consideradas

1. **Se borra la contraseña y se enfoca; el correo se queda** — a favor: se vuelve a escribir la contraseña sin pasos extra / en contra: se pierde lo escrito, aunque el error fuera el correo.
2. **Los dos campos quedan como estaban** — a favor: el usuario corrige solo lo que está mal; la alerta no dice cuál campo falló / en contra: la contraseña mala sigue en el campo.

## Decisión

Los dos campos quedan como el usuario los escribió. La alerta se muestra encima.

## Por qué

Ronald eligió la opción 2 sin añadir un motivo propio.

## Consecuencias

- La alerta desaparece cuando empieza el siguiente intento.
- Como el mensaje no dice cuál campo está mal (ADR 0073), mantener ambos evita borrar el correcto.
