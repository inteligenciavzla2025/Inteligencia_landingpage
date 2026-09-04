import { useState, useRef, useCallback, useEffect } from 'react';
import type { MouseEvent as ReactMouseEvent, TouchEvent as ReactTouchEvent } from 'react';

interface ImageComparisonProps {
    beforeImage: string;
    afterImage: string;
    altBefore?: string;
    altAfter?: string;
    /** Etiqueta sobre la esquina inferior izquierda (ej. "Día 0"). Se recorta junto con la imagen "antes". */
    labelBefore?: string;
    /** Etiqueta sobre la esquina inferior derecha (ej. "Día 90"). Se recorta junto con la imagen "después". */
    labelAfter?: string;
    /** Lista corta agrupada bajo labelBefore, mismo lado y mismo recorte. */
    itemsBefore?: string[];
    /** Lista corta agrupada bajo labelAfter, mismo lado y mismo recorte. */
    itemsAfter?: string[];
}

/**
 * Slider de comparación antes/después. La lista de frases de cada lado vive
 * DENTRO de su propia capa de imagen (no como overlay con z-index fijo), así
 * se revela y se oculta exactamente junto con la imagen a la que pertenece.
 * La etiqueta "Día 0"/"Día 90" en cambio es un badge fijo en la esquina
 * exterior de cada lado, siempre visible, independiente del arrastre.
 *
 * Convención espacial: "antes" ocupa el lado izquierdo del handle, "después"
 * el lado derecho — coincide con cómo se leen las etiquetas (Día 0 / Día 90)
 * de izquierda a derecha. Verificado a mano con la fórmula de clip-path:
 * con `inset(0 0 0 ${P}%)` sobre la capa "después", el área visible de esa
 * capa es [P, 100] (la derecha del handle); la capa "antes" es la base fija
 * que se ve donde "después" está recortada, es decir [0, P] (la izquierda).
 */
export function ImageComparison({
    beforeImage, afterImage, altBefore = 'Antes', altAfter = 'Después',
    labelBefore, labelAfter, itemsBefore, itemsAfter,
}: ImageComparisonProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback((clientX: number) => {
        if (!isDragging || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        let newPosition = ((clientX - rect.left) / rect.width) * 100;
        newPosition = Math.max(0, Math.min(100, newPosition));
        setSliderPosition(newPosition);
    }, [isDragging]);

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = useCallback(() => setIsDragging(false), []);
    const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => handleMove(e.clientX);

    const handleTouchStart = () => setIsDragging(true);
    const handleTouchEnd = () => setIsDragging(false);
    const handleTouchMove = (e: ReactTouchEvent<HTMLDivElement>) => handleMove(e.touches[0].clientX);

    // El mouseup se escucha en window (no solo en el contenedor) para que
    // soltar el botón fuera del slider igual termine el arrastre.
    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);
        return () => window.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseUp]);

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-video max-w-4xl mx-auto select-none rounded-2xl overflow-hidden border border-white/10"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Capa "antes" — base completa, siempre renderizada. La lista
                vive adentro de este mismo div, así la capa "después" (que se
                pinta arriba) la tapa exactamente donde ella se revela. Sin
                caja de color: un degradado inferior da legibilidad. */}
            <div className="absolute inset-0">
                <img src={beforeImage} alt={altBefore} className="h-full w-full object-cover object-left" draggable={false} />

                {itemsBefore && itemsBefore.length > 0 && (
                    <div className="absolute inset-y-0 left-0 w-1/2 px-3 flex flex-col items-center justify-center text-center gap-3 pointer-events-none">
                        {itemsBefore.map((item) => (
                            <span
                                key={item}
                                className="text-sm sm:text-base leading-snug text-gray-200 line-through whitespace-nowrap"
                                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.6)' }}
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Capa "después" — recortada por el slider. La lista va adentro
                de este mismo div recortado: se revela/oculta junto con la
                imagen, no como una capa aparte encima de todo. */}
            <div
                className="absolute top-0 left-0 h-full w-full overflow-hidden"
                style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            >
                <img src={afterImage} alt={altAfter} className="h-full w-full object-cover object-left" draggable={false} />

                {itemsAfter && itemsAfter.length > 0 && (
                    <div className="absolute inset-y-0 right-0 w-1/2 px-3 flex flex-col items-center justify-center text-center gap-3 pointer-events-none">
                        {itemsAfter.map((item) => (
                            <span
                                key={item}
                                className="text-sm sm:text-base leading-snug text-white font-semibold whitespace-nowrap"
                                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.6)' }}
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Etiquetas "Día 0"/"Día 90" — badges fijos en las esquinas
                exteriores, siempre visibles, independientes del arrastre. */}
            {labelBefore && (
                <span className="absolute bottom-4 left-4 text-sm sm:text-base font-bold uppercase tracking-wide bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg pointer-events-none">
                    {labelBefore}
                </span>
            )}
            {labelAfter && (
                <span className="absolute bottom-4 right-4 text-sm sm:text-base font-bold uppercase tracking-wide bg-electric-orange text-white px-4 py-2 rounded-lg pointer-events-none">
                    {labelAfter}
                </span>
            )}

            {/* Manija del slider — encima de las dos capas, siempre visible */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-electric-orange cursor-ew-resize flex items-center justify-center z-10"
                style={{ left: `calc(${sliderPosition}% - 0.125rem)` }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            >
                <div className={`bg-electric-orange rounded-full h-11 w-11 flex items-center justify-center shadow-lg shadow-black/40 transition-transform duration-200 ease-out ${isDragging ? 'scale-110' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="15" y1="18" x2="9" y2="12" />
                        <line x1="9" y1="6" x2="15" y2="12" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
