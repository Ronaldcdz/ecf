---
name: repaso
description: Repaso espaciado de las preguntas de comprobación registradas en docs/aprendizaje/progreso.md
argument-hint: [cantidad de preguntas]
disable-model-invocation: true
---

Cantidad de preguntas: $ARGUMENTS (si está vacío, usa 3)

Sigue estos pasos usando `docs/aprendizaje/progreso.md` y las reglas de CLAUDE.md:

1. Lee `docs/aprendizaje/progreso.md` y calcula la fecha de hoy.
2. Elige las preguntas a repasar, en este orden de prioridad, hasta completar la cantidad:
   - Nota mal, con su último intento (original o repaso) hace 2 días o más.
   - Nota parcial, con su último intento hace 4 días o más.
   - Nota bien, con su último intento hace 14 días o más.
   Dentro de cada grupo, primero las más antiguas. Si una pregunta ya tiene un repaso con nota bien, cuenta ese repaso como su nota actual.
3. Si ninguna cumple, dilo en una línea y termina.
4. Haz las preguntas de una en una. Reformúlalas con otras palabras o con otro caso del mismo código, para que Ronald no responda de memoria. Antes de preguntar, comprueba que el código de la referencia sigue existiendo; si cambió, adapta la pregunta al código actual.
5. Después de cada respuesta, dala por bien, parcial o mal. Si no fue bien, explica por qué con el código como evidencia. Luego registra en la línea **Repasos** de la pregunta original: `AAAA-MM-DD — nota`.
6. Al terminar, suma los repasos hechos a la columna Repasos de la tabla de Resumen (las notas originales no se reescriben) y muestra en 2 líneas cuántas acertó y qué tema conviene reforzar.

No hagas commit; el cambio en `progreso.md` se incluye en el commit que proponga `/cerrar`.
