# 0084 — Cada página declara si es pública

- **Fecha:** 2026-11-25
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/login-con-sesion-simulada.md` (S5, T6); tarea de Notion "T6 Route protection middleware and redirects + E2E"

## Contexto

El middleware global necesita saber qué rutas no piden sesión (ADR 0083). Había que decidir dónde vive esa información.

## Opciones consideradas

1. **Cada página lo declara con `definePageMeta({ public: true })`** — a favor: toda página nueva queda protegida por defecto; quien quiere abrirla lo escribe en la propia página, donde se ve / en contra: la lista de rutas públicas no está en un solo lugar.
2. **Una lista de rutas en el middleware** — a favor: un solo archivo muestra todas las rutas públicas / en contra: abrir una página nueva exige acordarse de editar esa lista.

## Decisión

Cada página pública declara `definePageMeta({ public: true })`. El middleware trata como protegida toda página sin esa marca.

## Por qué

Ronald eligió la opción 1 sin añadir un motivo propio.

## Consecuencias

- `login.vue` (capa `auth`) y `design.vue` (capa `base`) llevan la marca. La capa `base` solo escribe un dato en la ruta: no importa nada de `auth`.
- Quien olvide la marca en una página pública obtiene una redirección a `/login`: falla hacia el lado seguro.
