# Alcance del MVP — FacturaRD

> Resumen generado desde el [Acta de Constitución v1.2](https://docs.google.com/document/d/1G5PkY08gvjFfSKiamYM32hfvI2oFc9-EJu65z7zXJx0/edit) (actualizada el 3 nov 2026) y las historias del [proyecto en Notion](https://app.notion.com/p/407ce09eb78b813db75cf00e147e4948).
> El acta es la fuente de verdad. Si este archivo la contradice, gana el acta.

## Qué es

Una aplicación web que reemplaza las facturas en Excel y el Facturador Gratuito de la DGII. Centraliza clientes, servicios y facturas; calcula ITBIS y totales; gestiona las secuencias e-NCF, y delega la firma y la transmisión de los e-CF a un proveedor autorizado por API. Cada comprobante muestra su estado: aceptado, rechazado o aceptado condicional.

Motivo legal: la Ley 32-23 obliga al negocio a emitir e-CF. Hasta la salida a producción, el negocio sigue usando el Facturador Gratuito.

## Hitos

| Fecha | Hito |
|---|---|
| 19 oct 2026 | Inicio |
| 15 nov 2026 | Plazo de la DGII para micro y pequeños contribuyentes (se cubre con el Facturador Gratuito) |
| **13 dic 2026** | **Demo pública del MVP frontend, con datos simulados** |
| **1 mar 2027** | **Salida a producción con e-CF 31 y 32** |
| 2 abr 2027 | Cierre: notas 33 y 34, y aceptación |

## Fases

| Fase | Fechas | Contenido |
|---|---|---|
| 0 · Preparación | 19 oct – 1 nov 2026 | Monorepo, herramientas, documentación base |
| 1 · Base del sistema | 2 – 29 nov 2026 | Sistema de diseño, layout y navegación, login simulado, clientes, servicios |
| 2 · Facturación y estados | 30 nov 2026 – 10 ene 2027 | Crear factura 31/32, listado, vista previa, estado del e-CF, publicación de la demo |
| 3 · API e-CF y PDF | 11 ene – 7 feb 2027 | Backend NestJS, integración con el proveedor, PDF con QR |
| 4 · Pruebas y despliegue | 8 feb – 1 mar 2027 | Pruebas completas y salida a producción |
| 5 · Notas 33/34, reportes y cierre | 1 mar – 2 abr 2027 | Notas de débito y crédito, reportes, cierre |

## Pantallas del MVP frontend (demo del 13 dic)

Todas usan datos simulados (server routes de Nuxt). Salen de las historias de las Fases 1 y 2:

| Pantalla | Historia en Notion |
|---|---|
| Inicio de sesión | Login con sesión simulada |
| Layout con navegación | Layout y navegación |
| Clientes: listado y formulario (RNC o cédula) | Gestión de clientes (RNC o cédula) |
| Servicios: listado y formulario con tasa de ITBIS | Gestión de servicios con tasa de ITBIS |
| Nueva factura 31/32 con líneas, ITBIS y totales | Crear factura 31/32 con líneas, ITBIS y totales |
| Listado de facturas con filtros y paginación | Listado de facturas con filtros y paginación |
| Vista previa de la factura | Vista previa de la factura |
| Estado de cada e-CF | Estado de cada e-CF |

La base de todas es la historia **Sistema de diseño base: tokens y componentes UI**. La demo se entrega con la historia **Publicar demo MVP: deploy, README, GIF y diagrama**.

## Incluido en el proyecto completo

- Emisión de e-CF tipo 31 (Crédito Fiscal) y 32 (Consumo).
- Notas de Débito (33) y Crédito (34) electrónicas, en la Fase 5.
- Catálogo de clientes (RNC o cédula) y de servicios con su tasa de ITBIS.
- Integración con la API del proveedor: envío, consulta de estado y respuestas.
- Representación impresa (PDF) con código QR y código de seguridad.
- Reportes de ventas e ITBIS como apoyo al formato 607.
- Migración inicial desde el Excel actual: 20 clientes y 30 servicios.

## Fuera de alcance

- Inventario, nómina, cuentas por cobrar y contabilidad general.
- Aplicación móvil nativa.
- Certificación propia como emisor directo ante la DGII (la firma y transmisión van por el proveedor).
- Recepción y aprobación de e-CF de proveedores (compras).

## Objetivos medibles

1. 100 % de las facturas emitidas desde FacturaRD a partir del 1 mar 2027 (31 y 32), y todos los tipos del alcance desde el 2 abr 2027.
2. Emitir una factura en menos de 2 minutos.
3. Cero rechazos de la DGII por errores de formato o cálculo después de producción.
4. Costo mensual (proveedor + hosting) por debajo de un tope aún por definir.
5. Demo del MVP frontend publicada antes del 13 dic 2026.
6. Dedicación sostenible de ≈ 5 h por semana.

## Criterios de aceptación del proyecto

El sponsor (Roman Cadiz) confirma por escrito que:

- Se emitieron al menos 10 facturas reales aceptadas por la DGII sin ayuda técnica.
- Se emitió y fue aceptada al menos una nota de crédito.
- Los totales e ITBIS de los reportes cuadran con las facturas del mes.
- Recibió el manual de usuario y sabe usar el sistema.

## Pendientes por decidir

Siguen abiertos; ninguna tarea los resuelve por su cuenta:

- Proveedor de e-CF y su costo mensual.
- Hosting de la API y la base de datos, y su costo.
- Datos del negocio: razón social, RNC y clasificación (micro o pequeño).
- Presupuesto máximo mensual (objetivo 4).
- Si hacen falta otros tipos de e-CF (por ejemplo, 44 o 45).
- Cómo cancelar facturas entre el 1 mar y el 2 abr 2027, y si la anulación de secuencias no usadas entra en el alcance.
