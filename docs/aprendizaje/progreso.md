# Progreso de aprendizaje

Registro de las preguntas de comprobación que Claude hace después de cada unidad de trabajo, con la respuesta de Ronald y su nota. `/repaso` usa este archivo para repetir lo que falló (repaso espaciado).

## Resumen

| Preguntas | Bien | Parcial | Mal | Repasos |
|-----------|------|---------|-----|---------|
| 4         | 2    | 1       | 1   | 0       |

## Cómo se registra

- Una entrada por pregunta, numerada `P1`, `P2`…, añadida en cuanto Ronald responde.
- **Formato:** predecir, seguir el recorrido, explicar de vuelta, depurar o concepto.
- **Nota:** bien (completa y correcta), parcial (idea correcta, faltan piezas) o mal (idea equivocada).
- Los repasos se anotan en la línea **Repasos** de la pregunta original, y el resumen se actualiza en cada entrada.

## Preguntas

### P1 — 2026-10-30 — Predecir

- **Pregunta:** Si escribes `/hoy` sin número, ¿qué hace la skill?
- **Respuesta de Ronald:** Toma el tiempo que tiene la tarea por defecto en Notion.
- **Nota:** mal
- **Explicación:** El paso 1 de `/hoy` pregunta los minutos y espera. No puede usar el Estimado (min) porque el paso 5 compara ese estimado con los minutos disponibles: si fueran el mismo valor, toda tarea "cabría".
- **Referencia:** `.claude/skills/hoy/SKILL.md`, pasos 1 y 5
- **Repasos:** —

### P2 — 2026-10-30 — Seguir el recorrido

- **Pregunta:** Si la tarea no quedó terminada, ¿qué guarda `/cerrar` en Notion para que la siguiente sesión sepa por dónde seguir?
- **Respuesta de Ronald:** Lo último en lo que nos quedamos.
- **Nota:** parcial
- **Explicación:** Guarda la sección "Dónde quedé" con qué se hizo, qué falta y el siguiente paso concreto; además deja el Estado en "En Progreso" y suma el Tiempo real. El siguiente paso es la pieza clave, y `/hoy` la lee en su paso 4.
- **Referencia:** `.claude/skills/cerrar/SKILL.md`, paso 5; `.claude/skills/hoy/SKILL.md`, paso 4
- **Repasos:** —

### P3 — 2026-10-31 — Concepto

- **Pregunta:** ¿Por qué Mermaid CLI se instala como dependencia de desarrollo (`-d`)?
- **Respuesta de Ronald:** Porque solo se usa mientras se desarrolla, no cuando la aplicación está publicada.
- **Nota:** bien
- **Explicación:** Además, `bun install --production` la omite, lo que evita descargar Chromium en producción.
- **Referencia:** `CLAUDE.md`, Stack
- **Repasos:** —

### P4 — 2026-11-02 — Predecir

- **Pregunta:** Hoy es 2 de noviembre y corres `/repaso`. P1 está en "mal" desde el 30 de octubre y P2 en "parcial" desde el mismo día. ¿Cuáles te preguntaría y por qué?
- **Respuesta de Ronald:** Solo P1, porque P2 necesita 4 días.
- **Nota:** bien
- **Explicación:** Han pasado 3 días: P1 ("mal") cumple el mínimo de 2; P2 ("parcial") necesita 4 y aún no toca.
- **Referencia:** `.claude/skills/repaso/SKILL.md`, paso 2
- **Repasos:** —
