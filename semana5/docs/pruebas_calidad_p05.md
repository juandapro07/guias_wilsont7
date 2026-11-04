# Pruebas de Calidad, Validación y Evolución — Producto P05

**Dataset:** `S05_UE_V1` | **Base de datos:** `emprendimiento_sena_p05`

---

## 1. Banco de Pruebas de Contratos e Integridad (V01–V03 e I01–I05)

Las pruebas validan que el esquema de validación (estricto), los índices únicos y la lógica de aplicación protejan la integridad de los datos sin aceptar registros erróneos[cite: 3].

| ID Prueba | Tipo / Caso | Condición Evaluada | Mecanismo de Control | Resultado Esperado / Obtenido |
|---|---|---|---|---|
| **V01** | Válido | Iniciativa con todos sus campos obligatorios y tipos correctos | Esquema de validación estricto | **Aceptado** (documento insertado correctamente) |
| **V02** | Válido | Recurso nuevo con código de inventario único y tipos BSON correctos | Esquema y tipos BSON | **Aceptado** (inserción exitosa en inventario) |
| **V03** | Válido | Asesoría realizada con snapshot histórico coherente | Esquema y reglas de negocio | **Aceptado** (registro histórico guardado) |
| **I01** | Inválido | Iniciativa que omite el campo obligatorio `nombre` | Validador de esquema (`required`) | **Rechazado** por violación de contrato de esquema |
| **I02** | Inválido | Recurso nuevo con cantidad en formato string (`"1"` en vez de entero/decimal) | Validación de tipos BSON (`bsonType`) | **Rechazado** por error de tipo de datos |
| **I03** | Inválido | Iniciativa con un `estado` fuera del catálogo permitido | Validador de esquema (`enum`) | **Rechazado** por incumplimiento de enumeración |
| **I04** | Inválido | Recurso nuevo con un `codigo_inventario` ya existente (`INV-UE-001`) | Índice único de base de datos | **Rechazado** por duplicidad de clave única |
| **I05** | Inválido | Iniciativa con `responsable_id` con formato válido pero inexistente en la colección de emprendedores | Comprobación lógica de aplicación | **Rechazado** por la capa de aplicación (referencia huérfana) |

---

## 2. Plan de Migración a `schema_version 2`

Para cumplir con la evolución del modelo sin alterar la colección operativa en versión 1:

1. **Aislamiento en Copia:** Se realiza una copia de las quince iniciativas operativas a una colección de staging/migración.
2. **Transformación Determinista:** Se incorpora el campo `canal_registro` con valores por defecto acordados (`no_documentado` para registros históricos sin trazabilidad de canal) y se actualiza la versión del contrato a `schema_version: Int32(2)`.
3. **Regla de Cero Modificaciones:** Una segunda ejecución consecutiva del script de migración debe modificar **cero documentos**, garantizando idempotencia.
4. **Conservación de Tipos:** Se emplea EJSON canónico para asegurar que los tipos `Int32`, `Decimal128` y `ISODate` no sufran pérdida de precisión durante el intercambio o exportación.