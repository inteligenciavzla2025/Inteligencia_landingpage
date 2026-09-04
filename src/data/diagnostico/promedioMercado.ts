import type { DimensionKey } from '../../lib/diagnostico/types';

// PLACEHOLDER ILUSTRATIVO — no proviene de datos agregados reales (no existe
// backend ni histórico de diagnósticos todavía). Reemplazar por un promedio
// calculado sobre diagnósticos reales en cuanto haya volumen suficiente
// (idealmente 30+ respuestas) para que sea representativo y no engañoso.
// Se usa UN SOLO valor compartido por dimensión, no un promedio distinto por
// sector: fabricar 6 promedios "por sector" sin datos reales aparentaría una
// precisión estadística que no existe. Un único placeholder honesto,
// declarado como tal, es preferible a cifras específicas que aparentan
// gravedad estadística que no tienen.
export const PROMEDIO_MERCADO: Record<DimensionKey, number> = {
    datos: 38,
    procesos: 42,
    tecnologia: 40,
    talento: 35,
    gobierno: 30,
    economia: 44,
};
