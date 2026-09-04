import type { ProcesoRecomendado } from '../diagnostico/types';

type BandaImpacto = 'alto' | 'medio' | 'bajo';
type BandaEsfuerzo = 'bajo' | 'medio' | 'alto';

function bandaImpacto(impacto: number): BandaImpacto {
    if (impacto >= 8) return 'alto';
    if (impacto >= 5) return 'medio';
    return 'bajo';
}

function bandaEsfuerzo(esfuerzo: number): BandaEsfuerzo {
    if (esfuerzo <= 3) return 'bajo';
    if (esfuerzo <= 6) return 'medio';
    return 'alto';
}

const FRASE_IMPACTO: Record<BandaImpacto, string> = {
    alto: 'un impacto alto en la operación diaria',
    medio: 'un impacto moderado pero consistente',
    bajo: 'un impacto puntual pero medible',
};

const FRASE_ESFUERZO: Record<BandaEsfuerzo, string> = {
    bajo: 'con un esfuerzo de implementación bajo: se puede poner en marcha rápido',
    medio: 'con un esfuerzo de implementación moderado: requiere planificación pero no una reestructuración completa',
    alto: 'con un esfuerzo de implementación considerable: conviene planificarlo como proyecto, no como ajuste rápido',
};

/**
 * Arma una descripción a partir de los campos numéricos ya existentes en
 * ProcesoRecomendado — no requiere tocar el catálogo (ya testeado) para
 * agregar un campo de descripción nuevo.
 */
export function templateDescripcionProceso(proceso: ProcesoRecomendado): string {
    const impacto = bandaImpacto(proceso.impacto);
    const esfuerzo = bandaEsfuerzo(proceso.esfuerzo);
    return `Automatizar "${proceso.nombre}" tiene ${FRASE_IMPACTO[impacto]}, ${FRASE_ESFUERZO[esfuerzo]}. Se estima en ~${proceso.horasMes} horas al mes liberadas para el equipo.`;
}
