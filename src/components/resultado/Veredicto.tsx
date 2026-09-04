import { useEffect, useId, useState } from 'react';
import { arc, type DefaultArcObject } from 'd3-shape';
import { animate, useMotionValue, useReducedMotion, useMotionValueEvent } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { anguloGauge } from '../../lib/resultado/geometria';
import { MENSAJE_VEREDICTO_POR_NIVEL } from '../../data/diagnostico/mensajesVeredicto';
import type { DiagnosticoResultado } from '../../lib/diagnostico/types';

interface VeredictoProps {
    resultado: DiagnosticoResultado;
}

const CX = 160;
const CY = 170;
const R_IN = 90;
const R_OUT = 120;

const arcoGenerator = arc();

function pathArco(endAngle: number): string {
    const datum: DefaultArcObject = { innerRadius: R_IN, outerRadius: R_OUT, startAngle: -Math.PI / 2, endAngle };
    return arcoGenerator(datum) ?? '';
}

const PATH_FONDO = pathArco(Math.PI / 2);

export function Veredicto({ resultado }: VeredictoProps) {
    const prefersReducedMotion = useReducedMotion();
    const score = useMotionValue(prefersReducedMotion ? resultado.madurezGlobal : 0);
    const [pathRelleno, setPathRelleno] = useState(() => pathArco(anguloGauge(score.get())));
    const gradientId = useId();

    useMotionValueEvent(score, 'change', (v) => {
        setPathRelleno(pathArco(anguloGauge(v)));
    });

    useEffect(() => {
        if (prefersReducedMotion) return;
        const controls = animate(score, resultado.madurezGlobal, { duration: 1.2, ease: 'easeOut' });
        return () => controls.stop();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resultado.madurezGlobal, prefersReducedMotion]);

    return (
        <GlassCard hoverEffect={false} className="text-center">
            <svg viewBox="0 0 320 200" className="w-full max-w-xs mx-auto" role="img" aria-label={`Madurez global: ${resultado.madurezGlobal} de 100`}>
                <defs>
                    {/* Gradiente "temperatura": frío (tech-blue) en 0 -> tibio (ámbar) a
                        mitad de camino -> caliente (electric-orange) en 100. userSpaceOnUse
                        con coordenadas fijas (no relativas al arco ya dibujado) para que el
                        color dependa de la posición REAL en la escala 0-100, no de cuánto
                        se rellenó — así un puntaje bajo se ve frío de verdad, no solo "un
                        pedacito" de un degradado completo comprimido en poco espacio. */}
                    <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1={-R_OUT} y1={0} x2={R_OUT} y2={0}>
                        <stop offset="0%" stopColor="#007BFF" />
                        <stop offset="55%" stopColor="#FFA940" />
                        <stop offset="100%" stopColor="#FF6B00" />
                    </linearGradient>
                </defs>
                <path d={PATH_FONDO} transform={`translate(${CX},${CY})`} fill="rgba(255,255,255,0.08)" />
                <path d={pathRelleno} transform={`translate(${CX},${CY})`} fill={`url(#${gradientId})`} />
            </svg>
            <div className="-mt-6">
                <p className="font-display font-black text-7xl text-white leading-none">{resultado.nivel.numero}</p>
                <p className="font-display text-xl text-electric-orange mt-1">{resultado.nivel.nombre}</p>
            </div>
            <p className="text-white/60 text-sm mt-4 max-w-sm mx-auto leading-relaxed">
                {MENSAJE_VEREDICTO_POR_NIVEL[resultado.nivel.numero]}
            </p>
        </GlassCard>
    );
}
