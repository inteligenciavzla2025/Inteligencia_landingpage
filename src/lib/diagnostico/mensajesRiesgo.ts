import type { DimensionKey } from './types';

export const MENSAJES_RIESGO_POR_DIMENSION: Record<DimensionKey, string> = {
    datos: 'Los datos están dispersos y sin estandarizar, lo que impide automatizar cualquier proceso con confianza: cada iniciativa de IA parte de cero porque la información no es confiable ni está centralizada.',
    procesos: 'Los procesos no están documentados ni estandarizados, por lo que cada automatización debe rediseñarse a mano y el conocimiento operativo depende de personas puntuales, no de la organización.',
    tecnologia: 'La infraestructura tecnológica actual no tiene la capacidad de integración necesaria para sostener automatización o IA a escala, lo que obliga a soluciones parciales y de corta vida.',
    talento: 'El equipo no cuenta con las habilidades ni el tiempo asignado para operar herramientas de IA, por lo que cualquier iniciativa dependerá de terceros de forma permanente y quedará expuesta a cuellos de botella.',
    gobierno: 'No existen políticas claras de gobierno de datos ni de uso de IA, lo que expone a la empresa a riesgos de cumplimiento, seguridad y decisiones automatizadas sin supervisión adecuada.',
    economia: 'No hay un caso de negocio claro que vincule la inversión en IA con ahorro o ingresos medibles, lo que dificulta justificar presupuesto y sostener el proyecto más allá de un piloto.',
};
