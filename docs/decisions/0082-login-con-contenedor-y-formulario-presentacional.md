# 0082 — El login se divide en contenedor y formulario presentacional

- **Fecha:** 2026-11-25
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/login-con-sesion-simulada.md` (T5); tarea de Notion "T5 Login page and form (demo button, errors) + E2E"

## Contexto

La pantalla de login tiene lógica (llamar a `useAuth`, guardar el error, ir a `/facturas`) y aspecto (campos, alerta, botones). Había que decidir si van en un archivo o en dos. Ronald no conocía el patrón contenedor-presentacional; se le explicó con este ejemplo antes de decidir.

## Opciones consideradas

1. **Dos archivos: `login.vue` (contenedor) y `LoginForm.vue` (presentacional)** — a favor: el formulario recibe todo por props y emite eventos, así que se puede probar sin servidor ni cookies, y las pantallas siguientes pueden repetir el patrón / en contra: dos archivos y algunas props para una pantalla pequeña.
2. **Un solo archivo `login.vue`** — a favor: menos código / en contra: aspecto y lógica mezclados.

## Decisión

`login.vue` es el contenedor: usa `useAuth`, guarda el error y navega. `LoginForm.vue` es presentacional: recibe `v-model`, `loading` y `errorMessage`, y emite `submit` y `demo`.

## Por qué

Ronald eligió la opción 1 sin añadir un motivo propio.

## Consecuencias

- `LoginForm.vue` nunca llama a `useAuth` ni a `$fetch`.
- Los errores del servidor (400, 401 o desconocido) llegan al formulario como un solo texto en `errorMessage`.
