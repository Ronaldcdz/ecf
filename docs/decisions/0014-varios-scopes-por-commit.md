# 0014 — Varios scopes en un commit

- **Fecha:** 2026-11-06
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** commit `0656cd4`, tarea de Notion "Configurar commitlint + husky"

## Contexto

`commitlint.config.mjs` limita los scopes a `web`, `api` y `shared`. La regla `scope-enum` acepta por defecto varios scopes separados por coma, como `feat(web,api): x`, siempre que todos estén en la lista.

## Opciones consideradas

1. **Permitir varios scopes** — a favor: un cambio que toca varios paquetes queda en un solo commit y el mensaje lo dice / en contra: filtrar el historial por paquete es un poco menos exacto.
2. **Exigir un solo scope por commit** — a favor: cada commit pertenece a un paquete / en contra: obliga a partir cambios que van juntos o a omitir paquetes en el mensaje.

## Decisión

Se permiten varios scopes en un commit. La configuración no cambia, porque ese es el comportamiento por defecto.

## Por qué

En palabras de Ronald: "Permítelo, un commit puede tocar varios paquetes".

## Consecuencias

Para buscar commits de un paquete hay que tener en cuenta los mensajes con varios scopes: `git log --grep="(api)"` no encuentra `feat(web,api): x`. Cada scope sigue validándose, así que `feat(web,pagos): x` se rechaza.
