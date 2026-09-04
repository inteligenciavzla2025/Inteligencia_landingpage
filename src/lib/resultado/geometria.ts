import type { DimensionKey } from '../diagnostico/types';

// Mismo orden que ORDEN_DIMENSIONES en scoring.ts — así el índice del eje
// coincide directo con la dimensión, sin remapear.
export const EJES_RADAR: DimensionKey[] = ['datos', 'procesos', 'tecnologia', 'talento', 'gobierno', 'economia'];

/**
 * Ángulo del gauge semicircular (convención d3-shape: 0 = 12 en punto,
 * sentido horario). Score 0 -> -π/2 (9 en punto), score 100 -> +π/2
 * (3 en punto), barriendo por arriba (ángulo 0, 12 en punto) — domo hacia
 * arriba, el gauge clásico con la base plana abajo.
 */
export function anguloGauge(score: number): number {
    return -Math.PI / 2 + (score / 100) * Math.PI;
}

/** Ángulo del eje `index` (0-5) del hexágono: empieza arriba, sentido horario. */
export function anguloEje(index: number): number {
    return -Math.PI / 2 + index * (Math.PI / 3);
}

export interface PuntoXY { x: number; y: number; }

/** Punto del hexágono para el eje `index` con un valor 0-100. */
export function puntoHexagono(index: number, valor0a100: number, radioMax: number, cx: number, cy: number): PuntoXY {
    const r = (valor0a100 / 100) * radioMax;
    const ang = anguloEje(index);
    return { x: cx + r * Math.cos(ang), y: cy + r * Math.sin(ang) };
}

/** Construye el string de `points` para un `<polygon>` con las 6 dimensiones. */
export function polygonPointsHexagono(
    puntajes: Record<DimensionKey, number>,
    radioMax: number,
    cx: number,
    cy: number
): string {
    return EJES_RADAR.map((dim, i) => {
        const { x, y } = puntoHexagono(i, puntajes[dim], radioMax, cx, cy);
        return `${x},${y}`;
    }).join(' ');
}

/**
 * Mapea (madurez, potencial), ambos 0-100, a coordenadas de píxel dentro de
 * un área de `w`x`h`. Y se invierte porque SVG crece hacia abajo, pero
 * "potencial" debe leerse hacia arriba.
 */
export function puntoMatriz(madurez: number, potencial: number, w: number, h: number): PuntoXY {
    return { x: (madurez / 100) * w, y: h - (potencial / 100) * h };
}
