export type {
    RespuestaValor, DimensionKey, Sector, SenalDolor, NivelNombre, NivelNumero, Cuadrante,
    DiagnosticoRespuestas, DiagnosticoMetadata, DiagnosticoInput, ProcesoCatalogoEntry,
    ProcesoRecomendado, RangoHoras, DimensionMasDebil, DiagnosticoResultado,
} from './types';
export { calcularDiagnostico, normalizarSector } from './scoring';
