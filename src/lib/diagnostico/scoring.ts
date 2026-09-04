import type {
    Cuadrante, DiagnosticoInput, DiagnosticoRespuestas, DiagnosticoResultado,
    DimensionKey, NivelNombre, NivelNumero, ProcesoCatalogoEntry,
    ProcesoRecomendado, RangoHoras, RespuestaValor, Sector, SenalDolor,
} from './types';
import { MENSAJES_RIESGO_POR_DIMENSION } from './mensajesRiesgo';
import { CATALOGO_PROCESOS_POR_SECTOR, MIN_CASO_POR_SECTOR } from './catalogoProcesos';

const ORDEN_DIMENSIONES: DimensionKey[] = ['datos', 'procesos', 'tecnologia', 'talento', 'gobierno', 'economia'];

const PESO_DIMENSION: Record<DimensionKey, number> = {
    datos: 0.25, procesos: 0.2, tecnologia: 0.2, talento: 0.15, gobierno: 0.1, economia: 0.1,
};

const VOLUMEN_POR_P19: Record<RespuestaValor, number> = { 0: 25, 1: 100, 2: 275, 3: 700, 4: 1500 };
const REPETITIVIDAD_POR_P20: Record<RespuestaValor, number> = { 0: 0.05, 1: 0.17, 2: 0.35, 3: 0.55, 4: 0.75 };

const UMBRAL_SENAL = 2; // p21/p22/p23 >= 2 -> ese dolor se considera severo
const BONUS_POR_SENAL = 3; // ver seleccionarProcesosRecomendados()

const SECTORES_CONOCIDOS: Sector[] = ['distribucion', 'servicios_profesionales', 'inmobiliaria', 'retail', 'salud', 'otro'];

/**
 * Redondea 0-100 sin poder devolver 100 salvo que `esMaximoReal` (calculado
 * SIEMPRE desde enteros crudos, nunca desde el float del cálculo) lo confirme.
 * Defensa extra: si el redondeo normal diera >=100 sin ser máximo real, se
 * recorta a 99 (caso hoy inalcanzable con los pesos actuales, pero barato).
 */
function redondearPuntaje(valorCrudo: number, esMaximoReal: boolean): number {
    if (esMaximoReal) return 100;
    const redondeado = Math.round(valorCrudo);
    return redondeado >= 100 ? 99 : redondeado;
}

function redondear1Decimal(valor: number): number {
    return Math.round(valor * 10) / 10;
}

/**
 * Asume que el futuro <select> del quiz usa como value los códigos
 * canónicos de Sector. Si el UI termina enviando etiquetas en español
 * ("Distribución"), agregar acá un mapa de alias explícito — no se
 * adivina ahora porque el UI del quiz todavía no existe.
 */
export function normalizarSector(sectorCrudo: string): Sector {
    const normalizado = sectorCrudo.trim().toLowerCase();
    return SECTORES_CONOCIDOS.find((s) => s === normalizado) ?? 'otro';
}

interface CrudoDimension { dimension: DimensionKey; suma: number; crudo: number; }

function calcularCrudosPorDimension(r: DiagnosticoRespuestas): CrudoDimension[] {
    const sumas: Record<DimensionKey, number> = {
        datos: r.p1 + r.p2 + r.p3,
        procesos: r.p4 + r.p5 + r.p6,
        tecnologia: r.p7 + r.p8 + r.p9,
        talento: r.p10 + r.p11 + r.p12,
        gobierno: r.p13 + r.p14 + r.p15,
        economia: r.p16 + r.p17 + r.p18,
    };
    return ORDEN_DIMENSIONES.map((dimension) => ({
        dimension, suma: sumas[dimension], crudo: (sumas[dimension] / 12) * 100,
    }));
}

function calcularPuntajesPorDimension(crudos: CrudoDimension[]): Record<DimensionKey, number> {
    const resultado = {} as Record<DimensionKey, number>;
    for (const { dimension, suma, crudo } of crudos) {
        resultado[dimension] = redondearPuntaje(crudo, suma === 12);
    }
    return resultado;
}

function calcularMadurezGlobal(crudos: CrudoDimension[]): number {
    const crudoPonderado = crudos.reduce((acc, c) => acc + c.crudo * PESO_DIMENSION[c.dimension], 0);
    const esMaximoReal = crudos.every((c) => c.suma === 12);
    return redondearPuntaje(crudoPonderado, esMaximoReal);
}

function calcularPotencial(r: DiagnosticoRespuestas): number {
    const suma = r.p19 + r.p20 + r.p21 + r.p22 + r.p23 + r.p24;
    return redondearPuntaje((suma / 24) * 100, suma === 24);
}

function calcularNivel(madurezGlobal: number): { numero: NivelNumero; nombre: NivelNombre } {
    if (madurezGlobal <= 20) return { numero: 1, nombre: 'Manual' };
    if (madurezGlobal <= 40) return { numero: 2, nombre: 'Digitalizado' };
    if (madurezGlobal <= 60) return { numero: 3, nombre: 'Automatizado' };
    if (madurezGlobal <= 80) return { numero: 4, nombre: 'Aumentado' };
    return { numero: 5, nombre: 'Autónomo supervisado' };
}

function calcularCuadrante(madurezGlobal: number, potencial: number): Cuadrante {
    if (madurezGlobal < 50 && potencial >= 50) return 'oportunidad_bloqueada';
    if (madurezGlobal >= 50 && potencial >= 50) return 'listo_para_automatizar';
    if (madurezGlobal >= 50 && potencial < 50) return 'base_solida';
    return 'ordenar_la_casa';
}

function calcularHorasRecuperables(r: DiagnosticoRespuestas, madurezGlobal: number, minCaso: number): RangoHoras {
    const volumen = VOLUMEN_POR_P19[r.p19];
    const repetitividad = REPETITIVIDAD_POR_P20[r.p20];
    // Usa madurezGlobal ya redondeado (el mismo número que ve el usuario en
    // pantalla), no el crudo, para que el factor sea siempre coherente con
    // lo mostrado.
    const factor = madurezGlobal < 50 ? 0.35 : 0.5;
    const horas = (volumen * repetitividad * minCaso * factor) / 60;
    return { min: redondear1Decimal(horas * 0.7), max: redondear1Decimal(horas * 1.15) };
}

function encontrarDimensionMasDebil(puntajes: Record<DimensionKey, number>): DimensionKey {
    return ORDEN_DIMENSIONES.reduce((peor, actual) => (puntajes[actual] < puntajes[peor] ? actual : peor));
}

function detectarSenalesActivas(r: DiagnosticoRespuestas): Set<SenalDolor> {
    const activas = new Set<SenalDolor>();
    if (r.p21 >= UMBRAL_SENAL) activas.add('respuesta_lenta');
    if (r.p22 >= UMBRAL_SENAL) activas.add('fuera_horario');
    if (r.p23 >= UMBRAL_SENAL) activas.add('personal_repetitivo');
    return activas;
}

function seleccionarProcesosRecomendados(catalogo: ProcesoCatalogoEntry[], r: DiagnosticoRespuestas): ProcesoRecomendado[] {
    const senalesActivas = detectarSenalesActivas(r);

    const puntuados = catalogo.map((proceso, indiceOriginal) => {
        // Cada señal activa suma un bonus FIJO solo para ordenar; el impacto
        // que ve el usuario nunca cambia. Un bonus fijo (no un multiplicador)
        // evita que un proceso de bajo impacto salte al top-3 solo por
        // acumular etiquetas, y mantiene la regla explicable en una frase.
        const senalesDelProceso = proceso.senales ?? [];
        const bonus = senalesDelProceso.filter((s) => senalesActivas.has(s)).length * BONUS_POR_SENAL;
        return { proceso, indiceOriginal, puntajeAjustado: proceso.impacto + bonus };
    });

    puntuados.sort((a, b) => {
        if (b.puntajeAjustado !== a.puntajeAjustado) return b.puntajeAjustado - a.puntajeAjustado;
        return a.indiceOriginal - b.indiceOriginal; // desempate explícito, no depende de estabilidad implícita del sort
    });

    return puntuados.slice(0, 3).map(({ proceso }) => ({
        nombre: proceso.nombre, impacto: proceso.impacto, esfuerzo: proceso.esfuerzo, horasMes: proceso.horasMes,
    }));
}

export function calcularDiagnostico(input: DiagnosticoInput): DiagnosticoResultado {
    const { respuestas, metadata } = input;

    const crudosPorDimension = calcularCrudosPorDimension(respuestas);
    const puntajesPorDimension = calcularPuntajesPorDimension(crudosPorDimension);
    const madurezGlobal = calcularMadurezGlobal(crudosPorDimension);
    const potencial = calcularPotencial(respuestas);
    const nivel = calcularNivel(madurezGlobal);
    const cuadrante = calcularCuadrante(madurezGlobal, potencial);

    const sectorNormalizado = normalizarSector(metadata.sector);
    const minCaso = MIN_CASO_POR_SECTOR[sectorNormalizado];
    const horasRecuperables = calcularHorasRecuperables(respuestas, madurezGlobal, minCaso);

    const dimension = encontrarDimensionMasDebil(puntajesPorDimension);
    const dimensionMasDebil = {
        dimension, puntaje: puntajesPorDimension[dimension], mensajeRiesgo: MENSAJES_RIESGO_POR_DIMENSION[dimension],
    };

    const catalogo = CATALOGO_PROCESOS_POR_SECTOR[sectorNormalizado];
    const procesosRecomendados = seleccionarProcesosRecomendados(catalogo, respuestas);

    return {
        puntajesPorDimension, madurezGlobal, potencial, nivel, cuadrante,
        horasRecuperables, dimensionMasDebil, procesosRecomendados,
        meta: { sector: metadata.sector, sectorNormalizado, empleados: metadata.empleados },
    };
}
