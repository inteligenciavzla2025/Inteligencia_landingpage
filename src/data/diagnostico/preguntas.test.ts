import { describe, it, expect } from 'vitest';
import { PREGUNTAS } from './preguntas';
import { BLOQUES } from './bloques';

describe('preguntas + bloques', () => {
    it('tiene exactamente 24 preguntas con ids p1..p24 únicos', () => {
        const ids = PREGUNTAS.map((p) => p.id);
        expect(ids).toHaveLength(24);
        expect(new Set(ids).size).toBe(24);
        for (let i = 1; i <= 24; i++) expect(ids).toContain(`p${i}`);
    });

    it('cada pregunta tiene 5 opciones con puntajes 0..4 en orden', () => {
        for (const p of PREGUNTAS) {
            expect(p.opciones.map((o) => o.puntaje)).toEqual([0, 1, 2, 3, 4]);
        }
    });

    it('BLOQUES cubre las 24 preguntas sin duplicados, en el mismo orden que PREGUNTAS', () => {
        const idsDesdeBloque = BLOQUES.flatMap((b) => b.preguntaIds);
        expect(idsDesdeBloque).toEqual(PREGUNTAS.map((p) => p.id));
    });
});
