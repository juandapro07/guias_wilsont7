# Bitácora de Errores y Diagnóstico (Semana 3)

- **Contexto:** Ejecución de la consulta C09 sobre el arreglo de diagnósticos.
- **Síntoma:** Consultas con rutas independientes arrojaban falsos positivos (evaluando `area` en un elemento y `puntaje` en otro).
- **Causa:** Ausencia del operador `$elemMatch`.
- **Corrección:** Se implementó `$elemMatch` garantizando que ambas condiciones se cumplan estrictamente dentro del mismo subdocumento.