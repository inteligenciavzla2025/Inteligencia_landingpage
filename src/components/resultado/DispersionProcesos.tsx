import { useState } from 'react';
import { scaleLinear, scaleSqrt } from 'd3-scale';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { templateDescripcionProceso } from '../../lib/resultado/descripcionProceso';
import { cn } from '../../lib/utils';
import type { DiagnosticoResultado } from '../../lib/diagnostico/types';

interface DispersionProcesosProps {
    resultado: DiagnosticoResultado;
}

const PLOT_MIN = 20;
const PLOT_MAX = 280;

export function DispersionProcesos({ resultado }: DispersionProcesosProps) {
    const prefersReducedMotion = useReducedMotion();
    const [procesoAbierto, setProcesoAbierto] = useState<string | null>(null);

    // Esfuerzo invertido: menos esfuerzo, más a la derecha.
    const xScale = scaleLinear().domain([1, 10]).range([PLOT_MAX, PLOT_MIN]);
    const yScale = scaleLinear().domain([1, 10]).range([PLOT_MAX, PLOT_MIN]);
    const maxHoras = Math.max(...resultado.procesosRecomendados.map((p) => p.horasMes));
    const rScale = scaleSqrt().domain([0, maxHoras]).range([10, 34]);

    const procesoSeleccionado = resultado.procesosRecomendados.find((p) => p.nombre === procesoAbierto) ?? null;

    return (
        <GlassCard hoverEffect={false}>
            <h2 className="font-display text-lg font-bold text-white mb-1">Procesos recomendados</h2>
            <p className="text-white/50 text-xs mb-4">Impacto vs. esfuerzo de implementación<br />Tocá una burbuja para ver más.</p>

            <div className="relative w-full max-w-sm mx-auto">
                <svg viewBox="0 0 300 300" className="w-full" role="img" aria-label="Dispersión de procesos recomendados por impacto y esfuerzo">
                    <rect x={150} y={20} width={130} height={130} fill="rgba(255,107,0,0.08)" />
                    <text x={272} y={36} fontSize={10} fill="rgba(255,107,0,0.7)" textAnchor="end">Ganancia rápida</text>

                    <line x1={PLOT_MIN} y1={PLOT_MAX} x2={PLOT_MAX} y2={PLOT_MAX} stroke="rgba(255,255,255,0.15)" />
                    <line x1={PLOT_MIN} y1={PLOT_MIN} x2={PLOT_MIN} y2={PLOT_MAX} stroke="rgba(255,255,255,0.15)" />
                    <text x={PLOT_MAX} y={294} fontSize={10} fill="rgba(255,255,255,0.4)" textAnchor="end">Menos esfuerzo</text>
                    <text x={PLOT_MIN} y={294} fontSize={10} fill="rgba(255,255,255,0.4)">Más esfuerzo</text>
                    <text x={6} y={PLOT_MIN + 4} fontSize={10} fill="rgba(255,255,255,0.4)">+ Impacto</text>

                    {resultado.procesosRecomendados.map((proceso, i) => {
                        const cx = xScale(proceso.esfuerzo);
                        const cy = yScale(proceso.impacto);
                        const r = rScale(proceso.horasMes);
                        return (
                            <motion.g
                                key={proceso.nombre}
                                style={{ transformOrigin: `${cx}px ${cy}px` }}
                                initial={prefersReducedMotion ? false : { scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeOut', delay: i * 0.1 }}
                            >
                                <circle
                                    cx={cx} cy={cy} r={r}
                                    fill={procesoAbierto === proceso.nombre ? 'rgba(255,107,0,0.4)' : 'rgba(255,107,0,0.22)'}
                                    stroke="#FF6B00" strokeWidth={2}
                                />
                            </motion.g>
                        );
                    })}
                </svg>

                {resultado.procesosRecomendados.map((proceso) => {
                    const cx = xScale(proceso.esfuerzo);
                    const cy = yScale(proceso.impacto);
                    const r = rScale(proceso.horasMes);
                    return (
                        <button
                            key={proceso.nombre}
                            type="button"
                            aria-label={proceso.nombre}
                            onClick={() => setProcesoAbierto((prev) => (prev === proceso.nombre ? null : proceso.nombre))}
                            className="absolute rounded-full"
                            style={{
                                left: `${(cx / 300) * 100}%`,
                                top: `${(cy / 300) * 100}%`,
                                width: `${Math.max((r * 2 / 300) * 100, 12)}%`,
                                height: `${Math.max((r * 2 / 300) * 100, 12)}%`,
                                transform: 'translate(-50%, -50%)',
                            }}
                        />
                    );
                })}
            </div>

            <AnimatePresence initial={false}>
                {procesoSeleccionado && (
                    <motion.div
                        initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className={cn('mt-4 p-4 rounded-xl bg-white/5 border border-white/10')}>
                            <p className="text-white font-medium text-sm mb-1">{procesoSeleccionado.nombre}</p>
                            <p className="text-white/60 text-xs leading-relaxed">
                                {templateDescripcionProceso(procesoSeleccionado)}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </GlassCard>
    );
}
