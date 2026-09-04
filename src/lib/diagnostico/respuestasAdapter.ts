import type { DiagnosticoAnswer } from '../../types/diagnostico';
import type { DiagnosticoRespuestas, RespuestaValor } from './types';

const IDS_PREGUNTAS = Array.from({ length: 24 }, (_, i) => `p${i + 1}`) as (keyof DiagnosticoRespuestas)[];

function coercionSegura(valor: DiagnosticoAnswer['value'] | undefined): RespuestaValor {
    const n = typeof valor === 'number' ? valor : Number(valor);
    if (!Number.isFinite(n)) return 0;
    const entero = Math.round(n);
    if (entero < 0) return 0;
    if (entero > 4) return 4;
    return entero as RespuestaValor;
}

/**
 * Convierte el arreglo genérico {questionId,value} de useDiagnosticoState al
 * shape estricto p1..p24 que exige calcularDiagnostico. Nunca lanza: si falta
 * una respuesta la completa en 0 en vez de romper justo antes de mostrarle
 * el resultado a un lead con intención de compra.
 */
export function mapearRespuestas(answers: DiagnosticoAnswer[]): DiagnosticoRespuestas {
    const porId = new Map(answers.map((a) => [a.questionId, a.value]));
    const resultado = {} as DiagnosticoRespuestas;
    for (const id of IDS_PREGUNTAS) {
        resultado[id] = coercionSegura(porId.get(id));
    }
    return resultado;
}
