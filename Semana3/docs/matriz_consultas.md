# Matriz de Consultas Reproducibles - Semana 3 (E03)

**Dataset:** `S03_UE_V1`  
**Base de datos:** `emprendimiento_sena_lab`

| Código | Requisito / Descripción | Filtro Aplicado | Proyección | Orden | Esperado / Obtenido |
|---|---|---|---|---|---|
| **C01** | Iniciativas activas de tecnología en puesta en marcha (Q01) | `{ dataset: ds, estado: "activa", sector: "tecnologia", etapa: "puesta_en_marcha" }` | `{ _id: 1, nombre: 1, etapa: 1 }` | `{ nombre: 1, _id: 1 }` | `INI-004` (Iniciativa de Innovacion 004) |
| **C02** | Iniciativas activas con atributo plataforma = web (Q02 parcial) | `{ dataset: ds, estado: "activa", "perfil.atributos.plataforma": "web" }` | `{ _id: 1, nombre: 1, "perfil.atributos.plataforma": 1 }` | `{ _id: 1 }` | `INI-002`, `INI-004`, `INI-006`, `INI-008`, `INI-010` |
| **C03** | Iniciativas activas asignadas a EMP-001 (Q03) | `{ dataset: ds, estado: "activa", responsable_id: "EMP-001" }` | `{ _id: 1, nombre: 1, responsable_id: 1 }` | `{ _id: 1 }` | `INI-001` |
| **C04** | Asesorías programadas virtuales en octubre 2026 UTC (Q04) | `{ dataset: ds, estado: "programada", modalidad: "virtual", fecha_programada: { $gte: ISODate("2026-10-01T00:00:00Z"), $lt: ISODate("2026-11-01T00:00:00Z") } }` | `{ _id: 1, iniciativa_id: 1, fecha_programada: 1, modalidad: 1 }` | `{ fecha_programada: 1, _id: 1 }` | `ASE-016`, `ASE-018`, `ASE-020`, `ASE-022`, `ASE-024` |
| **C05** | Historial de asesorías de la iniciativa INI-001 (Q05) | `{ dataset: ds, iniciativa_id: "INI-001" }` | `{ _id: 1, estado: 1, fecha_programada: 1 }` | `{ fecha_programada: 1, _id: 1 }` | `ASE-001`, `ASE-016` |
| **C06** | Asesorías realizadas con tema "propuesta de valor" | `{ dataset: ds, estado: "realizada", temas: "propuesta de valor" }` | `{ _id: 1, temas: 1 }` | `{ _id: 1 }` | `ASE-001` a `ASE-015` |
| **C07** | Evaluación de `contacto_alterno` (igual a null) | `{ dataset: ds, _id: { $in: ["INI-001", "INI-002", "INI-003"] }, contacto_alterno: null }` | `{ _id: 1, contacto_alterno: 1 }` | `{ _id: 1 }` | `INI-001` (null) e `INI-002` (ausente) |
| **C08** | Evaluación de `contacto_alterno` ausente (`$exists: false`) | `{ dataset: ds, _id: { $in: ["INI-001", "INI-002", "INI-003"] }, contacto_alterno: { $exists: false } }` | `{ _id: 1, contacto_alterno: 1 }` | `{ _id: 1 }` | Únicamente `INI-002` |
| **C09** | Diagnóstico en área mercado con puntaje >= 80 (`$elemMatch`) | `{ dataset: ds, diagnosticos: { $elemMatch: { area: "mercado", puntaje: { $gte: 80 } } } }` | `{ _id: 1, diagnosticos: 1 }` | `{ _id: 1 }` | Únicamente `INI-002` (mercado: 85) |
| **C10** | Paginación de iniciativas activas (Página 2: skip vs seek) | `{ dataset: ds, estado: "activa" }` | `{ _id: 1, nombre: 1, sector: 1 }` | `{ sector: 1, _id: 1 }` | Coincidencia exacta entre `skip(3)` y `seek`: `INI-002`, `INI-005`, `INI-008` |