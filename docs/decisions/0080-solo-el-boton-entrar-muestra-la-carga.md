# 0080 — Mientras espera, solo el botón "Entrar" muestra la carga

- **Fecha:** 2026-11-25
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/login-con-sesion-simulada.md` (S2, T5); tarea de Notion "T5 Login page and form (demo button, errors) + E2E"

## Contexto

La ruta simulada tarda unos 600 ms (ADR 0078). Había que decidir qué muestra el formulario mientras espera la respuesta.

## Opciones consideradas

1. **Solo el botón "Entrar" muestra la carga; los campos siguen editables** — a favor: el formulario no cambia de golpe y se ve qué está pasando / en contra: el usuario puede cambiar un campo mientras se envía.
2. **El botón carga y todo el formulario se desactiva** — a favor: nada cambia durante el envío / en contra: los campos se vuelven grises un instante y pierden el foco.

## Decisión

Solo el botón "Entrar" muestra la carga. Los campos y el botón demo siguen activos.

## Por qué

Ronald eligió la opción 1 sin añadir un motivo propio.

## Consecuencias

- `UForm` desactiva todos los campos al enviar por defecto (`loadingAuto`); aquí se apaga con `:loading-auto="false"` y el botón recibe `loading` desde la página.
- Lo que el usuario cambie durante el envío no afecta a esa petición, porque ya salió con los datos validados.
