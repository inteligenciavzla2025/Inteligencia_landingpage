import type { DimensionKey } from '../../lib/diagnostico/types';

// Interpretación neutral de cada dimensión, mostrada para cualquier puntaje
// (no solo los bajos) al tocar un eje del radar. Distinto en tono del
// mensajeRiesgo (que es específicamente de alerta para la dimensión más
// débil) — esto es explicativo, no alarmante.
export const INTERPRETACION_DIMENSION: Record<DimensionKey, string> = {
    datos: 'Mide qué tan centralizada, limpia y confiable es la información que usa la operación día a día. Es la base sobre la que se apoya cualquier automatización posterior.',
    procesos: 'Mide cuánto de la operación está documentado y estandarizado versus cuánto vive solo en la cabeza de una persona. A mayor estandarización, más fácil (y más barato) automatizar.',
    tecnologia: 'Mide si las herramientas actuales pueden integrarse entre sí y sostener flujos automatizados, o si funcionan como islas separadas.',
    talento: 'Mide si el equipo tiene el tiempo y las habilidades para operar y mantener herramientas de IA sin depender permanentemente de terceros.',
    gobierno: 'Mide si existen reglas claras sobre cómo se usan los datos y la IA en la empresa: quién decide, quién supervisa y qué límites hay.',
    economia: 'Mide qué tan claro está el vínculo entre invertir en IA y un resultado medible en ahorro o ingresos, algo clave para sostener cualquier proyecto más allá de una prueba.',
};
