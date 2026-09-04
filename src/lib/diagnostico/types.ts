export type RespuestaValor = 0 | 1 | 2 | 3 | 4;

export type DimensionKey =
    | 'datos' | 'procesos' | 'tecnologia' | 'talento' | 'gobierno' | 'economia';

export type Sector =
    | 'distribucion' | 'servicios_profesionales' | 'inmobiliaria'
    | 'retail' | 'salud' | 'otro';

export type SenalDolor = 'respuesta_lenta' | 'fuera_horario' | 'personal_repetitivo';

export type NivelNombre = 'Manual' | 'Digitalizado' | 'Automatizado' | 'Aumentado' | 'Autónomo supervisado';
export type NivelNumero = 1 | 2 | 3 | 4 | 5;

export type Cuadrante =
    | 'oportunidad_bloqueada' | 'listo_para_automatizar' | 'base_solida' | 'ordenar_la_casa';

// 24 campos explícitos p1..p24 (no un tipo mapeado/generado): prioriza
// legibilidad y autocompletado sobre brevedad.
export interface DiagnosticoRespuestas {
    p1: RespuestaValor; p2: RespuestaValor; p3: RespuestaValor;
    p4: RespuestaValor; p5: RespuestaValor; p6: RespuestaValor;
    p7: RespuestaValor; p8: RespuestaValor; p9: RespuestaValor;
    p10: RespuestaValor; p11: RespuestaValor; p12: RespuestaValor;
    p13: RespuestaValor; p14: RespuestaValor; p15: RespuestaValor;
    p16: RespuestaValor; p17: RespuestaValor; p18: RespuestaValor;
    p19: RespuestaValor; p20: RespuestaValor; p21: RespuestaValor;
    p22: RespuestaValor; p23: RespuestaValor; p24: RespuestaValor;
}

export interface DiagnosticoMetadata {
    /** Texto libre del <select> de sector. No se valida contra Sector acá. */
    sector: string;
    /** Etiqueta de rango, p.ej. "11-50". No participa en ninguna fórmula. */
    empleados: string;
}

export interface DiagnosticoInput {
    respuestas: DiagnosticoRespuestas;
    metadata: DiagnosticoMetadata;
}

export interface ProcesoCatalogoEntry {
    nombre: string;
    /** 1-10. Valor BASE mostrado al usuario; el bonus de señales nunca lo muta. */
    impacto: number;
    /** 1-10 */
    esfuerzo: number;
    horasMes: number;
    senales?: SenalDolor[];
}

export type CatalogoProcesosPorSector = Record<Sector, ProcesoCatalogoEntry[]>;

export interface ProcesoRecomendado {
    nombre: string;
    impacto: number;
    esfuerzo: number;
    horasMes: number;
}

export interface RangoHoras { min: number; max: number; }

export interface DimensionMasDebil {
    dimension: DimensionKey;
    puntaje: number;
    mensajeRiesgo: string;
}

export interface DiagnosticoResultado {
    puntajesPorDimension: Record<DimensionKey, number>;
    madurezGlobal: number;
    potencial: number;
    nivel: { numero: NivelNumero; nombre: NivelNombre };
    cuadrante: Cuadrante;
    horasRecuperables: RangoHoras;
    dimensionMasDebil: DimensionMasDebil;
    procesosRecomendados: ProcesoRecomendado[];
    meta: { sector: string; sectorNormalizado: Sector; empleados: string };
}
