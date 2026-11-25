# 0073 — Error de credenciales en una alerta sobre el formulario

- **Fecha:** 2026-11-25
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/login-con-sesion-simulada.md` (S2); tarea de Notion "T1 Register decisions (ADRs 0067–0073)"

## Contexto

La historia pide "mensajes de error claros". Un correo con formato incorrecto o un campo vacío es un error de campo; un par válido pero distinto de la cuenta demo es un error del intento completo. Había que decidir dónde se muestra este segundo.

## Opciones consideradas

1. **Alerta sobre el formulario** — a favor: no culpa a un campo concreto, se distingue de los errores de formato / en contra: un elemento más en la pantalla.
2. **Bajo el campo de contraseña** — a favor: mismo lugar que los otros errores / en contra: parece que solo la contraseña está mal, cuando también puede ser el correo.

## Decisión

Alerta sobre el formulario con el texto "Correo o contraseña incorrectos." Los errores de formato siguen bajo cada campo.

## Por qué

En palabras de Ronald: es la mejor UI/UX.

## Consecuencias

- El mensaje no dice cuál de los dos campos falló (práctica común para no revelar si el correo existe).
- La alerta debe anunciarse a lectores de pantalla (`role="alert"`).
