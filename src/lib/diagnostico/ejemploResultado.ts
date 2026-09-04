import type { DiagnosticoInput, DiagnosticoResultado } from './types';

export const EJEMPLO_INPUT_REALISTA: DiagnosticoInput = {
    respuestas: {
        p1: 2, p2: 3, p3: 2,
        p4: 3, p5: 2, p6: 3,
        p7: 1, p8: 2, p9: 2,
        p10: 2, p11: 1, p12: 2,
        p13: 1, p14: 2, p15: 1,
        p16: 3, p17: 2, p18: 2,
        p19: 3, p20: 2, p21: 3, p22: 1, p23: 2, p24: 2,
    },
    metadata: { sector: 'distribucion', empleados: '51-200' },
};

export const EJEMPLO_RESULTADO_REALISTA: DiagnosticoResultado = {
    puntajesPorDimension: {
        datos: 58,
        procesos: 67,
        tecnologia: 42,
        talento: 42,
        gobierno: 33,
        economia: 58,
    },
    madurezGlobal: 52,
    potencial: 54,
    nivel: { numero: 3, nombre: 'Automatizado' },
    cuadrante: 'listo_para_automatizar',
    horasRecuperables: { min: 11.4, max: 18.8 },
    dimensionMasDebil: {
        dimension: 'gobierno',
        puntaje: 33,
        mensajeRiesgo: 'No existen políticas claras de gobierno de datos ni de uso de IA, lo que expone a la empresa a riesgos de cumplimiento, seguridad y decisiones automatizadas sin supervisión adecuada.',
    },
    procesosRecomendados: [
        { nombre: 'Reposición automática de inventario (punto de reorden)', impacto: 9, esfuerzo: 6, horasMes: 35 },
        { nombre: 'Conciliación automática de pedidos y facturas', impacto: 8, esfuerzo: 4, horasMes: 40 },
        { nombre: 'Seguimiento proactivo de entregas y notificación al cliente', impacto: 7, esfuerzo: 3, horasMes: 25 },
    ],
    meta: { sector: 'distribucion', sectorNormalizado: 'distribucion', empleados: '51-200' },
};
