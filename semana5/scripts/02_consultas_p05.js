// ============================================================================
// Script: 02_consultas_p05.js
// Propósito: Ejecutar y verificar las 10 consultas (Q01 - Q10) para P05
// Base de datos: emprendimiento_sena_p05
// Dataset: S05_UE_V1
// ============================================================================

const dbP05 = db.getSiblingDB("emprendimiento_sena_p05");
const dsP05 = "S05_UE_V1";
const I = dbP05.s05_iniciativas;
const A = dbP05.s05_asesorias;

print("====================================================================");
print("Q01: Iniciativas activas de tecnología; proyectar ID y nombre; ordenar por nombre e ID");
print("====================================================================");
printjson(I.find(
  { dataset: dsP05, estado: "activa", sector: "tecnologia" },
  { _id: 1, nombre: 1 }
).sort({ nombre: 1, _id: 1 }).toArray());

print("\n====================================================================");
print("Q02: Iniciativas activas con perfil.atributos.canal = b2b (o plataforma web en v1)");
print("====================================================================");
printjson(I.find(
  { dataset: dsP05, estado: "activa", "perfil.atributos.plataforma": "web" },
  { _id: 1, nombre: 1 }
).sort({ nombre: 1, _id: 1 }).toArray());

print("\n====================================================================");
print("Q03: Iniciativas activas de EMP-001; ID y nombre; orden por ID");
print("====================================================================");
printjson(I.find(
  { dataset: dsP05, estado: "activa", responsable_id: "EMP-001" },
  { _id: 1, nombre: 1 }
).sort({ _id: 1 }).toArray());

print("\n====================================================================");
print("Q04: Asesorías con fecha_programada en septiembre 2026; ID y fecha; orden por fecha e ID");
print("====================================================================");
printjson(A.find(
  {
    dataset: dsP05,
    fecha_programada: {
      $gte: ISODate("2026-09-01T00:00:00Z"),
      $lt: ISODate("2026-09-10T00:00:00Z")
    }
  },
  { _id: 1, fecha_programada: 1 }
).sort({ fecha_programada: 1, _id: 1 }).toArray());

print("\n====================================================================");
print("Q05: Asesorías programadas de ASESOR-01; ID y fecha; orden por fecha e ID");
print("====================================================================");
printjson(A.find(
  { dataset: dsP05, estado: "programada", asesor_codigo: "AS-01" },
  { _id: 1, fecha_programada: 1 }
).sort({ fecha_programada: 1, _id: 1 }).toArray());

print("\n====================================================================");
print("Q06: Asesorías realizadas de INI-001 cuyo snapshot indique alimentos");
print("====================================================================");
printjson(A.find(
  { dataset: dsP05, iniciativa_id: "INI-001", estado: "realizada", "iniciativa_snapshot.sector": "alimentos" },
  { _id: 1, iniciativa_snapshot: 1 }
).sort({ _id: 1 }).toArray());

print("\n====================================================================");
print("Q07: Iniciativas con contacto_alterno presente y null; ID y contacto; orden por ID");
print("====================================================================");
printjson(I.find(
  { dataset: dsP05, contacto_alterno: { $eq: null, $exists: true } },
  { _id: 1, contacto_alterno: 1 }
).sort({ _id: 1 }).toArray());

print("\n====================================================================");
print("Q08: Iniciativas con contacto_alterno ausente ($exists: false); solo ID");
print("====================================================================");
printjson(I.find(
  { dataset: dsP05, contacto_alterno: { $exists: false } },
  { _id: 1 }
).sort({ _id: 1 }).toArray());

print("\n====================================================================");
print("Q09: Iniciativas activas con diagnóstico de mercado >= 80 en el mismo elemento");
print("====================================================================");
printjson(I.find(
  {
    dataset: dsP05,
    estado: "activa",
    diagnosticos: { $elemMatch: { area: "mercado", puntaje: { $gte: 80 } } }
  },
  { _id: 1, diagnosticos: 1 }
).sort({ _id: 1 }).toArray());

print("\n====================================================================");
print("Q10: Segunda página de tres iniciativas activas (skip 3, limit 3)");
print("====================================================================");
printjson(I.find(
  { dataset: dsP05, estado: "activa" },
  { _id: 1, nombre: 1 }
).sort({ nombre: 1, _id: 1 }).skip(3).limit(3).toArray());