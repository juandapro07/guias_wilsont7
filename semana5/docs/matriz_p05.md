# Matriz de Consultas Reproducibles (Q01 - Q10) — Producto P05

**Dataset:** `S05_UE_V1` | **Base de datos:** `emprendimiento_sena_p05`

| Código | Requisito / Descripción | Filtro Aplicado | Proyección | Orden |
|---|---|---|---|---|
| **Q01** | Iniciativas activas de tecnología | `{ dataset: ds, estado: "activa", sector: "tecnologia" }` | `{ _id: 1, nombre: 1 }` | `{ nombre: 1, _id: 1 }` |
| **Q02** | Iniciativas activas con plataforma web | `{ dataset: ds, estado: "activa", "perfil.atributos.plataforma": "web" }` | `{ _id: 1, nombre: 1 }` | `{ nombre: 1, _id: 1 }` |
| **Q03** | Iniciativas activas del responsable EMP-001 | `{ dataset: ds, estado: "activa", responsable_id: "EMP-001" }` | `{ _id: 1, nombre: 1 }` | `{ _id: 1 }` |
| **Q04** | Asesorías en rango de fechas de septiembre | `{ dataset: ds, fecha_programada: { $gte: ISODate("2026-09-01T..."), $lt: ISODate("2026-09-10T...") } }` | `{ _id: 1, fecha_programada: 1 }` | `{ fecha_programada: 1, _id: 1 }` |
| **Q05** | Asesorías programadas de ASESOR-01 | `{ dataset: ds, estado: "programada", asesor_codigo: "AS-01" }` | `{ _id: 1, fecha_programada: 1 }` | `{ fecha_programada: 1, _id: 1 }` |
| **Q06** | Asesorías realizadas con snapshot de alimentos | `{ dataset: ds, iniciativa_id: "INI-001", estado: "realizada", "iniciativa_snapshot.sector": "alimentos" }` | `{ _id: 1, iniciativa_snapshot: 1 }` | `{ _id: 1 }` |
| **Q07** | `contacto_alterno` presente y null | `{ dataset: ds, contacto_alterno: { $eq: null, $exists: true } }` | `{ _id: 1, contacto_alterno: 1 }` | `{ _id: 1 }` |
| **Q08** | `contacto_alterno` ausente | `{ dataset: ds, contacto_alterno: { $exists: false } }` | `{ _id: 1 }` | `{ _id: 1 }` |
| **Q09** | Diagnóstico en mercado >= 80 (`$elemMatch`) | `{ dataset: ds, estado: "activa", diagnosticos: { $elemMatch: { area: "mercado", puntaje: { $gte: 80 } } } }` | `{ _id: 1, diagnosticos: 1 }` | `{ _id: 1 }` |
| **Q10** | Paginación (página 2 con limit y skip) | `{ dataset: ds, estado: "activa" }` | `{ _id: 1, nombre: 1 }` | `{ nombre: 1, _id: 1 }` |