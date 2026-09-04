import { calcularDiagnostico } from '../../lib/diagnostico';
import type { DiagnosticoInput, DiagnosticoResultado } from '../../lib/diagnostico/types';

// Los 4 perfiles de entrada son los mismos, verbatim, que usa
// scoring.test.ts para cada cuadrante (ya hand-verificados ahí) — se
// reconstruyen acá llamando al motor real en vez de copiar un JSON de salida
// en paralelo, así el fixture nunca puede desincronizarse del cálculo real.

const INPUT_OPORTUNIDAD_BLOQUEADA: DiagnosticoInput = {
    respuestas: {
        p1: 0, p2: 1, p3: 1,
        p4: 1, p5: 1, p6: 2,
        p7: 1, p8: 2, p9: 1,
        p10: 2, p11: 1, p12: 1,
        p13: 1, p14: 1, p15: 1,
        p16: 1, p17: 1, p18: 1,
        p19: 3, p20: 3, p21: 2, p22: 1, p23: 3, p24: 3,
    },
    metadata: { sector: 'distribucion', empleados: '11-50' },
};

const INPUT_LISTO_PARA_AUTOMATIZAR: DiagnosticoInput = {
    respuestas: {
        p1: 3, p2: 3, p3: 3,
        p4: 3, p5: 3, p6: 3,
        p7: 3, p8: 3, p9: 3,
        p10: 3, p11: 3, p12: 3,
        p13: 2, p14: 2, p15: 2,
        p16: 3, p17: 3, p18: 3,
        p19: 3, p20: 3, p21: 3, p22: 3, p23: 3, p24: 3,
    },
    metadata: { sector: 'servicios_profesionales', empleados: '51-200' },
};

const INPUT_BASE_SOLIDA: DiagnosticoInput = {
    respuestas: {
        p1: 3, p2: 3, p3: 3,
        p4: 3, p5: 3, p6: 3,
        p7: 3, p8: 3, p9: 3,
        p10: 3, p11: 3, p12: 3,
        p13: 2, p14: 2, p15: 2,
        p16: 3, p17: 3, p18: 3,
        p19: 1, p20: 1, p21: 1, p22: 1, p23: 1, p24: 1,
    },
    metadata: { sector: 'distribucion', empleados: '11-50' },
};

const INPUT_ORDENAR_LA_CASA: DiagnosticoInput = {
    respuestas: {
        p1: 0, p2: 1, p3: 1,
        p4: 1, p5: 1, p6: 2,
        p7: 1, p8: 2, p9: 1,
        p10: 2, p11: 1, p12: 1,
        p13: 1, p14: 1, p15: 1,
        p16: 1, p17: 1, p18: 1,
        p19: 1, p20: 1, p21: 1, p22: 1, p23: 1, p24: 1,
    },
    metadata: { sector: 'servicios_profesionales', empleados: '1-10' },
};

export const RESULTADO_EJEMPLO_OPORTUNIDAD_BLOQUEADA: DiagnosticoResultado = calcularDiagnostico(INPUT_OPORTUNIDAD_BLOQUEADA);
export const RESULTADO_EJEMPLO_LISTO_PARA_AUTOMATIZAR: DiagnosticoResultado = calcularDiagnostico(INPUT_LISTO_PARA_AUTOMATIZAR);
export const RESULTADO_EJEMPLO_BASE_SOLIDA: DiagnosticoResultado = calcularDiagnostico(INPUT_BASE_SOLIDA);
export const RESULTADO_EJEMPLO_ORDENAR_LA_CASA: DiagnosticoResultado = calcularDiagnostico(INPUT_ORDENAR_LA_CASA);

export const RESULTADOS_EJEMPLO_POR_CUADRANTE = {
    oportunidad_bloqueada: RESULTADO_EJEMPLO_OPORTUNIDAD_BLOQUEADA,
    listo_para_automatizar: RESULTADO_EJEMPLO_LISTO_PARA_AUTOMATIZAR,
    base_solida: RESULTADO_EJEMPLO_BASE_SOLIDA,
    ordenar_la_casa: RESULTADO_EJEMPLO_ORDENAR_LA_CASA,
} as const;
