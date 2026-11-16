# 0001 — TypeORM para NestJS; Nuxt sin ORM

- **Fecha:** 2026-11-03
- **Estado:** aceptada
- **Decidido por:** Ronald Cadiz
- **Referencias:** Acta de Constitución v1.2 ("Pendientes por decidir"); tarea de Notion "Generar docs/alcance.md desde el acta"

## Contexto

El acta dejaba abierto el ORM para NestJS (Prisma o TypeORM), y CLAUDE.md añadía Drizzle. Ronald propuso al principio TypeORM para NestJS y Prisma para Nuxt. Pero en la arquitectura de CLAUDE.md, `apps/web` no tiene base de datos: sus server routes son mocks, y desde la Fase 3 llaman a la API de NestJS, que es la dueña de PostgreSQL.

## Opciones consideradas

1. **TypeORM en NestJS y Prisma en Nuxt.** A favor: se aprenden dos ORM. En contra: dos backends escribiendo en la misma base, con dos juegos de migraciones, y las reglas fiscales (ITBIS, secuencias e-NCF) podrían saltarse la API.
2. **TypeORM solo en NestJS y Nuxt sin ORM.** A favor: un solo dueño de los datos, y encaja con los decoradores y módulos de Nest. En contra: Prisma queda fuera del proyecto.
3. **Prisma o Drizzle en NestJS.** Se dejaron fuera por la elección de Ronald.

## Decisión

TypeORM es el ORM de `apps/api`. `apps/web` no usa ORM ni accede a la base de datos.

## Por qué

En palabras de Ronald, primero: "Como nos proyectos diferentes usaremos typeORM para nestjs y prisma para nuxt." Después de ver que Nuxt no tiene base de datos propia: "Tienes razón, Nuxt no usará un ORM."

## Consecuencias

- Todo acceso a datos pasa por la API de NestJS.
- Si algún día Nuxt necesita datos propios (por ejemplo, sesiones), hay que revisar esta decisión con un ADR nuevo.
