import { describe, expect, it } from 'vitest';
import { calcularDiagnostico } from './scoring';
import { EJEMPLO_INPUT_REALISTA, EJEMPLO_RESULTADO_REALISTA } from './ejemploResultado';
import type { DiagnosticoInput, DiagnosticoRespuestas, RespuestaValor } from './types';

function respuestas(valor: RespuestaValor, overrides: Partial<DiagnosticoRespuestas> = {}): DiagnosticoRespuestas {
    const base: Record<string, RespuestaValor> = {};
    for (let i = 1; i <= 24; i++) {
        base[`p${i}`] = valor;
    }
    return { ...(base as unknown as DiagnosticoRespuestas), ...overrides };
}

describe('calcularDiagnostico', () => {
    it('todo en 0 → nivel Manual, cuadrante ordenar_la_casa, sin señales', () => {
        const input: DiagnosticoInput = {
            respuestas: respuestas(0),
            metadata: { sector: 'distribucion', empleados: '1-10' },
        };
        const resultado = calcularDiagnostico(input);

        expect(resultado.puntajesPorDimension).toEqual({
            datos: 0, procesos: 0, tecnologia: 0, talento: 0, gobierno: 0, economia: 0,
        });
        expect(resultado.madurezGlobal).toBe(0);
        expect(resultado.potencial).toBe(0);
        expect(resultado.nivel).toEqual({ numero: 1, nombre: 'Manual' });
        expect(resultado.cuadrante).toBe('ordenar_la_casa');
        expect(resultado.horasRecuperables).toEqual({ min: 0, max: 0.1 });
        expect(resultado.dimensionMasDebil.dimension).toBe('datos');
        expect(resultado.procesosRecomendados.map((p) => p.nombre)).toEqual([
            'Reposición automática de inventario (punto de reorden)',
            'Conciliación automática de pedidos y facturas',
            'Enrutamiento automático de rutas de reparto',
        ]);
    });

    it('todo en 4 → nivel Autónomo supervisado, cuadrante listo_para_automatizar, 100 real', () => {
        const input: DiagnosticoInput = {
            respuestas: respuestas(4),
            metadata: { sector: 'servicios_profesionales', empleados: '500+' },
        };
        const resultado = calcularDiagnostico(input);

        expect(resultado.puntajesPorDimension).toEqual({
            datos: 100, procesos: 100, tecnologia: 100, talento: 100, gobierno: 100, economia: 100,
        });
        expect(resultado.madurezGlobal).toBe(100);
        expect(resultado.potencial).toBe(100);
        expect(resultado.nivel).toEqual({ numero: 5, nombre: 'Autónomo supervisado' });
        expect(resultado.cuadrante).toBe('listo_para_automatizar');
        expect(resultado.horasRecuperables).toEqual({ min: 65.6, max: 107.8 });
        // Demuestra que el bonus de señales reordena sin mutar el impacto mostrado:
        // "Asistente virtual" (impacto base 6) queda por delante de
        // "Generación de propuestas" (impacto base 8) porque coincide con 2
        // señales activas contra 1.
        expect(resultado.procesosRecomendados).toEqual([
            { nombre: 'Agendamiento automático de reuniones y confirmaciones', impacto: 7, esfuerzo: 3, horasMes: 20 },
            { nombre: 'Asistente virtual para consultas frecuentes de clientes', impacto: 6, esfuerzo: 4, horasMes: 22 },
            { nombre: 'Generación automática de propuestas y cotizaciones', impacto: 8, esfuerzo: 5, horasMes: 30 },
        ]);
    });

    it('cuadrante oportunidad_bloqueada (madurez < 50, potencial >= 50)', () => {
        const input: DiagnosticoInput = {
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
        const resultado = calcularDiagnostico(input);

        expect(resultado.puntajesPorDimension).toEqual({
            datos: 17, procesos: 33, tecnologia: 33, talento: 33, gobierno: 25, economia: 25,
        });
        expect(resultado.madurezGlobal).toBe(28); // caso límite: crudo 27.5 -> redondeo hacia arriba
        expect(resultado.potencial).toBe(63);
        expect(resultado.nivel).toEqual({ numero: 2, nombre: 'Digitalizado' });
        expect(resultado.cuadrante).toBe('oportunidad_bloqueada');
        expect(resultado.horasRecuperables).toEqual({ min: 12.6, max: 20.7 });
        expect(resultado.dimensionMasDebil.dimension).toBe('datos');
        expect(resultado.procesosRecomendados.map((p) => p.nombre)).toEqual([
            'Reposición automática de inventario (punto de reorden)',
            'Conciliación automática de pedidos y facturas',
            'Seguimiento proactivo de entregas y notificación al cliente',
        ]);
    });

    it('cuadrante listo_para_automatizar (madurez >= 50, potencial >= 50)', () => {
        const input: DiagnosticoInput = {
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
        const resultado = calcularDiagnostico(input);

        expect(resultado.puntajesPorDimension).toEqual({
            datos: 75, procesos: 75, tecnologia: 75, talento: 75, gobierno: 50, economia: 75,
        });
        expect(resultado.madurezGlobal).toBe(73);
        expect(resultado.potencial).toBe(75);
        expect(resultado.nivel).toEqual({ numero: 4, nombre: 'Aumentado' });
        expect(resultado.cuadrante).toBe('listo_para_automatizar');
        expect(resultado.horasRecuperables).toEqual({ min: 22.5, max: 36.9 });
        expect(resultado.dimensionMasDebil.dimension).toBe('gobierno');
        expect(resultado.procesosRecomendados.map((p) => p.nombre)).toEqual([
            'Agendamiento automático de reuniones y confirmaciones',
            'Asistente virtual para consultas frecuentes de clientes',
            'Generación automática de propuestas y cotizaciones',
        ]);
    });

    it('cuadrante base_solida (madurez >= 50, potencial < 50)', () => {
        const input: DiagnosticoInput = {
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
        const resultado = calcularDiagnostico(input);

        expect(resultado.madurezGlobal).toBe(73);
        expect(resultado.potencial).toBe(25);
        expect(resultado.nivel).toEqual({ numero: 4, nombre: 'Aumentado' });
        expect(resultado.cuadrante).toBe('base_solida');
        expect(resultado.horasRecuperables).toEqual({ min: 0.8, max: 1.3 });
        expect(resultado.dimensionMasDebil.dimension).toBe('gobierno');
        expect(resultado.procesosRecomendados.map((p) => p.nombre)).toEqual([
            'Reposición automática de inventario (punto de reorden)',
            'Conciliación automática de pedidos y facturas',
            'Enrutamiento automático de rutas de reparto',
        ]);
    });

    it('cuadrante ordenar_la_casa (madurez < 50, potencial < 50)', () => {
        const input: DiagnosticoInput = {
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
        const resultado = calcularDiagnostico(input);

        expect(resultado.madurezGlobal).toBe(28);
        expect(resultado.potencial).toBe(25);
        expect(resultado.nivel).toEqual({ numero: 2, nombre: 'Digitalizado' });
        expect(resultado.cuadrante).toBe('ordenar_la_casa');
        expect(resultado.horasRecuperables).toEqual({ min: 0.7, max: 1.1 });
        expect(resultado.dimensionMasDebil.dimension).toBe('datos');
        expect(resultado.procesosRecomendados.map((p) => p.nombre)).toEqual([
            'Generación automática de propuestas y cotizaciones',
            'Facturación y seguimiento de cobros automatizado',
            'Agendamiento automático de reuniones y confirmaciones',
        ]);
    });

    it('sector no reconocido cae a "otro" con minCaso por defecto, sin lanzar excepción', () => {
        const input: DiagnosticoInput = {
            respuestas: respuestas(2),
            metadata: { sector: 'Construcción', empleados: '201-500' },
        };

        expect(() => calcularDiagnostico(input)).not.toThrow();

        const resultado = calcularDiagnostico(input);

        expect(resultado.puntajesPorDimension).toEqual({
            datos: 50, procesos: 50, tecnologia: 50, talento: 50, gobierno: 50, economia: 50,
        });
        expect(resultado.madurezGlobal).toBe(50);
        expect(resultado.potencial).toBe(50);
        expect(resultado.nivel).toEqual({ numero: 3, nombre: 'Automatizado' });
        expect(resultado.cuadrante).toBe('listo_para_automatizar');
        expect(resultado.horasRecuperables).toEqual({ min: 3.4, max: 5.5 }); // minCaso=6 (default), factor 0.5
        expect(resultado.meta.sectorNormalizado).toBe('otro');
        expect(resultado.dimensionMasDebil.dimension).toBe('datos');
        expect(resultado.procesosRecomendados).toHaveLength(3);
        expect(resultado.procesosRecomendados.map((p) => p.nombre)).toEqual([
            'Chatbot de atención al cliente 24/7',
            'Centralización automática de solicitudes en un solo canal',
            'Automatización de respuestas a consultas frecuentes',
        ]);
    });

    it('el ejemplo de salida documentado coincide exactamente con el cálculo real (fixture de regresión)', () => {
        expect(calcularDiagnostico(EJEMPLO_INPUT_REALISTA)).toEqual(EJEMPLO_RESULTADO_REALISTA);
    });
});
