---
name: repaso
description: Repaso espaciado de las preguntas de comprobación guardadas en la base de Notion "Preguntas de comprobación"
argument-hint: [cantidad de preguntas]
disable-model-invocation: true
---

Cantidad de preguntas: $ARGUMENTS (si está vacío, usa 3)

Notion es la fuente de verdad (ADR 0003). Sigue estos pasos con el conector de Notion y las reglas de CLAUDE.md:

1. Consulta la base "Preguntas de comprobación" (`collection://04fa9bf1-44ab-4070-9799-b925ae13e3e6`) y calcula la fecha de hoy.
2. Elige las preguntas, en este orden de prioridad, hasta completar la cantidad:
   - Estado = Pendiente, primero las más antiguas.
   - Nota actual mal, con su último intento (Fecha respuesta o último repaso) hace 2 días o más.
   - Nota actual parcial, con su último intento hace 4 días o más.
   - Nota actual bien, con su último intento hace 14 días o más.
   La nota actual es la del último repaso, o la Nota original si no hay repasos. Dentro de cada grupo, primero las más antiguas.
3. Si ninguna cumple, dilo en una línea y termina.
4. Haz las preguntas de una en una. En un repaso, reformúlala con otras palabras o con otro caso del mismo código para que Ronald no responda de memoria. Antes de preguntar, comprueba que el código de la Referencia sigue existiendo; si cambió, adapta la pregunta y actualiza su Respuesta esperada y su Referencia en Notion.
5. Después de cada respuesta, califícala como bien, parcial o mal. Si no fue bien, explica por qué con el código como evidencia. Guarda en Notion:
   - Pendiente: Respuesta de Ronald (tal cual), Nota, Explicación, Fecha respuesta = hoy, Estado = Respondida.
   - Repaso: añade una línea al final de Repasos: `AAAA-MM-DD — nota`. No reescribas la nota original.
6. Sincroniza `docs/aprendizaje/progreso.md` desde Notion (preguntas respondidas y repasos, con el resumen recalculado).
7. Muestra en 2 líneas cuántas acertó y qué tema conviene reforzar.

No hagas commit; el cambio en `progreso.md` va en el commit que proponga `/cerrar`.
