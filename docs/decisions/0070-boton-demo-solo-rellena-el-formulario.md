# 0070 — "Entrar como demo" solo rellena el formulario

- **Fecha:** 2026-11-25
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/login-con-sesion-simulada.md` (S4); tarea de Notion "T1 Register decisions (ADRs 0067–0073)"

## Contexto

La historia pide un botón "Entrar como demo" para reclutadores. Había que decidir qué hace al pulsarlo.

## Opciones consideradas

1. **Inicia sesión directamente** — a favor: un clic, sin escribir nada / en contra: el visitante no ve el formulario ni el flujo de login.
2. **Solo rellena el formulario** — a favor: el visitante ve cómo sería entrar con una cuenta real y pulsa "Entrar" él mismo / en contra: un clic más.

## Decisión

El botón solo rellena el formulario con el correo y la contraseña de la cuenta demo. El visitante pulsa "Entrar".

## Por qué

En palabras de Ronald: así los reclutadores pueden ver cómo sería si tuvieran una cuenta real.

## Consecuencias

- El botón rellena los campos con los valores de la cuenta demo (ADR 0068) y pasan por la misma validación Zod que cualquier otro intento.
- Debe ser accesible por teclado y quedar claro que no inicia sesión por sí solo.
