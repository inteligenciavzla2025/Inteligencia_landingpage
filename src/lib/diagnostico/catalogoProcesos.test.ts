import { describe, expect, it } from 'vitest';
import { CATALOGO_PROCESOS_POR_SECTOR, MIN_CASO_POR_SECTOR } from './catalogoProcesos';
import type { Sector } from './types';

const SECTORES: Sector[] = ['distribucion', 'servicios_profesionales', 'inmobiliaria', 'retail', 'salud', 'otro'];

describe('catálogo de procesos — completitud de datos', () => {
    it.each(SECTORES)('%s tiene exactamente 6 procesos', (sector) => {
        expect(CATALOGO_PROCESOS_POR_SECTOR[sector]).toHaveLength(6);
    });

    it.each(SECTORES)('%s tiene minCaso definido y positivo', (sector) => {
        expect(MIN_CASO_POR_SECTOR[sector]).toBeGreaterThan(0);
    });

    it('todo impacto/esfuerzo del catálogo está en rango 1-10', () => {
        for (const sector of SECTORES) {
            for (const p of CATALOGO_PROCESOS_POR_SECTOR[sector]) {
                expect(p.impacto).toBeGreaterThanOrEqual(1);
                expect(p.impacto).toBeLessThanOrEqual(10);
                expect(p.esfuerzo).toBeGreaterThanOrEqual(1);
                expect(p.esfuerzo).toBeLessThanOrEqual(10);
            }
        }
    });

    it('ningún nombre de proceso está vacío', () => {
        for (const sector of SECTORES) {
            for (const p of CATALOGO_PROCESOS_POR_SECTOR[sector]) {
                expect(p.nombre.trim().length).toBeGreaterThan(0);
            }
        }
    });
});
