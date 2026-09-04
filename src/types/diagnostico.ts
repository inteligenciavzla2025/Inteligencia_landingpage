import type { DiagnosticoResultado } from '../lib/diagnostico/types';

export const DIAGNOSTICO_STORAGE_VERSION = 1;

export interface DiagnosticoAnswer {
    questionId: string;
    value: number | string | string[];
}

// Forma estructural de los datos del formulario de contacto (ver
// FormularioContacto.tsx, que infiere el tipo real desde su schema zod —
// se declara acá en vez de importar del componente para no acoplar el
// estado a la capa de UI; ambos tipos son estructuralmente compatibles).
export interface DiagnosticoContacto {
    nombre: string;
    empresa: string;
    cargo: string;
    sector: string;
    rangoEmpleados: string;
    email: string;
    whatsapp: string;
}

export interface DiagnosticoState {
    version: number;
    currentStep: number;
    answers: DiagnosticoAnswer[];
    startedAt: string;
    updatedAt: string;
    resultId: string | null;
    /** Datos del formulario de contacto, para poder re-usarlos (ej. armar
     * el mensaje inicial del chat) sin pedírselos de nuevo al visitante. */
    contacto: DiagnosticoContacto | null;
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
        contacto: null,
        resultado: null,
    };
}
