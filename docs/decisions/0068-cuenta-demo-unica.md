# 0068 — Una sola cuenta demo con correo y contraseña

- **Fecha:** 2026-11-25
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/login-con-sesion-simulada.md` (S2); tarea de Notion "T1 Register decisions (ADRs 0067–0073)"

## Contexto

El login es simulado: no hay servidor real que compruebe credenciales hasta la Fase 3. Había que decidir qué pide el formulario y qué hace que un login tenga éxito.

## Opciones consideradas

1. **Correo + contraseña, una cuenta demo fija** — a favor: hay un caso de "credenciales incorrectas" que probar, y se parece al login real / en contra: hay que guardar los valores de la cuenta demo en el mock.
2. **Correo + contraseña, cualquier valor con formato válido** — a favor: lo más simple / en contra: no existe el error de credenciales incorrectas.
3. **Usuario + contraseña** — a favor: sin validación de formato de correo / en contra: el backend real probablemente usará correo.

## Decisión

Correo + contraseña, con una sola cuenta demo. Cualquier otro par muestra el error de credenciales incorrectas.

## Por qué

En palabras de Ronald: como es para pruebas, por ahora no hace falta ninguna lógica extra.

## Consecuencias

- Los valores de la cuenta demo (por ejemplo `demo@facturard.do`) se confirman con Ronald antes de escribirlos en el código (T4).
- Cuando llegue la API real (Fase 3), el mock se reemplaza por un login real sin cambiar el formulario.
