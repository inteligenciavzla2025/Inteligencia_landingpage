import type { DimensionKey } from '../../lib/diagnostico/types';

export type BloqueKey = DimensionKey | 'potencial';

export interface OpcionPregunta {
    /** 0-4, coincide 1:1 con la posición en `opciones` (orden = orden de score). */
    puntaje: 0 | 1 | 2 | 3 | 4;
    texto: string;
}

export interface Pregunta {
    /** 'p1'..'p24' — debe coincidir exactamente con las claves de DiagnosticoRespuestas. */
    id: string;
    bloque: BloqueKey;
    texto: string;
    /** Exactamente 5 opciones, en orden de puntaje 0→4. */
    opciones: OpcionPregunta[];
}

export interface BloqueInfo {
    key: BloqueKey;
    titulo: string;
    /** Copy de 2 líneas para BloqueTransicion.tsx. */
    lineas: [string, string];
    /** IDs de pregunta en este bloque, en orden de aparición. */
    preguntaIds: string[];
}

export type PasoQuiz =
    | { tipo: 'transicion'; bloque: BloqueKey }
    | { tipo: 'pregunta'; id: string }
    | { tipo: 'contacto' };
