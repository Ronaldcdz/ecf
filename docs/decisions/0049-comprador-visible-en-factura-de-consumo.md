# 0049 — Comprador visible en la factura de consumo (32), obligatorio desde RD$250,000

- **Fecha:** 2026-11-20
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** `odd/tasks/layout-y-navegacion.md` (T3, S10); tarea de Notion "Diseñar pantalla Nueva factura 31/32"; `docs/dgii/formato-e-cf-v1.0.pdf`, p. 11–12; `docs/dgii/informe-tecnico-e-cf-v1.0.pdf`, §4.3 y §9

## Contexto

En el e-CF 31 el RNC y la razón social del comprador son siempre obligatorios. En el 32 son condicionales: "Si el e-CF es tipo 32 y el monto total es ≥ DOP$250,000.00 se debe identificar RNC Comprador" (Formato, p. 11), y lo mismo para la razón social (p. 12). Por debajo de ese monto, "el campo 'RNC Comprador' sera completado de manera opcional" (p. 11, nota 4). Con el selector de tipo arriba del formulario ([0047](0047-selector-de-tipo-arriba-del-formulario.md)), había que decidir cómo se muestra el campo del cliente en el 32.

## Opciones consideradas

1. **Visible y guiado por la regla** — a favor: el usuario siempre ve el campo y entiende cuándo pasa a ser obligatorio / en contra: un campo opcional más en las ventas pequeñas.
2. **Oculto hasta que haga falta** — a favor: el formulario del 32 queda más corto / en contra: el campo aparece de pronto al llegar al monto, lo que puede sorprender al usuario.
3. **Siempre obligatorio** — a favor: una sola regla simple para 31 y 32 / en contra: más estricto que la DGII, y obliga a registrar un cliente en cada venta de consumo.

## Decisión

En el 32, el campo del cliente está siempre visible y marcado como opcional. Cuando el total llega a RD$250,000.00, pasa a ser obligatorio y muestra un mensaje que explica por qué.

## Por qué

En palabras de Ronald: "Para que los usuarios noten que algún día van a necesitar este campo."

## Consecuencias

- El estado obligatorio u opcional depende del total, así que cambia mientras el usuario agrega o edita líneas. El diseño de T3 muestra los dos estados y el mensaje.
- El umbral usa "≥ DOP$250,000.00", como dice el Formato para el RNC y la razón social del comprador (p. 11–12).
- Queda pendiente el comprador extranjero en el 32 (`IdentificadorExtranjero`, p. 12), que el Formato condiciona a "> DOP$250,000", no a "≥". Se pregunta antes de implementar la lógica en la Fase 2.
