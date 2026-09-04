import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { EJES_RADAR, anguloEje, polygonPointsHexagono } from '../../lib/resultado/geometria';
import { PROMEDIO_MERCADO } from '../../data/diagnostico/promedioMercado';
import { INTERPRETACION_DIMENSION } from '../../data/diagnostico/interpretacionesDimension';
import { LABEL_DIMENSION } from '../../data/diagnostico/labelDimension';
import type { DimensionKey } from '../../lib/diagnostico/types';
import type { DiagnosticoResultado } from '../../lib/diagnostico/types';

interface RadarMadurezProps {
    resultado: DiagnosticoResultado;
}

const CX = 160;
const CY = 160;
const RADIO_MAX = 120;
const RADIO_LABEL = 140;

// El viewBox original (0 0 320 320) recortaba las etiquetas de los 4 ejes
// diagonales (Procesos/Tecnología a la derecha, Gobierno/Economía a la
// izquierda) porque el texto se extiende más allá de x=0 y x=320 — un SVG
// recorta por defecto todo lo que quede fuera de su viewBox. Datos y Talento
// (arriba/abajo) no se notaban porque su texto está centrado, no lateral.
// Se agrega margen horizontal simétrico (60 unidades a cada lado) sin mover
// el hexágono, que sigue centrado en (160,160).
const VIEWBOX_MARGEN_X = 60;
const VIEWBOX_MIN_X = -VIEWBOX_MARGEN_X;
const VIEWBOX_W = 320 + VIEWBOX_MARGEN_X * 2;
const VIEWBOX_H = 320;

function anclaTexto(angulo: number): 'start' | 'end' | 'middle' {
    const coseno = Math.cos(angulo);
    if (coseno > 0.3) return 'start';
    if (coseno < -0.3) return 'end';
    return 'middle';
}

export function RadarMadurez({ resultado }: RadarMadurezProps) {
    const prefersReducedMotion = useReducedMotion();
    const [ejeActivo, setEjeActivo] = useState<DimensionKey | null>(null);
    const [ejeHover, setEjeHover] = useState<DimensionKey | null>(null);
    const [tooltipRect, setTooltipRect] = useState<DOMRect | null>(null);
    const botonRefs = useRef<Partial<Record<DimensionKey, HTMLButtonElement | null>>>({});

    // La dimensión que se muestra: el hover manda mientras el mouse está
    // encima; si no hay hover, queda lo que se haya tocado/tapeado.
    const dimensionMostrada = ejeHover ?? ejeActivo;

    // El tooltip se saca del flujo del card con un portal a document.body:
    // GlassCard es un motion.div con transform (animación de entrada), y
    // cualquier transform en un ancestro crea su propio stacking context —
    // eso atrapaba el tooltip por debajo de la siguiente sección de la
    // página aunque tuviera z-index alto. Portaleado a <body>, escapa de
    // ese contexto por completo y no lo tapa nada.
    useEffect(() => {
        if (!dimensionMostrada) {
            setTooltipRect(null);
            return;
        }
        const boton = botonRefs.current[dimensionMostrada];
        if (boton) setTooltipRect(boton.getBoundingClientRect());
    }, [dimensionMostrada]);

    useEffect(() => {
        if (!dimensionMostrada) return;
        function cerrar() {
            setEjeActivo(null);
            setEjeHover(null);
        }
        window.addEventListener('scroll', cerrar, true);
        window.addEventListener('resize', cerrar);
        return () => {
            window.removeEventListener('scroll', cerrar, true);
            window.removeEventListener('resize', cerrar);
        };
    }, [dimensionMostrada]);

    const puntosUsuario = polygonPointsHexagono(resultado.puntajesPorDimension, RADIO_MAX, CX, CY);
    const puntosMercado = polygonPointsHexagono(PROMEDIO_MERCADO, RADIO_MAX, CX, CY);

    return (
        <GlassCard hoverEffect={false}>
            <h2 className="font-display text-lg font-bold text-white mb-1">Radar de madurez</h2>
            <p className="text-white/50 text-xs mb-4">Tu perfil (naranja) contra el promedio del mercado (línea punteada). Tocá una dimensión para ver el detalle.</p>

            <div className="relative w-full max-w-sm mx-auto">
                <svg viewBox={`${VIEWBOX_MIN_X} 0 ${VIEWBOX_W} ${VIEWBOX_H}`} className="w-full" role="img" aria-label="Radar hexagonal de madurez por dimensión">
                    {[20, 40, 60, 80, 100].map((nivel) => (
                        <polygon
                            key={nivel}
                            points={polygonPointsHexagono(
                                { datos: nivel, procesos: nivel, tecnologia: nivel, talento: nivel, gobierno: nivel, economia: nivel },
                                RADIO_MAX, CX, CY
                            )}
                            fill="none"
                            stroke="rgba(255,255,255,0.06)"
                        />
                    ))}
                    {EJES_RADAR.map((_, i) => {
                        const ang = anguloEje(i);
                        return (
                            <line
                                key={i}
                                x1={CX} y1={CY}
                                x2={CX + RADIO_MAX * Math.cos(ang)} y2={CY + RADIO_MAX * Math.sin(ang)}
                                stroke="rgba(255,255,255,0.06)"
                            />
                        );
                    })}

                    <motion.g
                        style={{ transformOrigin: `${CX}px ${CY}px` }}
                        initial={prefersReducedMotion ? false : { scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeOut', delay: 0.1 }}
                    >
                        <polygon points={puntosMercado} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.5)" strokeWidth={2} strokeDasharray="4 3" />
                    </motion.g>

                    <motion.g
                        style={{ transformOrigin: `${CX}px ${CY}px` }}
                        initial={prefersReducedMotion ? false : { scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' }}
                    >
                        <polygon points={puntosUsuario} fill="rgba(255,107,0,0.25)" stroke="#FF6B00" strokeWidth={2} />
                    </motion.g>

                    {EJES_RADAR.map((dim, i) => {
                        const ang = anguloEje(i);
                        const x = CX + RADIO_LABEL * Math.cos(ang);
                        const y = CY + RADIO_LABEL * Math.sin(ang);
                        const activo = dimensionMostrada === dim;

                        return (
                            <text
                                key={dim}
                                x={x} y={y}
                                fontSize={14}
                                fontWeight={activo ? 700 : 500}
                                fill={activo ? '#FF6B00' : 'rgba(255,255,255,0.92)'}
                                textAnchor={anclaTexto(ang)}
                                dominantBaseline="middle"
                                className="transition-colors duration-200 cursor-pointer select-none"
                            >
                                {LABEL_DIMENSION[dim]}
                            </text>
                        );
                    })}
                </svg>

                {EJES_RADAR.map((dim, i) => {
                    const ang = anguloEje(i);
                    const x = CX + RADIO_LABEL * Math.cos(ang);
                    const y = CY + RADIO_LABEL * Math.sin(ang);

                    return (
                        <button
                            key={dim}
                            ref={(el) => { botonRefs.current[dim] = el; }}
                            type="button"
                            aria-label={`${LABEL_DIMENSION[dim]}: ${resultado.puntajesPorDimension[dim]} de 100`}
                            onClick={() => setEjeActivo((prev) => (prev === dim ? null : dim))}
                            onMouseEnter={() => setEjeHover(dim)}
                            onMouseLeave={() => setEjeHover(null)}
                            className="absolute w-11 h-11 rounded-full"
                            style={{
                                left: `${((x - VIEWBOX_MIN_X) / VIEWBOX_W) * 100}%`,
                                top: `${(y / VIEWBOX_H) * 100}%`,
                                transform: 'translate(-50%, -50%)',
                            }}
                        />
                    );
                })}
            </div>

            {dimensionMostrada && tooltipRect && createPortal(
                <TooltipPortal
                    rect={tooltipRect}
                    anclaje={anclaTexto(anguloEje(EJES_RADAR.indexOf(dimensionMostrada)))}
                    arriba={Math.sin(anguloEje(EJES_RADAR.indexOf(dimensionMostrada))) < 0}
                    titulo={`${LABEL_DIMENSION[dimensionMostrada]} · ${resultado.puntajesPorDimension[dimensionMostrada]}/100`}
                    detalle={INTERPRETACION_DIMENSION[dimensionMostrada]}
                />,
                document.body
            )}
        </GlassCard>
    );
}

interface TooltipPortalProps {
    rect: DOMRect;
    anclaje: 'start' | 'end' | 'middle';
    arriba: boolean;
    titulo: string;
    detalle: string;
}

function TooltipPortal({ rect, anclaje, arriba, titulo, detalle }: TooltipPortalProps) {
    const left = anclaje === 'start' ? rect.left : anclaje === 'end' ? rect.right : rect.left + rect.width / 2;
    const translateX = anclaje === 'start' ? '0%' : anclaje === 'end' ? '-100%' : '-50%';

    return (
        <div
            className="fixed z-[70] pointer-events-none w-max max-w-[200px] bg-black/90 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-2 shadow-lg shadow-black/50"
            style={{
                left,
                transform: `translateX(${translateX})`,
                ...(arriba ? { bottom: window.innerHeight - rect.top + 8 } : { top: rect.bottom + 8 }),
            }}
        >
            <p className="text-white text-xs font-medium mb-0.5">{titulo}</p>
            <p className="text-white/60 text-[11px] leading-snug">{detalle}</p>
        </div>
    );
}
