# Ampliación del Modelo v1.1 (Semana 3)

## Nuevos Campos Incorporados

1. **`intentos_contacto`**: Entero >= 0. Utilizado para practicar aumentos con `$inc`.
2. **`contacto_alterno`**: Cadena opcional o `null`. Utilizado para evaluar la diferencia entre `null` explícito y ausente (`$exists`).
3. **`diagnosticos`**: Arreglo opcional con subdocumentos `{ area, puntaje }`. Probado con `$elemMatch`.
4. **`temporal`**: Booleano presente únicamente en registros descartables (`TMP-*`).