# 0071 — Redirecciones del login

- **Fecha:** 2026-11-25
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/login-con-sesion-simulada.md` (S5, S6); tarea de Notion "T1 Register decisions (ADRs 0067–0073)"

## Contexto

Las rutas están protegidas por middleware (criterio de la historia). Había que decidir a dónde va el visitante en dos casos: después de entrar con éxito, y si ya tiene sesión y abre `/login`.

## Opciones consideradas

Después del login:

1. **Siempre a `/facturas`** — a favor: simple / en contra: se pierde la página que el usuario quería abrir.
2. **A la página que pidió primero** (o `/facturas` si no pidió ninguna) — a favor: mejor experiencia / en contra: hay que guardar la ruta pedida.

Si ya tiene sesión y abre `/login`:

1. **Va a `/facturas`** — a favor: no se muestra un formulario que no necesita / en contra: ninguna relevante.
2. **Ve el formulario igual** — a favor: puede entrar como otro usuario / en contra: confuso, el usuario ya entró.

## Decisión

- Sin sesión en una ruta protegida: va a `/login` y, tras entrar, vuelve a la página que pidió; si no pidió ninguna, va a `/facturas`.
- Con sesión en `/login`: va a `/facturas`.

## Por qué

En palabras de Ronald: volver a la página pedida es la mejor UI/UX; y `/facturas` es la página principal que quiere que vean.

## Consecuencias

- La ruta pedida viaja en la URL (por ejemplo `?redirect=`); T6 debe aceptar solo rutas internas de la app.
- Los tests E2E de T6 cubren los tres casos.
