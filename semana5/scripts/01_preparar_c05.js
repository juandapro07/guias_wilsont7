// ============================================================================
// Script: 01_preparar_c05.js
// Propósito: Cargar la minibase reducida C05 (Comprobación C05)
// Base de datos: emprendimiento_sena_c05
// Colección: c05_iniciativas
// ============================================================================

const dbC05 = db.getSiblingDB("emprendimiento_sena_c05");
const col = dbC05.c05_iniciativas;
const dsC05 = "C05_UE_2026";

// Verificar si ya existen documentos para no duplicar en reintentos
if (col.countDocuments({ dataset: dsC05 }) === 0) {
  col.insertMany([
    {
      _id: "C05-001",
      dataset: dsC05,
      nombre: "Andes Circular",
      estado: "activa",
      diagnosticos: [
        { area: "mercado", puntaje: Int32(45) },
        { area: "costos", puntaje: Int32(92) }
      ],
      contacto_alterno: null,
      intentos_contacto: Int32(0)
    },
    {
      _id: "C05-002",
      dataset: dsC05,
      nombre: "Brisa Cacao",
      estado: "activa",
      diagnosticos: [
        { area: "mercado", puntaje: Int32(88) },
        { area: "costos", puntaje: Int32(40) }
      ],
      intentos_contacto: Int32(0)
    },
    {
      _id: "C05-003",
      dataset: dsC05,
      nombre: "Brisa Cacao",
      estado: "activa",
      diagnosticos: [
        { area: "mercado", puntaje: Int32(85) },
        { area: "costos", puntaje: Int32(55) }
      ],
      contacto_alterno: "canal-demo-03",
      intentos_contacto: Int32(0)
    },
    {
      _id: "C05-004",
      dataset: dsC05,
      nombre: "Delta Huerta",
      estado: "archivada",
      diagnosticos: [
        { area: "mercado", puntaje: Int32(95) },
        { area: "costos", puntaje: Int32(60) }
      ],
      contacto_alterno: null,
      intentos_contacto: Int32(0)
    },
    {
      _id: "C05-005",
      dataset: dsC05,
      nombre: "Enlace Digital",
      estado: "activa",
      diagnosticos: [
        { area: "mercado", puntaje: Int32(70) },
        { area: "costos", puntaje: Int32(50) }
      ],
      intentos_contacto: Int32(0)
    },
    {
      _id: "C05-006",
      dataset: dsC05,
      nombre: "Fibra Local",
      estado: "activa",
      diagnosticos: [
        { area: "mercado", puntaje: Int32(90) },
        { area: "costos", puntaje: Int32(20) }
      ],
      contacto_alterno: null,
      intentos_contacto: Int32(0)
    }
  ]);
  print("=== Minibase C05 cargada exitosamente (6 documentos) ===");
} else {
  print("=== La minibase C05 ya estaba inicializada ===");
}

print(`Total documentos en c05_iniciativas: ${col.countDocuments({ dataset: dsC05 })}`);