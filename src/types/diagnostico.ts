import type { DiagnosticoResultado } from '../lib/diagnostico/types';

export const DIAGNOSTICO_STORAGE_VERSION = 1;

export interface DiagnosticoAnswer {
    questionId: string;
    value: number | string | string[];
}

export interface DiagnosticoState {
    version: number;
    currentStep: number;
    answers: DiagnosticoAnswer[];
    startedAt: string;
    updatedAt: string;
    resultId: string | null;
    /**
     * Resultado ya calculado, si el cuestionario se completó. Sin rutas
     * separadas (/resultado/:id), esta es la única forma de que el
     * resultado sobreviva a una recarga: vive en el mismo estado
     * persistido del cuestionario, no en una clave de localStorage aparte.
     */
    resultado: DiagnosticoResultado | null;
}

export function createEmptyDiagnosticoState(): DiagnosticoState {
    const now = new Date().toISOString();
    return {
        version: DIAGNOSTICO_STORAGE_VERSION,
        currentStep: 0,
        answers: [],
        startedAt: now,
        updatedAt: now,
        resultId: null,
        resultado: null,
    };
}
