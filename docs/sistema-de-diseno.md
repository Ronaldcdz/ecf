# Guía del sistema de diseño

Esta guía explica cómo se construyen los tokens de diseño de FacturaRD antes de escribir el código (tarea T2 de `odd/tasks/sistema-de-diseno-base.md`). Las decisiones (qué colores, qué fuente, qué radio) están en los ADR 0018–0021; aquí se explica **cómo** se convierten en código y **por qué** se hace así.

## 1. Qué es un token de diseño

Un token es un nombre para un valor visual: `primary` en lugar de `#247ba0`. Los componentes usan el nombre y nunca el valor. Así, cambiar un color es editar una línea, no buscar el hex en cien archivos. La regla de lint de T3 hace que esto se cumpla.

Los sistemas de diseño suelen organizar los tokens en **tres capas**:

| Capa | Qué guarda | Ejemplo en este proyecto | Dónde vive |
|---|---|---|---|
| **Primitiva** | Valores crudos, sin intención | `--color-brand-blue-600: #247ba0` | `layers/base/app/assets/css/main.css`, bloque `@theme static` |
| **Semántica** | Intención: para qué se usa | `primary` → `brand-blue`; `--ui-text`, `--ui-bg` | `layers/base/app/app.config.ts` (`ui.colors`) y variables `--ui-*` en `main.css` |
| **De componente** | Decisiones de un componente concreto | Un `UButton` sólido usa `primary` de fondo y `--ui-text-inverted` como texto | Ya viene en Nuxt UI; no se toca en T2 |

La capa semántica permite el modo oscuro: `--ui-bg` apunta a un tono claro en `:root` y a uno oscuro en `.dark`, y ningún componente se entera del cambio.

**Fuente:** documentación oficial de Nuxt UI v4.12, secciones *Theme → Design system* y *Theme → CSS variables* (consultada el 2026-11-17).

## 2. Cómo usa Nuxt UI los colores

Nuxt UI tiene siete colores semánticos: `primary`, `secondary`, `neutral`, `success`, `warning`, `info` y `error`. Cada uno apunta a una **paleta de 11 tonos** (50, 100, 200 … 900, 950), igual que las paletas de Tailwind.

Dos reglas de Nuxt UI que afectan nuestras decisiones:

1. **Tono por defecto:** cada color semántico usa el tono **500 en modo claro** y el **400 en modo oscuro**. Se puede cambiar por modo con `--ui-primary: var(--ui-color-primary-600)`.
2. **Textos:** el texto usa la paleta `neutral`. En modo claro, `--ui-text-muted` usa el tono 500, `--ui-text` el 700 y `--ui-text-highlighted` el 900.

Para registrar una paleta propia hay que definir los 11 tonos en `@theme static` (`--color-<nombre>-50` … `--color-<nombre>-950`) y luego asignarla en `app.config.ts`:

```ts
// layers/base/app/app.config.ts (forma, no código final)
export default defineAppConfig({
  ui: {
    colors: { primary: 'brand-blue', secondary: 'brand-purple', neutral: 'brand-gray' },
  },
})
```

## 3. Cómo se crea una escala de 11 tonos a partir de un hex

Tenemos un solo hex por color, pero Nuxt UI necesita 11 tonos. El método es este:

1. **Pasar el color a OKLCH.** OKLCH describe un color con tres números:
   - **L** (luminosidad percibida, de 0 = negro a 1 = blanco),
   - **C** (croma: cuánto color tiene; 0 = gris),
   - **H** (tono: el ángulo en la rueda de color; ~230 = azul, ~310 = morado).

   A diferencia de HSL, en OKLCH dos colores con la misma L **se ven** igual de claros. Por eso Tailwind v4 define todas sus paletas en OKLCH.
2. **Mantener H fija** para que todos los tonos sean "el mismo azul".
3. **Usar como guía la L de cada paso de Tailwind.** Por ejemplo, en `blue` de Tailwind el 50 tiene L = 97 %, el 500 tiene 62,3 % y el 950 tiene 28,2 %.
4. **Colocar el hex original en el paso cuya L se parezca más** y generar los demás pasos variando L (y reduciendo C en los extremos, porque los colores muy claros o muy oscuros no admiten mucho croma).

Este método es una técnica común, no un estándar oficial. Lo verificable es el resultado: el test de contraste.

### Nuestros colores medidos

Valores calculados con las fórmulas de OKLCH y de contraste WCAG (sección 4):

| Color | Hex | L (OKLCH) | Paso más cercano en Tailwind | Contraste con blanco |
|---|---|---|---|---|
| primary (azul) | `#247ba0` | 54,9 % | **600** (`blue-600` = 54,6 %) | 4,76:1 |
| secondary (morado) | `#2f0147` | 23,7 % | **950** (`blue-950` = 28,2 %; es más oscuro aún) | 17,27:1 |
| neutral (gris pizarra) | `#717c89` | 58,2 % | **500** (`neutral-500` = 55,6 %) | 4,25:1 |
| extremo oscuro | `#1c1c1c` | 22,6 % | **900** (`neutral-900` = 20,5 %) | 17,04:1 |
| extremo claro | `#f1f2ee` | 95,9 % | **100** (`neutral-100` = 97 %) | 1,12:1 |

## 4. Contraste WCAG AA

WCAG 2 mide el contraste entre dos colores por su **luminancia relativa** (cuánta luz emite cada uno, de 0 a 1):

```
contraste = (L_clara + 0.05) / (L_oscura + 0.05)
```

El resultado va de 1:1 (mismo color) a 21:1 (negro sobre blanco). Nivel **AA** exige:

- **4,5:1** para texto normal,
- **3:1** para texto grande (≥ 24 px, o ≥ 18,66 px en negrita) y para bordes o íconos que transmiten información.

En T2, un test de Vitest calcula esta fórmula para cada pareja texto/fondo en modo claro y oscuro. Si un token no pasa, el test falla y lo vemos antes de que llegue a la interfaz.

## 5. Modo claro y oscuro

Nuxt UI activa el modo oscuro poniendo la clase `.dark` en `<html>`. Las variables `--ui-*` tienen un valor en `:root` (claro) y otro en `.dark` (oscuro). El modo inicial es oscuro (ADR 0046, que sustituye al "seguir al sistema" del ADR 0018): la layer `base` lo fija con `colorMode: { preference: 'dark' }` en su `nuxt.config.ts`. El botón de dos estados (`UColorModeButton`, en el header del layout) cambia entre claro y oscuro, y la elección se guarda.

## 6. Tipografía, radio, espaciado y breakpoints

- **Fuente:** `--font-sans: 'Work Sans', …` en `@theme`. Nuxt UI incluye `@nuxt/fonts`, que descarga la fuente automáticamente (ADR 0019).
- **Montos:** la clase `tabular-nums` hace que todas las cifras tengan el mismo ancho, así las columnas de montos quedan alineadas.
- **Radio:** `--ui-radius: 0.5rem` en `:root`. Nuxt UI calcula sus `rounded-*` a partir de él (ADR 0020).
- **Espaciado y breakpoints:** los de Tailwind por defecto (ADR 0020). No se definen tokens nuevos; la página `/design` (T4) los documenta.

## 7. Puntos que se deciden durante T2

Los números de la sección 3 muestran tres cosas que chocan con los valores por defecto de Nuxt UI. Ronald decide cada una cuando T2 llegue a ese punto:

1. **Tono de `primary` en modo claro.** Nuxt UI usa el 500, pero `#247ba0` cae en el 600. Con el 500, el azul de marca no aparecería en los botones, y un 500 más claro tiene menos contraste con el texto blanco. **Decidido: 600** ([ADR 0025](decisions/0025-tono-600-para-primary-en-modo-claro.md)).
2. **Texto secundario (`--ui-text-muted`).** Usa `neutral-500` = `#717c89`, que da 4,25:1 sobre blanco: **no pasa AA** para texto normal. **Decidido: 600** ([ADR 0026](decisions/0026-tono-600-para-texto-secundario.md)).
3. **Morado `secondary`.** `#2f0147` cae en el 950. Con el tono por defecto (500 en claro), el morado que se vería sería mucho más claro que el de marca. **Decidido: 950** ([ADR 0027](decisions/0027-tono-950-para-secondary-en-modo-claro.md)).

El fondo en modo claro es blanco ([ADR 0031](decisions/0031-fondo-blanco-en-modo-claro.md)). Los colores de estado usan el tono 700 en modo claro ([ADR 0032](decisions/0032-tono-700-para-colores-de-estado-en-modo-claro.md)). En modo oscuro, `primary` y `secondary` usan el tono 400 por defecto de Nuxt UI ([ADR 0029](decisions/0029-tono-400-para-primary-en-modo-oscuro.md), [ADR 0030](decisions/0030-tono-400-para-secondary-en-modo-oscuro.md)); `text-muted` usa su valor por defecto (400), que ya pasa AA. Los placeholders (`text-dimmed`) usan el mismo tono que `text-muted` en ambos modos ([ADR 0033](decisions/0033-texto-tenue-igual-que-texto-secundario.md)).

Nombres de las paletas primitivas: `brand-blue`, `brand-purple` y `brand-gray` ([ADR 0028](decisions/0028-prefijo-brand-para-paletas-propias.md)).

## 8. Qué clases acepta el lint (T3)

Los componentes solo usan nombres semánticos ([ADR 0036](decisions/0036-solo-colores-semanticos-en-componentes.md)). `bun run lint` falla con:

- **Valores arbitrarios:** `p-[13px]`, `text-[#123456]`, `p-(--mi-variable)`.
- **Colores con tono:** `bg-red-500`, `bg-brand-blue-200` e incluso `bg-primary-100`. Los tonos de marca solo se usan en la layer `base`, dentro de los tokens.
- **`black` y `white`:** usa `bg-default`, `text-highlighted` y similares.
- **Clases que Tailwind no conoce:** `text-primery`.

Sí se aceptan `text-primary`, `text-muted`, `bg-elevated`, `border-default`, la opacidad (`bg-primary/10`) y el espaciado y los breakpoints de Tailwind (`p-4`, `md:grid-cols-2`). Si falta un tono, primero se crea un token semántico en `base`, cubierto por el test de contraste. Los ejemplos ejecutables están en `apps/web/layers/base/app/theme/tailwind-lint.test.ts`.

## Para aprender más (gratis)

- [Nuxt UI — Design system](https://ui.nuxt.com/docs/getting-started/theme/design-system) y [CSS variables](https://ui.nuxt.com/docs/getting-started/theme/css-variables): la fuente de las secciones 2, 5 y 6.
- [OKLCH in CSS: why we moved from RGB and HSL](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl) (Evil Martians), con el selector [oklch.com](https://oklch.com) para experimentar.
- [Contrast and Color Accessibility](https://webaim.org/articles/contrast/) (WebAIM) y su [Contrast Checker](https://webaim.org/resources/contrastchecker/).
- [Intro to Design Tokens](https://penpot.app/blog/intro-to-design-tokens/) (Penpot): las tres capas explicadas para principiantes.
