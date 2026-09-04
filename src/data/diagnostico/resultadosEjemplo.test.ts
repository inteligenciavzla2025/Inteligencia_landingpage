import { describe, it, expect } from 'vitest';
import { RESULTADOS_EJEMPLO_POR_CUADRANTE } from './resultadosEjemplo';

describe('resultadosEjemplo', () => {
    it('cada fixture cae exactamente en el cuadrante que dice su clave', () => {
        for (const [cuadranteEsperado, resultado] of Object.entries(RESULTADOS_EJEMPLO_POR_CUADRANTE)) {
            expect(resultado.cuadrante).toBe(cuadranteEsperado);
        }
    });

    it('cada fixture tiene los 6 puntajes por dimensión y 3 procesos recomendados', () => {
        for (const resultado of Object.values(RESULTADOS_EJEMPLO_POR_CUADRANTE)) {
            expect(Object.keys(resultado.puntajesPorDimension)).toHaveLength(6);
            expect(resultado.procesosRecomendados).toHaveLength(3);
        }
    });
});
