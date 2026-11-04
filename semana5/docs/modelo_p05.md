# Modelo y Decisiones Arquitectónicas — Producto P05
**Unidad de Emprendimiento — Versión 1.0**  
**Dataset:** `S05_UE_V1` | **Base de datos:** `emprendimiento_sena_p05`

---

## 1. Patrones de Acceso y Elección Documental
Se selecciona un **modelo documental** con MongoDB tras contrastar los patrones de lectura y escritura del servicio[cite: 3, 4]:
* **Ficha de Iniciativa:** Todos los atributos descriptivos, el responsable y el estado se consultan de manera conjunta, por lo que se agrupan en un documento central (`s05_iniciativas`)[cite: 4].
* **Variabilidad de Atributos:** Permite flexibilizar los perfiles específicos de cada sector (como atributos de tecnología o alimentos) dentro de subdocumentos delimitados (`perfil.atributos`), evitando esquemas relacionales fragmentados[cite: 4].

---

## 2. Justificación de las Tres Decisiones Clave

1. **Historial de Asesorías en Colección Independiente (`s05_asesorias`):**
   * *Justificación:* Una iniciativa recibe múltiples asesorías a lo largo del tiempo. Al ser una relación de uno a muchos con crecimiento indefinido, mantener un arreglo ilimitado dentro de la iniciativa violaría los límites de tamaño de los documentos BSON (16 MB). Por ello, se aíslan en una colección propia enlazada mediante `iniciativa_id`[cite: 3, 4].

2. **Diagnósticos Acotados Embebidos (`diagnosticos`):**
   * *Justificación:* El análisis de madurez se limita estrictamente a dos áreas fijas (mercado y costos). Al poseer una cardinalidad acotada y leerse siempre junto a la ficha de la iniciativa, se embeben como un arreglo de subdocumentos para optimizar las consultas y evitar uniones (*joins*) innecesarias[cite: 3, 4].

3. **Snapshot Histórico en Asesorías Realizadas (`iniciativa_snapshot`):**
   * *Justificación:* Cuando una asesoría pasa al estado `realizada`, congela los datos contextuales del momento de la atención (nombre y sector). Si en el futuro la iniciativa modifica su sector actual, el contexto histórico de las atenciones pasadas no se altera ni se corrompe[cite: 3, 4].

---

## 3. Gestión de Recursos y Unicidad de Inventario
* Se incorporan los registros de recursos de prototipado (como portátiles, impresoras de etiquetas y sensores) controlados mediante un código de inventario único protegido por un **índice único** de base de datos (`code_inventory` / `codigo_inventario`), previniendo duplicidades físicas[cite: 3].